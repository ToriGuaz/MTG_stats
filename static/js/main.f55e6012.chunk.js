(this.webpackJsonpmtg_stats=this.webpackJsonpmtg_stats||[]).push([[0],{11:function(e,t,a){e.exports=a(21)},19:function(e,t,a){},20:function(e,t,a){},21:function(e,t,a){"use strict";a.r(t);var r=a(1),n=a.n(r),l=a(9),c=a.n(l),o=(a(19),a(2)),s=a(10);const m=Object(s.a)({apiKey:"AIzaSyBTzfDF8Hqxob52odaaoyUmTOhbu54jbIY",authDomain:"mtgstats-864da.firebaseapp.com",databaseURL:"https://mtgstats-864da-default-rtdb.firebaseio.com",projectId:"mtgstats-864da",storageBucket:"mtgstats-864da.appspot.com",messagingSenderId:"68211953531",appId:"1:68211953531:web:3619c6cc482a2bfeeb77de",measurementId:"G-78HCZP9LD6"}),u=Object(o.c)(m);var i=function(e){let{onGameSelect:t}=e;const[a,l]=Object(r.useState)(""),[c,s]=Object(r.useState)(""),[m,i]=Object(r.useState)([]),g=Object(r.useRef)([]);Object(r.useEffect)(()=>{const e=Object(o.f)(u,"games");Object(o.d)(e,e=>{const t=e.val();if(t){const e=Object.keys(t).map(e=>({id:e,gameName:t[e].gameName}));g.current=e,i(e)}});const t=localStorage.getItem("playerName");t&&s(t)},[]);const p=()=>{const e=localStorage.getItem("gameID"),t=localStorage.getItem("playerID");if(e&&t){const a=Object(o.f)(u,`games/${e}/players/${t}`);Object(o.g)(a).then(()=>console.log("Jugador eliminado de la partida anterior")).catch(e=>console.error("Error al eliminar jugador:",e))}};return n.a.createElement("div",{className:"landingPage"},n.a.createElement("p",null,"\xdanete a una partida o crea una nueva"),n.a.createElement("input",{type:"text",placeholder:"Nombre de jugador",value:c,onChange:e=>s(e.target.value)}),n.a.createElement("div",null,n.a.createElement("label",{htmlFor:"gameSelect"},"Elige un juego ya creado: "),n.a.createElement("select",{id:"gameSelect",onChange:e=>(e=>{if(!c)return alert("Error: Por favor ingresa un nombre de jugador.");p();const a=localStorage.getItem("playerID")||Object(o.e)(Object(o.f)(u,"games")).key;localStorage.setItem("playerID",a),localStorage.setItem("playerName",c),localStorage.setItem("gameID",e);const r=Object(o.f)(u,`games/${e}/players/${a}`);Object(o.h)(r,{playerName:c,life:40,counter:0}).then(()=>{alert("Jugador a\xf1adido a la partida existente"),t(e)}).catch(e=>{console.error("Error al a\xf1adir jugador:",e)})})(e.target.value)},n.a.createElement("option",{value:""},"Seleccione una partida"),m.map(e=>n.a.createElement("option",{key:e.id,value:e.id},e.gameName)))),n.a.createElement("input",{type:"text",placeholder:"Crear partida",value:a,onChange:e=>l(e.target.value)}),n.a.createElement("button",{onClick:()=>{if(!c)return alert("Error: Por favor ingresa un nombre de jugador.");const e=g.current.map(e=>e.gameName);if(!a)return alert("Error: Por favor ingresa un nombre de partida.");if(e.includes(a))return alert("Error: partida ya existente");{p();const e=localStorage.getItem("playerID")||Object(o.e)(Object(o.f)(u,"games")).key;localStorage.setItem("playerID",e),localStorage.setItem("playerName",c);const r=Object(o.e)(Object(o.f)(u,"games")),n=r.key;localStorage.setItem("gameID",n),Object(o.h)(r,{gameName:a,players:{[e]:{playerName:c,life:40,counter:0}}}).then(()=>{alert("Partida creada"),t(n)}).catch(e=>{alert("Error: "+e.message)})}}},"Crear partida"))};var g=e=>{let{gameID:t}=e;const a=localStorage.getItem("playerID"),l=Object(o.f)(u,`games/${t}/players/${a}`),[c,s]=Object(r.useState)(""),[m,i]=Object(r.useState)(40),[g,p]=Object(r.useState)(0),[d,b]=Object(r.useState)(!1),j=e=>{i(e),Object(o.i)(l,{life:e})};return Object(r.useEffect)(()=>{const e=Object(o.d)(l,t=>(Object(o.d)(l,e=>{const t=e.val();t&&(""===t.playerName||d?""===t.playerName&&alert("No te podes sumar sin nombre"):(s(t.playerName),i(void 0!==t.life?t.life:40),p(t.counter||0)))}),()=>e()))},[l,d]),n.a.createElement("div",{className:"principalPlayer"},n.a.createElement("div",{className:"infoPP"},n.a.createElement("h2",null,c),n.a.createElement("p",null,"Vida: ",m),n.a.createElement("p",null,"Counter: ",g)),n.a.createElement("ul",{className:"lifeButtons"},n.a.createElement("li",null,n.a.createElement("button",{onClick:()=>j(m+1)},"+1")),n.a.createElement("li",null,n.a.createElement("button",{onClick:()=>j(m-1)},"-1")),n.a.createElement("li",null,n.a.createElement("button",{onClick:()=>j(m+5)},"+5")),n.a.createElement("li",null,n.a.createElement("button",{onClick:()=>j(m-5)},"-5")),n.a.createElement("li",null,n.a.createElement("button",{className:"counterButton",onClick:()=>{return p(e=g+1),void Object(o.i)(l,{counter:e});var e}},"Counter"))))};var p=e=>{let{opponentID:t,gameID:a}=e;const[l,c]=Object(r.useState)(40),[s,m]=Object(r.useState)(""),[i,g]=Object(r.useState)(0);return Object(r.useEffect)(()=>{if(!t||!a)return void console.warn("Missing opponentID or gameID:",{opponentID:t,gameID:a});const e=Object(o.f)(u,`games/${a}/players/${t}`);Object(o.d)(e,e=>{const t=e.val();t?(m(t.playerName||"jugador no puso nombre"),c(void 0!==t.life?t.life:40),g(t.counter||0)):console.log("no tenes nombre, GIL")})},[t,a]),n.a.createElement("div",{className:"oponente"},n.a.createElement("h2",null,s),n.a.createElement("p",null," Vida: ",l),n.a.createElement("p",null," Contador: ",i," "))};var d=function(e){let{gameID:t}=e;const[a,l]=Object(r.useState)(""),[c,s]=Object(r.useState)([]);Object(r.useEffect)(()=>{if(t){const e=Object(o.f)(Object(o.c)());Object(o.b)(Object(o.a)(e,"games/"+t)).then(e=>{if(e.exists()){const t=e.val();l(t.gameName),t.players?s(Object.keys(t.players)):s([])}else console.log("No data available")}).catch(e=>{console.error(e)})}},[t]);const m=localStorage.getItem("playerID");return n.a.createElement("div",{className:"game"},n.a.createElement("h2",{className:"gameName"}," Partida: ",a),n.a.createElement(g,{gameID:t}),n.a.createElement("ul",{className:"listaDeOponentes"},c.filter(e=>e!==m).map(e=>n.a.createElement("li",{key:e},n.a.createElement(p,{opponentID:e,gameID:t})))))};a(20);var b=function(){const[e,t]=Object(r.useState)("");return n.a.createElement("div",null,n.a.createElement(i,{onGameSelect:e=>{t(e)}}),n.a.createElement(d,{gameID:e}))};var j=e=>{e&&e instanceof Function&&a.e(3).then(a.bind(null,22)).then(t=>{let{getCLS:a,getFID:r,getFCP:n,getLCP:l,getTTFB:c}=t;a(e),r(e),n(e),l(e),c(e)})};c.a.createRoot(document.getElementById("root")).render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(b,null))),j()}},[[11,1,2]]]);
//# sourceMappingURL=main.f55e6012.chunk.js.map