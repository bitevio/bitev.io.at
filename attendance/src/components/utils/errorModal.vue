<template>
  <q-dialog>
    <q-card>
      <q-card-actions>
        <q-toolbar-title class="q-ml-sm text-negative text-bold">
          Error to fix
        </q-toolbar-title>
        <q-space />
        <q-btn
          unelevated=""
          round
          color="negative"
          icon="mdi-close"
          v-close-popup
        ></q-btn>
      </q-card-actions>
      <q-separator spaced />
      <q-card-section>
        <p class="text-h6 text-bold">
          {{ props?.errors?.code }}
        </p>
        <p>
          {{ props?.errors?.message || "" }}
        </p>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { reactive } from "vue";
const props = defineProps({
  errors: null,
});
const state = reactive({});
</script>
