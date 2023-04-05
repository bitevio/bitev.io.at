<template>
  <q-dialog maximized="" full-height="" position="right" ref="dialogRef">
    <q-card
      class="q-pa-md"
      :style="{
        minWidth: state.expand ? '82vw' : '50vw',
        maxWidth: '75vw',
        width: 'auto',
      }"
    >
      <q-card-actions class="q-pa-none">
        <q-btn
          flat
          round
          outline=""
          @click="state.expand = !state.expand"
          :icon="state.expand ? 'las la-expand' : 'las la-expand-arrows-alt'"
        >
          <q-tooltip>
            {{ state.expand ? "minimize" : "Maximize" }}
          </q-tooltip>
        </q-btn>
        <q-toolbar-title class="text-capitalize text-bold">
          {{ props.field.label || props.field.name }}
        </q-toolbar-title>
        <q-space />
        <div v-if="!props.readOnly" class="q-gutter-md">
          <q-btn @click="Sync()" round icon="mdi-sync"></q-btn>
          <q-btn v-close-popup round icon="mdi-close"></q-btn>
          <q-btn @click="Save()" color="green" round icon="mdi-check"></q-btn>
        </div>
        <div class="q-gutter-md" v-else>
          <q-btn
            :to="`/espace/collections/${state.model.slug}`"
            label="Manage"
            outline
            icon="las la-external-link-alt"
          ></q-btn>
          <q-btn flat v-close-popup icon="mdi-close"></q-btn>
        </div>
      </q-card-actions>
      <q-card-actions>
        <q-input
          style="min-width: 400px"
          v-model="state.search"
          type="text"
          clearable=""
          label="Search...."
        />
        <q-space />
        <q-toggle v-model="state.showSelect" label="Selected Only" />
      </q-card-actions>
      <q-card-section class="scroll q-pa-xs" style="height: 80vh">
        <q-card flat>
          <q-table
            class="ui table"
            color="secondary"
            v-model:selected="state.selected"
            :selection="props.field.hasMany ? 'multiple' : 'single'"
            separator="cell"
            :rows-per-page-options="[100, 200]"
            :filter="state.search"
            row-key="id"
            :columns="state.columns"
            :rows="state.items || []"
            :loading="state.loading"
            flat
            style="height: 75vh"
          >
            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <div>
                  <div class="row">
                    <q-smart-reactif v-slot="{ active, toggle, close }">
                      <q-btn
                        @click="toggle()"
                        color="primary"
                        round
                        dense
                        icon="mdi-information-variant"
                      ></q-btn>

                      <q-dialog @hide="close" :model-value="active">
                        <q-card>
                          <q-card-actions class="q-mx-sm">
                            <q-toolbar-title shrink=""> All détails </q-toolbar-title>
                            <q-space />
                            <q-btn v-close-popup round flat icon="mdi-close"></q-btn>
                          </q-card-actions>
                          <q-card-section>
                            <q-list separator="">
                              <q-item
                                v-for="(item, i) of Object.keys(props.row)"
                                :key="i"
                                v-show="item !== 'actions'"
                              >
                                <q-item-section side>
                                  <q-item-label class="text-bold text-black">
                                    {{ formatTLabel(item, props.row[item]) }} :
                                  </q-item-label>
                                </q-item-section>
                                <q-item-section>
                                  {{ props.row[item] }}
                                </q-item-section>
                              </q-item>
                            </q-list>
                          </q-card-section>
                          <q-card-section></q-card-section>
                        </q-card>
                      </q-dialog>

                      &nbsp; &nbsp;

                      <q-btn
                        @click="
                          $router.push(
                            `/espace/collections/edit/${state.model.slug}?ref=${props.row?.id}`
                          )
                        "
                        round
                        dense
                        icon="las la-link"
                      >
                      </q-btn>
                    </q-smart-reactif>
                  </div>
                </div>
              </q-td>
            </template>
          </q-table>
        </q-card>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import _, { set } from "lodash";
import moment from "moment";

import { useDialogPluginComponent } from "quasar";
import { reactive, onMounted, onErrorCaptured, watch } from "vue";
import { getOneCollection, bitev, getOneField } from "../../sdk";
const { dialogRef, onDialogOK } = useDialogPluginComponent();
const props = defineProps({
  field: {
    type: Object,
    default: {},
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
  selected: {
    type: Array,
    default: [],
  },
});

const state = reactive({
  showSelect: true,
  expand: false,
  columns: [],
  model: getOneCollection(props.field?.relationTo),
  loading: false,
  search: null,
  includes: [],
  checkArray: [],
  colors: [],
  selected: [],
  items: [],
  rws: [],
});

buildColumns();

onErrorCaptured((err) => {
  return false;
});

onMounted(async () => {
  await Sync();

  //lselection(props.selected?.length ? true : false);
});
watch(
  () => state.showSelect,
  (val) => {
    // lselection(val);
  }
);

async function lselection(val) {
  state.loading = true;
  state.items = [];
  if (val) {
    for await (var item of state.rws) {
      for await (var id of props.selected) {
        if (id == item.id) {
          state.items.push(item);
        }
      }
    }
  } else {
    state.items = [...state.rws];
  }
  state.loading = false;
}

function formatTLabel(name, value) {
  var val = getOneField(props.field?.relationTo, name) || "";
  val = val?.admin?.label || val?.name || null;

  if (!val) val = name;
  return val;
}

function buildColumns() {
  var columns = [];
  if (state.model.fields?.length) {
    state.model.fields.map((e) => {
      if (e.type.toLowerCase().match(/(json|media|map|relationship)/)) return;

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

      if (e.type == "colour") {
        state.colors.push("body-cell-" + e.name);
      }

      if (e.type == "boolean") {
        state.checkArray.push("body-cell-" + e.name);
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

async function Sync() {
  state.loading = true;
  state.selected = [];
  var include = {};

  state.model.fields.map((f) => {
    if (f.type == "relationship") {
      include[f.name] = true;
    }
  });

  var response = await bitev
    .findMany(state.model.slug, {
      include,
    })
    .then((e) => e)
    .catch((err) => []);

  //console.log(response);
  var hiddenRelation = [];
  state.model.fields.map((e) => {
    if (e.type == "relationship" || e.hasMany) {
      hiddenRelation.push(e.name);
      hiddenRelation.push(e.name + "Ids");
      hiddenRelation.push(e.name + "Id");
    }
  });

  state.rws = state.items = response;

  //state.items = response.map((e) => {
  //  e.actions = {};
  // return _.omit(e, hiddenRelation);
  // });

  for await (var item of state.items) {
    for await (var id of props.selected) {
      if (id == item.id) {
        state.selected.push(item);
      }
    }
  }

  state.loading = false;
}

function Save() {
  onDialogOK(state.selected);
}
</script>

<style></style>
