<template>
  <q-smart-dialog
    position="bottom"
    maximized=""
    ref="dialogRef"
    class="flex fit flex-center"
    padding
  >
    <q-card>
      <q-card-actions>
        <q-btn flat v-close-popup round icon="mdi-close"></q-btn>
        <q-space />
        <q-btn
          @click="save"
          round
          color="green"
          icon="mdi-check"
          v-if="state.score > 0.9"
        ></q-btn>
      </q-card-actions>
      <q-card-section id="section" style="height: 65vh" class="scroll">
        <div class="hidden">
          <van-uploader
            capture=""
            v-model="state.img"
            :max-count="1"
            ref="pick"
          ></van-uploader>
        </div>
        <q-inner-loading class="fit" :showing="state.isReady">
          <q-spinner-ios size="50px" color="primary" />
          <p>Chargement ....</p>
        </q-inner-loading>
        <div style="height: 50vh" class="relative-position scroll text-center">
          <img
            v-show="state.img.length"
            :src="state.img[0]?.content"
            style="height: 48vh"
            id="img"
            ref="img"
            alt=""
          />
        </div>
        <div class="text-center" v-if="!state.loading">
          <span class="text-bold" v-if="state.score > 0.5"
            >Score : {{ Number(state.score).toFixed(2) }}</span
          >
        </div>
        <div v-else class="text-center">
          <q-spinner-ios color="primary" size="2rem" :thickness="5" />
          <p>Détection en cours....</p>
        </div>
      </q-card-section>
      <q-card-actions class="q-pa-md bg-white text-white">
        <div class="fit text-center q-gutter-md">
          {{ state.loading }} mmm
          <q-btn
            :disable="state.isReady ? true : false"
            @click="selectPhoto()"
            color="primary"
            class="fit"
            label="Capturer"
            unelevated
            icon="las la-camera"
          ></q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </q-smart-dialog>
</template>

<script setup>
import { useQuasar, useDialogPluginComponent } from "quasar";

import * as faceapi from "face-api.js";
import { bitev } from "../../sdk";
import { resizeResults } from "face-api.js";
import { onBeforeMount, onMounted, reactive, ref, onBeforeUnmount, watch } from "vue";
const dialogRef = ref(null);
const $q = useQuasar();
const img = ref(null);
const pick = ref(null);
const state = reactive({
  isReady: false,
  score: 0,
  img: [],
  loading: false,
  items: [],
  height: window.innerHeight,
  stream: null,
  openPhoto: false,
  onDetect: null,
});

watch(
  () => state.img,
  (val) => {
    console.log(val);
    if (val.length) startScan();
  }
);

onBeforeUnmount(() => {
  if (state.onDetect) clearInterval(state.onDetect);
});

onMounted(async () => {
  state.isReady = true;
  await Init();
  state.isReady = false;
  setTimeout(() => {
    pick.value.chooseFile();
  }, 200);
});

function selectPhoto() {
  state.score = 0;
  state.img = [];

  setTimeout(() => {
    pick.value.chooseFile();
  }, 400);
}

const startScan = async () => {
  // Can be set to the src of an image now
  state.loading = true;
  img.value.addEventListener("load", async () => {
    state.score = 0;
    await detectFace();
    state.loading = false;
  });
};

async function Init() {
  var modelFile = "/models";

  await Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri(modelFile),
    faceapi.nets.tinyFaceDetector.loadFromUri(modelFile),
    faceapi.nets.faceExpressionNet.loadFromUri(modelFile),
    faceapi.nets.faceLandmark68Net.loadFromUri(modelFile),
    faceapi.nets.faceRecognitionNet.loadFromUri(modelFile),
  ]).catch((err) => {
    console.log(err);
  });
}
async function detectFace() {
  const input = document.getElementById("img");
  const canvas = faceapi.createCanvasFromMedia(input);
  const section = document.getElementById("section");
  //section.append(canvas);

  const detections = await faceapi
    .detectSingleFace(input, new faceapi.TinyFaceDetectorOptions())
    // .withFaceExpressions()
    .withFaceLandmarks()
    .withFaceDescriptor();

  if (detections) {
    console.log(detections);
    state.score = detections?.detection?._score;
    // console.log(detections);
    // canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    // const displaySize = {
    // width: input.clientWidth || 0,
    //  height: input.clientHeight || 0,
    // };

    // const resizedDetections = faceapi.resizeResults(detections, displaySize);
    //  faceapi.draw.drawDetections(canvas, resizedDetections, {});
    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections, {
    // drawLines: false,
    // });
  }
}

async function save() {
  $q.loading.show();
  var img = await bitev
    .upload(state.img, {
      data: {
        score: state.score,
      },
    })
    .then((e) => e)
    .catch((err) => []);
  dialogRef.value.onDialogOK(img);
  $q.loading.hide();
}
</script>
