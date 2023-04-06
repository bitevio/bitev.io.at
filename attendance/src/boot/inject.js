import { boot } from 'quasar/wrappers'
import {useQuasar ,Dark} from "quasar"


import 'vant/lib/index.css';
import Vant from 'vant'

import mitt from 'mitt'
const emitter = mitt()

import "@fontsource/space-grotesk";
import '@toast-ui/editor/dist/toastui-editor.css';
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files

import 'v-calendar/dist/style.css';

import Plugin from '@quasar/quasar-ui-qiconpicker'
import '@quasar/quasar-ui-qiconpicker/dist/index.css'


//import { VueDraggableNext as draggable } from "vue-draggable-next";

import VueHighlightJS from 'vue3-highlightjs'
import 'highlight.js/styles/dark.css'

import naive from 'naive-ui'
import routeBehavior from "../components/prevent-back.vue"
export default boot(async ( { app, router}) => {
  // something to do
  app.component('routeBehavior', routeBehavior)
  app.use(naive)

 // app.component('draggable',draggable)

 app.use(VueHighlightJS)

  app.provide("emitter",emitter)
  app.use(Vant)
  app.use(Plugin)


})
