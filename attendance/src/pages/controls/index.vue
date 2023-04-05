<template>
  <q-page class="bg-white">
    <q-page-sticky :offset="[20, 20]" position="bottom">
      <div class="q-gutter-sm">
        <q-smart-reactif v-slot="{ active, toggle, close }">
          <q-btn @click="toggle()" icon="mdi-menu"></q-btn>
          <q-dialog full-width="" position="bottom" @hide="close" :model-value="active">
            <q-card>
              <q-card-section>
                <q-list>
                  <q-item clickable="" to="/controls/users">
                    <q-item-section avatar>
                      <q-icon name="mdi-account-group" />
                    </q-item-section>
                    <q-item-section> Gestion des utilisateurs</q-item-section>
                  </q-item>
                  <q-item @click="init()" v-close-popup clickable="">
                    <q-item-section avatar>
                      <q-icon name="mdi-sync" />
                    </q-item-section>
                    <q-item-section> Synchroniser</q-item-section>
                  </q-item>
                  <q-item @click="logOut()" v-close-popup clickable="">
                    <q-item-section avatar>
                      <q-icon name="mdi-power" />
                    </q-item-section>
                    <q-item-section> Se déconnecter </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </q-dialog>
        </q-smart-reactif>
      </div>
    </q-page-sticky>

    <div>
      <div>
        <div style="height: 10vh">
          <div class="q-pt-lg text-center text-bold q-pa-lg">
          <div class="text-bold text-h5">
          {{ $store.device.centre?.libelle }}
          </div>
            <div class="title">
              {{ state.date.day }}
            </div>

            <span>
              {{ state.date.hours }}
            </span>
          </div>
        </div>
      </div>
      <br />
      <q-tabs  indicator-color="black" v-model="state.tab" center class="fit q-pt-lg">
        <q-tab class="bg-positive text-white" name="arrival" label="Arrivé"></q-tab>
        <q-tab name="departure" class="bg-red text-white" label="Départ"></q-tab>
      </q-tabs>

      <q-tab-panels animated="" v-model="state.tab">
        <q-tab-panel name="arrival">
          <div>
            <div class="q-pt-lg q-pa-lg">
              <div class="text-center">
                <div class="text-h4 text-green text-bold">Arrivée</div>
                <p>Pointer votre arrivee</p>
                <div class="q-pt-lg">
                  <q-btn
                    rounded
                    outline=""
                    class="fit q-pa-md text-black text-bold"
                    icon="las la-door-open"
                    color="green"
                    @click="openCheck()"
                    label="Démarrer"
                  ></q-btn>
                </div>
              </div>
            </div>
          </div>
        </q-tab-panel>
        <q-tab-panel name="departure">
          <div class="q-pt-lg q-pa-lg">
            <div class="text-center">
              <div class="text-h5 text-bold">Départ</div>
              <p>Renseignez votre départ pour toute sortie avec le motif si possible</p>

              <div class="q-pt-md">
                <q-smart-select
                  title="Motif de sortie"
                  @onChange="(code) => (state.entry.code_function = code)"
                  :selected="state.entry.code_function?.id"
                  v-model="state.entry.code_function"
                  :options="state.codes"
                  :prependColor="state.entry.code_function?.colour"
                  option-label="name"
                  option-value="id"
                  option-key="id"
                  label="Motif de départ"
                  filled
                />
              </div>
              <div class="q-pt-lg">
                <q-btn
                  class="fit"
                  icon="las la-sign-in-alt"
                  color="red"
                  label="Démarrer"
                  @click="openCheck()"
                ></q-btn>
              </div>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup>
import facialeCheck from "../../components/faciales/check.vue";
import 'moment/dist/locale/fr'
import moment from "moment";
moment.locale('fr')
import { reactive, onMounted, onBeforeUnmount } from "vue";
import { useQuasar } from "quasar";
import { useSession } from "stores/session";
import { bitev } from "src/sdk";
const $q = useQuasar();
const $store = useSession();
const state = reactive({
  tab: "arrival",
  codes: [],
  controls: [],
  timespeed: null,
  date: {
    day: moment().format("ddd DD ,MMM YYYY"),
    hours: moment().format("HH:mm:ss"),
  },
  entry: {
    action: "arrival",
    code_function: null,
  },
});

onMounted(async () => {
  // await Charge();
  Sync();
  init();
});

function logOut() {
  $store.updateAuthDevice({ auth: false, device: {} });
  $q.notify({
    message: "Déconnection réuissie",
  });
}

async function Charge() {
  $q.loading.show({
    spinnerSize: 20,
  });
  await Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
    // faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  ])
    .catch((err) => {
      console.log("this error", err);
    })
    .then((e) => {
      console.log(e);
    });

  $q.loading.hide();
  // startCamera();
}

async function Init() {
  $q.loading.show({
    spinnerSize: 20,
  });
  await Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
    // faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  ])
    .catch((err) => {
      console.log("this error", err);
    })
    .then((e) => {
      console.log(e);
    });

  $q.loading.hide();
  startCamera();
}

async function init() {
  if (!$store.descriptors.length) {
    $q.loading.show({
      customClass: "bg-black",
      backgroundColor: "black",
      message: "Chargement des données en cours ...",
      spinnerSize: 20,
    });
  }
  state.descriptors = await bitev
    .endpoint("/private/faceapi/descriptors")
    .then((e) => e)
    .catch((err) => []);

  console.log("descriptors", state.descriptors);

  $store.updateDescriptor(state.descriptors);
  $q.loading.hide();
}

onBeforeUnmount(() => {
  if (state.timespeed) clearInterval(state.timespeed);
});

state.timespeed = setInterval(() => {
  state.date = {
    day: moment().format("ddd DD ,MMM YYYY"),
    hours: moment().format("HH:mm:ss"),
  };
}, 1000);

async function Sync() {
  state.codes = await bitev.findMany("function_codes").catch((err) => []);
  defaultCode();
}

function defaultCode() {
  state.codes.map((e) => {
    if (e.code == 0) {
      state.entry.code_function = e;
    }
  });
}

function openCheck() {
  var descriptor = [];
  $store.descriptors.filter((e) => {
    // console.log(e);
    descriptor.push(
      new faceapi.LabeledFaceDescriptors(e.label, [new Float32Array(e.descriptors[0])])
    );
  });

  $q.dialog({
    component: facialeCheck,
    componentProps: {
      descriptors: descriptor || [],
      function_code: state.tab == "arrival" ? null : state.entry.code_function,
      action:
        state.tab == "arrival"
          ? {
              label: "Arrivée",
              value: "arrival",
            }
          : {
              label: "Départ",
              value: "departure",
            },
    },
  });
}
</script>
