import{bv as _,bx as v,m as f,w as g,bF as w,aq as d,ar as r,f as o,as as i,at as s,Q as c,au as u,V as b,bA as y}from"./index.ea08f9f2.js";import{Q as V}from"./QPage.1e0d7bc4.js";const x={key:0},Q={class:"row justify-center"},k={class:"col-12 col-sm-6"},A={class:"column text-center q-gutter-md"},I=s("div",{class:"q-py-md"},[s("div",{class:"text-h5 text-bold"},"Authentification d'appareil")],-1),q={key:1},M={__name:"controls",setup(B){const l=_(),p=v(),e=f({permit:l.authDevice,loading:!1,auth:{code:"",password:null}});console.log("III",l.authDevice),g(()=>l.authDevice,t=>{console.log("Val is",t),e.permit=t});async function m(){e.loading=!0;var t=await y.auth("devices",{where:{code:e.auth.code,password:e.auth.password}}).then(a=>a).catch(a=>a);t!=null&&t.auth?(l.updateAuthDevice({auth:!0,device:t.user}),e.permit=!0):p.notify({type:"negative",message:"Authentification \xE9chou\xE9e"}),e.loading=!1,console.log(t)}return(t,a)=>{const h=w("router-view");return e.permit?(d(),r("div",q,[o(h)])):(d(),r("div",x,[o(V,{padding:""},{default:i(()=>[s("div",Q,[s("div",k,[s("div",null,[s("div",A,[I,o(c,{outlined:"",modelValue:e.auth.code,"onUpdate:modelValue":a[0]||(a[0]=n=>e.auth.code=n),modelModifiers:{number:!0},type:"text",label:"Code Appareil"},{prepend:i(()=>[o(u,{name:"las la-mobile"})]),_:1},8,["modelValue"]),o(c,{outlined:"",modelValue:e.auth.password,"onUpdate:modelValue":a[1]||(a[1]=n=>e.auth.password=n),type:"password",label:"Mot de passe"},{prepend:i(()=>[o(u,{name:"las la-key"})]),_:1},8,["modelValue"]),o(b,{loading:e.loading,onClick:m,color:"primary",label:"Se connecter"},null,8,["loading"])])])])])]),_:1})]))}}};export{M as default};
