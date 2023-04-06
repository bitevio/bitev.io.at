<template>
  <div>
    <q-dialog class="bg-black" v-model="state.openError">
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
            {{ state?.errors?.code }}
          </p>
          <p>
            {{ state?.errors?.message || "" }}
          </p>
        </q-card-section>
      </q-card>
    </q-dialog>
    <div v-if="!state.ok">
      <q-inner-loading :showing="true">
        <q-spinner-tail size="50px" color="green" />
      </q-inner-loading>
    </div>
    <div v-else>
      <router-view />
    </div>
    <div class="fixed-bottom-right hidden box bg-white rounded-borders z-max q-ma-lg">
      <q-smart-reactif v-slot="{ active, toggle, close, hover, open }">
        <q-btn @mouseout="open()" @click="toggle" flat icon="las la-language">
          <q-tooltip> Traduction </q-tooltip>
        </q-btn>
        <q-dialog @hide="close" :model-value="active">
          <q-card style="min-width: 350px">
            <q-card-actions>
              <q-toolbar-title shrink> Choisir la langue </q-toolbar-title>
              <q-space />
              <q-btn flat v-close-popup icon="mdi-close"></q-btn>
            </q-card-actions>
            <q-card-section class="text-black">
              <q-list rounded separator>
                <q-item
                  clickable
                  v-for="(item, i) of state.langs"
                  @click="
                    state.trans = item.value;
                    close();
                  "
                  :key="i"
                >
                  <q-item-section side>
                    <q-icon size="xs" :name="'img:' + item.logo"></q-icon>
                  </q-item-section>
                  <q-item-section>
                    {{ item.libelle }}
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-dialog>
      </q-smart-reactif>
    </div>
  </div>
</template>

<script setup>
import iconSet from "@quasar/quasar-ui-qiconpicker/src/components/icon-set/line-awesome";
import { bitev } from "./sdk/index";
import {
  onErrorCaptured,
  reactive,
  onMounted,
  inject,
  watch,
  ref,
  getCurrentInstance,
} from "vue";
import { useQuasar, QSpinnerIos, Dialog } from "quasar";

import { useSession } from "stores/session";
import { useRouter } from "vue-router";
import gsap from "gsap";
import socket from "./boot/socket";
import errorDialog from "components/utils/errorModal.vue";
import { useDialogPluginComponent } from "quasar";
const $q = useQuasar();
const $store = useSession();
const { onDialogHide, dialogRef } = useDialogPluginComponent();

const $socket = inject("socket");
const $router = useRouter();
const $emitter = inject("emitter");
const state = reactive({
  ok: false,
  errors: {},
  openError: false,
  descriptors: [],
  trans: null,
  langs: [
    {
      libelle: "Francais",
      value: "fr",
      logo: "https://flagcdn.com/w320/fr.png",
    },
    {
      libelle: "Anglais",
      value: "en",
      logo: "https://flagcdn.com/w320/us.png",
    },
  ],
});

onErrorCaptured((err) => {
  console.log(err);

  return false;
});

$emitter.on("sync", () => {
  Sync(false);
});

$socket.on("syncConfigs", () => {
  Sync(false);
});

$socket.on("exceptErrors", (errors) => {
  if ($store.local?.isRoot || $store?.local?.user == "root") {
    state.openError = true;
    state.errors = errors;
  }
});

onMounted(() => {
  Sync();
  window.iconSet = iconSet;
});

watch(
  () => state.trans,
  (val) => {
    var $select = document.querySelector("select.goog-te-combo");
    console.log($select);
    var $options = Array.from($select.options);
    const optionToSelect = $options.find((item) => item.value === val);
    $select.value = optionToSelect?.value || null;
    if ($select.value) {
      $q.loading.show({
        message: "Chargement en cours ..",
      });
      document.documentElement.setAttribute("lang", $select.value);
      window.localStorage.setItem("lang", $select.value);
      $select.dispatchEvent(new Event("change"), () => {
        window.location.reload();
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      $q.notify("Réessayez dans quelque secondes...");
    }
  }
);

async function Sync(loading = true) {
  if ($store.configs) state.ok = true;
  var configs = await bitev.getConfig();

  console.log(configs);
  await $store.updateConfigs(configs);
  $q.loading.hide();
  state.ok = true;
}
</script>
