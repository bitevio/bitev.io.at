<template>
  <q-dialog
    ref="dialogRef"
    maximized=""
    transition-show="slide-left"
    :full-width="true"
    position="right"
  >
    <q-card
      :style="{
        minWidth: $q.screen.gt.sm ? '42vw' : '70vw',
      }"
    >
      <q-card-actions>
        <q-toolbar class="">
          <q-btn flat round v-close-popup icon="mdi-close"></q-btn>
          <q-toolbar-title shrink>
            Create Insight view
            <br />
            <span class="text-caption text-grey"> {{ state.entry?.view?.key }}</span>
          </q-toolbar-title>

          <q-space />
          <div class="q-gutter-md">
            <q-btn
              :loading="state.loading"
              @click="saveConfig()"
              round
              :disable="state.canSave"
              color="green"
              icon="mdi-check"
            ></q-btn>
          </div>
        </q-toolbar>
      </q-card-actions>
      <q-card-section style="height: 92vh" class="scroll">
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <div v-if="state.entry.view" class="q-gutter-md">
              <div>
                <p>
                  <q-toggle
                    :label="state.entry.view.active ? 'Active' : 'Inactive'"
                    v-model="state.entry.view.active"
                    color="green"
                  />
                </p>
                <p>
                  <q-input
                    outlined
                    stack-label=""
                    v-model="state.entry.view.name"
                    type="text"
                    placeholder="Ex: Sales per month"
                    label="View name"
                  />
                </p>
                <q-separator spaced />
                <p class="text-bold text-h6">Type</p>
                <q-list>
                  <q-item
                    class="bg-lite q-ma-sm rounded-borders"
                    v-for="type of state.types"
                  >
                    <q-item-section side>
                      <q-icon :name="type.icon" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label label="text-bold text-capitalize">
                        {{ type.name }}
                      </q-item-label>
                      <q-item-label caption="">
                        {{ type.description }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-radio
                        color="green"
                        v-model="state.entry.view.type"
                        :val="type.name"
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>

              <div v-if="state.entry.view.type == 'label'">
                <div>
                  <q-input
                    v-model="state.entry.view.labelView.label"
                    type="text"
                    label="Label or Title"
                  />
                  <q-input
                    v-model="state.entry.view.labelView.description"
                    type="textarea"
                    label="Description"
                  />
                </div>
              </div>
              <div v-if="state.entry.view.type == 'list'">
                <div class="row q-col-gutter-md">
                  <div class="col-6">
                    <q-smart-select
                      key="collection"
                      :selected="state.entry.view.collection?.slug || null"
                      @onChange="(payload) => (state.entry.view.collection = payload)"
                      title="Collection"
                      okLabel="Confirm"
                      cancelLabel="Cancel"
                      :dialog="{
                        fullWidth: false,
                      }"
                      :card="{
                        style: 'min-width: 400px',
                      }"
                      :options="state.collections"
                      outlined=""
                      type="text"
                      behavior="dialog"
                      option-label="slug"
                      option-value="slug"
                      option-key="slug"
                      label="Collection"
                      autoClose
                    />
                  </div>
                  <div class="col-6">
                    <q-input
                      outlined=""
                      v-model.number="state.entry.view.listView.limit"
                      type="number"
                      label="Limit"
                    />
                  </div>
                </div>
                <br />
                <div class="row q-col-gutter-md">
                  <div class="col-6">
                    <q-smart-select
                      key="field"
                      :selected="state.entry.view.listView.sort?.field?.name || null"
                      @onChange="
                        (payload) => (state.entry.view.listView.sort.field = payload)
                      "
                      autoClose
                      title="Field"
                      outlined=""
                      :dialog="{
                        fullWidth: false,
                      }"
                      :card="{
                        style: 'min-width:400px',
                      }"
                      :options="state.fields"
                      type="text"
                      option-label="name"
                      option-key="name"
                      option-value="name"
                      label="Sort field"
                    />
                  </div>
                  <div class="col-6">
                    <q-select
                      outlined=""
                      stack-label
                      v-model="state.entry.view.listView.sort.direction"
                      :options="['asc', 'desc']"
                      type="number"
                      label="Sort Direction"
                    />
                  </div>
                </div>
                <div class="q-py-md">
                  <q-input
                    v-model="state.entry.view.listView.display"
                    type="textarea"
                    label="Display template"
                    outlined
                    stack-label
                  />
                </div>
                <br />

                <fieldset class="q-pt-md">
                  <legend class="text-bold">
                    <q-icon name="mdi-filter" /> Filter {}
                  </legend>
                  <JsonEditorVue
                    id="jsoneditor"
                    v-model="state.entry.view.listView.filter"
                    mode="text"
                    :mainMenuBar="false"
                    :navigation-bar="false"
                    :indentation="1"
                  />
                </fieldset>
                <br />
              </div>
              <fieldset v-if="state.entry.view.type !== 'label'">
                <legend class="text-bold">Wiew header</legend>
                <div class="row q-col-gutter-md">
                  <div class="col-6">
                    <q-input
                      outlined=""
                      v-model="state.entry.view.header.name"
                      type="text"
                      label="Name"
                    />
                  </div>
                  <div class="col-12">
                    <q-input
                      outlined=""
                      stack-label
                      v-model="state.entry.view.header.description"
                      :options="['asc', 'desc']"
                      type="textarea"
                      label="Description"
                    />
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <br />
        <br />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import _ from "lodash";
import JsonEditorVue from "json-editor-vue";
import { reactive, onMounted, watch } from "vue";
import { v4 as uuidv4 } from "uuid";
import { uid } from "uid";
import { useSession } from "stores/session";
import { bitev, syncConfig } from "../../sdk/index";
import { View } from "./base";

import { useDialogPluginComponent, useQuasar } from "quasar";
const view = new View();
const $store = useSession();
const { dialogRef, onDialogOK } = useDialogPluginComponent();
const state = reactive({
  canSave: true,
  loading: false,
  fields: [],
  collections:
    $store.collections.filter(
      (e) => !e.slug.toLowerCase().match(/^(insights|roles|settings)$/)
    ) || [],
  types: [
    {
      name: "label",
      icon: "las la-font",
      description: "Show some text",
    },
    {
      name: "list",
      icon: "mdi-text",
      description: "List fields from a collection",
    },
    {
      name: "metric",
      icon: "las la-equals",
      description: "Show signle value based on query",
    },
    {
      name: "serie",
      icon: "las la-chart-bar",
      description: "Chart  based on values or times",
    },
  ],
  entry: {
    view: _.cloneDeep(view),
  },
});

const props = defineProps({
  rw: null,
});

onMounted(() => {
  rsync();
  syncFields();
});

watch(
  () => state.entry.view.collection,
  () => {
    syncFields();
  }
);

function syncFields() {
  state.fields = [];
  // console.log(state.entry.view.collection);
  if (!state.entry.view.collection?.fields) return false;
  state.fields = [...state.entry.view?.collection?.fields] || [];
  if (state.entry.view.collection.timestamps) {
    state.fields.push({
      name: "createdAt",
    });
    state.fields.push({
      name: "updatedAt",
    });
  }
}

watch(
  () => JSON.stringify(state.entry.view),
  () => {
    if (!state.entry.view.name || !state.entry.view.type) {
      state.canSave = true;
    } else {
      state.canSave = false;
    }
  }
);

function rsync() {
  // console.log(props);
  if (!props.rw) {
    state.entry.view.key = uuidv4();
  } else {
    state.entry.view = _.merge({ ...view }, { ...props.rw });
  }
}

async function saveConfig() {
  try {
    state.entry.view.listView.filter = eval("(" + state.entry.view.listView.filter + ")");
  } catch (err) {}

  onDialogOK({
    view: { ...state.entry.view },
    action: props.rw ? "update" : "create",
  });
}
</script>
