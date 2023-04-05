<template>
  <q-dialog ref="dialogRef">
    <q-card class="" style="min-width: 45vw">
      <q-card-actions>
        <q-toolbar-title class="text-bold" shrink>
          {{
            props.collection?.slug
              ? `Edit ${props?.collection?.slug} collection `
              : `Create a collection type`
          }}
        </q-toolbar-title>

        <q-space />
        <q-btn v-close-popup flat round icon="mdi-close"></q-btn>
      </q-card-actions>
      <q-card-actions class="q-ma-none">
        <br />
        <span class="text-caption"> A type for modeling data </span>
      </q-card-actions>

      <q-card-section class="">
        <q-tabs inline-label="" class="text-bold" v-model="state.tab">
          <q-tab :name="0" label="Basic settings"></q-tab>

          <q-tab :name="1" label="Advanced settings"></q-tab>
        </q-tabs>
        <q-separator />
        <Form
          ref="ctrl"
          :initialValues="{
            Slug: state.collection.slug,
            Mode: state.collection.mode,
            By: state.collection.auth.by,
          }"
        >
          <q-tab-panels v-model="state.tab">
            <q-tab-panel :name="0">
              <q-toggle
                v-model="state.collection.singleType"
                color="primary"
                :disable="props?.collection.slug ? true : false"
                label="Single Type"
              />
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <Field name="Slug" rules="required|min:2" v-slot="{ field, errors }">
                    <q-input
                      v-bind="field"
                      :disable="props?.collection.slug ? true : false"
                      :error="errors.length ? true : false"
                      :error-message="errors[0]"
                      stack-label
                      v-model="state.collection.slug"
                      outlined
                      label="*Slug"
                      autocomplete="off"
                      placeholder="Collection name"
                    ></q-input>
                  </Field>
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="state.collection.admin.label"
                    stack-label
                    outlined
                    label="Label"
                  ></q-input>
                </div>
                <div class="col-12 col-md-6">
                  <div>
                    <p>Additional Features extensions</p>
                    <Field
                      class="q-pt-lg"
                      name="Mode"
                      rules="required"
                      v-slot="{ errors, field }"
                    >
                      <q-select
                        v-bind="field"
                        :error="errors.length ? true : false"
                        :error-message="errors[0]"
                        v-model="state.collection.behavior"
                        :options="['basic', 'calendar']"
                        label="Behavior"
                        outlined=""
                      >
                        <template #prepend>
                          <q-icon name="las la-paint-brush" />
                        </template>
                      </q-select>
                    </Field>
                    <div
                      v-if="state.collection.behavior == 'calendar'"
                      class="row no-wrap q-gutter-sm"
                    >
                      <div>
                        <q-input
                          outlined
                          dense
                          v-model="state.collection.calendar.startField"
                          type="text"
                          label="Start time fieldname"
                        />
                      </div>
                      <div>
                        <q-input
                          dense
                          outlined=""
                          v-model="state.collection.calendar.endField"
                          type="text"
                          label="End time fieldname"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>
            <q-tab-panel :name="1">
              <div class="row q-col-gutter-md justify-center">
                <div class="col-12 col-md-6">
                  <div class="column">
                    <b>- Use createdat and UpdatedAt </b>
                    <q-toggle
                      v-model="state.collection.timestamps"
                      color="green"
                      label="Timestamps"
                      :disable="props?.collection.slug ? true : false"
                      icon="mdi-alarm"
                    />
                    <q-input
                      v-if="state.collection.timestamps"
                      v-model="state.collection.admin.timestampsFormat"
                      type="text"
                      outlined=""
                      label="timestamps format"
                    />
                    <q-separator spaced />
                    <b>- Can use Authentication feature</b>
                    <q-toggle
                      icon="mdi-lock"
                      v-model="state.collection.auth.enabled"
                      color="green"
                      label="Authentication"
                    />
                    <Field name="By" rules="required" v-slot="{ errors, field }">
                      <q-input
                        v-if="state.collection.auth.enabled"
                        stack-label
                        v-model="state.collection.auth.by"
                        outlined
                        v-bind="field"
                        :error="errors.length ? true : false"
                        :error-message="errors[0]"
                        label="Authentication Field"
                        placeholder="email"
                        hint="Note: Authentification required password (Field)"
                      ></q-input>
                    </Field>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <p>
                    <b>- Collection mode :</b> <br />

                    <a href="">See docs for more details about this feature</a>
                  </p>

                  <Field
                    class="q-pt-lg"
                    name="Mode"
                    rules="required"
                    v-slot="{ errors, field }"
                  >
                    <q-select
                      :disable="props?.collection?.slug ? true : false"
                      v-bind="field"
                      :error="errors.length ? true : false"
                      :error-message="errors[0]"
                      v-model="state.collection.mode"
                      :options="['model', 'composite']"
                      label="Collection mode"
                      outlined=""
                    />
                  </Field>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </Form>
      </q-card-section>
      <q-separator spaced />
      <q-card-actions>
        <q-btn flat="" v-close-popup label="Cancel" no-caps=""></q-btn>
        <q-space />
        <q-btn
          v-if="props?.collection?.slug"
          @click="deleteTo()"
          color="negative"
          label="Delete"
          no-caps=""
        ></q-btn>
        <q-btn @click="goTo()" color="primary" label="Continue" no-caps=""></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { reactive, ref, watch } from "vue";
import _ from "lodash";
import slugify from "slugify";
import { useDialogPluginComponent } from "quasar";
const { dialogRef, onDialogOK } = useDialogPluginComponent();
const ctrl = ref(null);
const props = defineProps({
  collection: {
    type: Object,
    default: {},
  },
});

const state = reactive({
  tab: 0,
  collection: {
    icon: null,
    singleType: false,
    hidden: false,
    slug: "",
    mode: "model",
    timestamps: true,
    behavior: "basic",
    auth: {
      enabled: false,
      by: "email",
    },
    calendar: {
      startField: "",
      endField: "",
    },
    admin: {
      label: "",
      timestampsFormat: "YY-MM-DD ,HH:mm:ss a",
    },
    fields: [],
  },
});

if (props.collection?.slug) {
  state.collection = { ...state.collection, ...props.collection };
}

watch(
  () => state.collection.slug,
  (val) => {
    state.collection.admin.label = _.capitalize(val).replace("_", " ");
  }
);

watch(
  () => state.collection.slug,
  (val) => {
    setSlug();
  }
);

function setSlug() {
  state.collection.slug = slugify(state.collection.slug)
    .toLocaleLowerCase()
    .replace(".", "");
}

async function goTo() {
  ctrl.value.validate().then((e) => {
    if (e.valid) {
      if (props.collection?.slug) {
        onDialogOK({
          action: "update",
          data: state.collection,
        });
      }

      if (!props.collection?.slug) {
        onDialogOK({
          action: "add",
          data: state.collection,
        });
      }
    }
  });
}

function deleteTo() {
  onDialogOK({
    action: "delete",
    data: state.collection,
  });
}
</script>
