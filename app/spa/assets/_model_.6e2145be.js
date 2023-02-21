import{bv as useSession,bx as useQuasar,bw as useRouter,bG as useRoute,m as reactive,w as watch,o as onMounted,bA as bitev,bF as resolveComponent,aq as openBlock,aF as createBlock,as as withCtx,f as createVNode,az as QToolbarTitle,V as QBtn,u as unref,E as createTextVNode,aw as toDisplayString,aA as QSpace,at as createBaseVNode,ar as createElementBlock,F as Fragment,a7 as renderList,av as createCommentVNode,au as QIcon,bI as QList,aW as QItem,aU as QItemSection,aV as QItemLabel,aB as QSeparator,Q as QInput,a2 as normalizeStyle,ay as QCardActions,B as withDirectives,aE as ClosePopup,aD as QDialog,c7 as QToggle,c9 as _}from"./index.b01ba7b0.js";import{Q as QChip}from"./QChip.cb320810.js";import{Q as QToolbar}from"./QToolbar.566c9c00.js";import{Q as QImg}from"./QImg.207ca294.js";import{a as QField,Q as QSelect}from"./QSelect.a2927ab6.js";import{T as ToastUIEditor,k,F,f as fa,Q as QPopupProxy,a as QColor,p as parse,s as stringify,_ as _sfc_main$1,b as _sfc_main$2}from"./stringify.aef9a668.js";import{Q as QPage}from"./QPage.77dc7dbd.js";import{h as hooks}from"./moment.9709ab41.js";import{b as block0}from"./route-block.b5bad31b.js";import"./QMenu.d43117a7.js";import"./rtl.b51694b1.js";import"./TouchPan.64ffc789.js";import"./touch.70a9dd44.js";import"./QTabs.d8f3aca6.js";import"./QTabPanels.4310d987.js";import"./QScrollArea.c36f9d66.js";import"./QTable.85052c02.js";import"./use-dialog-plugin-component.30a05160.js";const _hoisted_1=createBaseVNode("br",null,null,-1),_hoisted_2={class:"q-gutter-md"},_hoisted_3={id:"model",class:"q-pt-lg q-mx-lg"},_hoisted_4={key:0,class:"row q-col-gutter-lg"},_hoisted_5={class:"col-12 col-md-5"},_hoisted_6={class:"q-gutter-md"},_hoisted_7={key:0,class:"q-py-sm"},_hoisted_8={style:{height:"500px",overflow:"scroll"}},_hoisted_9={key:0,id:"jsonc"},_hoisted_10={class:"text-capitalize text-bold"},_hoisted_11=createBaseVNode("br",null,null,-1),_hoisted_12={style:{border:"0.1px solid #ccc"},class:"row bg-lite q-ma-xs q-col-gutter-xs q-pt-sm"},_hoisted_13={class:"col-12 col-md-4"},_hoisted_14={class:"q-pa-sm"},_hoisted_15=createBaseVNode("p",null," GPS coordinates, latitude and longitude with interactive Maps ",-1),_hoisted_16={class:"col-12 col-md-8"},_hoisted_17={key:0},_hoisted_18={key:1,class:"flex flex-center"},_hoisted_19={class:"q-pa-lg text-center"},_hoisted_20=createBaseVNode("div",null,"Please set token mapbox in project settings",-1),_hoisted_21={key:1,class:"q-py-sm"},_hoisted_22={class:"text-bold"},_hoisted_23=["id"],_hoisted_24={key:2},_hoisted_25={class:"text-capitalize q-py-sm"},_hoisted_26={class:"box q-pa-md rounded-borders"},_hoisted_27={key:0},_hoisted_28={class:"flex flex-center fit text-white"},_hoisted_29={key:1},_hoisted_30={class:"flex flex-center fit text-white"},_hoisted_31={key:3},_hoisted_32={key:4},_hoisted_33={key:5},_hoisted_34={key:6,class:"q-py-sm"},_hoisted_35={key:7,style:{"max-height":"600px",overflow:"scroll"},id:"jsonc"},_hoisted_36={class:"text-capitalize text-bold"},_hoisted_37={key:8,class:"cursor-pointer"},_hoisted_38=["onClick"],_hoisted_39={class:"col-12"},_hoisted_40={key:0},_hoisted_41={key:1},_hoisted_42={key:2},_hoisted_43=createBaseVNode("br",null,null,-1),_hoisted_44={key:0,class:"q-pt-lg"},_hoisted_45={style:{"max-width":"400px"},class:"bg-white text-red q-pa-lg rounded-borders"},_hoisted_46={class:"col-12 col-md-7"},_hoisted_47={key:0},_hoisted_48={class:"text-black"},_hoisted_49=createBaseVNode("b",null,"Last modified",-1),_hoisted_50=createBaseVNode("br",null,null,-1),_hoisted_51=createBaseVNode("br",null,null,-1),_hoisted_52={class:""},_hoisted_53=createBaseVNode("b",null,"Created",-1),_hoisted_54=createBaseVNode("br",null,null,-1),_hoisted_55=createBaseVNode("br",null,null,-1),_sfc_main={__name:"[model]",props:{dialog:!1},setup(__props){const store=useSession(),$q=useQuasar(),LosslessJSONParser={parse,stringify},$router=useRouter(),$route=useRoute(),state=reactive({error:null,loading:!1,model:null,entry:{},item:{},editor:{},jsonFields:[],setFields:[],editorFields:[],computed:[]});watch(()=>{var a;return(a=$route.params)==null?void 0:a.model},()=>{rSync()}),onMounted(()=>{rSync()});function openLibrary(a){$q.dialog({component:_sfc_main$1,componentProps:{field:a}}).onOk(o=>{var t;a.hasMany?((t=state.entry[a.name])!=null&&t.length||(state.entry[a.name]=[]),state.entry[a.name]=[...state.entry[a.name],...o]):state.entry[a.name]=o[0]||null,console.log(state.entry)})}function selectModel(a,o={readOnly:!1}){var s,r;if(a.relationType=="one-to-many"){var t=state.entry[a.name]||[];t=t.map(e=>(e==null?void 0:e.id)||e)}if(a.relationType=="many-to-one"){var t=[];(s=state==null?void 0:state.entry[a.name])!=null&&s.id&&(t=[(r=state==null?void 0:state.entry[a.name])==null?void 0:r.id]),console.log(t)}t=[...new Set(t)],$q.dialog({component:_sfc_main$2,componentProps:{field:{...a},selected:t,readOnly:o.readOnly||!1}}).onOk(e=>{var c;a.relationType=="one-to-many"&&(state.entry[a.name]=e.map(m=>m.id)),a.relationType=="many-to-one"&&(state.entry[a.name]=e[0]||"",state.entry[a.name+"Id"]=((c=e[0])==null?void 0:c.id)||"")})}async function register(){state.error=null,state.loading=!0;var entry={...state.entry},model={...state.model},hiddenRelation=[];model.fields.map(a=>{a.type=="relationship"&&a.relationType=="many-to-one"&&hiddenRelation.push(a.name+"Id")}),hiddenRelation.push("id"),state.jsonFields.map(fieldName=>{try{entry[fieldName]=eval("("+entry[fieldName]+")")}catch(a){}}),state.editorFields.map(a=>{entry[a.name]=state.editor[a.name].getHTML()||""}),state.setFields.map(a=>{var t;try{if(console.log(a),a.relationType=="many-to-one"){var o=((t=entry[a.name])==null?void 0:t.id)||null;o?entry[a.name]={connect:{id:o}}:entry[a.name]={disconnect:!0}}if(a.relationType=="one-to-many"){var o=entry[a.name].map(r=>({id:(r==null?void 0:r.id)||r}));o.length?entry[a.name]={set:o}:entry[a.name]={set:[]}}}catch(s){console.log(s)}}),entry=_.omit(entry,hiddenRelation),entry=_.omit(entry,state.computed);var response=await bitev.updateOne(state.model.slug,{where:{id:$route.query.ref},data:entry},{cleanParams:!1}).catch(a=>(state.error=a,null)).then(a=>a);response&&(state.entry={...state.entry,...response},$q.notify({type:"positive",message:"Saved it"})),state.loading=!1}function rSync(){var o;var a={fields:[]};a=store.configs.collections.filter(t=>t.slug.toLowerCase()==$route.params.model.toLocaleLowerCase())[0],(o=a.fields)==null||o.map(t=>{var s;t.type=="computed"&&state.computed.push(t.name),t.type=="richtext"&&(state.editorFields.push(t),addEditor(t)),t.type.match(/(json|map)/)&&state.jsonFields.push(t.name),t.type=="map"&&(state.entry[t.name]={lat:null,lng:null}),t.type=="relationship"&&(t.relationType=="one-to-many"&&(state.entry[t.name]=[],state.setFields.push(t)),t.relationType=="many-to-one"&&(state.entry[t.name]=null,state.setFields.push(t))),t.type.match(/(string|boolean|datetime|number|password|select|texarea)/)&&(state.entry[t.name]=(s=t==null?void 0:t.defaultValue)!=null?s:null),t.type.match(/(boolean)/)&&(((t==null?void 0:t.defaultValue)=="true"||(t==null?void 0:t.defaultValue)==!0)&&(state.entry[t.name]=!0),((t==null?void 0:t.defaultValue)=="false"||(t==null?void 0:t.defaultValue)==!1||!(t!=null&&t.defaultValue))&&(state.entry[t.name]=!1))}),state.model=a,getEntry(a)}async function getEntry(a){$q.loading.show({message:"Loading data ...."});var o={};a.fields.map(s=>{s.type=="relationship"&&(o[s.name]=!0)});var t=await bitev.findOne(state.model.slug,{where:{id:$route.query.ref||"-"},include:o}).then(s=>s).catch(s=>null);t&&(state.editorFields.map(s=>{state.editor[s.name]=new ToastUIEditor({el:document.querySelector(`#${s.name}-editor`),height:"500px",initialValue:t[s.name]||"",initialEditType:"wysiwyg",previewStyle:"tab"})}),state.entry={...state.entry,...t}),$q.loading.hide()}function deleteOne(){$q.dialog({title:"Action",message:"Do you want to delete this entry",ok:{color:"negative",label:"Delete"}}).onOk(async()=>{$q.loading.show(),await bitev.deleteOne(state.model.slug,{where:{id:$route.query.ref}}).then(a=>{$router.replace("/espace/collections/"+state.model.slug)}).catch(()=>{$q.notify({type:"negative",message:"Unauthorized"})}),$q.loading.hide()})}function addEditor(a){setTimeout(()=>{state.editor[a.name]=new ToastUIEditor({el:document.querySelector(`#${a.name}-editor`),height:"500px",initialEditType:"wysiwyg",previewStyle:"tab"})},200)}function isMap(a){try{a=JSON.parse(a)}catch{a=null}return a||!1}return(a,o)=>{const t=resolveComponent("q-smart-reactif");return openBlock(),createBlock(QPage,{padding:""},{default:withCtx(()=>{var s,r;return[createVNode(QToolbar,{class:"q-pa-none"},{default:withCtx(()=>[createVNode(QToolbarTitle,{class:"text-bold"},{default:withCtx(()=>[createVNode(QBtn,{round:"",flat:"",onClick:o[0]||(o[0]=e=>unref($router).back()),icon:"mdi-arrow-left"}),createTextVNode(" Edition "),createVNode(QChip,{class:"text-weight-light glossy"},{default:withCtx(()=>{var e;return[createTextVNode(toDisplayString((e=unref($route).params)==null?void 0:e.model),1)]}),_:1}),_hoisted_1,createVNode(QChip,{flat:"",class:"text-bold q-ml-md bg-lite text-grey",dense:""},{default:withCtx(()=>[createTextVNode(toDisplayString(unref($route).query.ref),1)]),_:1})]),_:1}),createVNode(QSpace),createBaseVNode("div",_hoisted_2,[createVNode(QBtn,{flat:"",round:"",onClick:o[1]||(o[1]=e=>deleteOne()),icon:"las la-trash"}),createVNode(QBtn,{color:"red",onClick:o[2]||(o[2]=e=>state.sideRight=!0),round:"",unelevated:"",icon:"la la-print"}),createVNode(QBtn,{loading:state.loading,color:"green",round:"",onClick:o[3]||(o[3]=e=>register()),icon:"mdi-check"},null,8,["loading"])])]),_:1}),createBaseVNode("div",_hoisted_3,[state.model?(openBlock(),createElementBlock("div",_hoisted_4,[createBaseVNode("div",_hoisted_5,[createBaseVNode("div",_hoisted_6,[(openBlock(!0),createElementBlock(Fragment,null,renderList(state.model.fields,(e,c)=>(openBlock(),createElementBlock("div",{key:c},[createBaseVNode("div",null,[createVNode(t,null,{default:withCtx(({active:m,toggle:M,close:O})=>{var d,u,p,y,h,V,b,N,g,B,x,v,C,Q,w,$,S,q,T,E,I,D,U;return[e.type=="map"?(openBlock(),createElementBlock("div",_hoisted_7,[createBaseVNode("div",_hoisted_8,[e.type=="map"?(openBlock(),createElementBlock("div",_hoisted_9,[createBaseVNode("div",_hoisted_10,toDisplayString(((d=e.admin)==null?void 0:d.label)||(e==null?void 0:e.label)||e.name),1),_hoisted_11,createBaseVNode("div",_hoisted_12,[createBaseVNode("div",_hoisted_13,[createBaseVNode("div",_hoisted_14,[_hoisted_15,createVNode(unref(k),{id:"jsoneditor",modelValue:state.entry[e.name],"onUpdate:modelValue":n=>state.entry[e.name]=n,mode:"text",mainMenuBar:!1,"navigation-bar":!1,indentation:1,parser:LosslessJSONParser},null,8,["modelValue","onUpdate:modelValue"])])]),createBaseVNode("div",_hoisted_16,[(u=unref(store).configs.settings)!=null&&u.mapbox_token?(openBlock(),createElementBlock("div",_hoisted_17,[isMap(state.entry[e.name]).lat&&isMap(state.entry[e.name]).lng?(openBlock(),createBlock(unref(F),{key:0,"api-key":(p=unref(store).configs.settings)==null?void 0:p.mapbox_token,style:{width:"100%",height:"350px"},center:{lat:isMap(state.entry[e.name]).lat,lng:isMap(state.entry[e.name]).lng},zoom:15},{default:withCtx(()=>[createVNode(unref(fa),{options:{position:{lat:isMap(state.entry[e.name]).lat,lng:isMap(state.entry[e.name]).lng}}},null,8,["options"])]),_:2},1032,["api-key","center"])):createCommentVNode("",!0)])):(openBlock(),createElementBlock("div",_hoisted_18,[createBaseVNode("div",_hoisted_19,[createBaseVNode("span",null,[createVNode(QIcon,{color:"red",size:"lg",name:"las la-map-marked-alt"})]),_hoisted_20])]))])])])):createCommentVNode("",!0)])])):createCommentVNode("",!0),e.type=="richtext"?(openBlock(),createElementBlock("div",_hoisted_21,[createBaseVNode("p",_hoisted_22,toDisplayString(e.admin.label||e.label||e.name),1),createBaseVNode("div",{id:e.name+"-editor"},null,8,_hoisted_23)])):createCommentVNode("",!0),e.type=="media"?(openBlock(),createElementBlock("div",_hoisted_24,[createBaseVNode("div",_hoisted_25,toDisplayString(e.label||e.name),1),createBaseVNode("div",_hoisted_26,[e.hasMany?(openBlock(),createElementBlock("div",_hoisted_29,[state.entry[e.name]?(openBlock(),createBlock(QList,{key:0},{default:withCtx(()=>[(openBlock(!0),createElementBlock(Fragment,null,renderList(state.entry[e.name],(n,l)=>(openBlock(),createBlock(QItem,{key:l},{default:withCtx(()=>[createVNode(QItemSection,null,{default:withCtx(()=>[createVNode(QImg,{dark:"",class:"rounded-borders",height:"40px",src:unref(bitev).assets(state.entry[e.name][l].filedisk,{transform:!0,q:10})},{default:withCtx(()=>[createBaseVNode("div",_hoisted_30,[createBaseVNode("div",null,[createVNode(QItemLabel,{lines:1},{default:withCtx(()=>[createTextVNode(toDisplayString(state.entry[e.name][l].filename),1)]),_:2},1024)])])]),_:2},1032,["src"])]),_:2},1024),createVNode(QItemSection,{side:""},{default:withCtx(()=>[createVNode(QBtn,{onClick:i=>{state.entry[e.name]=state.entry[e.name].filter((P,L)=>l!==L)},flat:"",round:"",icon:"mdi-close"},null,8,["onClick"])]),_:2},1024)]),_:2},1024))),128)),state.entry[e.name].length?createCommentVNode("",!0):(openBlock(),createBlock(QItem,{key:0,class:"text-gray text-bold"},{default:withCtx(()=>[createTextVNode(" No "+toDisplayString(e.name)+" selected ",1)]),_:2},1024))]),_:2},1024)):createCommentVNode("",!0)])):(openBlock(),createElementBlock("div",_hoisted_27,[createVNode(QList,null,{default:withCtx(()=>[state.entry[e.name]?(openBlock(),createBlock(QItem,{key:0},{default:withCtx(()=>[createVNode(QItemSection,null,{default:withCtx(()=>[createVNode(QImg,{dark:"",class:"rounded-borders",height:"40px",src:unref(bitev).assets(state.entry[e.name].filedisk,{transform:!0,q:10})},{default:withCtx(()=>[createBaseVNode("div",_hoisted_28,[createBaseVNode("div",null,[createVNode(QItemLabel,{lines:1},{default:withCtx(()=>[createTextVNode(toDisplayString(state.entry[e.name].filename),1)]),_:2},1024)])])]),_:2},1032,["src"])]),_:2},1024),createVNode(QItemSection,{side:""},{default:withCtx(()=>[createVNode(QBtn,{onClick:n=>state.entry[e.name]=null,flat:"",round:"",icon:"mdi-close"},null,8,["onClick"])]),_:2},1024)]),_:2},1024)):(openBlock(),createBlock(QItem,{key:1,class:"text-gray text-bold"},{default:withCtx(()=>[createTextVNode(" No "+toDisplayString(e.name)+" selected ",1)]),_:2},1024))]),_:2},1024)])),createVNode(QSeparator,{spaced:""}),createVNode(QBtn,{onClick:n=>openLibrary(e),outline:"",class:"bg-moon",flat:"",icon:"mdi-plus",label:`Choose ${((y=e.admin)==null?void 0:y.label)||e.name}`},null,8,["onClick","label"])])])):createCommentVNode("",!0),e.type.match(/^(computed)$/)?(openBlock(),createElementBlock("div",_hoisted_31,[createVNode(QField,{"stack-label":"",label:`${((h=e==null?void 0:e.admin)==null?void 0:h.label)||(e==null?void 0:e.label)||(e==null?void 0:e.name)}`,outlined:""},{control:withCtx(()=>[createBaseVNode("div",null,toDisplayString((state==null?void 0:state.entry[e.name])||""),1)]),_:2},1032,["label"])])):createCommentVNode("",!0),e.type.match(/^(time)$/)?(openBlock(),createElementBlock("div",_hoisted_32,[createVNode(QInput,{prefix:((V=e.admin)==null?void 0:V.prefix)||"",readonly:e.admin.readonly||!1,outlined:"",type:"time",suffix:((b=e.admin)==null?void 0:b.suffix)||"",modelValue:state.entry[e.name],"onUpdate:modelValue":n=>state.entry[e.name]=n,"stack-label":"",color:"secondary",label:`${((N=e==null?void 0:e.admin)==null?void 0:N.label)||(e==null?void 0:e.label)||(e==null?void 0:e.name)}`,clearable:e.clearable||!1},null,8,["prefix","readonly","suffix","modelValue","onUpdate:modelValue","label","clearable"])])):createCommentVNode("",!0),e.type.match(/(date|datetime-local)/)?(openBlock(),createElementBlock("div",_hoisted_33,[createVNode(QInput,{prefix:((g=e.admin)==null?void 0:g.prefix)||"",suffix:((B=e.admin)==null?void 0:B.suffix)||"",outlined:"",readonly:e.admin.readonly||!1,type:e.type=="datetime"?"date":e.type,modelValue:state.entry[e.name],"onUpdate:modelValue":n=>state.entry[e.name]=n,"stack-label":"",color:"secondary",label:`${((x=e==null?void 0:e.admin)==null?void 0:x.label)||(e==null?void 0:e.label)||(e==null?void 0:e.name)}`,clearable:e.clearable||!1},null,8,["prefix","suffix","readonly","type","modelValue","onUpdate:modelValue","label","clearable"])])):createCommentVNode("",!0),e.type.match(/^(colour)$/)?(openBlock(),createElementBlock("div",_hoisted_34,[createVNode(t,null,{default:withCtx(({active:n,toogle:l})=>[createVNode(QInput,{modelValue:state.entry[e.name],"onUpdate:modelValue":i=>state.entry[e.name]=i,outlined:"",outline:"",label:"Default color",class:"fit"},{prepend:withCtx(()=>[createBaseVNode("div",null,[createVNode(QIcon,{style:normalizeStyle(`color:${state.entry[e.name]||""}`),name:"mdi-circle"},null,8,["style"])])]),append:withCtx(()=>[createVNode(QBtn,{flat:"",icon:"colorize"},{default:withCtx(()=>[createVNode(QPopupProxy,{cover:"",class:"bg-transparent shadow-0",flat:"","transition-show":"scale","transition-hide":"scale","model-value":n},{default:withCtx(()=>[createVNode(QCardActions,{class:"bg-transparent"},{default:withCtx(()=>[createVNode(QSpace),withDirectives(createVNode(QBtn,{push:"","fab-mini":"",color:"black",icon:"mdi-close"},null,512),[[ClosePopup]])]),_:1}),createVNode(QColor,{modelValue:state.entry[e.name],"onUpdate:modelValue":i=>state.entry[e.name]=i},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1032,["model-value"])]),_:2},1024)]),_:2},1032,["modelValue","onUpdate:modelValue"]),createVNode(QDialog,{"model-value":n},{default:withCtx(()=>[createVNode(QColor,{dark:""})]),_:2},1032,["model-value"])]),_:2},1024)])):createCommentVNode("",!0),e.type=="json"?(openBlock(),createElementBlock("div",_hoisted_35,[createBaseVNode("span",_hoisted_36,toDisplayString(e.admin.label||e.label||e.name),1),createVNode(unref(k),{modelValue:state.entry[e.name],"onUpdate:modelValue":n=>state.entry[e.name]=n,mode:"text",mainMenuBar:!0,indentation:1,parser:LosslessJSONParser},null,8,["modelValue","onUpdate:modelValue"])])):createCommentVNode("",!0),e.type=="relationship"?(openBlock(),createElementBlock("div",_hoisted_37,[createBaseVNode("div",{onClick:n=>{var l;return selectModel(e,{readOnly:((l=e.admin)==null?void 0:l.readonly)||!1})},class:"row q-col-gutter-md items-center align-center"},[createBaseVNode("div",_hoisted_39,[createVNode(QField,{class:"no-pointer-events",outlined:"","stack-label":"",color:"secondary",label:`${((v=e==null?void 0:e.admin)==null?void 0:v.label)||(e==null?void 0:e.name)}`,clearable:e.clearable||!1},{control:withCtx(()=>{var n;return[createBaseVNode("div",null,[e.relationType=="one-to-many"&&state.entry[e.name]?(openBlock(),createElementBlock("span",_hoisted_40,toDisplayString(((n=state.entry[e.name])==null?void 0:n.length)||0)+" Selected ",1)):createCommentVNode("",!0),e.relationType.match(/^(many-to-one|one-to-one)$/)&&state.entry[e.name]?(openBlock(),createElementBlock("span",_hoisted_41,toDisplayString(state.entry[e.name][Object.keys(state==null?void 0:state.entry[e.name])[1]]),1)):createCommentVNode("",!0),state.entry[e.name]?createCommentVNode("",!0):(openBlock(),createElementBlock("span",_hoisted_42))])]}),append:withCtx(()=>[createVNode(QIcon,{name:"mdi-menu-down"})]),_:2},1032,["label","clearable"])])],8,_hoisted_38)])):createCommentVNode("",!0),e.type=="password"?(openBlock(),createBlock(QInput,{key:9,outlined:"",prefix:((C=e.admin)==null?void 0:C.prefix)||"",suffix:((Q=e.admin)==null?void 0:Q.suffix)||"",readonly:e.admin.readonly||!1,color:"secondary",label:`${((w=e==null?void 0:e.admin)==null?void 0:w.label)||(e==null?void 0:e.name)}`,modelValue:state.entry[e.name],"onUpdate:modelValue":n=>state.entry[e.name]=n,type:m?"text":"password",clearable:e.clearable||!1},{append:withCtx(()=>[createVNode(QBtn,{flat:"",onClick:M,dense:"",icon:m?"mdi-eye":"mdi-eye-off"},null,8,["onClick","icon"])]),_:2},1032,["prefix","suffix","readonly","label","modelValue","onUpdate:modelValue","type","clearable"])):createCommentVNode("",!0),e.type=="boolean"?(openBlock(),createBlock(QToggle,{key:10,readonly:e.admin.readonly||!1,outlined:"",modelValue:state.entry[e.name],"onUpdate:modelValue":n=>state.entry[e.name]=n,color:"secondary",label:`${(($=e==null?void 0:e.admin)==null?void 0:$.label)||(e==null?void 0:e.label)||(e==null?void 0:e.name)}`},null,8,["readonly","modelValue","onUpdate:modelValue","label"])):createCommentVNode("",!0),e.type.match(/^(text|string|textarea|email|search)$/)?(openBlock(),createBlock(QInput,{key:11,prefix:((S=e.admin)==null?void 0:S.prefix)||"",outlined:"",suffix:((q=e.admin)==null?void 0:q.suffix)||"",readonly:e.admin.readonly||!1,modelValue:state.entry[e.name],"onUpdate:modelValue":n=>state.entry[e.name]=n,color:"secondary",label:`${((T=e==null?void 0:e.admin)==null?void 0:T.label)||(e==null?void 0:e.name)}`,clearable:e.clearable||!1,type:e.type=="string"?"text":e.type},null,8,["prefix","suffix","readonly","modelValue","onUpdate:modelValue","label","clearable","type"])):createCommentVNode("",!0),e.type.match(/(number|integer|float)/)?(openBlock(),createBlock(QInput,{key:12,outlined:"",prefix:((E=e.admin)==null?void 0:E.prefix)||"",suffix:((I=e.admin)==null?void 0:I.suffix)||"",readonly:e.admin.readonly||!1,color:"secondary",modelValue:state.entry[e.name],"onUpdate:modelValue":n=>state.entry[e.name]=n,modelModifiers:{number:!0},label:`${((D=e==null?void 0:e.admin)==null?void 0:D.label)||(e==null?void 0:e.name)}`,clearable:e.clearable||!1,type:"number"},null,8,["prefix","suffix","readonly","modelValue","onUpdate:modelValue","label","clearable"])):createCommentVNode("",!0),e.type.match(/(select)/)?(openBlock(),createBlock(QSelect,{key:13,multiple:e.hasMany?e.hasMany:!1,outlined:"",options:e.options||[],color:"secondary",modelValue:state.entry[e.name],"onUpdate:modelValue":n=>state.entry[e.name]=n,modelModifiers:{number:!0},label:`${((U=e==null?void 0:e.admin)==null?void 0:U.label)||(e==null?void 0:e.name)}`,clearable:e.clearable||!1,type:"number"},null,8,["multiple","options","modelValue","onUpdate:modelValue","label","clearable"])):createCommentVNode("",!0)]}),_:2},1024)])]))),128)),_hoisted_43,createVNode(QBtn,{loading:state.loading,"no-caps":"",onClick:o[4]||(o[4]=e=>register()),icon:"mdi-content-save",color:"primary",label:"Save it"},null,8,["loading"])]),state.error?(openBlock(),createElementBlock("div",_hoisted_44,[createBaseVNode("div",_hoisted_45,[createBaseVNode("div",null,toDisplayString(state.error),1)])])):createCommentVNode("",!0)]),createBaseVNode("div",_hoisted_46,[((s=state==null?void 0:state.entry)==null?void 0:s.createdAt)&&((r=state==null?void 0:state.entry)==null?void 0:r.updatedAt)?(openBlock(),createElementBlock("div",_hoisted_47,[createBaseVNode("p",_hoisted_48,[_hoisted_49,createTextVNode(),_hoisted_50,createTextVNode(" "+toDisplayString(state.entry.updatedAt)+" ",1),_hoisted_51,createVNode(QIcon,{name:"las la-calendar-alt"}),createTextVNode(" "+toDisplayString(unref(hooks)(state.entry.updatedAt)),1)]),createBaseVNode("p",_hoisted_52,[_hoisted_53,createTextVNode(),_hoisted_54,createTextVNode(" "+toDisplayString(state.entry.createdAt)+" ",1),_hoisted_55,createVNode(QIcon,{name:"las la-calendar-alt"}),createTextVNode(" "+toDisplayString(unref(hooks)(state.entry.createdAt)),1)])])):createCommentVNode("",!0)])])):createCommentVNode("",!0)])]}),_:1})}}};typeof block0=="function"&&block0(_sfc_main);export{_sfc_main as default};
