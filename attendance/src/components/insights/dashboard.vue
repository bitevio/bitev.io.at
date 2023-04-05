<template>
  <q-dialog ref="dialogRef" maximized="" class="q-pa-sm">
    <q-card>
      <q-card-actions>
        <q-toggle label="Grid Points" v-model="state.grid" color="primary" />
        <q-toggle label="Key & Name" v-model="state.name" color="primary" />
        <q-space />
        <div class="q-gutter-md">
          <q-btn @click="Sync()" round icon="mdi-sync"></q-btn>
          <q-btn round flat v-close-popup icon="mdi-close"></q-btn>
          <q-btn color="green" round @click="save" icon="mdi-check"></q-btn>
        </div>
      </q-card-actions>
      <q-card-section style="height: 93vh" class="scroll">
        <fieldset
          :class="state.grid ? 'workspace ' : ''"
          v-show="state.views.length && state.ready"
          class="fit q-pa-md relative-position scroll bg-lite-mini overflow-hidden rounded-borders"
        >
          <div
            v-for="(v, i) of state.views"
            :key="i"
            :id="i"
            class="draggable overflow-hidden scroll"
          >
            <q-card class="box-mini fit scroll">
              <q-card-actions v-if="state.name" class="text-caption text-grey-7">
                <q-item-label :lines="2">
                  {{ v.name }} <br />
                  {{ v.key }}
                </q-item-label>
              </q-card-actions>
              <q-card-section>
                <div v-if="v.type == 'label'">
                  <p class="text-h6 text-bold">
                    {{ v.labelView?.label }}
                  </p>
                  <p>
                    {{ v.labelView?.description }}
                  </p>
                </div>
                <div v-if="v.type == 'list'">
                  <p class="text-h6 text-bold">
                    {{ v?.header?.name }}
                  </p>
                  <p>
                    {{ v?.header?.description }}
                  </p>
                  <q-list style="max-height: 35vh" class="scroll" separator="">
                    <q-item v-for="(item, index_) of state.getInit[v.key]">
                      {{ formatEval(v.listView.display, item, index_) }}
                    </q-item>
                  </q-list>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </fieldset>

        <div v-show="!state.views.length">
          <div class="text-center">
            <van-empty></van-empty>
            <p>
              No card found ! <br />
              please create card view before manage dashboard grid
            </p>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<route lang="yaml">
meta:
  layout: espaceLayout
  title: Insights
  icon: mdi-chart-bar
</route>
<script setup>
import { reactive, onMounted, onErrorCaptured } from "vue";
import interact from "interactjs";
import { useDialogPluginComponent } from "quasar";
import { bitev } from "src/sdk";

const { onDialogOK, dialogRef } = useDialogPluginComponent();
const state = reactive({
  ready: false,
  grid: true,
  name: false,
  drag: { animation: 400, ghostClass: "ghost" },
  getInit: {},

  views: [],
});

onErrorCaptured((err) => {
  console.log(err);
  return false;
});

const props = defineProps({
  views: null,
});

if (props.views) state.views = [...props.views];

onMounted(async () => {
  await Sync();
  await redifine();
  nDrag();
});

function formatEval(display = "", item, index) {
  var n = eval("(`" + display + "`)");
  // console.log(n);
  return n;
}

async function Sync() {
  state.views.filter(async (e) => {
    if (e.type == "list") {
      await syncListView(e);
    }
  });
}

async function syncListView(v) {
  let orderBy = {};
  orderBy[v.listView.sort.field.name] = v.listView.sort.direction;

  state.getInit[v.key] = await bitev
    .findMany(v?.collection?.slug, {
      where: v.listView?.filter || {},
      orderBy: orderBy,
    })
    .then((e) => e)
    .catch((err) => []);

  console.log("getInit", state.getInit);
}

function redifine() {
  return new Promise(async (resolve) => {
    setTimeout(() => {
      state.views.filter((e, index) => {
        let indexId = String(index);
        var el = document.getElementById(indexId);

        // set resize
        var w = e.grid?.resize?.w || null;
        var h = e.grid?.resize?.h || null;
        if (w & h) {
          el.style.width = w + "px";
          el.style.height = h + "px";
          el.style.transform = "translate(" + x + "px," + y + "px)";
        }

        // set Drag position
        var x = parseFloat(e.grid?.drag?.x) || null;
        var y = parseFloat(e.grid.drag?.y) || null;
        if (x & y) {
          el.style.transform = "translate(" + x + "px, " + y + "px)";
          el.setAttribute("data-x", x);
          el.setAttribute("data-y", y);
        }
      });

      state.ready = true;
      resolve();
    }, 300);
  });
}

function nDrag() {
  interact(".draggable")
    .draggable({
      autoScroll: true,
      listeners: {
        move: dragMoveListener,
        end: (event) => {
          var target = event.target;
          var x = parseFloat(target.getAttribute("data-x")) || 0;
          var y = parseFloat(target.getAttribute("data-y")) || 0;
          var index = Number(target.getAttribute("id"));

          state.views[index].grid.drag.x = x + event.dx;
          state.views[index].grid.drag.y = y + event.dy;

          //console.log(x, y);
        },
      },
      inertia: true,
      modifiers: [
        interact.modifiers.snap({
          targets: [interact.snappers.grid({ x: 30, y: 30 })],
          range: Infinity,
          relativePoints: [{ x: 0, y: 0 }],
        }),
        interact.modifiers.restrictRect({
          restriction: "parent",
          endOnly: true,
        }),
      ],
    })
    .resizable({
      edges: { left: true, right: true, bottom: true, top: true },
      listeners: {
        move: resizeListener,
        end: (event) => {
          var target = event.target;
          var w = event.rect.width;
          var h = event.rect.height;
          var index = Number(target.getAttribute("id"));

          state.views[index].grid.resize.w = w;
          state.views[index].grid.resize.h = h;
        },
      },
      inertia: true,
      modifiers: [
        interact.modifiers.snap({
          targets: [interact.snappers.grid({ x: 40, y: 40 })],
          range: Infinity,
          relativePoints: [{ x: 0, y: 0 }],
        }),
        // keep the edges inside the parent
        interact.modifiers.restrictEdges({
          outer: "parent",
        }),
        // minimum size
        interact.modifiers.restrictSize({
          min: { width: 100, height: 50 },
        }),
      ],
    });
}

function dragMoveListener(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  var index = Number(target.getAttribute("id"));

  // translate the element
  target.style.transform = "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

function resizeListener(event) {
  var target = event.target;
  var x = parseFloat(target.getAttribute("data-x")) || 0;
  var y = parseFloat(target.getAttribute("data-y")) || 0;

  // update the element's style
  target.style.width = event.rect.width + "px";
  target.style.height = event.rect.height + "px";

  // translate when resizing from top or left edges
  x += event.deltaRect.left;
  y += event.deltaRect.top;

  target.style.transform = "translate(" + x + "px," + y + "px)";

  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
  //target.textContent =
  // Math.round(event.rect.width) + "\u00D7" + Math.round(event.rect.height);
}

function save() {
  onDialogOK(state.views);
}
</script>
