<template>
  <q-page class="q-pa-lg">
    <q-dialog id="sidePanel" maximized position="right" v-model="state.sideRight">
      <q-card dark class="bg-primary" style="width: 300px">
        <q-card-actions class="q-mx-md">
          <q-icon size="sm" name="mdi-cog-outline" />
          <q-toolbar-title class="text-bold"> Tools </q-toolbar-title>
        </q-card-actions>
        <q-card-section>
          <q-expansion-item
            dark
            dense
            class="text-bold"
            label="Import / Export"
            caption="Export data  to csv file "
          >
            <div class="q-pa-sm">
              <q-btn
                @click="openCsv()"
                dense
                icon="las la-file-csv"
                class="bg-white fit text-black"
                no-caps
                label="Export"
              ></q-btn>
            </div>
          </q-expansion-item>
          <q-separator spaced />
          <q-expansion-item
            class="text-bold"
            dark
            dense
            label="Activity Log"
            caption="Export data  to csv file "
          >
            <div class="q-pa-sm">
              <q-btn
                icon="las la-file"
                color="primary"
                no-caps
                dense
                class="fit bg-white text-black"
                label="Show all activity"
              ></q-btn>
            </div>
          </q-expansion-item>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-toolbar>
      <q-input v-model="state.search" label="Search ...."></q-input>
      <q-space />
      <div class="q-gutter-md">
        <q-btn @click="state.sideRight = true" flat round icon="mdi-cog"></q-btn>
        <q-btn
          color="red"
          @click="state.sideRight = true"
          round
          unelevated=""
          icon="la la-print"
        ></q-btn>
        <q-btn
          color="red"
          v-if="state.selected.length"
          outline
          @click="deleteMany()"
          fab-mini
          icon="las la-trash"
        ></q-btn>

        <q-btn
          class="bg-white text-primary"
          @click="Sync()"
          fab-mini
          icon="las la-sync"
        ></q-btn>
        <q-btn
          v-if="state.selected.length == 1"
          class="bg-white text-primary"
          fab-mini
          :to="`/apps/collections/edit/${$route.params.model}?ref=${state.selected[0]?.id}`"
          icon="las la-pen"
        ></q-btn>

        <q-btn
          :to="`/apps/collections/create/${$route.params.model}`"
          fab-mini
          color="secondary"
          icon="mdi-plus"
        ></q-btn>
      </div>
    </q-toolbar>

    <div class="q-pt-sm">
      <q-card-actions class="">
        <div class="text-bold text-black">
          <q-icon name="mdi-file-outline" /> {{ state.items.length }} document(s) found
          <br />
        </div>
        <q-space />
        <div v-if="state.selected.length" class="q-mx-sm text-weight-thin">
          {{ state.selected.length }} item(s) selected
        </div>
      </q-card-actions>
      <div v-if="state.model.slug">
        <q-table
          @row-click="
            (evt, rw) =>
              $router.push(`/apps/collections/edit/${$route.params.model}?ref=${rw?.id}`)
          "
          color="primary"
          v-model:selected="state.selected"
          selection="multiple"
          separator="vertical"
          :filter="state.search"
          :rows-per-page-options="[100, 200]"
          :columns="state.columns"
          :rows="state.items"
          :loading="state.loading"
          flat
          style="height: 65vh"
          class="ui table"
          :class="state.loading ? '' : ' '"
        >
          <template v-for="check of state.colors" v-slot:[check]="props">
            <q-td style="max-width: 70px; text-align: center" :props="props">
              <div>
                <q-icon
                  size="sm"
                  :style="`color:${props.value}`"
                  v-if="props.value"
                  name="mdi-circle"
                />
              </div>
            </q-td>
          </template>
          <template v-for="check of state.checkArray" v-slot:[check]="props">
            <q-td style="max-width: 70px; text-align: center" :props="props">
              <div>
                <q-icon size="sm" color="green" v-if="props.value" name="las la-check" />
                <q-icon size="sm" v-else name="las la-circle"></q-icon>
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-behavior="props">
            <q-td :props="props">
              <span v-if="props.value?.value == 'arrival'">
                <q-icon color="green" name="mdi-circle" />
              </span>
              <span v-else>
                <q-icon color="red" name="mdi-circle" />
              </span>
            </q-td>
          </template>
          <template v-for="rich of state.richtextArray" v-slot:[rich]="props">
            <q-td style="max-width: 150px" :props="props">
              <q-smart-reactif v-slot="{ active, toggle, close, open }">
                <div v-element-hover="(val) => {}">
                  <q-item-label :lines="1">
                    {{ htmlToText(props.value) }}
                  </q-item-label>
                </div>

                <q-dialog
                  maximized=""
                  position="right"
                  @hide="close()"
                  :model-value="active"
                >
                  <q-card>
                    <q-card-actions>
                      <q-toolbar-title>
                        {{ props.col.label || props.col.name }}
                      </q-toolbar-title>
                      <q-space />
                      <q-btn flat round icon="mdi-close" v-close-popup></q-btn>
                    </q-card-actions>
                    <q-separator />
                    <q-card-section style="font-size: 14px">
                      <div v-html="props.value"></div>
                    </q-card-section>
                  </q-card>
                </q-dialog>
              </q-smart-reactif>
            </q-td>
          </template>
        </q-table>
      </div>
      <div class="text-center" v-else>
        <van-empty description="Model not found"></van-empty>
        <q-btn flat label="go back" @click="$router.back()" icon="mdi-arrow-left"></q-btn>
      </div>
    </div>
  </q-page>
</template>
<route lang="yaml">
meta:
  layout: espaceLayout
</route>
<script setup>
import { htmlToText } from "html-to-text";
import moment from "moment";
import { vElementHover } from "@vueuse/components";
import { reactive, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useSession } from "stores/session";
import { bitev, getOneCollection } from "src/sdk";
import { useQuasar } from "quasar";
import csv from "components/tools/csv.vue";
const store = useSession();
const $q = useQuasar();

const $router = useRouter();
const $route = useRoute();
const state = reactive({
  checkArray: [],
  sideRight: false, // Panel tool
  richtextArray: [],
  colors: [],
  search: null,
  selected: [],
  loading: false,
  items: [],
  rws: [],
  model: getOneCollection($route.params.model),
  columns: [],
});

watch(
  () => $route.params.model,
  () => {
    init();
  }
);

onMounted(() => {
  init();
});

function init() {
  state.model = getOneCollection($route.params.model);

  Sync();
  buildColumns();
}

async function Sync() {
  if (!$route.params.model) return false;
  state.loading = true;

  var includes = {};

  state.model.fields.map((e) => {
    if (e.type == "relationship") {
      includes[e.name] = true;
    }
  });

  var response = await bitev
    .findMany($route.params.model, {
      orderBy: {
        createdAt: "desc",
      },
      include: { ...includes },
    })
    .catch(() => [])
    .then((e) => e);

  // console.log(response);

  state.items = response;
  state.rws = [...response];

  state.loading = false;
}

function buildColumns() {
  var columns = [];
  if (state.model.fields?.length) {
    if (state.model.slug == "controls") {
      columns.push({
        label: "",
        name: "behavior",
        field: (rw) => rw.action,
        align: "center",
        headerClasses: " ",
      });
    }

    state.model.fields.map((e) => {
      if (e.type.toLowerCase().match(/(json|media|map)/)) return;

      if (e.type.toLowerCase().match(/(select)/)) {
        return columns.push({
          label: (e?.admin?.label || e.name).toUpperCase(),
          name: e.name,
          field: (rw) => {
            if (e.hasMany) {
              return rw[e.name].map((val) => (val?.label || val?.value) + "\n, ");
            } else {
              return rw[e.name]?.label || rw[e.name]?.value;
            }
          },
          align: "center",
          headerClasses: " ",
          classes: (rw) => {
            return rw[e.name] ? "" : "";
          },
        });
      }

      if (e.type == "relationship") {
        return columns.push({
          label: (e.admin?.label || e?.name).toUpperCase(),
          name: e.name,
          field: (rw) => {
            return displayT(e.admin.displayTemplate, rw[e.name], e.name);
          },
          align: "center",
          headerClasses: " ",
          classes: (rw) => {
            return rw[e.name] ? "" : "";
          },
        });
      }

      if (e.type == "colour") {
        state.colors.push("body-cell-" + e.name);
      }

      if (e.type == "boolean") {
        state.checkArray.push("body-cell-" + e.name);
      }

      if (e.type == "richtext") {
        state.richtextArray.push("body-cell-" + e.name);
      }

      return columns.push({
        label: (e?.admin?.label || e.name).toUpperCase(),
        name: e.name,
        field: (rw) => rw[e.name],
        align: e.type == "boolean" ? "center" : "center",
        headerClasses: e.type == "boolean" ? "text-center" : "",

        sortable: true,
      });
    });

    if (state.model.timestamps) {
      var formatTime = state.model?.admin?.timestampsFormat
        ? state.model.admin.timestampsFormat
        : "YY-MM-DD ,HH:mm:ss a";
      columns.push({
        label: "CreatedAt",
        name: "createdAt",
        field: (rw) => moment(rw.createdAt).format(formatTime),
        align: "left",
        headerClasses: " ",
        sortable: true,
        style: {},
      });
      columns.push({
        label: "UpdatedAt",
        name: "updatedAt",
        field: (rw) => moment(rw.updatedAt).format(formatTime),
        align: "left",
        headerClasses: " ",
        sortable: true,
        style: {},
      });
    }
  }

  state.columns = columns;
}

async function deleteMany() {
  $q.dialog({
    title: "",
    message: "Do you want to delete theses entries ?",
    ok: {
      label: "Delete",
      color: "negative",
      push: true,
    },
    cancel: "Cancel",
  }).onOk(async () => {
    var ids = state.selected.map((e) => e.id);
    $q.loading.show();
    await bitev
      .deleteMany(state.model.slug, {
        where: {
          id: { in: ids },
        },
      })
      .catch();
    Sync();
    $q.loading.hide();
  });
}

function openCsv() {
  state.sideRight = false;
  $q.dialog({
    component: csv,
    componentProps: {
      model: { ...state.model },
      items: [...state.rws],
    },
  });
}

function displayT(display, item, name) {
  if (item) {
    var str = `
       function func(){
          ${display}
        }
    `;

    var show = eval("(" + str + ")");
    return show();
  }
  return "";
}
</script>
