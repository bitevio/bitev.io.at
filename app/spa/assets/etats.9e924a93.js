import{m as y,o as M,bA as j,aq as c,aF as k,as as i,at as t,f as a,V as u,E as p,B as D,au as d,Q as f,C as V,a2 as Y,ar as b}from"./index.42d42c3c.js";import{Q as r}from"./QSelect.7d3c8537.js";import{Q as L,a as S}from"./QTable.8fef80ae.js";import{Q as H}from"./QPage.f0f91106.js";import{h as m}from"./moment.9709ab41.js";import{b as h}from"./route-block.b5bad31b.js";import"./QChip.ba4ca5a2.js";import"./QMenu.412ddd3b.js";import"./rtl.b51694b1.js";//! moment.js locale configuration
var Q=/^(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i,q=/(janv\.?|févr\.?|mars|avr\.?|mai|juin|juil\.?|août|sept\.?|oct\.?|nov\.?|déc\.?)/i,g=/(janv\.?|févr\.?|mars|avr\.?|mai|juin|juil\.?|août|sept\.?|oct\.?|nov\.?|déc\.?|janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i,_=[/^janv/i,/^févr/i,/^mars/i,/^avr/i,/^mai/i,/^juin/i,/^juil/i,/^août/i,/^sept/i,/^oct/i,/^nov/i,/^déc/i];m.defineLocale("fr",{months:"janvier_f\xE9vrier_mars_avril_mai_juin_juillet_ao\xFBt_septembre_octobre_novembre_d\xE9cembre".split("_"),monthsShort:"janv._f\xE9vr._mars_avr._mai_juin_juil._ao\xFBt_sept._oct._nov._d\xE9c.".split("_"),monthsRegex:g,monthsShortRegex:g,monthsStrictRegex:Q,monthsShortStrictRegex:q,monthsParse:_,longMonthsParse:_,shortMonthsParse:_,weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"di_lu_ma_me_je_ve_sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Aujourd\u2019hui \xE0] LT",nextDay:"[Demain \xE0] LT",nextWeek:"dddd [\xE0] LT",lastDay:"[Hier \xE0] LT",lastWeek:"dddd [dernier \xE0] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",ss:"%d secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",w:"une semaine",ww:"%d semaines",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},dayOfMonthOrdinalParse:/\d{1,2}(er|)/,ordinal:function(n,s){switch(s){case"D":return n+(n===1?"er":"");default:case"M":case"Q":case"DDD":case"d":return n+(n===1?"er":"e");case"w":case"W":return n+(n===1?"re":"e")}},week:{dow:1,doy:4}});const T={class:"bg-lite"},w={class:"text-bold text-h6"},F={class:"q-py-sm"},R={class:"row q-col-gutter-lg"},A={class:"col-4"},P={class:"q-gutter-sm"},U={class:"col-4"},x={class:"q-gutter-sm"},B={class:"row q-col-gutter-sm"},C={class:"col-6"},E={class:"col-6"},N={class:"col-4"},W={class:"q-pt-sm"},I={class:"q-gutter-sm"},O={key:0},$={key:1},z={__name:"etats",setup(n){m.locale("fr"),console.log(m.locales());const s=y({loading:!1,openFilter:!1,columns:[{name:"employe",label:"Employes",align:"left",field:e=>e.employee.first_name+" "+e.employee.last_name},{name:"D\xE9partement",label:"D\xE9partement",align:"left"},{name:"action",label:"Action",align:"center",field:e=>e.action.value},{name:"date",label:"Date & Heure",align:"left",field:e=>m(e.datetime).format("dd DD , MMM YYYY -  HH:mm")},{name:"Retard",label:"Retard",align:"left"},{name:"Appareil",label:"Appareil",align:"left"},{name:"code",label:"Motif (Code fonction) ",align:"left",field:e=>{var o,l;return e.function_code?((o=e==null?void 0:e.function_code)==null?void 0:o.code)+" - "+((l=e==null?void 0:e.function_code)==null?void 0:l.name):""}}],pointages:[]});M(()=>{v()});async function v(){s.loading=!0,s.pointages=await j.findMany("controls",{include:{employee:!0,function_code:!0}}).then(e=>e).catch(e=>[]),s.loading=!1}return(e,o)=>(c(),k(H,{class:"q-pa-md bg-lite"},{default:i(()=>[t("fieldset",T,[t("legend",w,[a(u,{class:"bg-white text-black",icon:s.openFilter?"mdi-filter-plus":"mdi-filter-off",outline:"",dense:"",round:"",onClick:o[0]||(o[0]=l=>s.openFilter=!s.openFilter)},null,8,["icon"]),p(" Filtrer ")]),D(t("div",F,[t("div",R,[t("div",A,[t("div",P,[t("div",null,[a(r,{outlined:"","stack-label":"",modelValue:e.model,"onUpdate:modelValue":o[1]||(o[1]=l=>e.model=l),options:e.options,label:"D\xE9partements / Services"},{prepend:i(()=>[a(d,{color:"black",name:"mdi-home"})]),_:1},8,["modelValue","options"])]),t("div",null,[a(r,{outlined:"","stack-label":"",modelValue:e.model,"onUpdate:modelValue":o[2]||(o[2]=l=>e.model=l),options:e.options,label:"Utilisateurs/Employes"},{prepend:i(()=>[a(d,{color:"black",name:"mdi-account-group"})]),_:1},8,["modelValue","options"])])])]),t("div",U,[t("div",x,[t("div",null,[a(r,{outlined:"","stack-label":"",modelValue:e.model,"onUpdate:modelValue":o[3]||(o[3]=l=>e.model=l),options:e.options,label:"Code de fonction"},{prepend:i(()=>[a(d,{color:"black",name:"mdi-circle"})]),_:1},8,["modelValue","options"])]),t("div",null,[t("div",B,[t("div",C,[a(f,{outlined:"","stack-label":"",modelValue:e.text,"onUpdate:modelValue":o[4]||(o[4]=l=>e.text=l),type:"datetime-local",label:"Date de d\xE9but"},null,8,["modelValue"])]),t("div",E,[a(f,{outlined:"","stack-label":"",modelValue:e.text,"onUpdate:modelValue":o[5]||(o[5]=l=>e.text=l),type:"datetime-local",label:"Date de fin"},null,8,["modelValue"])])])])])]),t("div",N,[t("div",null,[a(r,{outlined:"",modelValue:e.model,"onUpdate:modelValue":o[6]||(o[6]=l=>e.model=l),options:e.options,label:"Appareils"},{prepend:i(()=>[a(d,{color:"black",name:"las la-mobile"})]),_:1},8,["modelValue","options"])])])])],512),[[V,s.openFilter]])]),t("div",W,[a(L,{loading:s.loading,separator:"cell",flat:"",class:"scroll box",rows:s.pointages,columns:s.columns,style:Y({height:s.openFilter?"60vh":"76vh"})},{"top-right":i(()=>[t("div",I,[a(u,{color:"red",icon:"mdi-printer"}),a(u,{onClick:o[7]||(o[7]=l=>v()),color:"black",icon:"mdi-sync"})])]),"body-cell-action":i(l=>[a(S,{props:l},{default:i(()=>[l.value=="arrival"?(c(),b("span",O,[a(d,{color:"green",name:"mdi-circle"}),p(" Arriv\xE9e ")])):(c(),b("span",$,[a(d,{color:"red",name:"mdi-circle"}),p(" D\xE9part ")]))]),_:2},1032,["props"])]),_:1},8,["loading","rows","columns","style"])])]),_:1}))}};typeof h=="function"&&h(z);export{z as default};
