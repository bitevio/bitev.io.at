import{L as ee,r as b,c as I,w as te,o as H,l as le,h,ap as de,au as me,bB as fe,b3 as pe,g as ge,bV as _e,aj as ve,P as he,bn as ye,bW as be,bX as we,bx as G,m as Y,bF as L,aq as m,aF as Q,as as l,f as t,ax as ae,ay as M,B as z,V as w,aE as oe,aA as A,av as K,aC as se,at as i,bY as Ce,C as xe,ar as x,aw as k,bZ as ke,bA as V,az as ne,E as C,Q as W,F as ie,a7 as re,u as Qe,aD as Se,bz as $e,bI as Te,aW as Fe,aU as Le,aV as X,b5 as Pe,by as qe}from"./index.ea08f9f2.js";import{Q as Z}from"./QToolbar.02c67485.js";import{Q as Re}from"./QHeader.5bdb9cdb.js";import{T as Ve}from"./TouchPan.8cbd0012.js";import{n as R,c as Be,d as De,T as Ie,Q as N}from"./FaceMatcher.c120c4e3.js";import{Q as Me}from"./QPageSticky.3419f231.js";import{Q as ze}from"./QPage.1e0d7bc4.js";import{u as Ee}from"./use-dialog-plugin-component.cb570f72.js";import{b as J}from"./route-block.b5bad31b.js";import"./touch.70a9dd44.js";const F=40,O=20;var Ue=ee({name:"QPullToRefresh",props:{color:String,bgColor:String,icon:String,noMouse:Boolean,disable:Boolean,scrollTarget:{default:void 0}},emits:["refresh"],setup(u,{slots:d,emit:r}){const{proxy:p}=ge(),{$q:y}=p,e=b("pull"),c=b(0),g=b(!1),o=b(-F),n=b(!1),_=b({}),a=I(()=>({opacity:c.value,transform:`translateY(${o.value}px) rotate(${c.value*360}deg)`})),s=I(()=>"q-pull-to-refresh__puller row flex-center"+(n.value===!0?" q-pull-to-refresh__puller--animating":"")+(u.bgColor!==void 0?` bg-${u.bgColor}`:""));function f(v){if(v.isFinal===!0){g.value===!0&&(g.value=!1,e.value==="pulled"?(e.value="refreshing",B({pos:O}),T()):e.value==="pull"&&B({pos:-F,ratio:0}));return}if(n.value===!0||e.value==="refreshing")return!1;if(v.isFirst===!0){if(_e(j)!==0||v.direction!=="down")return g.value===!0&&(g.value=!1,e.value="pull",B({pos:-F,ratio:0})),!1;g.value=!0;const{top:ce,left:ue}=D.getBoundingClientRect();_.value={top:ce+"px",left:ue+"px",width:window.getComputedStyle(D).getPropertyValue("width")}}ve(v.evt);const P=Math.min(140,Math.max(0,v.distance.y));o.value=P-F,c.value=he(P/(O+F),0,1);const q=o.value>O?"pulled":"pull";e.value!==q&&(e.value=q)}const S=I(()=>{const v={down:!0};return u.noMouse!==!0&&(v.mouse=!0),[[Ve,f,void 0,v]]}),$=I(()=>`q-pull-to-refresh__content${g.value===!0?" no-pointer-events":""}`);function T(){r("refresh",()=>{B({pos:-F,ratio:0},()=>{e.value="pull"})})}function B({pos:v,ratio:P},q){n.value=!0,o.value=v,P!==void 0&&(c.value=P),clearTimeout(E),E=setTimeout(()=>{n.value=!1,q&&q()},300)}let D,j,E;function U(){j=ye(D,u.scrollTarget)}return te(()=>u.scrollTarget,U),H(()=>{D=p.$el,U()}),le(()=>{clearTimeout(E)}),Object.assign(p,{trigger:T,updateScrollTarget:U}),()=>{const v=[h("div",{class:$.value},de(d.default)),h("div",{class:"q-pull-to-refresh__puller-container fixed row flex-center no-pointer-events z-top",style:_.value},[h("div",{class:s.value,style:a.value},[e.value!=="refreshing"?h(me,{name:u.icon||y.iconSet.pullToRefresh.icon,color:u.color,size:"32px"}):h(fe,{size:"24px",color:u.color})])])];return pe("div",{class:"q-pull-to-refresh"},v,"main",u.disable===!1,()=>S.value)}}});const Ne=[h("g",{transform:"translate(-20,-20)"},[h("path",{d:"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z",fill:"currentColor"},[h("animateTransform",{attributeName:"transform",type:"rotate",from:"90 50 50",to:"0 50 50",dur:"1s",repeatCount:"indefinite"})])]),h("g",{transform:"translate(20,20) rotate(15 50 50)"},[h("path",{d:"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z",fill:"currentColor"},[h("animateTransform",{attributeName:"transform",type:"rotate",from:"0 50 50",to:"90 50 50",dur:"1s",repeatCount:"indefinite"})])])];var Oe=ee({name:"QSpinnerGears",props:be,setup(u){const{cSize:d,classes:r}=we(u);return()=>h("svg",{class:r.value,width:d.value,height:d.value,viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid",xmlns:"http://www.w3.org/2000/svg"},Ne)}});const Ae={class:"hidden"},He={style:{height:"50vh"},class:"relative-position scroll text-center"},Ge=["src"],Ye={key:0,class:"text-center"},je={key:0,class:"text-bold"},Ke={key:1,class:"text-center"},We=i("p",null,"D\xE9tection en cours....",-1),Xe={class:"fit text-center q-gutter-md"},Ze={__name:"addPhoto",setup(u){const d=b(null),r=G(),p=b(null),y=b(null),e=Y({isReady:!1,score:0,img:[],loading:!1,items:[],height:window.innerHeight,stream:null,openPhoto:!1,onDetect:null});te(()=>e.img,a=>{console.log(a),a.length&&g()}),le(()=>{e.onDetect&&clearInterval(e.onDetect)}),H(async()=>{e.isReady=!0,await o(),e.isReady=!1});function c(){e.score=0,e.img=[],setTimeout(()=>{y.value.chooseFile()},400)}const g=async()=>{e.loading=!0,p.value.addEventListener("load",async()=>{e.score=0,await n(),e.loading=!1})};async function o(){var a="/models";await Promise.all([R.ssdMobilenetv1.loadFromUri(a),R.tinyFaceDetector.loadFromUri(a),R.faceExpressionNet.loadFromUri(a),R.faceLandmark68Net.loadFromUri(a),R.faceRecognitionNet.loadFromUri(a)]).catch(s=>{console.log(s)})}async function n(){var f;const a=document.getElementById("img");Be(a),document.getElementById("section");const s=await De(a,new Ie).withFaceLandmarks().withFaceDescriptor();s&&(console.log(s),e.score=(f=s==null?void 0:s.detection)==null?void 0:f._score)}async function _(){r.loading.show();var a=await V.upload(e.img).then(s=>s).catch(s=>[]);d.value.onDialogOK(a),r.loading.hide()}return(a,s)=>{const f=L("van-uploader"),S=L("q-smart-dialog");return m(),Q(S,{position:"bottom",maximized:"",ref_key:"dialogRef",ref:d,class:"flex fit flex-center",padding:""},{default:l(()=>[t(ae,null,{default:l(()=>[t(M,null,{default:l(()=>[z(t(w,{flat:"",round:"",icon:"mdi-close"},null,512),[[oe]]),t(A),e.score>.9?(m(),Q(w,{key:0,onClick:_,round:"",color:"green",icon:"mdi-check"})):K("",!0)]),_:1}),t(se,{id:"section",style:{height:"65vh"},class:"scroll"},{default:l(()=>{var $;return[i("div",Ae,[t(f,{modelValue:e.img,"onUpdate:modelValue":s[0]||(s[0]=T=>e.img=T),"max-count":1,ref_key:"pick",ref:y},null,8,["modelValue"])]),t(Ce,{class:"fit",showing:e.isReady},{default:l(()=>[t(Oe,{size:"50px",color:"primary"})]),_:1},8,["showing"]),i("div",He,[z(i("img",{src:($=e.img[0])==null?void 0:$.content,style:{height:"48vh"},id:"img",ref_key:"img",ref:p,alt:""},null,8,Ge),[[xe,e.img.length]])]),e.loading?(m(),x("div",Ke,[t(ke,{color:"primary",size:"2rem",thickness:5}),We])):(m(),x("div",Ye,[e.score>.5?(m(),x("span",je,"Score : "+k(Number(e.score).toFixed(2)),1)):K("",!0)]))]}),_:1}),t(M,{class:"q-pa-md bg-white text-white"},{default:l(()=>[i("div",Xe,[t(w,{onClick:s[1]||(s[1]=$=>c()),color:"primary",class:"fit",label:"Capturer",unelevated:"",icon:"las la-portrait"})])]),_:1})]),_:1})]),_:1},512)}}},Je={class:"text-center"},et={class:"text-center"},tt=["src"],lt=i("p",null,[C(" Minimum 3 photos descriptives "),i("br"),C(" avec un socre de "),i("b",{class:"text-red"},"0.90>")],-1),at=i("div",{class:"shadow-1"},null,-1),ot={__name:"addUser",props:{item:null},setup(u){const d=u,{dialogRef:r,onDialogOK:p}=Ee(),y=G(),e=Y({loading:!1,imgs:[],entry:{first_name:"",last_name:"",contact:null,email:null,facials:[]}});d.item&&(e.entry={...d.item});async function c(){var o={...e.entry};if(e.loading=!0,d.item)var n=await V.updateOne("employees",{where:{id:d.item.id},data:o}).then(_=>_).catch(_=>_);else var n=await V.createOne("employees",{data:o}).then(a=>a).catch(a=>a);n.id?p():y.notify({message:"Service indisponible"}),e.loading=!1}function g(){y.dialog({component:Ze}).onOk(o=>{e.entry.facials.push(o)})}return(o,n)=>{const _=L("van-divider"),a=L("n-carousel-item"),s=L("n-carousel");return m(),Q(Se,{ref_key:"dialogRef",ref:r,"transition-show":"slide-left","transition-hide":"slide-right",maximized:""},{default:l(()=>[t(ae,null,{default:l(()=>[t(M,null,{default:l(()=>[z(t(w,{round:"",flat:"",icon:"mdi-arrow-left"},null,512),[[oe]]),t(ne,null,{default:l(()=>[C(k(d.item?"Edition ":"Cr\xE9ation ")+" Employ\xE9 ",1)]),_:1})]),_:1}),t(se,{style:{height:"85vh"},class:"scroll"},{default:l(()=>[i("div",Je,[t(_,{class:"text-bold text-black"},{default:l(()=>[C(" Informations personnelles")]),_:1}),t(W,{modelValue:e.entry.first_name,"onUpdate:modelValue":n[0]||(n[0]=f=>e.entry.first_name=f),type:"text",label:"Nom"},null,8,["modelValue"]),t(W,{modelValue:e.entry.last_name,"onUpdate:modelValue":n[1]||(n[1]=f=>e.entry.last_name=f),type:"text",label:"Prenom"},null,8,["modelValue"]),t(_,{class:"text-bold text-black"},{default:l(()=>[C(" Reconnaissance faciale")]),_:1}),t(s,{loop:!1,"slides-per-view":1},{default:l(()=>[(m(!0),x(ie,null,re(e.entry.facials,(f,S)=>(m(),Q(a,{style:{height:"40vh"},key:S},{default:l(()=>[i("div",et,[i("div",null,[i("img",{style:{width:"auto",height:"30vh"},src:Qe(V).assets(f.filedisk)},null,8,tt)]),t(w,{dense:"",flat:"",onClick:$=>e.entry.facials=e.entry.facials.filter(T=>T.id!==f.id),"no-caps":"",icon:"mdi-close",label:`(${S+1}/ ${e.entry.facials.length}) Supprimer`},null,8,["onClick","label"])])]),_:2},1024))),128))]),_:1}),lt,at,t(w,{onClick:g,outline:"",icon:"mdi-camera-plus",label:"Capturer"})])]),_:1}),t(M,null,{default:l(()=>[t(w,{loading:e.loading,icon:"las la-save",color:"primary",onClick:n[2]||(n[2]=f=>c()),class:"fit",label:"Enregistrer"},null,8,["loading"])]),_:1})]),_:1})]),_:1},512)}}},st={key:0},nt={key:1},it={key:1},rt={class:"q-pa-lg"},ct={class:"q-col-qutter-md"},ut={class:"q-pt-md"},dt={class:"q-pt-md"},mt={__name:"users",setup(u){const d=G(),r=Y({loading:!1,items:[]});H(()=>{p()});async function p(e){r.loading=!0,r.items=await V.findMany("employees",{orderBy:{first_name:"asc"}}).then(c=>c).catch(c=>[]),console.log(r.items),r.loading=!1,e&&e()}function y(e=null){d.dialog({component:ot,componentProps:{item:e}}).onOk(()=>{p()})}return(e,c)=>{const g=L("van-empty");return m(),Q(qe,null,{default:l(()=>[t(Re,null,{default:l(()=>[t(Z,{class:"text-black bg-white"},{default:l(()=>[t(ne,{shrink:""},{default:l(()=>[C(" Liste des employ\xE9s ")]),_:1}),t(A),t(w,{onClick:c[0]||(c[0]=o=>e.$router.back()),flat:"",round:"",dense:"",icon:"mdi-arrow-left"})]),_:1})]),_:1}),t($e,null,{default:l(()=>[t(ze,null,{default:l(()=>[t(Z,{class:"text-caption"},{default:l(()=>[t(A),C(" "+k(r.items.length)+" El\xE9ments trouv\xE9s ",1)]),_:1}),r.loading?(m(),x("div",it,[i("div",rt,[i("div",ct,[i("div",null,[t(N,{type:"QRadio"})]),i("div",ut,[t(N)]),i("div",dt,[t(N,{class:"q-pt-md",style:{height:"60vh"}})])])])])):(m(),Q(Ue,{key:0,onRefresh:p},{default:l(()=>[r.items.length?(m(),x("div",nt,[t(Te,{separator:""},{default:l(()=>[(m(!0),x(ie,null,re(r.items,(o,n)=>z((m(),Q(Fe,{clickable:"",onClick:_=>y(o),key:n},{default:l(()=>[t(Le,null,{default:l(()=>[t(X,{class:"text-bold"},{default:l(()=>[C(k(o.first_name)+" "+k(o.last_name),1)]),_:2},1024),t(X,{class:"text-caption"},{default:l(()=>[C(k(o.contact)+" "+k(o.email),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["onClick"])),[[Pe]])),128))]),_:1})])):(m(),x("div",st,[t(g,{description:"Aucun personnelle"})]))]),_:1})),t(Me,{offset:[18,18],position:"bottom-right"},{default:l(()=>[t(w,{onClick:c[1]||(c[1]=o=>y()),color:"primary",fab:"",icon:"mdi-plus"})]),_:1})]),_:1})]),_:1})]),_:1})}}};typeof J=="function"&&J(mt);export{mt as default};
