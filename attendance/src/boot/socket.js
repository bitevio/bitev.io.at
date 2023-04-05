import { boot } from 'quasar/wrappers'
import {io} from 'socket.io-client'
const socket = io(process.env.NODE_ENV=='production'? '/':'http://localhost:5005',{
  transports:['websocket','polling'],

})
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router} ) => {
  // something to do
  app.provide("socket",socket)
})
