import { defineStore } from 'pinia';
import {bitev} from "../sdk/index"
import { v4 as uuidv4 } from 'uuid';

export const useSession = defineStore('session', {
  persist:true,
  state: () => ({
    pid:0,
    configs:null,
    isAuth:false,
    collections:[],
    insights:[],
    counter: 0,
    local:{},
    descriptors:[],
    authDevice:false,
    device:{
      
    }
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    updateAuthDevice(payload={
      auth:false,
      device:{}
    }){

      this.authDevice = payload.auth
      this.device = payload.device
    },
    updateLocal(payload){
    this.local = payload

    },
    updatePid(){
      this.pid =uuidv4();
     // console.log("PID:",this.pid)
    },
    logout(){

      this.isAuth =false
      bitev.logout()
      bitev.clearToken()

    },
    updateDescriptor(payload){
    this.descriptors=payload || []

    },
   async updateConfigs(settings){

      this.configs =settings


    },
    async login(){

      this.isAuth =true

    },
    updateCollections(collections){

      this.collections = collections;
    },
    updateInsights(payload){
      this.insights =payload
    }
  },
});
