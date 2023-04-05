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
          <q-toolbar-title> Create Insight dashboard</q-toolbar-title>
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
                label="Dashboard Name"
              />

              <q-toggle
                :outlined="true"
                :label="state.entry.active ? 'Active' : 'Inactive'"
                v-model="state.entry.active"
              />
              <p>
                <q-input
                  outlined=""
                  v-model="state.entry.description"
                  type="textarea"
                  label="Description"
                />
              </p>
              <q-smart-reactif v-slot="{ active, toggle, open, close }">
                <div id="setIcon">
                  <q-input
                    stack-label
                    @click="open"
                    outlined=""
                    v-model="state.entry.icon"
                    placeholder="Select Icon"
                  >
                    <template #prepend>
                      <q-icon
                        color="black"
                        :name="!state.entry.icon?.length ? 'extension' : state.entry.icon"
                      >
                      </q-icon>
                    </template>
                  </q-input>
                </div>

                <q-popup-proxy @hide="() => close()" fit :model-value="false">
                  <q-card flat class="rounded-borders">
                    <q-card-section>
                      <q-input
                        autofocus=""
                        clearable=""
                        label="Search ...."
                        v-model="state.entry.icon"
                      >
                      </q-input>
                      <br />
                      <div v-close-popup style="max-width: 100%; position: relative">
                        <q-icon-picker
                          :filter="state.entry.icon"
                          v-model="state.entry.icon"
                          :icons="state.icons"
                          text-color="black"
                          color="lite"
                          v-model:model-pagination="state.nIcon.pagination"
                          style="height: 220px"
                        />
                      </div>
                    </q-card-section>
                  </q-card>
                </q-popup-proxy>
              </q-smart-reactif>
              <p></p>
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
  icons: window.iconSet?.icons || [],
  nIcon: {
    pagination: { itemsPerPage: 45, page: 0 },
  },
  entry: {
    active: false,
    name: "",
    description: "",
    icon: "",
  },
});

const props = defineProps({
  rw: null,
});

if (props.rw) {
  state.entry = {
    ...state.entry,
    ...props.rw,
  };
}

async function saveConfig() {
  state.loading = true;

  if (!props.rw) {
    await bitev
      .createOne("Insights", {
        data: { ...state.entry },
      })
      .then((e) => {})
      .catch((err) => {});
    onDialogOK();
  } else {
    await bitev
      .updateOne("Insights", {
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
