<template>
  <q-dialog class="bg-dark" transition-hide="fade" ref="dialogRef">
    <q-card dark style="min-width: 35vw; border-radius: 1%">
      <q-card-actions class="bg-grey-10">
        <q-toolbar-title class="text-bold" shrink>
          Field type
          <br />
          <q-chip color="blue-grey-10" dark class="text-caption text-bold">
            {{ props.collection?.slug }}
          </q-chip>
        </q-toolbar-title>

        <q-space />
        <q-btn v-close-popup flat round icon="mdi-close"></q-btn>
      </q-card-actions>
      <q-card-section style="height: 70vh" class="scroll">
        <Form
          ref="ctrl"
          :initialValues="{
            name: state.field.name,
            type: state.field.type,
            foreignkey: state.field?.relationSideName,
            relationTo: state.field?.relationTo,
          }"
          v-slot="{ validate }"
        >
          <p>
            <span class=""> Add new field </span>
          </p>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <Field
                name="name"
                :validateOnChange="true"
                :rules="{
                  required: true,
                  min: 2,
                  not_one_of: !props.field ? state.excludeName : null,
                }"
                v-slot="{ field, errors }"
              >
                <q-input
                  v-bind="field"
                  outlined=""
                  :error="errors.length ? true : false"
                  :error-message="errors[0]"
                  stack-label
                  dark
                  :disable="props?.field?.name ? true : false"
                  autocomplete="off"
                  color="white"
                  v-model="state.field.name"
                  label="*Name"
                  placeholder="name"
                  hint="No space is allowed for the name of the attribute"
                ></q-input>
              </Field>
            </div>
            <div class="col-12 col-md-6">
              <q-input
                outlined=""
                color="white"
                dark
                v-model="state.field.admin.label"
                stack-label
                label="Label"
              ></q-input>
            </div>
          </div>
          <br />
          <br />
          <q-smart-reactif v-slot="{ active, toggle, close }">
            <div class="cursor-pointer" @click="props?.field?.name ? '' : toggle()">
              <q-select
                class="no-pointer-events"
                dark
                color="green"
                outlined=""
                borderless=""
                popup-content-class="text-bold smart rounded-borders"
                stack-label
                v-model="state.field.type"
                label="Field Type"
                :options="state.types"
              >
                <template #prepend>
                  <div class="text-bold">
                    <q-chip
                      dark
                      square=""
                      color="red"
                      v-if="state.field.type.match(/(colour)/)"
                    >
                      <q-icon color="white" name="las la-fill-drip" />
                    </q-chip>
                    <q-radio
                      readonly
                      :model-value="true"
                      :val="true"
                      dark
                      color="green"
                      v-if="state.field.type.match(/(boolean)/)"
                    ></q-radio>
                    <q-chip
                      dark
                      color="blue-grey-8"
                      square=""
                      v-if="state.field.type.match(/(relationship)/)"
                    >
                      <q-icon name="las la-link"> </q-icon>
                    </q-chip>
                    <q-chip
                      color="blue"
                      dark
                      square=""
                      v-if="state.field.type.match(/(planning)/)"
                    >
                      <q-icon dark name="las la-calendar"> </q-icon>
                    </q-chip>
                    <q-chip
                      color="orange"
                      square=""
                      v-if="state.field.type.match(/(select)/)"
                    >
                      <q-icon name="las la-bars"> </q-icon>
                    </q-chip>
                    <q-chip
                      square=""
                      dark
                      outline
                      v-if="state.field.type.match(/(date)/)"
                    >
                      <q-icon color="white" name="las la-calendar-alt"> </q-icon>
                    </q-chip>
                    <q-chip
                      square=""
                      dark
                      outline
                      v-if="state.field.type.match(/(computed)/)"
                    >
                      <q-icon color="white" name="las la-hashtag"> </q-icon>
                    </q-chip>
                    <q-chip
                      square=""
                      dark
                      outline
                      v-if="state.field.type.match(/^(time)$/)"
                    >
                      <q-icon color="white" name="las la-clock"> </q-icon>
                    </q-chip>
                    <q-chip
                      color="black"
                      square=""
                      dark
                      v-if="state.field.type.match(/(password)/)"
                    >
                      <q-icon name="las la-lock"> </q-icon>
                    </q-chip>
                    <q-chip
                      color="indigo"
                      square=""
                      dark
                      v-if="state.field.type.match(/(media|file)/)"
                    >
                      <q-icon name="las la-photo-video"> </q-icon>
                    </q-chip>
                    <q-chip
                      square=""
                      v-if="state.field.type.match(/^(string|text|textarea)$/)"
                      >AB</q-chip
                    >
                    <q-chip
                      dark
                      color="black"
                      square=""
                      v-if="state.field.type.match(/^(richtext)$/)"
                    >
                      <q-icon color="white" name="las la-keyboard" /> &nbsp; ABC</q-chip
                    >
                    <q-chip
                      dark
                      square=""
                      color="blue-5"
                      v-if="state.field.type.match(/(json)/)"
                      >{...}</q-chip
                    >
                    <q-chip
                      dark
                      square=""
                      color="red"
                      v-if="state.field.type.match(/(map)/)"
                    >
                      <q-icon color="white" name="mdi-map-marker" />
                    </q-chip>
                    <q-chip
                      dense
                      class="text-bold"
                      dark
                      square=""
                      color="red"
                      v-if="state.field.type.match(/(number|interger|float)/)"
                      >123</q-chip
                    >
                  </div>
                </template>
              </q-select>
            </div>
            <q-dialog @hide="close()" :model-value="active">
              <q-card>
                <q-card-actions>
                  <q-toolbar-title shrink> Field type </q-toolbar-title>
                  <q-space />
                  <q-btn flat icon="mdi-close" v-close-popup></q-btn>
                </q-card-actions>
                <q-card-section style="max-height: 45vh; min-width: 300px" class="scroll">
                  <div class="column">
                    <q-radio
                      @update:model-value="() => toggle()"
                      v-model="state.field.type"
                      v-for="type of state.types"
                      :val="type"
                      :label="type"
                    ></q-radio>
                  </div>
                </q-card-section>
                <q-card-actions> </q-card-actions>
              </q-card>
            </q-dialog>
          </q-smart-reactif>
          <div class="" v-if="state.field.type == 'planning'">
            <div class="row q-pt-md q-col-gutter-sm">
              <div class="col-6">
                <q-select
                  dark
                  outlined=""
                  emit-value=""
                  map-options=""
                  color="blue"
                  v-model="state.field.eventStartField"
                  :options="state.dateNames"
                  :option-label="(rw) => rw.admin?.label || rw?.name"
                  option-value="name"
                  type="text"
                  label="Start Field name"
                />
              </div>
              <div class="col-6">
                <q-select
                  dark
                  map-options=""
                  outlined=""
                  color="blue"
                  v-model="state.field.eventEndField"
                  :options="state.dateNames"
                  :option-label="(rw) => rw.admin?.label || rw?.name"
                  option-value="name"
                  emit-value=""
                  type="text"
                  label="Start Field name"
                />
              </div>
            </div>
            <div class="q-pt-md">
              <q-smart-reactif v-slot="{ active, toggle, close }">
                <div class="row q-col-gutter-sm">
                  <div class="col-12 col-md-6">
                    <div
                      @click="props?.field?.name ? '' : toggle()"
                      class="cursor-pointer"
                    >
                      <q-select
                        color="blue"
                        option-label="slug"
                        class="no-pointer-events"
                        behavior="dialog"
                        popup-content-class="smart"
                        dark
                        v-model="state.field.eventsRef"
                        outlined=""
                        :options="state.collections"
                        label="Events Collection"
                      >
                        <template #prepend>
                          <q-icon name="la la-plug" />
                        </template>
                      </q-select>
                    </div>
                  </div>
                </div>
                <q-dialog @hide="close()" :model-value="active">
                  <q-card>
                    <q-card-section>
                      <div class="column">
                        <q-radio
                          @update:model-value="() => toggle()"
                          v-model="state.field.eventsRef"
                          v-for="type of state.collections"
                          :val="type.slug"
                          :label="type.slug"
                        ></q-radio>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-dialog>
              </q-smart-reactif>
            </div>
          </div>

          <div class="q-py-md" v-if="state.field.type == 'relationship'">
            <q-select
              color="green"
              :disable="props?.field?.name ? true : false"
              dark
              v-model="state.field.relationType"
              :options="state.relationType"
              label="Relation type"
              outlined=""
            >
              <template #prepend>
                <q-icon name="la la-list" />
              </template>
            </q-select>
          </div>
          <div class="q-pt-sm" v-if="state.field.type == 'relationship'">
            <div>
              <q-smart-reactif v-slot="{ active, toggle, close }">
                <div class="row q-col-gutter-sm">
                  <div class="col-12 col-md-6">
                    <div
                      @click="props?.field?.name ? '' : toggle()"
                      class="cursor-pointer"
                    >
                      <Field
                        name="relationTo"
                        rules="required"
                        v-slot="{ errors, field }"
                      >
                        <q-select
                          color="green"
                          option-label="slug"
                          class="no-pointer-events"
                          v-bind="field"
                          :error="errors.length ? true : false"
                          behavior="dialog"
                          popup-content-class="smart"
                          dark
                          v-model="state.field.relationTo"
                          outlined=""
                          :options="state.collections"
                          label="Relation to"
                        >
                          <template #prepend>
                            <q-icon name="la la-plug" />
                          </template>
                        </q-select>
                      </Field>
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <field
                      name="foreignkey"
                      :rules="{
                        required: true,
                        not_one_of: state?.excludeForeignName || null,
                      }"
                      v-slot="{ errors, field }"
                      validateOnInput
                    >
                      <q-input
                        dark
                        :disable="props.field ? true : false"
                        color="white"
                        :error-message="errors[0]"
                        v-bind="field"
                        :error="errors.length ? true : false"
                        outlined=""
                        stack-label
                        v-model="state.field.relationSideName"
                        label="Foreign key name"
                        clearable=""
                      ></q-input>
                    </field>
                  </div>
                </div>
                <q-dialog @hide="close()" :model-value="active">
                  <q-card>
                    <q-card-section>
                      <div class="column">
                        <q-radio
                          @update:model-value="
                            () => {
                              toggle();
                              validateOn(validate);
                            }
                          "
                          v-model="state.field.relationTo"
                          v-for="type of state.collections"
                          :val="type.slug"
                          :label="type.slug"
                        ></q-radio>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-dialog>
              </q-smart-reactif>
            </div>

            <div
              v-if="
                state.field?.relationType == 'one-to-one' &&
                state.field?.relationTo &&
                state.field.relationSideName &&
                !state.field.onSideRelation
              "
              class="q-pt-md q-py-md"
            >
              * Note : You can't create

              <b class="text-secondary">{{ singularize(state?.field?.relationTo) }}</b>

              without connecting
              <b class="text-brown">{{
                singularize(
                  state?.field?.relationSideName || state.field.selfName
                )?.replace("_", " ")
              }}</b>
            </div>
            <div class="q-py-md" v-if="state.field.type.match(/(relationship|json)/)">
              <q-input
                dark
                outlined
                color="white"
                hint="Use ${item} to show content"
                stack-label=""
                v-model="state.field.admin.displayTemplate"
                type="textarea"
                label="Display Template Interface"
              />
            </div>
          </div>
          <div v-if="state.field.type.match(/(media|select)/)" class="q-pt-md">
            <q-checkbox
              dark
              color="indigo"
              v-model="state.field.hasMany"
              :label="`Has many ${state.field.type == 'select' ? '' : 'medias'}`"
            />
          </div>

          <q-card
            class="text-black q-mt-sm"
            v-if="state.field.type.match(/(select|enum)/)"
          >
            <q-card-section>
              <div>
                <q-select
                  color="primary"
                  outlined=""
                  v-model="state.field.defaultValue"
                  :options="state.field.options"
                  label="Default Value"
                />
              </div>
              <div class="text-h6 q-pt-md text-bold">Choices</div>
              <div class="q-py-xs bg-lite rounded-borders">
                <q-list dense class="rounded-borders" separator="">
                  <q-item v-for="cc of state.field.options">
                    <q-item-section>
                      {{ cc }}
                    </q-item-section>
                    <q-item-section avatar>
                      <q-btn
                        @click="
                          state.field.options = state.field.options.filter(
                            (e) => e !== cc
                          )
                        "
                        flat
                        dense
                        round
                        fab
                        icon="mdi-close"
                      ></q-btn>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>

              <div class="q-pt-sm">
                <q-btn
                  @click="createOption()"
                  icon="mdi-plus"
                  dark
                  text-color="white"
                  outline
                  flat
                  class="bg-black rounded-borders"
                  no-caps
                  label="Create new"
                >
                </q-btn>
              </div>
            </q-card-section>
          </q-card>
          <div class="q-py-sm" v-if="state.field.type.match(/^(colour)$/)">
            <q-smart-reactif v-slot="{ active, toogle }">
              <q-input
                v-model="state.field.defaultValue"
                color="white"
                dark
                outlined=""
                outline
                label="Default color"
                class="fit"
              >
                <template #append>
                  <q-btn flat icon="colorize">
                    <q-popup-proxy
                      cover
                      class="bg-transparent"
                      flat
                      transition-show="scale"
                      transition-hide="scale"
                      :model-value="active"
                    >
                      <q-card-actions class="bg-transparent">
                        <q-space />
                        <q-btn
                          class="text-black"
                          color="white"
                          icon="mdi-close"
                          v-close-popup
                        />
                      </q-card-actions>
                      <q-color v-model="state.field.defaultValue" />
                    </q-popup-proxy>
                  </q-btn>
                </template>
              </q-input>
              <q-dialog :model-value="active">
                <q-color dark />
              </q-dialog>
            </q-smart-reactif>
          </div>
          <div class="q-pt-md">
            <q-input
              v-if="state.field.type.match(/(number|float|integer)/)"
              dark
              color="white"
              outlined=""
              stack-label
              v-model.number="state.field.defaultValue"
              label="Default Value"
            ></q-input>
            <q-select
              dark
              color="green"
              outlined=""
              label="Default Value"
              v-model="state.field.defaultValue"
              :options="['true', 'false', 'null']"
              v-if="state.field?.type?.match(/(boolean)/)"
            ></q-select>
            <q-input
              v-if="state.field.type.match(/(map)/)"
              dark
              color="white"
              outlined=""
              stack-label
              v-model="state.field.admin.mapLabel"
              label="Map label"
            ></q-input>

            <div class="q-gutter-md" v-if="state.field.type.match(/(computed)/)">
              <q-toggle
                dark
                color="green"
                v-model="state.field.computedFx.active"
                label="computed Fx"
              />
              <q-smart-select
                multiple=""
                key="name"
                :dialog="{
                  fullWidth: false,
                }"
                :card="{
                  style: 'max-width:300px',
                }"
                :selected="state.field.computedFx.needs"
                @onChange="(data) => (state.field.computedFx.needs = data)"
                v-model="state.field.computedFx.needs"
                :options="state.needs"
                label="Field Needs"
                option-label="name"
                option-value="name"
                stack-label
                outlined=""
                dark
                color="white"
              />
              <q-input
                dark
                color="white"
                outlined=""
                class="bg-black text-bold"
                stack-label
                type="textarea"
                v-model="state.field.computedFx.fx"
                label="Computed Fx (JS)"
                placeholder="return item.id"
              ></q-input>
            </div>

            <q-input
              v-if="state.field.type.match(/(string|textarea)/)"
              dark
              color="white"
              outlined=""
              stack-label
              v-model="state.field.defaultValue"
              label="Default Value"
            ></q-input>
            <q-input
              v-if="state.field.type.match(/(date)/)"
              dark
              color="white"
              outlined=""
              stack-label
              :type="state.field.type == 'datetime' ? 'date' : state.field.type"
              v-model="state.field.defaultValue"
              label="Default Value"
            ></q-input>
            <q-input
              v-if="state.field.type.match(/^(time)$/)"
              dark
              color="white"
              outlined=""
              stack-label
              type="time"
              v-model="state.field.defaultValue"
              label="Default Value"
            ></q-input>
          </div>
          <br />
          <q-tabs
            dense
            active-color=""
            active-class="bg-white  text-black text-bold"
            class="text-bold rounded-borders overflow-hidden"
            v-model="state.tab"
          >
            <q-tab :name="0" label="Basic settings"></q-tab>
            <q-tab :name="1" label="Advanced settings"></q-tab>
            <q-tab :name="2" label="Admin UI"></q-tab>
          </q-tabs>

          <q-tab-panels class="text-black rounded-borders q-mt-md" v-model="state.tab">
            <q-tab-panel :name="0">
              <div class="row">
                <div class="col-12 col-md-6">
                  <div class="column">
                    <q-checkbox
                      v-if="!state.field.onSideRelation"
                      color="primary"
                      label="Unique field"
                      :disable="state.field.hasMany ? true : false"
                      v-model="state.field.unique"
                    />
                    <q-checkbox
                      v-if="!state.field.onSideRelation"
                      label="Required field"
                      v-model="state.field.required"
                      color="primary"
                    />
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="column">
                    <q-checkbox
                      label="Private field"
                      v-model="state.field.private"
                      :disable="state.field.type == 'relationship' ? true : false"
                      color="primary"
                    />
                    <span class="text-caption">
                      This field will not show up in the API response
                    </span>
                  </div>
                </div>
              </div>
            </q-tab-panel>
            <q-tab-panel :name="1">
              <div class="row q-col-gutter-md justify-center">
                <div class="col-12 col-md-6"></div>
                <div class="col-12 col-md-6"></div>
              </div>
            </q-tab-panel>
            <q-tab-panel :name="2">
              <div class="row q-col-gutter-md justify-center">
                <div class="col-12 col-md-6">
                  <div class="text-bold">Read Only</div>
                  <q-toggle
                    v-model="state.field.admin.readonly"
                    label="Disable editing value"
                    color="black"
                  />
                </div>
                <div class="col-12 col-md-6"></div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </Form>
      </q-card-section>
      <q-separator spaced />
      <q-card-actions class="bg-grey-10">
        <q-btn flat="" v-close-popup label="Cancel" no-caps=""></q-btn>
        <q-space />

        <q-btn @click="goTo()" color="green" label="Continue" no-caps=""></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { reactive, ref, watch } from "vue";
import pluralize from "pluralize";
import _ from "lodash";
import slugify from "slugify";
import { useSession } from "stores/session";
import { foreignKey, singularize } from "inflection";
import { useQuasar } from "quasar";
import { getOneCollection } from "src/sdk";

import { useDialogPluginComponent } from "quasar";

const { dialogRef, onDialogOK } = useDialogPluginComponent();
const ctrl = ref(null);
const $store = useSession();

const $q = useQuasar();
const props = defineProps({
  field: {
    type: Object,
    default: {},
  },
  collection: {
    type: Object,
    default: {},
  },
});

const state = reactive({
  excludeName: [],
  excludeForeignName: [],
  needs: [],
  relationType: ["one-to-many", "one-to-one", "many-to-many", "many-to-one"],
  types: [
    "boolean",
    "colour",
    "computed",
    "date",
    "datetime-local",
    "json",
    "string",
    "map",
    "media",
    "number",
    "password",
    "planning",
    "relationship",
    "richtext",
    "select",
    "textarea",
    "time",
  ],
  collections: $store.collections.filter((e) => e.slug !== props.collection.slug),
  dateNames: [],
  tab: 0,
  field: {
    name: "",
    type: "string",
    options: [],
    relationTo: "",
    eventsRef: "",
    eventStartField: "",
    eventEndField: "",
    linked: true,
    unique: false,
    required: false,
    defaultValue: null,
    hasMany: false,
    relationType: "one-to-many",
    onSideRelation: false,
    private: false,
    relationSideName: "",
    computedFx: {
      active: true,
      fx: null,
      needs: [],
    },
    admin: {
      displayTemplate: "${item.id}",
      mapLabel: "",
      label: "",
      readonly: false,
      hidden: false,
      suffix: null,
      prefix: null,
    },
  },
});

if (props.field?.name) {
  state.field = _.merge(state.field, props.field);

  //{ ...state.field, ...props.field };
}

//console.log(state.field);

if (props.collection) {
  state.needs = props.collection?.fields.map((e) => e) || [];

  try {
    state.excludeName = props.collection.fields.map((field) => field.name);
    state.dateNames = props.collection.fields.filter((field) => field.type.match(/date/));
  } catch (errr) {}
}

watch(
  () => state.field.hasMany,
  (val) => {
    if (val) {
      state.field.unique = false;
    }
  }
);

watch(
  () => state.field.type,
  (val) => {
    if (val == "relationship") state.field.private = false;
  }
);

watch(
  () => state.field.name,
  (val) => {
    if (val == "client") {
      $q.notify({
        position: "top-right",
        classes: "bg-white text-black",
        message: "Client is reserved word",
      });
      state.field.name = "";
    }
  }
);

watch(
  () => [state.field.relationType, state.field.relationTo],
  (val) => {
    state.field.relationSideName = val[0].match(/(many)/)
      ? pluralize(props.collection?.slug)
      : singularize(props.collection?.slug);

    if (val[0] == "one-to-many") {
      state.field.relationSideName = singularize(props.collection?.slug);
    }

    if (val[0] == "many-to-many") state.field.hasMany = true;
    if (val[0] == "one-to-many") state.field.hasMany = true;
    if (val[0] == "one-to-one") state.field.hasMany = false;
    if (val[0] == "many-to-one") state.field.hasMany = false;
    excludeForeign();
    validateOn();
  }
);

watch(
  () => state.field.relationSideName,
  () => {
    excludeForeign();
  }
);

function excludeForeign() {
  state.excludeForeignName = [];
  var col = getOneCollection(state.field.relationTo);

  col.fields?.map((f) => {
    if (f.name == state.field.relationSideName) {
      state.excludeForeignName.push(f.name);
      state.field.relationSideName =
        state.field.relationSideName + "_" + state.field.name;
    }
  });
}

watch(
  () => state.field.type,
  (val) => {
    state.field.private = false;
    if (state.field.type == "password") {
      state.field.private = true;
    }

    if (state.field.type !== "select") {
      state.field.options = [];
      state.field.defaultValue = null;
    }

    if (state.field.type.match(/(number|float|integer)/)) {
      return (state.field.defaultValue = null);
    }

    if (state.field.type.match(/(boolean)/)) {
      return (state.field.defaultValue = null);
    }

    state.field.defaultValue = null;
  }
);

watch(
  () => state.field.name,
  (val) => {
    state.field.admin.label = _.capitalize(val).replace("_", " ");
  }
);

watch(
  () => state.field.name,
  (val) => {
    setSlug();
  }
);

watch(
  // Controle realtionship;
  () => [state.field.type, state.field.relationTo],
  (cf) => {
    var type = cf[0] || "";
    var relationTo = cf[1] || null;

    if (type == "relationship" && relationTo) {
      // console.log(cf);
    }
  }
);

function formatRelation() {}

function validateOn(e) {
  setTimeout(() => {
    ctrl.value.validate();
  }, 300);
}

function setSlug() {
  state.field.name = slugify(state.field.name).toLocaleLowerCase().replace(".", "");
}

async function goTo() {
  ctrl.value.validate().then((e) => {
    if (e.valid) {
      if (props.field?.name) {
        onDialogOK({
          action: "update",
          data: state.field,
        });
      } else {
        onDialogOK({
          action: "add",
          data: state.field,
        });
      }
    }
  });
}
function highlighter(code) {
  return highlight(code, languages.js); // languages.<insert language> to return html with markup
}

function createOption() {
  $q.dialog({
    title: "New choice",
    prompt: {
      model: "",
      type: "text",
      placeholder: "Enter value",
    },
  }).onOk((value) => {
    state.field.options.push(value);
  });
}
</script>
