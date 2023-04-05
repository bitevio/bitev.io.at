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
        minWidth: $q.screen.gt.sm ? '40vw' : '70vw',
      }"
    >
      <q-card-actions>
        <q-toolbar class="">
          <q-btn flat round v-close-popup icon="mdi-arrow-left"></q-btn>
          <q-toolbar-title> Create webhook</q-toolbar-title>
          <div class="q-gutter-md">
            <q-btn
              :loading="state.loading"
              @click="saveConfig()"
              round
              color="green"
              icon="mdi-check"
            ></q-btn>
          </div>
        </q-toolbar>
      </q-card-actions>
      <q-card-section style="height: 90vh" class="scroll">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-10">
            <div class="q-gutter-md">
              <q-input
                v-model="state.entry.name"
                type="text"
                :outlined="true"
                label="Name"
              />
              <div class="q-pt-sm">
                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-select
                      v-model="state.entry.method"
                      type="text"
                      :options="['get', 'post']"
                      :outlined="true"
                      label="Method"
                    />
                  </div>
                  <div class="col-8">
                    <q-input
                      v-model="state.entry.url"
                      type="text"
                      :outlined="true"
                      label="URL"
                    />
                  </div>
                </div>
              </div>
              <q-select
                :outlined="true"
                label="Satuts"
                :options="['active', 'inactive']"
                v-model="state.entry.status"
              />
              <div>
                <p class="text-h5 text-bold">Trigger</p>
                <van-divider class="text-bold text-black">Actions</van-divider>

                <div class="text-center">
                  <q-checkbox val="create" v-model="state.entry.actions" label="Create" />
                  <q-checkbox val="update" v-model="state.entry.actions" label="Update" />
                  <q-checkbox val="delete" v-model="state.entry.actions" label="Delete" />
                </div>
                <van-divider class="text-bold text-black">Collections</van-divider>
                <div class="column">
                  <q-checkbox
                    v-for="col of state.collections"
                    v-model="state.entry.collections"
                    :val="col.slug"
                    :label="col.admin.label || col.slug"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { reactive } from "vue";
import { useSession } from "stores/session";
import { bitev } from "../../sdk/index";
import { useDialogPluginComponent, useQuasar } from "quasar";
const $store = useSession();
const { dialogRef, onDialogOK } = useDialogPluginComponent();
const state = reactive({
  loading: false,
  collections: $store.collections || [],
  entry: {
    status: "inactive",
    name: "",
    method: "",
    url: "",
    actions: [],
    collections: [],
  },
});

const props = defineProps({
  rw: null,
});

if (props.rw) {
  state.entry = {
    ...props.rw,
    actions: props?.rw?.actions ? props?.rw.actions : [],
    collections: props?.rw?.collections ? props?.rw.collections : [],
  };
}

async function saveConfig() {
  state.loading = true;

  if (!props.rw) {
    await bitev
      .createOne("webhooks", {
        data: { ...state.entry },
      })
      .then((e) => {})
      .catch((err) => {});
  } else {
    await bitev
      .updateOne("webhooks", {
        where: {
          id: props.rw.id,
        },
        data: state.entry,
      })

      .then((e) => {})
      .catch((err) => {});

    onDialogOK();
  }

  state.loading = false;
}
</script>
