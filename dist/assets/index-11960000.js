var g=Object.defineProperty;var p=(s,e,t)=>e in s?g(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var r=(s,e,t)=>(p(s,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerpolicy&&(o.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?o.credentials="include":i.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();class y{constructor(e=0,t=0,n=0,i="#ff6600"){r(this,"x");r(this,"y");r(this,"r");r(this,"c");r(this,"vx");r(this,"vy");r(this,"originX");r(this,"originY");r(this,"springFactor");r(this,"friction");this.x=e,this.y=t,this.r=n,this.c=i,this.vx=0,this.vy=0,this.friction=.9,this.springFactor=.005,this.originX=e,this.originY=t}set(e,t){this.x=e,this.y=t}think(e){let t=this.x-e.x,n=this.y-e.y;if(Math.sqrt(t*t+n*n)<e.r){let l=Math.atan2(n,t),a=e.x+Math.cos(l)*e.r,v=e.y+Math.sin(l)*e.r;this.vx+=a-this.x,this.vy+=v-this.y}let o=-(this.x-this.originX),c=-(this.y-this.originY);this.vx+=o*this.springFactor,this.vy+=c*this.springFactor,this.vx*=this.friction,this.vy*=this.friction,this.x+=this.vx,this.y+=this.vy}render(e){e.beginPath(),e.arc(this.x,this.y,this.r,0,2*Math.PI),e.fillStyle=this.c,e.fill(),e.closePath()}}class x{constructor(e){r(this,"x",0);r(this,"y",0);r(this,"rect");r(this,"canvas");r(this,"move",e=>{this.x=e.clientX-this.rect.left,this.y=e.clientY-this.rect.top});this.canvas=e,this.rect=e.getBoundingClientRect(),e.addEventListener("mousemove",this.move)}destroy(){this.canvas.removeEventListener("mousemove",this.move)}}let d,u,h;const L={settings:{name:"balls"},init:s=>{d=new x(s),u=E(1e3),h=new y(100,100,40,"#eebe0a")},render:s=>{h.set(d.x,d.y),h.render(s),u.forEach(e=>{e.think(h),e.render(s)})},destroy(){d.destroy(),d=void 0,u=void 0,h=void 0}};function E(s){let e=[];for(let t=0;t<s;t++)e.push(new y(100+Math.random()*500,100+Math.random()*400,2,"#00bcd4"));return e}function m(){console.log("mousedown")}function f(){console.log("mouseup")}const M={settings:{name:"hello"},init(s){s.addEventListener("mousedown",m),s.addEventListener("mouseup",f)},render(){},destroy(s){s.removeEventListener("mousedown",m),s.removeEventListener("mouseup",f)}};function w(s){const e=document.getElementById("menu"),t=document.getElementById("canvas"),n=t.getContext("2d");let i,o;_(s,e,c);function c(a){o&&cancelAnimationFrame(o),i&&i.destroy(t),i=s[a],t.width=i.settings.width||700,t.height=i.settings.height||600,i.init(t),l()}function l(){n.clearRect(0,0,t.width,t.height),i.render(n),o=requestAnimationFrame(l)}}function _(s,e,t){let n;n=s.map((o,c)=>{let l=document.createElement("div");return l.classList.add("menu__item"),l.addEventListener("click",()=>{n!==l&&(n&&n.classList.remove("menu__item_selected"),n=l,n.classList.add("menu__item_selected"),t(c))}),l.innerText=o.settings.name,e.appendChild(l),l})[0],n.classList.add("menu__item_selected"),t(0)}w([L,M]);
