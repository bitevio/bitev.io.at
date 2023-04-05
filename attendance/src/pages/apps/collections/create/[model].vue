<template>
  <q-page padding>
    <q-toolbar class="q-pa-none">
      <q-btn round flat @click="$router.back()" icon="mdi-arrow-left"></q-btn>
      <q-toolbar-title class="text-bold">
        Création
        <q-chip class="glossy text-weight-light">
          {{ $route.params?.model }}
        </q-chip>
      </q-toolbar-title>
      <q-space />
      <div class="q-gutter-sm">
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
        <div class="col-12 col-sm-8 col-md-6">
          <div class="q-gutter-md">
            <div v-for="(field, i) of state.model.fields" :key="i">
              <div>
                <q-smart-reactif v-slot="{ active, toggle, close }">
                  <div v-if="field.type == 'planning'">
                    <q-btn
                      @click="openCalendarPlanning(field)"
                      outline
                      icon="mdi-calendar"
                      :label="field.admin.label || field.label || field.name"
                    ></q-btn>
                  </div>

                  <div class="q-py-sm" v-if="field.type == 'map'">
                    <div style="height: 500px; overflow: scroll">
                      <div id="jsonc" v-if="field.type == 'map'">
                        <div class="text-capitalize text-bold">
                          {{ field.admin.label || field.label || field.name }}
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
                    <div class="text-capitalize q-py-md">
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
                      <q-separator spaced />
                      <q-btn
                        @click="openLibrary(field)"
                        outline
                        class="bg-moon"
                        flat
                        icon="mdi-plus"
                        :label="`Choose ${field.label || field.name}`"
                      ></q-btn>
                    </div>
                  </div>
                  <div v-if="field.type.match(/(date|datetime-local)/)">
                    <q-input
                      :prefix="field.admin?.prefix || ''"
                      :readonly="field.admin.readonly || false"
                      outlined=""
                      :type="field.type == 'datetime' ? 'date' : field.type"
                      :suffix="field.admin?.suffix || ''"
                      v-model="state.entry[field.name]"
                      stack-label
                      color="secondary"
                      :label="`${field?.admin?.label || field?.label || field?.name}`"
                      :clearable="field.clearable || false"
                    />
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
                      @click="selectModel(field)"
                      class="row q-col-gutter-md items-center align-center"
                    >
                      <div class="col-12">
                        <q-field
                          class="no-pointer-events"
                          outlined
                          stack-label
                          color="secondary"
                          :label="`${field?.label || field?.name}`"
                          :clearable="field.clearable || false"
                        >
                          <template #control>
                            <div>
                              <span v-if="field.relationType == 'one-to-many'">
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
                                    Object.keys(state.entry[field.name])[1]
                                  ]
                                }}
                              </span>

                              <span v-if="!state.entry[field.name]"> 0 Selected </span>
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
                    :prefix="field.admin?.prefix || ''"
                    :readonly="field.admin.readonly || false"
                    v-if="field.type == 'password'"
                    outlined
                    :suffix="field.admin?.suffix || ''"
                    color="secondary"
                    :label="`${field?.label || field?.name}`"
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
                    :label="`${field?.label || field?.name}`"
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

                  <q-input
                    :prefix="field.admin?.prefix || ''"
                    :readonly="field.admin.readonly || false"
                    v-if="field.type.match(/(number|integer|float)/)"
                    outlined
                    :suffix="field.admin?.suffix || ''"
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
              no-caps
              :loading="state.loading || false"
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
        <div class="col-12 col-md-7"></div>
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
import cleanDepp from "clean-deep";
import JsonEditorVue from "json-editor-vue";
import select from "components/models/select.vue";
import { reactive, onMounted, watch } from "vue";
import { parse, stringify } from "lossless-json";
import { useRouter, useRoute } from "vue-router";
import { useSession } from "stores/session";
import { bitev } from "src/sdk";
import { useQuasar } from "quasar";
import cleanDeep from "clean-deep";
import CalendarCmp from "components/utils/openCalendar.vue";
import _ from "lodash";

const store = useSession();
const $q = useQuasar();
const LosslessJSONParser = { parse, stringify };
const $router = useRouter();
const $route = useRoute();
const state = reactive({
  error: null,
  loading: false,
  model: null,
  editor: {},
  entry: {},
  jsonFields: [],
  setFields: [],
  computed: [],
  editorFields: [],
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

function openCalendarPlanning(field) {
  $q.dialog({
    component: CalendarCmp,
    componentProps: {
      entry: { ...state.entry },
      field: { ...field },
    },
  });
}

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
  });
}

function selectModel(field, config = { readOnly: false }) {
  if (field.relationType == "one-to-many") {
    var selected = state.entry[field.name] || [];
  }

  if (field.relationType == "many-to-one") {
    var selected = [state.entry[field.name]?.id] || null;
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
      state.entry[field.name] = data[0];
    }
  });
}

async function register() {
  state.error = null;
  state.loading = true;
  var entry = { ...state.entry };
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
      if (field.relationType == "many-to-one") {
        var values = entry[field.name]?.id || null;
        entry[field.name] = {
          connect: { id: values },
        };
      }

      if (field.relationType == "one-to-many") {
        var values = entry[field.name].map((e) => ({
          id: e?.id || e,
        }));
        entry[field.name] = {
          connect: values,
        };
      }
    } catch (err) {
      console.log(err);
    }
  });

  entry = _.omit(entry, state.computed);

  var response = await bitev
    .createOne(state.model.slug, {
      data: entry,
    })
    .catch((err) => {
      state.error = err;
      return null;
    })
    .then((e) => e);

  if (response) {
    $q.notify({
      type: "positive",
      message: "Saved it",
    });
    $router.push(`/apps/collections/${$route.params?.model}`);
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

    if (
      field.type.match(/(string|boolean|datetime|number|password|select|texarea|colour)/)
    ) {
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
