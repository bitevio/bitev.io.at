<template>
  <q-dialog maximized="" position="right">
    <q-card style="min-width: 650px">
      <q-card-actions>
        <q-btn round v-close-popup icon="mdi-close"></q-btn>
        <q-toolbar-title> Export Items </q-toolbar-title>

        <q-space />
        <q-btn @click="exportData" round color="black" icon="mdi-download"></q-btn>
      </q-card-actions>
      <q-separator spaced />
      <q-card-section class="">
        <div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <div>
                <q-select
                  v-model="state.options.format"
                  outlined
                  type="text"
                  :options="['csv', 'xls']"
                  label="Format"
                />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div>
                <q-input
                  mask="##################"
                  v-model.number="state.options.limit"
                  outlined
                  type="text"
                  label="Limit"
                />
              </div>
            </div>
          </div>
          <div class="q-pt-md">
            <q-toggle
              v-model="state.options.timestamp"
              color="green"
              label="Time stamp"
            />
            <q-input
              outlined
              class="mini"
              v-model="state.options.formatTimeStamps"
              type="text"
              label="Format time"
            />
            <q-separator spaced="" />
            <q-card-actions class="text-h6 text-bold"
              >Fields

              <q-space />
            </q-card-actions>
            <q-list separator="">
              <div class="column">
                <div v-for="field of props.model.fields">
                  <div v-if="!field.type.match(/(relationship)/)">
                    <q-checkbox
                      color="blalck"
                      v-model="state.options.headers"
                      :label="field.admin.label || field.name"
                      :val="field.name"
                    />
                  </div>

                  <div v-if="field.type.match(/(relationship)/) && !field.hasMany">
                    <q-expansion-item
                      default-opened
                      style="max-width: 300px"
                      group
                      dense
                      expand-separator
                      :label="field.name"
                    >
                      <q-list>
                        <q-item>
                          <q-item-section side> </q-item-section>
                          <q-item-section>
                            <q-checkbox
                              dense
                              v-for="ff of getFieldOfCollection(field.relationTo)"
                              color="black"
                              v-model="state.options.headers"
                              :label="ff.name"
                              :val="`${field.name}.${ff.name}`"
                            />
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-expansion-item>
                  </div>
                </div>
              </div>
            </q-list>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { reactive } from "vue";
import _ from "lodash";
import moment from "moment";
import dw from "downloadjs";
import { convertArrayToCSV } from "convert-array-to-csv";
import { toExcel } from "to-excel";
import { getOneCollection } from "src/sdk";
const props = defineProps({
  model: {
    type: Object,
    default: {},
  },
  items: {
    type: Array,
    default: [],
  },
});

const state = reactive({
  relationFields: props.model.fields.filter((e) => e.type.match(/(relationship)/)) || [],
  options: {
    headers: [],
    format: "csv",
    timestamp: true,
    formatTimeStamps: "YY-MM-DD HH:mm:ss",
    limit: 100,
    fields: props.model.fields.filter((e) => !e.type.match(/(relationship)/)) || [],
  },
});

state.options.headers = state.options.fields.map((e) => e.name);

function addH(e, opt = "csv") {
  if (state.options.timestamp) {
    if (opt == "csv") {
      e.push("updatedAt");
      e.push("createdAt");
    }

    if (opt == "xls") {
      e.push({
        label: "updatedAt",
        field: "updatedAt",
      });
      e.push({
        label: "createdAt",
        field: "createdAt",
      });
    }
  }

  return e;
}

function getFieldOfCollection(col) {
  var l = getOneCollection(col).fields || [];
  if (l.length) {
    l = l.filter((e) => e.type !== "relationship");
  } else {
  }

  return l;
}

async function exportData() {
  var items = [];
  var data_ = [...props.items];

  var LHeader = state.options.headers;
  if (state.options.timestamp) {
    LHeader.push("createdAt");
    LHeader.push("updatedAt");
  }

  data_ = data_.map((e, index) => {
    var ee = { ...e };
    try {
      if (state.options.timestamp) {
        ee["createdAt"] = moment(e["createdAt"]).format(state.options.formatTimeStamps);
        ee["updatedAt"] = moment(e["updatedAt"]).format(state.options.formatTimeStamps);
      }
    } catch (err) {}

    LHeader.map((lkey) => {
      if (lkey.match(/\./)) {
        var partOne = lkey.split(".")[0];
        var partTwo = lkey.split(".")[1];

        if (e[partOne]) {
          // console.log(e[partOne], lkey);
          ee[lkey] = _.get(e[partOne], partTwo) || null;
        }
      }
    });

    return _.pick(ee, LHeader);
  });

  data_.filter((e, index) => {
    if (index <= state.options.limit) {
      items.push(data_[index]);
    }
  });

  var name = props.model.admin.label || props.model.label || props.model.slug;
  var ext = state.options.format;
  var filename = `${name} ${moment().format("dd:mm:YY:HH:mm")}.${ext}`;

  if (state.options.format == "csv") {
    var headers = state.options.fields.map((e) => e.label);

    var output = convertArrayToCSV(items, {
      headers: addH(headers),
      separator: ";",
    });

    //console.log(output, items);

    dw(output, filename);
  }

  if (state.options.format == "xls") {
    var headers = state.options.fields.map((e) => ({
      label: e.admin.label || e.label || e.name,
      field: e.name,
    }));

    var output = toExcel.exportXLS(addH(headers, "xls"), items, filename);
  }

  //csvGenerator.saveFile("./data.csv");
}
</script>
