<template>
  <q-layout view="lHr lpr lfr">
    <q-header>
      <q-toolbar class="text-black bg-white">
        <q-toolbar-title shrink> Liste des employés </q-toolbar-title>
        <q-space />
        <q-btn flat round @click="Sync()" icon="mdi-sync"></q-btn>
        <q-btn @click="$router.back()" flat round dense icon="mdi-arrow-left" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page>
        <q-toolbar class="text-caption">
          <q-toggle
            color="black"
            label="Aucune photo"
            v-model="state.emptyfaciale"
          ></q-toggle>
          <q-space />
          {{ state.items.length }} trouvés
        </q-toolbar>
        <div class="q-pa-sm">
          <q-input v-model="state.search" dense outlined="" label="Rechercher">
            <template #prepend>
              <q-icon name="mdi-magnify"> </q-icon>
            </template>
          </q-input>
        </div>

        <div v-if="!state.loading">
          <div v-if="!state.items.length">
            <van-empty description="Aucun personnelle"></van-empty>
          </div>
          <div v-else>
            <q-virtual-scroll
              style="height: 80vh"
              :items="state.items"
              v-slot="{ item, index }"
              separator=""
            >
              <q-item clickable v-ripple @click="openAdd(item)" :key="index">
                <q-item-section side>
                  <div class="column text-center">
                    <q-icon
                      v-if="!item.facials?.length"
                      color="black"
                      size="sm"
                      name="mdi-camera-plus-outline"
                    ></q-icon>
                    <q-chip outline="" dense> {{ index + 1 }}</q-chip>
                  </div>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-bold text-brown">
                    {{ item.first_name }} {{ item.last_name }}
                  </q-item-label>
                  <q-item-label class="text-caption q-pt-xs text-bold">
                    <span class="text-bold">
                      <q-icon name="mdi-phone"></q-icon> {{ item.contact }}
                    </span>
                    <br />

                    <q-icon name="mdi-at"></q-icon> {{ item.email }}
                  </q-item-label>
                  <q-card-actions class="q-pa-none q-pt-sm text-caption">
                    Enregistré le
                    <q-space></q-space>
                    {{ moment(item.createdAt).format("DD/MM/YY HH:mm") }}
                  </q-card-actions>
                </q-item-section>
              </q-item>
            </q-virtual-scroll>
          </div>
        </div>

        <div v-else>
          <div class="q-pa-lg">
            <div class="q-col-qutter-md">
              <div>
                <q-skeleton type="QRadio"></q-skeleton>
              </div>
              <div class="q-pt-md">
                <q-skeleton></q-skeleton>
              </div>
              <div class="q-pt-md">
                <q-skeleton class="q-pt-md" style="height: 60vh"></q-skeleton>
              </div>
            </div>
          </div>
        </div>

        <q-page-sticky :offset="[18, 18]" position="bottom-right">
          <q-btn
            label="Ajouter"
            style="border-radius: 15px"
            @click="openAdd()"
            color="primary"
            icon="mdi-plus"
          ></q-btn>
        </q-page-sticky>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<route lang="yaml">
meta:
  layout: backLayout
  title: Personnels
</route>
<script setup>
import { bitev } from "../../sdk";
import { reactive, onMounted, watch } from "vue";
import moment from "moment";
import Fuse from "fuse.js";
import add from "../../components/utils/addUser.vue";
import { useQuasar, useDialogPluginComponent } from "quasar";
import { useSession } from "stores/session";
const $store = useSession();
const $q = useQuasar();

const state = reactive({
  search: null,
  emptyfaciale: false,
  loading: false,
  items: [],
  rws: [],
});

watch(
  () => state.search,
  () => serachOn()
);

watch(
  () => state.emptyfaciale,
  (val) => {
    if (val) {
      state.items = state.rws.filter((e) => !e.facials?.length);
    } else {
      state.items = state.rws;
    }
  }
);

onMounted(() => {
  Sync();
});

function serachOn() {
  if (!state.search) {
    state.items = state.rws;
    return;
  }
  const fuse = new Fuse(state.rws, {
    keys: ["fist_name", "last_name", "contact"],
  });

  var items = fuse.search(state.search);
  state.items = items.map((found) => found.item);
}

async function Sync() {
  state.loading = true;
  state.items = state.rws = await bitev
    .findMany("employees", {
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      where: {
        centre: {
          id: {
            equals: $store.device?.centre?.id,
          },
        },
      },
    })
    .then((e) => e)
    .catch((err) => []);

  state.loading = false;
}

function openAdd(item = null) {
  $q.dialog({
    component: add,
    componentProps: {
      item: item,
    },
  }).onOk(() => {
    Sync();
  });
}
</script>
