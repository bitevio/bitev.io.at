import{Q as d}from"./QImg.207ca294.js";import{bv as f,bw as h,bx as g,m as v,aq as b,aF as x,as as o,by as y,f as t,at as e,Q as c,V as r,au as w,E as u,bz as Q,bA as V}from"./index.b01ba7b0.js";import{Q as q}from"./QPage.77dc7dbd.js";const B={class:"row"},M={class:"col-12 col-md-4"},k={style:{height:"100vh"},class:"q-pa-lg"},A={class:"q-pa-lg",id:"model"},I={class:"row"},S={class:"col-2"},C=e("div",{class:"col-10"},[e("div",{class:"text-bold"},"Attendance Management System"),u(" v.0.1 ")],-1),H=e("br",null,null,-1),N=e("br",null,null,-1),P={class:"q-gutter-md q-pt-lg"},$={class:"q-pt-lg"},z={class:"col-12 col-md-8"},D={class:"fit q-pa-lg"},E={class:"flex fit flex-center"},F=e("div",{class:"text-h4 text-bold"},"Syst\xE8me de gestion de pr\xE9sence",-1),G=e("br",null,null,-1),T={__name:"IndexPage",setup(L){const i=f(),p=h(),_=g(),s=v({loading:!1,entry:{email:null,password:null}});async function m(){s.loading=!0;var l=await V.auth("employees",{where:{email:s.entry.email,password:s.entry.password}}).then(a=>a).catch(a=>(s.error=a,!1));console.log(l),l?(await i.updateLocal(l),await i.login(),p.push("/apps")):_.notify({message:"Authentication failed"}),s.loading=!1}return(l,a)=>(b(),x(y,null,{default:o(()=>[t(Q,null,{default:o(()=>[t(q,null,{default:o(()=>[e("div",B,[e("div",M,[e("div",k,[e("div",A,[e("div",I,[e("div",S,[t(d,{width:"40px",src:"bitev.png","spinner-color":"primary","spinner-size":"82px"})]),C]),H,N,e("div",P,[t(c,{outlined:"",modelValue:s.entry.email,"onUpdate:modelValue":a[0]||(a[0]=n=>s.entry.email=n),type:"text",label:"E-mail"},null,8,["modelValue"]),t(c,{outlined:"",modelValue:s.entry.password,"onUpdate:modelValue":a[1]||(a[1]=n=>s.entry.password=n),type:"text",label:"Mot de passe"},null,8,["modelValue"]),t(r,{onClick:m,loading:s.loading,color:"primary",label:"Se connecter"},null,8,["loading"])]),e("div",$,[t(r,{outline:"","no-caps":"",label:"Mot de passe oubli\xE9 ?"})])])])]),e("div",z,[t(d,{class:"fit",src:"https://images.unsplash.com/photo-1581084324492-c8076f130f86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"},{default:o(()=>[e("div",D,[e("div",E,[e("div",null,[F,e("p",null,[t(w,{name:"mdi-check-circle"}),u(" Reconaissance Faciale "),G])])])])]),_:1})])])]),_:1})]),_:1})]),_:1}))}};export{T as default};
