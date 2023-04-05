<template>
  <q-dialog ref="dialogRef">
    <q-card style="min-width: 00px">
      <q-card-actions class="q-mx-md text-bold">
        <q-toolbar-title class="text-bold"> Add file </q-toolbar-title>
        <q-space />
        <q-btn round flat icon="mdi-close" v-close-popup></q-btn>
      </q-card-actions>

      <q-card-section style="min-width: 400px" class="fit">
        <q-card
          :style="`${!state.loading ? 'min-width: 100%; border: 0.1px solid gray' : ''}`"
          class="box cursor-pointer flex flex-center"
          @click="$refs.uploader.chooseFile()"
        >
          <q-card-section class="fit">
            <div v-if="!state.loading">
              <q-icon size="sm" name="mdi-file-plus" />
              Click to browse
            </div>
            <div style="height: 20px; width: 100%" class="fit" v-else>
              <div>
                <q-linear-progress
                  rounded
                  indeterminate=""
                  color="primary"
                  track-color="primary"
                  class="q-mt-sm"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
        <div v-show="state.showInput">
          <van-uploader
            :after-read="afterRead"
            v-model="state.files"
            multiple
            ref="uploader"
            class="flex flex-center"
          ></van-uploader>
        </div>
      </q-card-section>
      <q-card-actions>
        <q-space />
        <q-btn :loading="state.loading" color="primary" label="Done"></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useDialogPluginComponent } from "quasar";
import { reactive, ref, onErrorCaptured } from "vue";
import { bitev } from "../../sdk/";

const { onDialogOK, dialogRef } = useDialogPluginComponent();

const state = reactive({
  loading: false,
  showInput: false,
  files: [],
});
</script>
