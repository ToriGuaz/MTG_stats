(this.webpackJsonpmtg_stats=this.webpackJsonpmtg_stats||[]).push([[0],[,,,function(e,t,n){e.exports=n(16)},,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),r=n(2),c=n.n(r);n(12),n(13);var o=e=>{let{onClick:t}=e;return l.a.createElement("button",{onClick:t,className:"buttonStyle"},"Crear jugador!")};n(14);var m=()=>{const[e,t]=Object(a.useState)(40);return l.a.createElement("div",{className:"contenedorUsuario"},l.a.createElement("h1",null,"Toribia"),l.a.createElement("h2",null,"Vida: ",e),l.a.createElement("div",null,l.a.createElement("button",{className:"buttonStyle",onClick:()=>{t(e+1)}},"+"),l.a.createElement("button",{className:"buttonStyle",onClick:()=>{t(e-1)}},"-"),l.a.createElement("button",{className:"buttonStyle",onClick:()=>{t(e+5)}},"+5"),l.a.createElement("button",{className:"buttonStyle",onClick:()=>{t(e-5)}},"-5")))};n(15);var u=()=>{const[e,t]=Object(a.useState)([{nombre:"Evelina",vida:40},{nombre:"Kragg",vida:40},{nombre:"Pepa",vida:40},{nombre:"Thorn",vida:40}]);return l.a.createElement("div",{className:"contenedorOponentes"},e.map((e,t)=>l.a.createElement("div",{key:t,className:"contenedorOponente"},l.a.createElement("h1",null,e.nombre),l.a.createElement("h2",null,"Vida: ",e.vida))))};var s=function(){return l.a.createElement("div",{className:"App"},l.a.createElement("header",{className:"App-header"},l.a.createElement(o,null),l.a.createElement(m,null),l.a.createElement(u,null)))};var i=e=>{e&&e instanceof Function&&n.e(3).then(n.bind(null,17)).then(t=>{let{getCLS:n,getFID:a,getFCP:l,getLCP:r,getTTFB:c}=t;n(e),a(e),l(e),r(e),c(e)})};c.a.createRoot(document.getElementById("root")).render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(s,null))),i()}],[[3,1,2]]]);
//# sourceMappingURL=main.47834e52.chunk.js.map