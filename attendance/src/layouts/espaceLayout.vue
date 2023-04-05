<template>
  <q-layout class="" view="lHh Lpr lFf">
    <q-header v-if="!state.loading" class="bg-lite">
      <q-toolbar class="text-primary">
        <q-btn flat @click="state.side = true" v-if="!state.side" icon="mdi-menu"></q-btn>
        <q-toolbar-title class="text-bold q-ml-md">
          <q-icon :name="$route.meta?.icon ? $route?.meta.icon : 'mdi-menu-right'" />
          &nbsp;

          <span class="text-capitalize">{{
            formatTitle($route.params.model || $route.meta.title || state.title)
          }}</span>
        </q-toolbar-title>
        <q-btn flat round dense icon="apps" class="q-mr-xs" />
        <q-btn flat round dense icon="more_vert">
          <q-menu dark>
            <div flat style="min-width: 220px">
              <q-list>
                <q-item to="/espace/account" clickable="">
                  <q-item-section side>
                    <q-icon name="las la-user" />
                  </q-item-section>
                  <q-item-section> My account </q-item-section>
                </q-item>
                <q-item @click="logOut" clickable="">
                  <q-item-section side>
                    <q-icon name="mdi-power" />
                  </q-item-section>
                  <q-item-section> Log Out </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="!state.loading"
      side="left"
      v-model="state.side"
      :behavior="$q.screen.gt.sm ? 'desktop' : 'mobile'"
      dark
      class="bg-white"
      :width="305"
      :breakpoint="500"
      content-class="bg-grey-3"
    >
      <div class="row">
        <div class="col-3 bg-primary">
          <div style="height: 50px">
            <q-img
              :src="
                bitev.assets(
                  $store.configs.settings?.project_logo?.filedisk || 'bitev.png'
                )
              "
              spinner-color="primary"
              spinner-size="82px"
              width="20px"
            />
          </div>
        </div>
        <div class="col-9 text-black">
          <div>
            <div class="text-left q-pa-lg">
              {{ $store.configs.settings?.project_name || "Bitev. Admin" }}
            </div>
          </div>
        </div>
      </div>
      <div style="height: 92.1vh" class="row scroll overflow-hiiden">
        <div class="col-3 bg-primary">
          <div class="q-pt-sm">
            <q-tabs
              active-color="green"
              indicator-color="green"
              v-model="state.tab"
              vertical=""
            >
              <q-route-tab to="/apps" name="applications" icon="las la-th-large">
                <q-tooltip class="bg-primary text-white" anchor="top right">
                  Applications
                </q-tooltip>
              </q-route-tab>
              <q-tab name="insights" icon="las la-chart-bar">
                <q-tooltip class="bg-primary text-white" anchor="top right">
                  Insights
                </q-tooltip>
              </q-tab>
              <q-tab class="hidden" icon="las la-table"></q-tab>
              <q-tab name="collections" icon="las la-cube">
                <q-tooltip class="bg-primary text-white" anchor="top right">
                  Content Management
                </q-tooltip>
              </q-tab>
              <q-route-tab name="library" to="/espace/library" icon="las la-photo-video"
                ><q-tooltip class="bg-primary text-white" anchor="top right">
                  File library
                </q-tooltip>
              </q-route-tab>
              <q-tab name="plugins" icon="lab la-buffer">
                <q-tooltip class="bg-primary text-white" anchor="top right">
                  Plugins
                </q-tooltip>
              </q-tab>
              <q-tab name="settings" icon="las la-cog">
                <q-tooltip class="bg-primary text-white" anchor="top right">
                  Settings
                </q-tooltip>
              </q-tab>
            </q-tabs>
          </div>
        </div>
        <div class="col-9 text-black">
          <div class="fit text-black">
            <q-tab-panels v-model="state.tab">
              <q-tab-panel class="q-pa-sm" name="applications">
                <q-list class="text-bold">
                  <q-expansion-item
                    dense
                    default-opened=""
                    label="Applications"
                    :caption="`All apps (${$store.configs.apps?.length || 0})`"
                  >
                    <q-list class="q-py-sm text-weight-light" dense>
                      <q-item
                        v-for="(col, i) of $store.configs.apps"
                        :key="i"
                        :class="
                          $route.query?.ref?.includes(col.id) ? 'text-secondary' : ''
                        "
                      >
                        <q-item-section class="text-capitalize">
                          <q-item-label :lines="1">
                            - {{ col.config.label }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-expansion-item>
                </q-list>
              </q-tab-panel>
              <q-tab-panel class="q-pa-sm" name="insights">
                <q-list class="text-bold">
                  <q-expansion-item
                    group
                    dense
                    default-opened=""
                    label="Insights"
                    :caption="`All views (${state.insights?.length || 0})`"
                  >
                    <q-list class="q-py-sm text-weight-light q-ml-lg" dense>
                      <div v-if="state.insights?.length > 10" class="q-mx-sm q-py-sm">
                        <q-input
                          standout=""
                          v-model="state.searchCollections"
                          color="secondary"
                          dark
                          dense
                          label="Search view..."
                        ></q-input>
                      </div>
                      <q-item
                        v-for="(col, i) of state.insights"
                        :key="i"
                        :to="`/espace/insights/views/${col.name}?ref=${col.id}`"
                        :class="
                          $route.query?.ref?.includes(col.id) ? 'text-secondary' : ''
                        "
                      >
                        <q-item-section thumbnail="">
                          <q-icon color="black" :name="col.icon" />
                        </q-item-section>
                        <q-item-section class="text-capitalize">
                          {{ col?.name }}
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-expansion-item>
                </q-list>
              </q-tab-panel>
              <q-tab-panel name="collections">
                <q-list class="text-bold">
                  <q-expansion-item
                    group
                    default-opened=""
                    dense
                    class="rounded-borders"
                    label="Collections"
                    :caption="`All models (${state.collections?.length || 0})`"
                  >
                    <q-list
                      style="height: 35vh"
                      class="q-py-sm scroll text-weight-light"
                      dense
                    >
                      <div
                        v-if="state.searchCollections?.length > 10"
                        class="q-mx-sm q-py-sm"
                      >
                        <q-input
                          standout=""
                          v-model="state.searchCollections"
                          color="secondary"
                          dark
                          dense
                          label="Search on model..."
                        ></q-input>
                      </div>
                      <q-item
                        v-for="(col, i) of state.visibleCollections"
                        :key="i"
                        :to="`/espace/collections/${col.slug}`"
                        :class="$route.path.includes(col.slug) ? 'text-secondary' : ''"
                      >
                        <q-item-section class="text-capitalize q-ml-lg">
                          <q-item-label :lines="1">
                            {{ col?.admin?.label || col.slug }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-expansion-item>
                </q-list>
                <q-separator spaced />

                <q-list class="text-bold">
                  <q-expansion-item
                    dense
                    default-opened=""
                    label="Single Types"
                    :caption="`Global variables (${state.types?.length || 0}) `"
                  >
                    <q-list style="height: 30vh" class="q-py-sm scroll" dense>
                      <q-item
                        v-for="(col, i) of state.types"
                        :key="i"
                        :to="`/espace/collections-single/${col.slug}`"
                        :class="$route.path.includes(col.slug) ? 'text-secondary' : ''"
                      >
                        <q-item-section class="text-capitalize q-ml-lg">
                          {{ col?.label || col.slug }}
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-expansion-item>
                </q-list>
              </q-tab-panel>
              <q-tab-panel name="plugins">
                <p class="text-h6 text-bold">Plugins</p>
                <q-separator spaced />
                <q-list separator="">
                  <q-item active-class="text-green " to="/espace/plugins/apps">
                    <q-item-section thumbnail="">
                      <q-icon color="black" name="las la-th-large" />
                    </q-item-section>
                    <q-item-section> Apps market </q-item-section>
                  </q-item>
                  <q-item active-class="text-green" to="/espace/plugins/collections">
                    <q-item-section thumbnail="">
                      <q-icon color="black" name="las la-hammer" />
                    </q-item-section>
                    <q-item-section> Collection Builder </q-item-section>
                  </q-item>
                  <q-item active-class="text-green " to="/espace/plugins/insights">
                    <q-item-section thumbnail="">
                      <q-icon color="black" name="las la-chart-pie" />
                    </q-item-section>
                    <q-item-section> Insights Builder </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>
              <q-tab-panel name="settings">
                <p class="text-h6 text-bold">Settings</p>
                <q-separator spaced />
                <q-list separator="">
                  <q-item
                    :class="$route.path.includes('project') ? 'text-secondary' : ''"
                    to="/espace/settings/project"
                  >
                    <q-item-section thumbnail="">
                      <q-icon color="black" name="las la-globe" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label :lines="1"> Project Settings</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item
                    :class="$route.path.includes('Roles') ? 'text-secondary' : ''"
                    to="/espace/settings/permissions/Roles"
                  >
                    <q-item-section thumbnail="">
                      <q-icon name="las la-user-shield" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label :lines="1"> Rôles & Permissions </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item
                    :class="$route.path.includes('webhooks') ? 'text-secondary' : ''"
                    to="/espace/settings/webhooks"
                  >
                    <q-item-section thumbnail="">
                      <q-icon name="las la-anchor" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label :lines="1"> Webhooks </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </div>
      <q-page-sticky :offset="[5, 5]" class="z-max" position="bottom-right">
        <q-chip dense dark color="primary"> v{{ $store.configs.version }} </q-chip>
      </q-page-sticky>
    </q-drawer>
    <q-page-container class="bg-lite">
      <div class="bg-lite" v-if="state.isReady">
        <router-view />
      </div>
    </q-page-container>
    <q-dialog
      transition-hide="fade"
      transition-duration="0"
      transition-show="fade"
      maximized=""
      persistent=""
      v-model="state.loading"
    >
      <q-card>
        <q-card-section class="flex flex-center fit">
          <div class="text-center">
            <p class="text-h5 text-bold">Synchronization ...</p>

            <p>
              <q-spinner-tail size="50px" color="green" />
            </p>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";
import { bitev, getAllCollection } from "../sdk/";
import { reactive, onMounted, watch, inject } from "vue";
import { useSession } from "stores/session";
const $q = useQuasar();
const $store = useSession();
const $route = useRoute();
const $router = useRouter();
const $emitter = inject("emitter");
const state = reactive({
  tab: $q.sessionStorage.getItem("tab-index") || "collections",
  title: "",
  loading: true,
  side: true,
  isReady: false,
  collections: [],
  searchCollections: [],
  visibleCollections: [],
  insights: [],
  types: [],
});

onMounted(() => {
  Sync();
  resSide();
});

watch(
  () => $store.pid,
  () => {
    Sync(false);
  }
);

watch(
  () => state.tab,
  (val) => {
    $q.sessionStorage.set("tab-index", val);
  }
);

watch(
  () => $store.configs,
  () => {
    rSyncAll();
  }
);

watch(
  () => $q.screen.md,
  (val) => {
    resSide();
  }
);

watch(
  () => $route.path,
  () => {
    state.title = document.title;
  }
);

watch(
  () => state.searchCollections,
  () => {
    searchCollections();
  }
);

function rSyncAll() {
  state.insights = $store.configs?.insights || [];
}

function resSide() {
  $q.screen.gt.sm ? (state.side = true) : (state.side = false);
}

function formatTitle(title = null) {
  if (title) {
    title = title.replace(/\_/g, " ");
    return title;
  }

  return "";
}

async function Sync(loading = true) {
  loading ? (state.loading = true) : null;
  var allcollections = await getAllCollection();
  state.visibleCollections = state.collections = allcollections.filter(
    (e) =>
      !e.hidden &&
      !e.singleType &&
      e.slug !== "roles" &&
      e.slug !== "Roles" &&
      e.slug !== "Medias"
  );
  state.types = allcollections.filter(
    (e) => e.singleType && e.slug.toLowerCase() !== "settings"
  );
  state.loading = false;
  state.isReady = true;
}

async function searchCollections() {
  if (!state.visibleCollections) return (state.visibleCollections = state.collections);

  state.visibleCollections = state.collections.filter((e) => {
    return e.slug.toLowerCase().includes(state.searchCollections?.toLowerCase());
  });
}

function logOut() {
  // bitev.logout();
  $store.logout();
  $router.replace("/");
}
</script>
