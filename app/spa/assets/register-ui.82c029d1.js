import{L as at,c as ot,h as it,ap as st,m as Z,w as W,aq as T,ar as P,f as B,as as E,at as R,au as ut,a2 as lt,z as A,av as Me,aw as re,ax as ft,ay as ct,az as dt,E as vt,aA as gt,B as Be,V as ne,aB as Te,aC as pt,F as ke,a7 as Pe,aD as Fe,aE as De,aF as ie,aG as ht,aH as mt,aI as $e,$ as le,aJ as yt,r as ae,o as bt}from"./index.5f6b2c26.js";import{Q as Ve,a as wt}from"./QSelect.9cf17b9d.js";import{u as xt}from"./use-dialog-plugin-component.156f32f3.js";import{u as Ct}from"./index.35cf34b7.js";import"./QChip.0e411004.js";import"./QMenu.5a4833c9.js";import"./rtl.b51694b1.js";var St=at({name:"QBtnGroup",props:{unelevated:Boolean,outline:Boolean,flat:Boolean,rounded:Boolean,square:Boolean,push:Boolean,stretch:Boolean,glossy:Boolean,spread:Boolean},setup(e,{slots:t}){const n=ot(()=>{const r=["unelevated","outline","flat","rounded","square","push","stretch","glossy"].filter(a=>e[a]===!0).map(a=>`q-btn-group--${a}`).join(" ");return`q-btn-group row no-wrap${r.length>0?" "+r:""}`+(e.spread===!0?" q-btn-group--spread":" inline")});return()=>it("div",{class:n.value},st(t.default))}});const Mt={key:0},Bt={key:0},Tt={key:1},kt={key:1},Pt={class:"self-center full-width no-outline",tabindex:"0"},Dt={key:0,class:"column"},Vt={key:1,class:"column"},It={class:"fit"},Et={__name:"q-smart-select",props:{optionKey:{type:String,default:null},prependColor:{type:String,default:null},returnObject:{type:Boolean,default:!1},autoClose:{type:Boolean,default:!1},title:"",selected:null,options:{type:Array,default:[]},multiple:{type:Boolean,default:!1},cancelLabel:{type:String,default:"Cancel"},okLabel:{type:String,default:"Confirm"}},emits:["onChange"],setup(e,{emit:t}){const n=e,r=Z({open:!1,selected:n.multiple?[]:null});n.selected&&(r.selected=n.selected),W(()=>r.selected,i=>{n.autoClose&&a()});function a(){if(n.multiple)t("onChange",r.selected);else{var i=n.options.filter(s=>s[n.optionKey]==r.selected)[0]||null;t("onChange",i)}r.open=!1}return(i,s)=>(T(),P("div",{onClick:s[6]||(s[6]=u=>r.open=!0)},[n.multiple?(T(),P("div",kt,[B(wt,A({class:"no-pointer-events"},i.$attrs),{control:E(()=>{var u;return[R("div",Pt,re(r.selected.length)+" "+re(((u=i.$attrs)==null?void 0:u.selectedText)||"Selected"),1)]}),_:1},16)])):(T(),P("div",Mt,[n.prependColor?(T(),P("div",Bt,[B(Ve,A({modelValue:r.selected,"onUpdate:modelValue":s[0]||(s[0]=u=>r.selected=u),class:"no-pointer-events"},i.$attrs),{prepend:E(()=>[R("div",null,[B(ut,{style:lt(`color:${n.prependColor}`),name:"mdi-circle"},null,8,["style"])])]),_:1},16,["modelValue"])])):Me("",!0),n.prependColor?Me("",!0):(T(),P("div",Tt,[B(Ve,A({modelValue:r.selected,"onUpdate:modelValue":s[1]||(s[1]=u=>r.selected=u),class:"no-pointer-events"},i.$attrs),null,16,["modelValue"])]))])),B(Fe,A({"transition-duration":"0","transition-hide":"fade","full-width":"","no-refocus":"",onHide:s[4]||(s[4]=u=>r.open=!1),"no-shake":"","allow-focus-outside":"",modelValue:r.open,"onUpdate:modelValue":s[5]||(s[5]=u=>r.open=u)},i.$attrs.dialog),{default:E(()=>[B(ft,A(i.$attrs.card,{flat:"",class:"text-weight-light text-black"}),{default:E(()=>[B(ct,null,{default:E(()=>[B(dt,null,{default:E(()=>[vt(re(n.title),1)]),_:1}),B(gt),Be(B(ne,{flat:"",round:"",icon:"mdi-close"},null,512),[[De]])]),_:1}),B(Te,{spaced:""}),B(pt,A({style:{"max-height":"30vh"}},i.$attrs.section,{class:"scroll"}),{default:E(()=>[R("div",null,[n.multiple?(T(),P("div",Dt,[(T(!0),P(ke,null,Pe(n.options,u=>(T(),ie(ht,{modelValue:r.selected,"onUpdate:modelValue":s[2]||(s[2]=o=>r.selected=o),label:u[i.$attrs["option-label"]],val:u[i.$attrs["option-value"]]},null,8,["modelValue","label","val"]))),256))])):(T(),P("div",Vt,[(T(!0),P(ke,null,Pe(n.options,u=>(T(),ie(mt,{modelValue:r.selected,"onUpdate:modelValue":s[3]||(s[3]=o=>r.selected=o),val:u[i.$attrs["option-value"]],label:u[i.$attrs["option-label"]]},null,8,["modelValue","val","label"]))),256))]))])]),_:1},16),B(Te,{spaced:""}),R("div",It,[B(St,{flat:"",spread:""},{default:E(()=>[Be(B(ne,{label:n.cancelLabel},null,8,["label"]),[[De]]),B(ne,{onClick:a,color:"primary",label:n.okLabel},null,8,["label"])]),_:1})])]),_:1},16)]),_:1},16,["modelValue"])]))}};const _t={__name:"q-safe-area",props:{top:{type:Boolean,default:!1},bottom:{type:Boolean,default:!1},left:{type:Boolean,default:!1},right:{type:Boolean,default:!1}},setup(e){const t=e,n=Z({class:""});W(()=>[t.bottom,t.top,t.left,t.right],a=>r()),r();function r(){n.class="",t.top&&(n.class+=" top"),t.bottom&&(n.class+=" bottom"),t.left&&(n.class+=" left"),t.right&&(n.class+=" right")}return(a,i)=>(T(),P("div",{class:yt(n.class)},[le(a.$slots,"default",{},void 0,!0)],2))}};var Lt=$e(_t,[["__scopeId","data-v-12fec184"]]),qe={update:null,begin:null,loopBegin:null,changeBegin:null,change:null,changeComplete:null,loopComplete:null,complete:null,loop:1,direction:"normal",autoplay:!0,timelineOffset:0},fe={duration:1e3,delay:0,endDelay:0,easing:"easeOutElastic(1, .5)",round:0},Ot=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY","perspective","matrix","matrix3d"],K={CSS:{},springs:{}};function V(e,t,n){return Math.min(Math.max(e,t),n)}function U(e,t){return e.indexOf(t)>-1}function oe(e,t){return e.apply(null,t)}var c={arr:function(e){return Array.isArray(e)},obj:function(e){return U(Object.prototype.toString.call(e),"Object")},pth:function(e){return c.obj(e)&&e.hasOwnProperty("totalLength")},svg:function(e){return e instanceof SVGElement},inp:function(e){return e instanceof HTMLInputElement},dom:function(e){return e.nodeType||c.svg(e)},str:function(e){return typeof e=="string"},fnc:function(e){return typeof e=="function"},und:function(e){return typeof e=="undefined"},nil:function(e){return c.und(e)||e===null},hex:function(e){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e)},rgb:function(e){return/^rgb/.test(e)},hsl:function(e){return/^hsl/.test(e)},col:function(e){return c.hex(e)||c.rgb(e)||c.hsl(e)},key:function(e){return!qe.hasOwnProperty(e)&&!fe.hasOwnProperty(e)&&e!=="targets"&&e!=="keyframes"}};function Qe(e){var t=/\(([^)]+)\)/.exec(e);return t?t[1].split(",").map(function(n){return parseFloat(n)}):[]}function je(e,t){var n=Qe(e),r=V(c.und(n[0])?1:n[0],.1,100),a=V(c.und(n[1])?100:n[1],.1,100),i=V(c.und(n[2])?10:n[2],.1,100),s=V(c.und(n[3])?0:n[3],.1,100),u=Math.sqrt(a/r),o=i/(2*Math.sqrt(a*r)),v=o<1?u*Math.sqrt(1-o*o):0,l=1,d=o<1?(o*u+-s)/v:-s+u;function h(m){var f=t?t*m/1e3:m;return o<1?f=Math.exp(-f*o*u)*(l*Math.cos(v*f)+d*Math.sin(v*f)):f=(l+d*f)*Math.exp(-f*u),m===0||m===1?m:1-f}function C(){var m=K.springs[e];if(m)return m;for(var f=1/6,b=0,y=0;;)if(b+=f,h(b)===1){if(y++,y>=16)break}else y=0;var p=b*f*1e3;return K.springs[e]=p,p}return t?h:C}function At(e){return e===void 0&&(e=10),function(t){return Math.ceil(V(t,1e-6,1)*e)*(1/e)}}var Ft=function(){var e=11,t=1/(e-1);function n(l,d){return 1-3*d+3*l}function r(l,d){return 3*d-6*l}function a(l){return 3*l}function i(l,d,h){return((n(d,h)*l+r(d,h))*l+a(d))*l}function s(l,d,h){return 3*n(d,h)*l*l+2*r(d,h)*l+a(d)}function u(l,d,h,C,m){var f,b,y=0;do b=d+(h-d)/2,f=i(b,C,m)-l,f>0?h=b:d=b;while(Math.abs(f)>1e-7&&++y<10);return b}function o(l,d,h,C){for(var m=0;m<4;++m){var f=s(d,h,C);if(f===0)return d;var b=i(d,h,C)-l;d-=b/f}return d}function v(l,d,h,C){if(!(0<=l&&l<=1&&0<=h&&h<=1))return;var m=new Float32Array(e);if(l!==d||h!==C)for(var f=0;f<e;++f)m[f]=i(f*t,l,h);function b(y){for(var p=0,g=1,S=e-1;g!==S&&m[g]<=y;++g)p+=t;--g;var L=(y-m[g])/(m[g+1]-m[g]),x=p+L*t,O=s(x,l,h);return O>=.001?o(y,x,l,h):O===0?x:u(y,p,p+t,l,h)}return function(y){return l===d&&h===C||y===0||y===1?y:i(b(y),d,C)}}return v}(),ze=function(){var e={linear:function(){return function(r){return r}}},t={Sine:function(){return function(r){return 1-Math.cos(r*Math.PI/2)}},Circ:function(){return function(r){return 1-Math.sqrt(1-r*r)}},Back:function(){return function(r){return r*r*(3*r-2)}},Bounce:function(){return function(r){for(var a,i=4;r<((a=Math.pow(2,--i))-1)/11;);return 1/Math.pow(4,3-i)-7.5625*Math.pow((a*3-2)/22-r,2)}},Elastic:function(r,a){r===void 0&&(r=1),a===void 0&&(a=.5);var i=V(r,1,10),s=V(a,.1,2);return function(u){return u===0||u===1?u:-i*Math.pow(2,10*(u-1))*Math.sin((u-1-s/(Math.PI*2)*Math.asin(1/i))*(Math.PI*2)/s)}}},n=["Quad","Cubic","Quart","Quint","Expo"];return n.forEach(function(r,a){t[r]=function(){return function(i){return Math.pow(i,a+2)}}}),Object.keys(t).forEach(function(r){var a=t[r];e["easeIn"+r]=a,e["easeOut"+r]=function(i,s){return function(u){return 1-a(i,s)(1-u)}},e["easeInOut"+r]=function(i,s){return function(u){return u<.5?a(i,s)(u*2)/2:1-a(i,s)(u*-2+2)/2}},e["easeOutIn"+r]=function(i,s){return function(u){return u<.5?(1-a(i,s)(1-u*2))/2:(a(i,s)(u*2-1)+1)/2}}}),e}();function ce(e,t){if(c.fnc(e))return e;var n=e.split("(")[0],r=ze[n],a=Qe(e);switch(n){case"spring":return je(e,t);case"cubicBezier":return oe(Ft,a);case"steps":return oe(At,a);default:return oe(r,a)}}function He(e){try{var t=document.querySelectorAll(e);return t}catch{return}}function Y(e,t){for(var n=e.length,r=arguments.length>=2?arguments[1]:void 0,a=[],i=0;i<n;i++)if(i in e){var s=e[i];t.call(r,s,i,e)&&a.push(s)}return a}function G(e){return e.reduce(function(t,n){return t.concat(c.arr(n)?G(n):n)},[])}function Ie(e){return c.arr(e)?e:(c.str(e)&&(e=He(e)||e),e instanceof NodeList||e instanceof HTMLCollection?[].slice.call(e):[e])}function de(e,t){return e.some(function(n){return n===t})}function ve(e){var t={};for(var n in e)t[n]=e[n];return t}function se(e,t){var n=ve(e);for(var r in e)n[r]=t.hasOwnProperty(r)?t[r]:e[r];return n}function J(e,t){var n=ve(e);for(var r in t)n[r]=c.und(e[r])?t[r]:e[r];return n}function $t(e){var t=/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(e);return t?"rgba("+t[1]+",1)":e}function qt(e){var t=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,n=e.replace(t,function(u,o,v,l){return o+o+v+v+l+l}),r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n),a=parseInt(r[1],16),i=parseInt(r[2],16),s=parseInt(r[3],16);return"rgba("+a+","+i+","+s+",1)"}function Qt(e){var t=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(e)||/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(e),n=parseInt(t[1],10)/360,r=parseInt(t[2],10)/100,a=parseInt(t[3],10)/100,i=t[4]||1;function s(h,C,m){return m<0&&(m+=1),m>1&&(m-=1),m<1/6?h+(C-h)*6*m:m<1/2?C:m<2/3?h+(C-h)*(2/3-m)*6:h}var u,o,v;if(r==0)u=o=v=a;else{var l=a<.5?a*(1+r):a+r-a*r,d=2*a-l;u=s(d,l,n+1/3),o=s(d,l,n),v=s(d,l,n-1/3)}return"rgba("+u*255+","+o*255+","+v*255+","+i+")"}function jt(e){if(c.rgb(e))return $t(e);if(c.hex(e))return qt(e);if(c.hsl(e))return Qt(e)}function _(e){var t=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(e);if(t)return t[1]}function zt(e){if(U(e,"translate")||e==="perspective")return"px";if(U(e,"rotate")||U(e,"skew"))return"deg"}function ue(e,t){return c.fnc(e)?e(t.target,t.id,t.total):e}function I(e,t){return e.getAttribute(t)}function ge(e,t,n){var r=_(t);if(de([n,"deg","rad","turn"],r))return t;var a=K.CSS[t+n];if(!c.und(a))return a;var i=100,s=document.createElement(e.tagName),u=e.parentNode&&e.parentNode!==document?e.parentNode:document.body;u.appendChild(s),s.style.position="absolute",s.style.width=i+n;var o=i/s.offsetWidth;u.removeChild(s);var v=o*parseFloat(t);return K.CSS[t+n]=v,v}function Re(e,t,n){if(t in e.style){var r=t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),a=e.style[t]||getComputedStyle(e).getPropertyValue(r)||"0";return n?ge(e,a,n):a}}function pe(e,t){if(c.dom(e)&&!c.inp(e)&&(!c.nil(I(e,t))||c.svg(e)&&e[t]))return"attribute";if(c.dom(e)&&de(Ot,t))return"transform";if(c.dom(e)&&t!=="transform"&&Re(e,t))return"css";if(e[t]!=null)return"object"}function Ue(e){if(!!c.dom(e)){for(var t=e.style.transform||"",n=/(\w+)\(([^)]*)\)/g,r=new Map,a;a=n.exec(t);)r.set(a[1],a[2]);return r}}function Ht(e,t,n,r){var a=U(t,"scale")?1:0+zt(t),i=Ue(e).get(t)||a;return n&&(n.transforms.list.set(t,i),n.transforms.last=t),r?ge(e,i,r):i}function he(e,t,n,r){switch(pe(e,t)){case"transform":return Ht(e,t,r,n);case"css":return Re(e,t,n);case"attribute":return I(e,t);default:return e[t]||0}}function me(e,t){var n=/^(\*=|\+=|-=)/.exec(e);if(!n)return e;var r=_(e)||0,a=parseFloat(t),i=parseFloat(e.replace(n[0],""));switch(n[0][0]){case"+":return a+i+r;case"-":return a-i+r;case"*":return a*i+r}}function Ne(e,t){if(c.col(e))return jt(e);if(/\s/g.test(e))return e;var n=_(e),r=n?e.substr(0,e.length-n.length):e;return t?r+t:r}function ye(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function Rt(e){return Math.PI*2*I(e,"r")}function Ut(e){return I(e,"width")*2+I(e,"height")*2}function Nt(e){return ye({x:I(e,"x1"),y:I(e,"y1")},{x:I(e,"x2"),y:I(e,"y2")})}function We(e){for(var t=e.points,n=0,r,a=0;a<t.numberOfItems;a++){var i=t.getItem(a);a>0&&(n+=ye(r,i)),r=i}return n}function Wt(e){var t=e.points;return We(e)+ye(t.getItem(t.numberOfItems-1),t.getItem(0))}function Ke(e){if(e.getTotalLength)return e.getTotalLength();switch(e.tagName.toLowerCase()){case"circle":return Rt(e);case"rect":return Ut(e);case"line":return Nt(e);case"polyline":return We(e);case"polygon":return Wt(e)}}function Kt(e){var t=Ke(e);return e.setAttribute("stroke-dasharray",t),t}function Zt(e){for(var t=e.parentNode;c.svg(t)&&c.svg(t.parentNode);)t=t.parentNode;return t}function Ze(e,t){var n=t||{},r=n.el||Zt(e),a=r.getBoundingClientRect(),i=I(r,"viewBox"),s=a.width,u=a.height,o=n.viewBox||(i?i.split(" "):[0,0,s,u]);return{el:r,viewBox:o,x:o[0]/1,y:o[1]/1,w:s,h:u,vW:o[2],vH:o[3]}}function Yt(e,t){var n=c.str(e)?He(e)[0]:e,r=t||100;return function(a){return{property:a,el:n,svg:Ze(n),totalLength:Ke(n)*(r/100)}}}function Gt(e,t,n){function r(l){l===void 0&&(l=0);var d=t+l>=1?t+l:0;return e.el.getPointAtLength(d)}var a=Ze(e.el,e.svg),i=r(),s=r(-1),u=r(1),o=n?1:a.w/a.vW,v=n?1:a.h/a.vH;switch(e.property){case"x":return(i.x-a.x)*o;case"y":return(i.y-a.y)*v;case"angle":return Math.atan2(u.y-s.y,u.x-s.x)*180/Math.PI}}function Ee(e,t){var n=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,r=Ne(c.pth(e)?e.totalLength:e,t)+"";return{original:r,numbers:r.match(n)?r.match(n).map(Number):[0],strings:c.str(e)||t?r.split(n):[]}}function be(e){var t=e?G(c.arr(e)?e.map(Ie):Ie(e)):[];return Y(t,function(n,r,a){return a.indexOf(n)===r})}function Ye(e){var t=be(e);return t.map(function(n,r){return{target:n,id:r,total:t.length,transforms:{list:Ue(n)}}})}function Jt(e,t){var n=ve(t);if(/^spring/.test(n.easing)&&(n.duration=je(n.easing)),c.arr(e)){var r=e.length,a=r===2&&!c.obj(e[0]);a?e={value:e}:c.fnc(t.duration)||(n.duration=t.duration/r)}var i=c.arr(e)?e:[e];return i.map(function(s,u){var o=c.obj(s)&&!c.pth(s)?s:{value:s};return c.und(o.delay)&&(o.delay=u?0:t.delay),c.und(o.endDelay)&&(o.endDelay=u===i.length-1?t.endDelay:0),o}).map(function(s){return J(s,n)})}function Xt(e){for(var t=Y(G(e.map(function(i){return Object.keys(i)})),function(i){return c.key(i)}).reduce(function(i,s){return i.indexOf(s)<0&&i.push(s),i},[]),n={},r=function(i){var s=t[i];n[s]=e.map(function(u){var o={};for(var v in u)c.key(v)?v==s&&(o.value=u[v]):o[v]=u[v];return o})},a=0;a<t.length;a++)r(a);return n}function er(e,t){var n=[],r=t.keyframes;r&&(t=J(Xt(r),t));for(var a in t)c.key(a)&&n.push({name:a,tweens:Jt(t[a],e)});return n}function tr(e,t){var n={};for(var r in e){var a=ue(e[r],t);c.arr(a)&&(a=a.map(function(i){return ue(i,t)}),a.length===1&&(a=a[0])),n[r]=a}return n.duration=parseFloat(n.duration),n.delay=parseFloat(n.delay),n}function rr(e,t){var n;return e.tweens.map(function(r){var a=tr(r,t),i=a.value,s=c.arr(i)?i[1]:i,u=_(s),o=he(t.target,e.name,u,t),v=n?n.to.original:o,l=c.arr(i)?i[0]:v,d=_(l)||_(o),h=u||d;return c.und(s)&&(s=v),a.from=Ee(l,h),a.to=Ee(me(s,l),h),a.start=n?n.end:0,a.end=a.start+a.delay+a.duration+a.endDelay,a.easing=ce(a.easing,a.duration),a.isPath=c.pth(i),a.isPathTargetInsideSVG=a.isPath&&c.svg(t.target),a.isColor=c.col(a.from.original),a.isColor&&(a.round=1),n=a,a})}var Ge={css:function(e,t,n){return e.style[t]=n},attribute:function(e,t,n){return e.setAttribute(t,n)},object:function(e,t,n){return e[t]=n},transform:function(e,t,n,r,a){if(r.list.set(t,n),t===r.last||a){var i="";r.list.forEach(function(s,u){i+=u+"("+s+") "}),e.style.transform=i}}};function Je(e,t){var n=Ye(e);n.forEach(function(r){for(var a in t){var i=ue(t[a],r),s=r.target,u=_(i),o=he(s,a,u,r),v=u||_(o),l=me(Ne(i,v),o),d=pe(s,a);Ge[d](s,a,l,r.transforms,!0)}})}function nr(e,t){var n=pe(e.target,t.name);if(n){var r=rr(t,e),a=r[r.length-1];return{type:n,property:t.name,animatable:e,tweens:r,duration:a.end,delay:r[0].delay,endDelay:a.endDelay}}}function ar(e,t){return Y(G(e.map(function(n){return t.map(function(r){return nr(n,r)})})),function(n){return!c.und(n)})}function Xe(e,t){var n=e.length,r=function(i){return i.timelineOffset?i.timelineOffset:0},a={};return a.duration=n?Math.max.apply(Math,e.map(function(i){return r(i)+i.duration})):t.duration,a.delay=n?Math.min.apply(Math,e.map(function(i){return r(i)+i.delay})):t.delay,a.endDelay=n?a.duration-Math.max.apply(Math,e.map(function(i){return r(i)+i.duration-i.endDelay})):t.endDelay,a}var _e=0;function or(e){var t=se(qe,e),n=se(fe,e),r=er(n,e),a=Ye(e.targets),i=ar(a,r),s=Xe(i,n),u=_e;return _e++,J(t,{id:u,children:[],animatables:a,animations:i,duration:s.duration,delay:s.delay,endDelay:s.endDelay})}var D=[],et=function(){var e;function t(){!e&&(!Le()||!w.suspendWhenDocumentHidden)&&D.length>0&&(e=requestAnimationFrame(n))}function n(a){for(var i=D.length,s=0;s<i;){var u=D[s];u.paused?(D.splice(s,1),i--):(u.tick(a),s++)}e=s>0?requestAnimationFrame(n):void 0}function r(){!w.suspendWhenDocumentHidden||(Le()?e=cancelAnimationFrame(e):(D.forEach(function(a){return a._onDocumentVisibility()}),et()))}return typeof document!="undefined"&&document.addEventListener("visibilitychange",r),t}();function Le(){return!!document&&document.hidden}function w(e){e===void 0&&(e={});var t=0,n=0,r=0,a,i=0,s=null;function u(p){var g=window.Promise&&new Promise(function(S){return s=S});return p.finished=g,g}var o=or(e);u(o);function v(){var p=o.direction;p!=="alternate"&&(o.direction=p!=="normal"?"normal":"reverse"),o.reversed=!o.reversed,a.forEach(function(g){return g.reversed=o.reversed})}function l(p){return o.reversed?o.duration-p:p}function d(){t=0,n=l(o.currentTime)*(1/w.speed)}function h(p,g){g&&g.seek(p-g.timelineOffset)}function C(p){if(o.reversePlayback)for(var S=i;S--;)h(p,a[S]);else for(var g=0;g<i;g++)h(p,a[g])}function m(p){for(var g=0,S=o.animations,L=S.length;g<L;){var x=S[g],O=x.animatable,Q=x.tweens,F=Q.length-1,M=Q[F];F&&(M=Y(Q,function(nt){return p<nt.end})[0]||M);for(var $=V(p-M.start-M.delay,0,M.duration)/M.duration,N=isNaN($)?1:M.easing($),k=M.to.strings,X=M.round,ee=[],rt=M.to.numbers.length,q=void 0,j=0;j<rt;j++){var z=void 0,we=M.to.numbers[j],xe=M.from.numbers[j]||0;M.isPath?z=Gt(M.value,N*we,M.isPathTargetInsideSVG):z=xe+N*(we-xe),X&&(M.isColor&&j>2||(z=Math.round(z*X)/X)),ee.push(z)}var Ce=k.length;if(!Ce)q=ee[0];else{q=k[0];for(var H=0;H<Ce;H++){k[H];var Se=k[H+1],te=ee[H];isNaN(te)||(Se?q+=te+Se:q+=te+" ")}}Ge[x.type](O.target,x.property,q,O.transforms),x.currentValue=q,g++}}function f(p){o[p]&&!o.passThrough&&o[p](o)}function b(){o.remaining&&o.remaining!==!0&&o.remaining--}function y(p){var g=o.duration,S=o.delay,L=g-o.endDelay,x=l(p);o.progress=V(x/g*100,0,100),o.reversePlayback=x<o.currentTime,a&&C(x),!o.began&&o.currentTime>0&&(o.began=!0,f("begin")),!o.loopBegan&&o.currentTime>0&&(o.loopBegan=!0,f("loopBegin")),x<=S&&o.currentTime!==0&&m(0),(x>=L&&o.currentTime!==g||!g)&&m(g),x>S&&x<L?(o.changeBegan||(o.changeBegan=!0,o.changeCompleted=!1,f("changeBegin")),f("change"),m(x)):o.changeBegan&&(o.changeCompleted=!0,o.changeBegan=!1,f("changeComplete")),o.currentTime=V(x,0,g),o.began&&f("update"),p>=g&&(n=0,b(),o.remaining?(t=r,f("loopComplete"),o.loopBegan=!1,o.direction==="alternate"&&v()):(o.paused=!0,o.completed||(o.completed=!0,f("loopComplete"),f("complete"),!o.passThrough&&"Promise"in window&&(s(),u(o)))))}return o.reset=function(){var p=o.direction;o.passThrough=!1,o.currentTime=0,o.progress=0,o.paused=!0,o.began=!1,o.loopBegan=!1,o.changeBegan=!1,o.completed=!1,o.changeCompleted=!1,o.reversePlayback=!1,o.reversed=p==="reverse",o.remaining=o.loop,a=o.children,i=a.length;for(var g=i;g--;)o.children[g].reset();(o.reversed&&o.loop!==!0||p==="alternate"&&o.loop===1)&&o.remaining++,m(o.reversed?o.duration:0)},o._onDocumentVisibility=d,o.set=function(p,g){return Je(p,g),o},o.tick=function(p){r=p,t||(t=r),y((r+(n-t))*w.speed)},o.seek=function(p){y(l(p))},o.pause=function(){o.paused=!0,d()},o.play=function(){!o.paused||(o.completed&&o.reset(),o.paused=!1,D.push(o),d(),et())},o.reverse=function(){v(),o.completed=!o.reversed,d()},o.restart=function(){o.reset(),o.play()},o.remove=function(p){var g=be(p);tt(g,o)},o.reset(),o.autoplay&&o.play(),o}function Oe(e,t){for(var n=t.length;n--;)de(e,t[n].animatable.target)&&t.splice(n,1)}function tt(e,t){var n=t.animations,r=t.children;Oe(e,n);for(var a=r.length;a--;){var i=r[a],s=i.animations;Oe(e,s),!s.length&&!i.children.length&&r.splice(a,1)}!n.length&&!r.length&&t.pause()}function ir(e){for(var t=be(e),n=D.length;n--;){var r=D[n];tt(t,r)}}function sr(e,t){t===void 0&&(t={});var n=t.direction||"normal",r=t.easing?ce(t.easing):null,a=t.grid,i=t.axis,s=t.from||0,u=s==="first",o=s==="center",v=s==="last",l=c.arr(e),d=parseFloat(l?e[0]:e),h=l?parseFloat(e[1]):0,C=_(l?e[1]:e)||0,m=t.start||0+(l?d:0),f=[],b=0;return function(y,p,g){if(u&&(s=0),o&&(s=(g-1)/2),v&&(s=g-1),!f.length){for(var S=0;S<g;S++){if(!a)f.push(Math.abs(s-S));else{var L=o?(a[0]-1)/2:s%a[0],x=o?(a[1]-1)/2:Math.floor(s/a[0]),O=S%a[0],Q=Math.floor(S/a[0]),F=L-O,M=x-Q,$=Math.sqrt(F*F+M*M);i==="x"&&($=-F),i==="y"&&($=-M),f.push($)}b=Math.max.apply(Math,f)}r&&(f=f.map(function(k){return r(k/b)*b})),n==="reverse"&&(f=f.map(function(k){return i?k<0?k*-1:-k:Math.abs(b-k)}))}var N=l?(h-d)/b:d;return m+N*(Math.round(f[p]*100)/100)+C}}function ur(e){e===void 0&&(e={});var t=w(e);return t.duration=0,t.add=function(n,r){var a=D.indexOf(t),i=t.children;a>-1&&D.splice(a,1);function s(h){h.passThrough=!0}for(var u=0;u<i.length;u++)s(i[u]);var o=J(n,se(fe,e));o.targets=o.targets||e.targets;var v=t.duration;o.autoplay=!1,o.direction=t.direction,o.timelineOffset=c.und(r)?v:me(r,v),s(t),t.seek(o.timelineOffset);var l=w(o);s(l),i.push(l);var d=Xe(i,e);return t.delay=d.delay,t.endDelay=d.endDelay,t.duration=d.duration,t.seek(0),t.reset(),t.autoplay&&t.play(),t},t}w.version="3.2.1";w.speed=1;w.suspendWhenDocumentHidden=!0;w.running=D;w.remove=ir;w.get=he;w.set=Je;w.convertPx=ge;w.path=Yt;w.setDashoffset=Kt;w.stagger=sr;w.timeline=ur;w.easing=ce;w.penner=ze;w.random=function(e,t){return Math.floor(Math.random()*(t-e+1))+e};const lr={__name:"q-smart-dialog",props:{"swipe-to-close":{type:Boolean,default:!1}},emits:["onExpand"],setup(e,{expose:t,emit:n}){var m;const r=e,{dialogRef:a,onDialogCancel:i,onDialogHide:s,onDialogOK:u}=xt(),o=ae(null);ae(null),ae(null);const v=Z({expand:!1,height:((m=o.value)==null?void 0:m.offsetHeight)/2||0,currentPosition:0});bt(()=>{(r["swipe-to-close"]||r.swipeToClose||r.swipeToClose=="")&&h()}),W(()=>{var f;return[o.value,v.height,(f=o.value)==null?void 0:f.offsetHeight]},()=>{var f;v.height=((f=o.value)==null?void 0:f.offsetHeight)/2||0,l()}),W(()=>v.expand,f=>{console.log(f)});function l(){var f;(f=o.value)!=null&&f.scrollTop&&(Number(o.value.scrollTop)>20?v.expand=!0:v.expand=!1)}function d(){v.currentPosition=0}function h(){const{isSwiping:f,lengthX:b,lengthY:y,direction:p}=Ct(o,{threshold:5,passive:!0,onSwipeStart:()=>{},onSwipe:g=>{let S=Number(y.value);if(l(),y.value>0||v.expand||o.value.offsetHeight>window.innerHeight)return!1;v.currentPosition=0,w({targets:o.value,translateY:-S,easing:"cubicBezier(0, 0, 0.0, 0.0)",duration:0})},onSwipeEnd:()=>{var g=-y.value;g>v.height?a.value.hide():w({targets:o.value,translateY:0,easing:"cubicBezier(0.32, 0.72, 0, 1))",duration:340})}})}function C(f){v.expand=f}return t({onDialogCancel:i,onDialogOK:u,onDialogHide:s,expand:C}),(f,b)=>(T(),ie(Fe,{ref_key:"dialogRef",ref:a,onHide:d,"v-bind":f.$attrs},{default:E(()=>[R("div",{ref_key:"target",ref:o},[le(f.$slots,"default",{expand:v.expand})],512)]),_:3},8,["v-bind"]))}},fr={props:{active:{type:Boolean,default:!1},data:{type:Object,default:{}}},setup(e){return{state:Z({active:e.active||!1,data:{...e.data},model:e.data||{},hover:!1})}}};function cr(e,t,n,r,a,i){return T(),P("div",{onMouseover:t[0]||(t[0]=s=>r.state.hover=!0),onMouseleave:t[1]||(t[1]=s=>r.state.hover=!1)},[le(e.$slots,"default",A({data:r.state.data,model:r.state.model,open:()=>r.state.active=!0,close:()=>r.state.active=!1,toggle:()=>r.state.active=!r.state.active,active:r.state.active,hover:r.state.hover},e.$attrs))],32)}var dr=$e(fr,[["render",cr]]);const Ae={qSmartSelect:Et,qSafeArea:Lt,qSmartDialog:lr,qSmartReactif:dr};var wr=({app:e})=>{for(const t in Ae)e.component(t,Ae[t])};export{wr as default};