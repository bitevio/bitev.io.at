import{r as l,g as f}from"./index.b01ba7b0.js";const g=()=>!0;function m(t){const e={};return t.forEach(n=>{e[n]=g}),e}function i(){const{emit:t,proxy:e}=f(),n=l(null);function c(){n.value.show()}function o(){n.value.hide()}function u(a){t("ok",a),o()}function r(){t("hide")}return Object.assign(e,{show:c,hide:o}),{dialogRef:n,onDialogHide:r,onDialogOK:u,onDialogCancel:o}}const s=["ok","hide"];i.emits=s;i.emitsObject=m(s);export{i as u};
