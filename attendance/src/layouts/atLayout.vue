<template>
  <q-layout view="lHr lpr Lfr">
    <q-header>
      <q-toolbar class="bg-white text-black">
        <q-btn to="/apps" flat round dense icon="mdi-home" />
        <q-toolbar-title class="text-bold">
          {{ $route.meta?.title }}
          <span class="text-capitalize" v-if="state.showBar">
            {{ getLabelCollection($route.params?.model) }}
          </span>
          <span v-else> Tableau de bord </span>
        </q-toolbar-title>
        <q-btn flat round dense icon="more_vert">
          <q-menu class="box" style="min-width: 200px">
            <q-list separator="">
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon color="primary" name="las la-user" />
                </q-item-section>
                <q-item-section>Mon compte</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon color="primary" name="mdi-power" />
                </q-item-section>
                <q-item-section>Se déconnecter</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
      <q-toolbar v-if="state.showBar">
        <q-tabs
          mobile-arrows
          outside-arrows
          narrow-indicator
          active-class="bg-secondary "
          indicator-color="secondary"
          v-model="state.tab"
          center
          class="fit"
        >
          <q-route-tab
            v-for="(mod, i) of modules.at"
            :icon="mod.icon"
            :name="i"
            :to="mod.to"
            :label="mod.label"
          ></q-route-tab>
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { reactive, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { modules } from "src/utils";
import { getLabelCollection } from "../sdk";
const $router = useRouter();
const $route = useRoute();

const state = reactive({
  showBar: false,
  tab: 0,
  menu: [
    {
      label: "Mon compte",
    },
  ],
});

onMounted(() => {
  showBar();
});

watch(
  () => $route.path,
  (val) => {
    showBar();
  }
);

function showBar() {
  var path = $route.path;
  var r = path.match(/(apps|apps\/)$/);

  if (!r) {
    state.showBar = true;
  } else {
    state.showBar = false;
  }
}
</script>
