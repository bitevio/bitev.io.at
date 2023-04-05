import {Bitev} from "bitev.io.js"
console.log(process.env)
import {reactive,ref ,onMounted} from "vue"
import  { useSession } from "../stores/session"
const descriptors =ref(null)
const bitev = new Bitev({
    key:'AT-',
    cookies:{
        secure:true
    },
    debug: true,
    apiURL:process.env.API_URL
})


async function getAllCollection(){ // obtention des collections
const store =useSession()
var response = await bitev.getCollections().then(e=>e).catch(err=>[])

store.updateCollections(response)
return response

}

function getOneCollection(name=''){
const store =useSession()

var is= store.configs.collections.filter((col)=>col.slug==name)
return is[0] || {}
}

function getOneField(collectionName,fieldName=''){
    const store =useSession()
    var field = [null]
    var is= store.collections.filter((col)=>col.slug==collectionName)
    if(is.length){
        field = is[0].fields.filter(f=>f.name==fieldName)
    }
    return field[0] || null
}

function getLabelCollection(model) {
    var model_ = getOneCollection(model);
    return model_?.admin?.label || model_?.name || "";
}

function getLabelField(model,fieldname) {
    var field_ = getOneField(model,fieldname);
    return field_?.admin?.label || field_?.name || "";
}

function syncInsights(){
    const store =useSession()
    var insights = bitev.findMany('insights').then(e=>e).catch(err=>[])
    store.updateInsights(insights)

}


async function syncConfig(){
    const store =useSession()
    var configs = await bitev.getConfig();
    store.updateConfigs(configs)
}




export{
    bitev,
    getAllCollection,
    getOneCollection,
    syncInsights,
    syncConfig,
    getOneField,
    getLabelCollection,
    getLabelField,
    descriptors
    
}