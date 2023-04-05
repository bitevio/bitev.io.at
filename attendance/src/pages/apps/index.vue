<template>
  <q-page padding>
    <div class="q-pa-lg">
      <div class="q-pt-lg text-center q-mx-lg">
        <div class="text-h4 text-bold">Modules de gestion de présence</div>
        <br />
        <div class="row align-center q-col-gutter-md justify-center q-pt-lg">
          <div v-for="mod of state.modules" class="col-12 col-sm-6 col-md-4 col-lg-3">
            <q-smart-reactif class="fit" v-slot="{ hover }">
              <q-card
                @click="$router.push(mod.to)"
                :class="hover ? 'text-secondary cursor-pointer' : ''"
                :style="hover ? 'border: 2px solid black' : 'border: 1px solid #ccc'"
                class="text-center fit box text-bold fit bg-white q-pa-lg"
              >
                <p>
                  <q-icon size="lg" :name="mod.icon" />
                </p>
                <div class="text-h6 text-bold">
                  {{ mod.label }}
                </div>
                <div>
                  <div class="text-weight-light">
                    {{ mod.description }}
                  </div>
                </div>
              </q-card>
            </q-smart-reactif>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { reactive } from "vue";
import { modules } from "src/utils";

const state = reactive({
  modules: modules.at,
  index: 0,
});
</script>
