<template>
  <q-page padding>
    <q-toolbar class="q-pa-none">
      <q-toolbar-title class="text-bold">
        <q-btn round flat @click="$router.back()" icon="mdi-arrow-left"></q-btn> Edition
        <q-chip class="text-weight-light glossy">
          {{ $route.params?.model }}
        </q-chip>
        <br />
        <q-chip flat class="text-bold q-ml-md bg-lite text-grey" dense>
          {{ $route.query.ref }}
        </q-chip>
      </q-toolbar-title>
      <q-space />
      <div class="q-gutter-md">
        <q-btn flat round @click="deleteOne()" icon="las la-trash"></q-btn>
        <q-btn
          color="red"
          @click="state.sideRight = true"
          round
          unelevated=""
          icon="la la-print"
        ></q-btn>
        <q-btn
          :loading="state.loading"
          color="green"
          round
          @click="register()"
          icon="mdi-check"
        ></q-btn>
      </div>
    </q-toolbar>

    <div id="model" class="q-pt-lg q-mx-lg">
      <div v-if="state.model" class="row q-col-gutter-lg">
        <div class="col-12 col-md-5">
          <div class="q-gutter-md">
            <div v-for="(field, i) of state.model.fields" :key="i">
              <div>
                <q-smart-reactif v-slot="{ active, toggle, close }">
                  <div class="q-py-sm" v-if="field.type == 'map'">
                    <div style="height: 500px; overflow: scroll">
                      <div id="jsonc" v-if="field.type == 'map'">
                        <div class="text-capitalize text-bold">
                          {{ field.admin?.label || field?.label || field.name }}
                        </div>
                        <br />
                        <div
                          style="border: 0.1px solid #ccc"
                          class="row bg-lite q-ma-xs q-col-gutter-xs q-pt-sm"
                        >
                          <div class="col-12 col-md-4">
                            <div class="q-pa-sm">
                              <p>
                                GPS coordinates, latitude and longitude with interactive
                                Maps
                              </p>
                              <JsonEditorVue
                                id="jsoneditor"
                                v-model="state.entry[field.name]"
                                mode="text"
                                :mainMenuBar="false"
                                :navigation-bar="false"
                                :indentation="1"
                                :parser="LosslessJSONParser"
                              />
                            </div>
                          </div>
                          <div class="col-12 col-md-8">
                            <div v-if="store.configs.settings?.mapbox_token">
                              <GoogleMap
                                v-if="
                                  isMap(state.entry[field.name]).lat &&
                                  isMap(state.entry[field.name]).lng
                                "
                                :api-key="store.configs.settings?.mapbox_token"
                                style="width: 100%; height: 350px"
                                :center="{
                                  lat: isMap(state.entry[field.name]).lat,
                                  lng: isMap(state.entry[field.name]).lng,
                                }"
                                :zoom="15"
                              >
                                <Marker
                                  :options="{
                                    position: {
                                      lat: isMap(state.entry[field.name]).lat,
                                      lng: isMap(state.entry[field.name]).lng,
                                    },
                                  }"
                                />
                              </GoogleMap>
                            </div>
                            <div class="flex flex-center" v-else>
                              <div class="q-pa-lg text-center">
                                <span>
                                  <q-icon
                                    color="red"
                                    size="lg"
                                    name="las la-map-marked-alt"
                                  />
                                </span>
                                <div>Please set token mapbox in project settings</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="q-py-sm" v-if="field.type == 'richtext'">
                    <p class="text-bold">
                      {{ field.admin.label || field.label || field.name }}
                    </p>
                    <div :id="field.name + '-editor'"></div>
                  </div>
                  <div v-if="field.type == 'media'">
                    <div class="text-capitalize q-py-sm">
                      {{ field.label || field.name }}
                    </div>
                    <div class="box q-pa-md rounded-borders">
                      <div v-if="!field.hasMany">
                        <q-list>
                          <q-item v-if="state.entry[field.name]">
                            <q-item-section>
                              <q-img
                                dark
                                class="rounded-borders"
                                height="40px"
                                :src="
                                  bitev.assets(state.entry[field.name].filedisk, {
                                    transform: true,
                                    q: 10,
                                  })
                                "
                              >
                                <div class="flex flex-center fit text-white">
                                  <div>
                                    <q-item-label :lines="1">
                                      {{ state.entry[field.name].filename }}
                                    </q-item-label>
                                  </div>
                                </div>
                              </q-img>
                            </q-item-section>
                            <q-item-section side>
                              <q-btn
                                @click="state.entry[field.name] = null"
                                flat
                                round
                                icon="mdi-close"
                              ></q-btn>
                            </q-item-section>
                          </q-item>
                          <q-item class="text-gray text-bold" v-else>
                            No {{ field.name }} selected
                          </q-item>
                        </q-list>
                      </div>
                      <div v-else>
                        <q-list v-if="state.entry[field.name]">
                          <q-item
                            v-for="(file, index) of state.entry[field.name]"
                            :key="index"
                          >
                            <q-item-section>
                              <q-img
                                dark
                                class="rounded-borders"
                                height="40px"
                                :src="
                                  bitev.assets(state.entry[field.name][index].filedisk, {
                                    transform: true,
                                    q: 10,
                                  })
                                "
                              >
                                <div class="flex flex-center fit text-white">
                                  <div>
                                    <q-item-label :lines="1">
                                      {{ state.entry[field.name][index].filename }}
                                    </q-item-label>
                                  </div>
                                </div>
                              </q-img>
                            </q-item-section>
                            <q-item-section side>
                              <q-btn
                                @click="
                                  state.entry[field.name] = state.entry[
                                    field.name
                                  ].filter((e, ii) => {
                                    return index !== ii;
                                  })
                                "
                                flat
                                round
                                icon="mdi-close"
                              ></q-btn>
                            </q-item-section>
                          </q-item>
                          <q-item
                            v-if="!state.entry[field.name].length"
                            class="text-gray text-bold"
                          >
                            No {{ field.name }} selected
                          </q-item>
                        </q-list>
                      </div>
                      <q-separator spaced />
                      <q-btn
                        @click="openLibrary(field)"
                        outline
                        class="bg-moon"
                        flat
                        icon="mdi-plus"
                        :label="`Choose ${field.admin?.label || field.name}`"
                      ></q-btn>
                    </div>
                  </div>
                  <div v-if="field.type.match(/^(computed)$/)">
                    <q-field
                      stack-label=""
                      :label="`${field?.admin?.label || field?.label || field?.name}`"
                      outlined=""
                    >
                      <template #control>
                        <div>
                          {{ state?.entry[field.name] || "" }}
                        </div>
                      </template>
                    </q-field>
                  </div>
                  <div v-if="field.type.match(/^(time)$/)">
                    <q-input
                      :prefix="field.admin?.prefix || ''"
                      :readonly="field.admin.readonly || false"
                      outlined=""
                      type="time"
                      :suffix="field.admin?.suffix || ''"
                      v-model="state.entry[field.name]"
                      stack-label
                      color="secondary"
                      :label="`${field?.admin?.label || field?.label || field?.name}`"
                      :clearable="field.clearable || false"
                    />
                  </div>
                  <div v-if="field.type.match(/(date|datetime-local)/)">
                    <q-input
                      :prefix="field.admin?.prefix || ''"
                      :suffix="field.admin?.suffix || ''"
                      outlined=""
                      :readonly="field.admin.readonly || false"
                      :type="field.type == 'datetime' ? 'date' : field.type"
                      v-model="state.entry[field.name]"
                      stack-label
                      color="secondary"
                      :label="`${field?.admin?.label || field?.label || field?.name}`"
                      :clearable="field.clearable || false"
                    />
                  </div>
                  <div class="q-py-sm" v-if="field.type.match(/^(colour)$/)">
                    <q-smart-reactif v-slot="{ active, toogle }">
                      <q-input
                        v-model="state.entry[field.name]"
                        outlined=""
                        outline
                        label="Default color"
                        class="fit"
                      >
                        <template #prepend>
                          <div>
                            <q-icon
                              :style="`color:${state.entry[field.name] || ''}`"
                              name="mdi-circle"
                            />
                          </div>
                        </template>
                        <template #append>
                          <q-btn flat icon="colorize">
                            <q-popup-proxy
                              cover
                              class="bg-transparent shadow-0"
                              flat
                              transition-show="scale"
                              transition-hide="scale"
                              :model-value="active"
                            >
                              <q-card-actions class="bg-transparent">
                                <q-space />
                                <q-btn
                                  push
                                  fab-mini
                                  color="black"
                                  icon="mdi-close"
                                  v-close-popup
                                />
                              </q-card-actions>
                              <q-color v-model="state.entry[field.name]" />
                            </q-popup-proxy>
                          </q-btn>
                        </template>
                      </q-input>
                      <q-dialog :model-value="active">
                        <q-color dark />
                      </q-dialog>
                    </q-smart-reactif>
                  </div>

                  <div
                    style="max-height: 600px; overflow: scroll"
                    id="jsonc"
                    v-if="field.type == 'json'"
                  >
                    <span class="text-capitalize text-bold">
                      {{ field.admin.label || field.label || field.name }}
                    </span>
                    <JsonEditorVue
                      v-model="state.entry[field.name]"
                      mode="text"
                      :mainMenuBar="true"
                      :indentation="1"
                      :parser="LosslessJSONParser"
                    />
                  </div>
                  <div class="cursor-pointer" v-if="field.type == 'relationship'">
                    <div
                      @click="
                        selectModel(field, {
                          readOnly: field.admin?.readonly || false,
                        })
                      "
                      class="row q-col-gutter-md items-center align-center"
                    >
                      <div class="col-12">
                        <q-field
                          class="no-pointer-events"
                          outlined
                          stack-label
                          color="secondary"
                          :label="`${field?.admin?.label || field?.name}`"
                          :clearable="field.clearable || false"
                        >
                          <template #control>
                            <div>
                              <span
                                v-if="
                                  field.relationType == 'one-to-many' &&
                                  state.entry[field.name]
                                "
                              >
                                {{ state.entry[field.name]?.length || 0 }}
                                Selected
                              </span>
                              <span
                                v-if="
                                  field.relationType.match(
                                    /^(many-to-one|one-to-one)$/
                                  ) && state.entry[field.name]
                                "
                              >
                                {{
                                  state.entry[field.name][
                                    Object.keys(state?.entry[field.name])[1]
                                  ]
                                }}
                              </span>
                              <span v-if="!state.entry[field.name]"> </span>
                            </div>
                          </template>
                          <template v-slot:append>
                            <q-icon name="mdi-menu-down" />
                          </template>
                        </q-field>
                      </div>
                    </div>
                  </div>
                  <q-input
                    v-if="field.type == 'password'"
                    outlined
                    :prefix="field.admin?.prefix || ''"
                    :suffix="field.admin?.suffix || ''"
                    :readonly="field.admin.readonly || false"
                    color="secondary"
                    :label="`${field?.admin?.label || field?.name}`"
                    v-model="state.entry[field.name]"
                    :type="!active ? 'password' : 'text'"
                    :clearable="field.clearable || false"
                  >
                    <template v-slot:append>
                      <q-btn
                        flat
                        @click="toggle"
                        dense
                        :icon="active ? 'mdi-eye' : 'mdi-eye-off'"
                      ></q-btn>
                    </template>
                  </q-input>
                  <q-toggle
                    :readonly="field.admin.readonly || false"
                    v-if="field.type == 'boolean'"
                    outlined
                    v-model="state.entry[field.name]"
                    color="secondary"
                    :label="`${field?.admin?.label || field?.label || field?.name}`"
                  >
                  </q-toggle>
                  <q-input
                    :prefix="field.admin?.prefix || ''"
                    v-if="field.type.match(/^(text|string|textarea|email|search)$/)"
                    outlined
                    :suffix="field.admin?.suffix || ''"
                    :readonly="field.admin.readonly || false"
                    v-model="state.entry[field.name]"
                    color="secondary"
                    :label="`${field?.admin?.label || field?.name}`"
                    :clearable="field.clearable || false"
                    :type="field.type == 'string' ? 'text' : field.type"
                  >
                  </q-input>
                  <q-input
                    v-if="field.type.match(/(number|integer|float)/)"
                    outlined
                    :prefix="field.admin?.prefix || ''"
                    :suffix="field.admin?.suffix || ''"
                    :readonly="field.admin.readonly || false"
                    color="secondary"
                    v-model.number="state.entry[field.name]"
                    :label="`${field?.admin?.label || field?.name}`"
                    :clearable="field.clearable || false"
                    type="number"
                  >
                  </q-input>
                  <q-select
                    :multiple="field.hasMany ? field.hasMany : false"
                    v-if="field.type.match(/(select)/)"
                    outlined
                    :options="field.options || []"
                    color="secondary"
                    v-model.number="state.entry[field.name]"
                    :label="`${field?.admin?.label || field?.name}`"
                    :clearable="field.clearable || false"
                    type="number"
                  >
                  </q-select>
                </q-smart-reactif>
              </div>
            </div>
            <br />
            <q-btn
              :loading="state.loading"
              no-caps
              @click="register()"
              icon="mdi-content-save"
              color="primary"
              label="Enregistrer"
            ></q-btn>
          </div>
          <div v-if="state.error" class="q-pt-lg">
            <div
              style="max-width: 400px"
              class="bg-white text-red q-pa-lg rounded-borders"
            >
              <div>
                {{ state.error }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-7">
          <div v-if="state?.entry?.createdAt && state?.entry?.updatedAt">
            <p class="text-black">
              <b>Last modified</b> <br />
              {{ state.entry.updatedAt }} <br />
              <q-icon name="las la-calendar-alt" /> {{ moment(state.entry.updatedAt) }}
            </p>
            <p class="">
              <b>Created</b> <br />
              {{ state.entry.createdAt }} <br />
              <q-icon name="las la-calendar-alt" /> {{ moment(state.entry.createdAt) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<route lang="yaml">
meta:
  layout: espaceLayout
</route>
<script setup>
import { GoogleMap, Marker } from "vue3-google-map";
import Editor from "@toast-ui/editor";
import Library from "components/utils/modalLibrary.vue";
import JsonEditorVue from "json-editor-vue";
import cleanDepp from "clean-deep";
import select from "components/models/select.vue";
import { reactive, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useSession } from "stores/session";
import { parse, stringify } from "lossless-json";
import { bitev } from "src/sdk";
import { useQuasar } from "quasar";
import cleanDeep from "clean-deep";
import moment from "moment";
import _ from "lodash";
const store = useSession();
const $q = useQuasar();

const LosslessJSONParser = { parse, stringify };
const $router = useRouter();
const $route = useRoute();
const props = defineProps({
  dialog: false,
});
const state = reactive({
  error: null,
  loading: false,
  model: null,
  entry: {},
  item: {},
  editor: {},
  jsonFields: [],
  setFields: [],
  editorFields: [],
  computed: [],
});

watch(
  () => $route.params?.model,
  () => {
    rSync();
  }
);

onMounted(() => {
  rSync();
});

function openLibrary(field) {
  $q.dialog({
    component: Library,
    componentProps: {
      field,
    },
  }).onOk((media) => {
    if (field.hasMany) {
      if (!state.entry[field.name]?.length) state.entry[field.name] = [];
      state.entry[field.name] = [...state.entry[field.name], ...media];
    } else {
      state.entry[field.name] = media[0] || null;
    }

    console.log(state.entry);
  });
}

function selectModel(field, config = { readOnly: false }) {
  if (field.relationType == "one-to-many") {
    var selected = state.entry[field.name] || [];
    selected = selected.map((e) => e?.id || e);
  }

  if (field.relationType == "many-to-one") {
    // config.readOnly = true;
    var selected = [];

    if (state?.entry[field.name]?.id) {
      selected = [state?.entry[field.name]?.id] || [];
    }

    console.log(selected);
  }

  selected = [...new Set(selected)];

  $q.dialog({
    component: select,
    componentProps: {
      field: { ...field },
      selected: selected,
      readOnly: config.readOnly || false,
    },
  }).onOk((data) => {
    if (field.relationType == "one-to-many") {
      state.entry[field.name] = data.map((e) => e.id);
    }

    if (field.relationType == "many-to-one") {
      state.entry[field.name] = data[0] || "";
      state.entry[field.name + "Id"] = data[0]?.id || "";
    }
  });
}

async function register() {
  state.error = null;
  state.loading = true;
  var entry = { ...state.entry };
  var model = { ...state.model };

  var hiddenRelation = [];

  model.fields.map((e) => {
    if (e.type == "relationship") {
      if (e.relationType == "many-to-one") {
        hiddenRelation.push(e.name + "Id");
        // hiddenRelation.push(e.name);
      }
      //hiddenRelation.push(e.name + "Ids");
      // hiddenRelation.push(e.name + "Id");
    }
  });

  //hide Id of entry
  hiddenRelation.push("id");
  state.jsonFields.map((fieldName) => {
    try {
      entry[fieldName] = eval("(" + entry[fieldName] + ")");
    } catch (err) {}
  });

  state.editorFields.map((field) => {
    entry[field.name] = state.editor[field.name].getHTML() || "";
  });

  state.setFields.map((field) => {
    try {
      console.log(field);
      if (field.relationType == "many-to-one") {
        var values = entry[field.name]?.id || null;

        if (values) {
          entry[field.name] = {
            connect: { id: values },
          };
        } else {
          entry[field.name] = {
            disconnect: true,
          };
        }
      }

      if (field.relationType == "one-to-many") {
        var values = entry[field.name].map((e) => ({
          id: e?.id || e,
        }));

        if (values.length) {
          entry[field.name] = {
            set: values,
          };
        } else {
          entry[field.name] = {
            set: [],
          };
        }
      }
    } catch (err) {
      console.log(err);
    }
  });

  //entry = cleanDeep(entry);

  entry = _.omit(entry, hiddenRelation);
  entry = _.omit(entry, state.computed);

  var response = await bitev
    .updateOne(
      state.model.slug,
      {
        where: {
          id: $route.query.ref,
        },
        data: entry,
      },
      {
        cleanParams: false,
      }
    )
    .catch((err) => {
      state.error = err;
      return null;
    })
    .then((e) => e);

  if (response) {
    state.entry = {
      ...state.entry,
      ...response,
    };
    $q.notify({
      type: "positive",
      message: "Saved it",
    });
    //$router.push(`/espace/collections/${$route.params?.model}`);
  }

  state.loading = false;
}

function rSync() {
  var model = {
    fields: [],
  };
  model = store.configs.collections.filter(
    (col) => col.slug.toLowerCase() == $route.params.model.toLocaleLowerCase()
  )[0];

  model.fields?.map((field) => {
    if (field.type == "computed") {
      state.computed.push(field.name);
    }
    if (field.type == "richtext") {
      state.editorFields.push(field);
      addEditor(field);
    }
    if (field.type.match(/(json|map)/)) {
      state.jsonFields.push(field.name);
    }

    if (field.type == "map") {
      state.entry[field.name] = {
        lat: null,
        lng: null,
      };
    }
    if (field.type == "relationship") {
      if (field.relationType == "one-to-many") {
        state.entry[field.name] = [];
        state.setFields.push(field);
      }
      if (field.relationType == "many-to-one") {
        state.entry[field.name] = null;
        state.setFields.push(field);
      }
    }

    if (field.type.match(/(string|boolean|datetime|number|password|select|texarea)/)) {
      state.entry[field.name] = field?.defaultValue ?? null;
    }
    if (field.type.match(/(boolean)/)) {
      if (field?.defaultValue == "true" || field?.defaultValue == true) {
        state.entry[field.name] = true;
      }

      if (
        field?.defaultValue == "false" ||
        field?.defaultValue == false ||
        !field?.defaultValue
      ) {
        state.entry[field.name] = false;
      }
    }
  });
  state.model = model;
  getEntry(model);
}

async function getEntry(model) {
  $q.loading.show({
    message: "Loading data ....",
  });

  var include = {};
  model.fields.map((e) => {
    if (e.type == "relationship") {
      include[e.name] = true;
    }
  });

  var item = await bitev
    .findOne(state.model.slug, {
      where: {
        id: $route.query.ref || "-",
      },
      include: include,
    })
    .then((e) => e)
    .catch((err) => null);

  if (item) {
    state.editorFields.map((field) => {
      state.editor[field.name] = new Editor({
        el: document.querySelector(`#${field.name}-editor`),
        height: "500px",
        initialValue: item[field.name] || "",
        initialEditType: "wysiwyg",
        previewStyle: "tab",
      });
      // state.editor[field.name].setHTML("mm");
    });

    state.entry = {
      ...state.entry,
      ...item,
    };
  }

  $q.loading.hide();
}

function deleteOne() {
  $q.dialog({
    title: "Action",
    message: "Do you want to delete this entry",
    ok: {
      color: "negative",
      label: "Delete",
    },
  }).onOk(async () => {
    $q.loading.show();
    await bitev
      .deleteOne(state.model.slug, {
        where: {
          id: $route.query.ref,
        },
      })
      .then((e) => {
        $router.replace("/espace/collections/" + state.model.slug);
      })
      .catch(() => {
        $q.notify({
          type: "negative",
          message: "Unauthorized",
        });
      });

    $q.loading.hide();
  });
}

function addEditor(field) {
  setTimeout(() => {
    state.editor[field.name] = new Editor({
      el: document.querySelector(`#${field.name}-editor`),
      height: "500px",

      initialEditType: "wysiwyg",
      previewStyle: "tab",
    });
  }, 200);
}

function isMap(cc) {
  try {
    cc = JSON.parse(cc);
  } catch (err) {
    cc = null;
  }

  if (!cc) return false;
  return cc;
}
</script>
