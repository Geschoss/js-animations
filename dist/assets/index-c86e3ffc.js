var $=Object.defineProperty;var L=(t,e,n)=>e in t?$(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var a=(t,e,n)=>(L(t,typeof e!="symbol"?e+"":e,n),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerpolicy&&(s.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?s.credentials="include":r.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();class f{constructor(e=0,n=0,i=0,r="#ff6600"){a(this,"x");a(this,"y");a(this,"r");a(this,"c");a(this,"vx");a(this,"vy");a(this,"originX");a(this,"originY");this.x=e,this.y=n,this.r=i,this.c=r,this.vx=0,this.vy=0,this.originX=e,this.originY=n}set(e,n){this.x=e,this.y=n}think(e,n){let i=this.x-e.x,r=this.y-e.y;if(Math.sqrt(i*i+r*r)<e.r){let o=Math.atan2(r,i),c=e.x+Math.cos(o)*e.r,M=e.y+Math.sin(o)*e.r;this.vx+=c-this.x,this.vy+=M-this.y}this.vx+=n.spring.vx(this.x,this.originX),this.vy+=n.spring.vy(this.y,this.originY),this.vx*=n.friction.vx(this.x,this.originX),this.vy*=n.friction.vy(this.x,this.originX),this.x+=this.vx,this.y+=this.vy}render(e){e.beginPath(),e.arc(this.x,this.y,this.r,0,2*Math.PI),e.fillStyle=this.c,e.fill(),e.closePath()}}class w{constructor(e){a(this,"x",0);a(this,"y",0);a(this,"rect");a(this,"canvas");a(this,"move",e=>{this.x=e.clientX-this.rect.left,this.y=e.clientY-this.rect.top});this.canvas=e,this.rect=e.getBoundingClientRect(),e.addEventListener("mousemove",this.move)}destroy(){this.canvas.removeEventListener("mousemove",this.move)}}let m,_,y,P={friction:B(),spring:N()};const E={settings:{name:"balls_2"},init:t=>{m=new w(t),_=I(2e3),y=new f(100,100,20,"#eebe0a")},render:t=>{y.set(m.x,m.y),y.render(t),_.forEach(e=>{e.think(y,P),e.render(t)})},destroy(){m.destroy(),m=void 0,_=void 0,y=void 0}};function I(t){let e=[];for(let n=0;n<t;n++){let i=100+Math.random()*500,r=100+Math.random()*400;e.push(new f(i,r,i>350?2:3,i>350?"#00bcd4":"#bdb76b"))}return e}function N(){let t=0,e=0;return{vx(n,i){let r=i>350?t:e;return-(n-i)*r},vy(n,i){let r=i>350?t:e;return-(n-i)*r}}}function B(){let t=.99,e=.4;return{vx(n,i){return i>350?t:e},vy(n,i){return i>350?t:e}}}let v,b,g,C={friction:Y(.5),spring:S(.01)};const X={settings:{name:"balls"},init:t=>{v=new w(t),b=O(2e3),g=new f(100,100,20,"#eebe0a")},render:t=>{g.set(v.x,v.y),g.render(t),b.forEach(e=>{e.think(g,C),e.render(t)})},destroy(){v.destroy(),v=void 0,b=void 0,g=void 0}};function O(t){let e=[];for(let n=0;n<t;n++){let i=100+Math.random()*500,r=100+Math.random()*400;e.push(new f(i,r,2,"#ff0000"))}return e}function S(t){return{vx(e,n){return-(e-n)*t},vy(e,n){return-(e-n)*t}}}function Y(t){return{vx(){return t},vy(){return t}}}let x,k,p,q={friction:V(.8),spring:U(.007)};const A={settings:{name:"p_dor"},init:t=>{x=new w(t),k=T().map(e=>(e.set(100+Math.random()*500,100+Math.random()*400),e)),p=new f(100,100,20,"#eebe0a")},render:t=>{p.set(x.x,x.y),p.render(t),k.forEach(e=>{e.think(p,q),e.render(t)})},destroy(){x.destroy(),x=void 0,k=void 0,p=void 0}},F="#ff0000",R=2,u=(t,e,n=F)=>new f(t,e,R,n),l=20;function T(){return[...z(),...D(),...K(),...j(),...G(),...H(),...J()]}function z(){return[...d(200,250,l,t=>u(t,100)),...d(100,150,l,t=>u(225,t))]}function D(){return[...d(100,150,l,t=>u(270,t)),...h(270,135,l),...d(100,150,l,t=>u(310,t))]}function K(){return[...d(170,220,l,t=>u(150,t)),...h(150,185,l)]}function j(){return[...d(170,220,l,t=>u(190,t)),...Q(190,220,l),...d(170,220,l,t=>u(230,t))]}function G(){return[...d(170,220,l,t=>u(260,t)),...h(260,195,l,25)]}function H(){return[...h(325,185,l,15,1),...d(180,210,l,t=>u(310,t)),...d(180,210,l,t=>u(340,t)),...h(325,205,l,15,2)]}function J(){return[...d(170,220,l,t=>u(370,t)),...h(370,185,l,15,1.5)]}function h(t,e,n,i=15,r=1.5){let s=[];for(var o=0;o<=n;o++)s.push(u(t+i*Math.cos(Math.PI*o/n+Math.PI*r),e+i*Math.sin(Math.PI*o/n+Math.PI*r)));return s}function Q(t,e,n){let i=[];for(var r=0;r<n;r++)i.push(u(t+2*r,e-2.5*r));return i}function d(t,e,n,i){let r=e-t,s=Math.trunc(r/(n-1)),o=[];for(let c=t;c<=e;c+=s)o.push(i(c));return o}function U(t){return{vx(e,n){return-(e-n)*t},vy(e,n){return-(e-n)*t}}}function V(t){return{vx(){return t},vy(){return t}}}function W(t){const e=document.getElementById("menu"),n=document.getElementById("canvas"),i=n.getContext("2d");let r,s;Z(t,e,o);function o(M){s&&cancelAnimationFrame(s),r&&r.destroy(n),r=t[M],n.width=r.settings.width||700,n.height=r.settings.height||600,r.init(n),c()}function c(){i.clearRect(0,0,n.width,n.height),r.render(i),s=requestAnimationFrame(c)}}function Z(t,e,n){let i;i=t.map((s,o)=>{let c=document.createElement("div");return c.classList.add("menu__item"),c.addEventListener("click",()=>{i!==c&&(i&&i.classList.remove("menu__item_selected"),i=c,i.classList.add("menu__item_selected"),n(o))}),c.innerText=s.settings.name,e.appendChild(c),c})[0],i.classList.add("menu__item_selected"),n(0)}W([A,X,E]);