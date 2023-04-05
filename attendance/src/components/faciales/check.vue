<template>
  <q-dialog
    ref="dialogRef"
    transition-hide="fade"
    transition-show="fade"
    maximized=""
    class="text-center"
  >
    <q-card class="bg-moon text-white">
      <q-card-actions style="z-index: 9999" class="fixed-top bg-black">
        <q-space />
        <q-btn round dark flat v-close-popup icon="mdi-close"></q-btn>
      </q-card-actions>
      <q-card-section style="height: 100%">
        <div v-if="state.loading">
          <div class="q-pt-lg q-pa-lg">
            <div class="q-gutter-sm">
              <q-skeleton type="QAvatar"></q-skeleton>
              <q-skeleton type="text"></q-skeleton>
              <q-skeleton type="text"></q-skeleton>
              <q-skeleton type="QInput"></q-skeleton>
            </div>
          </div>
        </div>
        <div class="fit" v-else>
          <div class="cadran-ui"></div>
          <div id="section" class="flex fit flex-center">
            <video class="fit video-full" id="video" style="width: 100%" autoplay></video>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
//import * as tf from "@tensorflow/tfjs";
import { defineComponent, reactive, ref, onMounted, onBeforeUnmount } from "vue";

import res from "./result.vue";

import { useQuasar, useDialogPluginComponent } from "quasar";
import { bitev, descriptors } from "../../sdk";
const { dialogRef, onDialogOK } = useDialogPluginComponent();
const $q = useQuasar();
const state = reactive({
  descriptors: [],
  loading: false,
  detect: null,
  stream: null,
});
const video = ref(null);
const props = defineProps({
  descriptors: [],
  function_code: null,
  action: null,
});

onBeforeUnmount(() => {
  stopCamera();
});

onMounted(async () => {
  // return false;
  await Init();
  //startCamera();
  // startWorker();
});

function startWorker() {}

async function Init() {
  $q.loading.show({
    spinnerSize: 20,
  });
  await Promise.all([
    faceapi.nets.ssdMobilenetv1.load(
      "https://cdn.jsdelivr.net/gh/cgarciagl/face-api.js@0.22.2/weights/ssd_mobilenetv1_model-weights_manifest.json"
    ),
    faceapi.nets.tinyFaceDetector.load(
      "https://cdn.jsdelivr.net/gh/cgarciagl/face-api.js@0.22.2/weights/tiny_face_detector_model-weights_manifest.json"
    ),
    // faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    faceapi.nets.faceLandmark68Net.load(
      "https://cdn.jsdelivr.net/gh/cgarciagl/face-api.js@0.22.2/weights/face_landmark_68_model-weights_manifest.json"
    ),
    faceapi.nets.faceRecognitionNet.load(
      "https://cdn.jsdelivr.net/gh/cgarciagl/face-api.js@0.22.2/weights/face_recognition_model-weights_manifest.json"
    ),
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

function stopCamera() {
  if (state.stream)
    state.stream.getTracks().forEach(function (track) {
      track.stop();
    });

  if (state.detect) clearInterval(state.detect);
  state.detect = null;
}

async function startImg(descriptorsSearch = []) {
  if (!descriptorsSearch.length) return;

  const threshold = 0.35;
  const faceMatcher = new faceapi.FaceMatcher(props.descriptors, threshold);

  const result = faceMatcher.findBestMatch(descriptorsSearch);

  state.is = result.label;

  if (result.label !== "unknown") {
    if (result.label) {
      stopCamera();
      onDialogOK(true);
      $q.dialog({
        component: res,
        componentProps: {
          result: result.label,
          action: props.action,
          function_code: props.function_code,
        },
      });
    }
  }
}

function startCamera() {
  navigator.mediaDevices
    .getUserMedia({
      video: {
        facingMode: "user",
        echoCancellation: true,

        width: {
          width: { min: 1024, ideal: 1280, max: 1920 },
          height: { min: 776, ideal: 720, max: 1080 },
        },
      },
    })
    .then((stream) => {
      state.stream = stream;
      var video = document.getElementById("video");
      video.srcObject = stream;
      video.addEventListener("play", () => {
        const canvas = faceapi.createCanvasFromMedia(video);
        const section = document.getElementById("section");

        section.append(canvas);
        //console.log(video.width);
        const displaySize = {
          width: video.clientWidth,
          height: video.clientHeight,
        };
        faceapi.matchDimensions(canvas, displaySize);
        state.detect = setInterval(async () => {
          try {
            const detections = await faceapi
              .detectSingleFace(
                video,
                new faceapi.TinyFaceDetectorOptions({
                  scoreThreshold: 0.5,
                  inputSize: 320,
                })
              )

              .withFaceLandmarks()
              .withFaceDescriptor();
            // .withFaceExpressions();

            if (detections) {
              console.log("Detection", detections);
              canvas.style.visibility = "visible";
              const resizedDetections = faceapi.resizeResults(detections, displaySize);

              canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
              faceapi.draw.drawDetections(canvas, resizedDetections);
              faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

              startImg(detections.descriptor);
            } else {
              canvas.style.visibility = "hidden";
              //  console.log("No detection");
              // const resizedDetections = faceapi.resizeResults(detections, displaySize);

              canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
              // faceapi.draw.drawDetections(canvas, null);
              // faceapi.draw.drawFaceLandmarks(canvas, null);
            }
          } catch (err) {
            console.log(err);
          }
        }, 300);
        state.detect;
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>
