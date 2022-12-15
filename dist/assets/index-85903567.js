var R=Object.defineProperty;var j=(t,e,i)=>e in t?R(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var r=(t,e,i)=>(j(t,typeof e!="symbol"?e+"":e,i),i);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function i(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=i(s);fetch(s.href,o)}})();function z(t){const e=t.reduce((u,F)=>({...u,[F.settings.name]:F}),{}),i=document.getElementById("menu"),n=document.getElementById("canvas"),s=document.body,o=n.getContext("2d");let a=H(),l=D(a,e),g;G(e,i,N,l),A();function A(){let u={width:l.settings.width||s.offsetWidth,height:l.settings.height||s.offsetHeight};n.width=u.width,n.height=u.height,l.init(n,u),q()}function N(u){g&&cancelAnimationFrame(g),l&&l.destroy(n),l=e[u],A()}function q(){o.clearRect(0,0,n.width,n.height);let u={width:n.width,height:n.height};l.render(o,u),g=requestAnimationFrame(q)}}function D(t,e){let i=e[t];return t===""||i==null?e.balls:i}function H(){return window.location.pathname.split("/").slice(2)[0]||""}function U(t){document.location.href=`${t}`}function G(t,e,i,n){let s;Object.keys(t).map(o=>{let a=t[o],l=document.createElement("div");return l.classList.add("menu__item"),l.innerText=a.settings.name,n===a&&(s=l,s.classList.add("menu__item_selected")),l.addEventListener("click",()=>{s!==l&&(s&&s.classList.remove("menu__item_selected"),s=l,s.classList.add("menu__item_selected"),U(o),i(o))}),e.appendChild(l),l})}let f=class{constructor(e=0,i=0,n=0,s="#ff6600"){r(this,"x");r(this,"y");r(this,"r");r(this,"c");r(this,"vx");r(this,"vy");r(this,"originX");r(this,"originY");this.x=e,this.y=i,this.r=n,this.c=s,this.vx=0,this.vy=0,this.originX=e,this.originY=i}set(e,i){this.x=e,this.y=i}think(e,i){let n=this.x-e.x,s=this.y-e.y;if(Math.sqrt(n*n+s*s)<e.r){let a=Math.atan2(s,n),l=e.x+Math.cos(a)*e.r,g=e.y+Math.sin(a)*e.r;this.vx+=l-this.x,this.vy+=g-this.y}this.vx+=i.spring.vx(this.x,this.originX),this.vy+=i.spring.vy(this.y,this.originY),this.vx*=i.friction.vx(this.x,this.originX),this.vy*=i.friction.vy(this.x,this.originX),this.x+=this.vx,this.y+=this.vy}render(e){e.beginPath(),e.arc(this.x,this.y,this.r,0,2*Math.PI),e.fillStyle=this.c,e.fill(),e.closePath()}};class J{constructor(e){r(this,"x",0);r(this,"y",0);r(this,"pressed",!1);r(this,"rect");r(this,"canvas");r(this,"touch_start",()=>{this.pressed=!0});r(this,"touch_end",()=>{this.pressed=!1,this.x=0,this.y=0});r(this,"touch_move",e=>{let i=0,n=0,s=e.touches[0];s.pageX||s.pageY?(i=s.pageX,n=s.pageY):(i=s.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,n=s.clientY+document.body.scrollTop+document.documentElement.scrollTop),i-=this.canvas.offsetLeft,n-=this.canvas.offsetTop,this.x=i,this.y=n});this.canvas=e,e.addEventListener("touchstart",this.touch_start,!1),e.addEventListener("touchmove",this.touch_move,!1),e.addEventListener("touchend",this.touch_end,!1)}destroy(){this.canvas.removeEventListener("touchstart",this.touch_start,!1),this.canvas.removeEventListener("touchmove",this.touch_move,!1),this.canvas.removeEventListener("touchend",this.touch_end,!1)}}class P{constructor(e){r(this,"x",0);r(this,"y",0);r(this,"rect");r(this,"canvas");r(this,"move",e=>{let i=0,n=0;e.pageX||e.pageY?(i=e.pageX,n=e.pageY):(i=e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,n=e.clientY+document.body.scrollTop+document.documentElement.scrollTop),i-=this.canvas.offsetLeft,n-=this.canvas.offsetTop,this.x=i,this.y=n});this.canvas=e,e.addEventListener("mousemove",this.move,!1)}destroy(){this.canvas.removeEventListener("mousemove",this.move,!1)}}class Q{constructor(){r(this,"keydown",e=>{console.log(e.code)});r(this,"keyup",e=>{console.log(e.code)});window.addEventListener("keydown",this.keydown,!1),window.addEventListener("keyup",this.keyup,!1)}destroy(){window.removeEventListener("keydown",this.keydown,!1),window.removeEventListener("keyup",this.keyup,!1)}}let v,X,w,V={friction:ie(),spring:te()};const Z={settings:{name:"balls_2"},init:(t,e)=>{v=new P(t),X=ee(2e3,e),w=new f(100,100,20,"#eebe0a")},render:t=>{w.set(v.x,v.y),w.render(t),X.forEach(e=>{e.think(w,V),e.render(t)})},destroy(){v.destroy(),v=void 0,X=void 0,w=void 0}};function ee(t,e){let i=[],n=e.width/10,s=e.height/10;for(let o=0;o<t;o++){let a=n+Math.random()*(e.width-n*2),l=s+Math.random()*(e.height-s*2);i.push(new f(a,l,a>e.width/2?2:3,a>e.width/2?"#00bcd4":"#bdb76b"))}return i}function te(){let t=0,e=0;return{vx(i,n){let s=n>350?t:e;return-(i-n)*s},vy(i,n){let s=n>350?t:e;return-(i-n)*s}}}function ie(){let t=.99,e=.4;return{vx(i,n){return n>350?t:e},vy(i,n){return n>350?t:e}}}let p,Y,_,ne={friction:le(.5),spring:oe(.01)};const se={settings:{name:"balls"},init:(t,e)=>{p=new P(t),Y=re(2e3,e),_=new f(100,100,20,"#eebe0a")},render:t=>{_.set(p.x,p.y),_.render(t),Y.forEach(e=>{e.think(_,ne),e.render(t)})},destroy(){p.destroy(),p=void 0,Y=void 0,_=void 0}};function re(t,e){let i=[],n=e.width/10,s=e.height/10;for(let o=0;o<t;o++){let a=n+Math.random()*(e.width-n*2),l=s+Math.random()*(e.height-s*2);i.push(new f(a,l,2,"#ff0000"))}return i}function oe(t){return{vx(e,i){return-(e-i)*t},vy(e,i){return-(e-i)*t}}}function le(t){return{vx(){return t},vy(){return t}}}let b,I,M,ae={friction:Me(.8),spring:be(.007)};const he={settings:{name:"p_dor"},init:t=>{b=new P(t),I=ue().map(e=>(e.set(100+Math.random()*500,100+Math.random()*400),e)),M=new f(100,100,20,"#eebe0a")},render:t=>{M.set(b.x,b.y),M.render(t),I.forEach(e=>{e.think(M,ae),e.render(t)})},destroy(){b.destroy(),b=void 0,I=void 0,M=void 0}},de="#ff0000",ce=2,d=(t,e,i=de)=>new f(t,e,ce,i),h=20;function ue(){return[...fe(),...ye(),...me(),...ge(),...ve(),...we(),...pe()]}function fe(){return[...c(200,250,h,t=>d(t,100)),...c(100,150,h,t=>d(225,t))]}function ye(){return[...c(100,150,h,t=>d(270,t)),...k(270,135,h),...c(100,150,h,t=>d(310,t))]}function me(){return[...c(170,220,h,t=>d(150,t)),...c(150,170,h,t=>d(t,170)),...c(170,220,h,t=>d(170,t))]}function ge(){return[...c(170,220,h,t=>d(190,t)),..._e(190,220,h),...c(170,220,h,t=>d(230,t))]}function ve(){return[...c(170,220,h,t=>d(260,t)),...k(260,195,h,25)]}function we(){return[...k(325,185,h,15,1),...c(180,210,h,t=>d(310,t)),...c(180,210,h,t=>d(340,t)),...k(325,205,h,15,2)]}function pe(){return[...c(170,220,h,t=>d(370,t)),...k(370,185,h,15,1.5)]}function k(t,e,i,n=15,s=1.5){let o=[];for(var a=0;a<=i;a++)o.push(d(t+n*Math.cos(Math.PI*a/i+Math.PI*s),e+n*Math.sin(Math.PI*a/i+Math.PI*s)));return o}function _e(t,e,i){let n=[];for(var s=0;s<i;s++)n.push(d(t+2*s,e-2.5*s));return n}function c(t,e,i,n){let s=e-t,o=Math.trunc(s/(i-1)),a=[];for(let l=t;l<=e;l+=o)a.push(n(l));return a}function be(t){return{vx(e,i){return-(e-i)*t},vy(e,i){return-(e-i)*t}}}function Me(t){return{vx(){return t},vy(){return t}}}let B,x,m,xe={friction:$e(.99),spring:Ee(0)};const ke={settings:{name:"balls_touch"},init:(t,e)=>{m=new J(t),B=Le(2e3,e),x=new f(e.width/2,e.height/2,30,"#eebe0a")},render:t=>{m.pressed&&x.set(m.x,m.y),x.render(t),B.forEach(e=>{e.think(x,xe),e.render(t)})},destroy(){m.destroy(),m=void 0,B=void 0,x=void 0}};function Le(t,e){let i=[],n=e.width/20,s=e.height/20;for(let o=0;o<t;o++){let a=n+Math.random()*(e.width-n*2),l=s+Math.random()*(e.height-s*2);i.push(new f(a,l,2,"#00bcd4"))}return i}function Ee(t){return{vx(e,i){return-(e-i)*t},vy(e,i){return-(e-i)*t}}}function $e(t){return{vx(){return t},vy(){return t}}}const Te=[ke,se,Z,he];let L,C,O,K;const Pe={settings:{name:"arrow"},init(t){C=new Xe(150,150),L=new P(t),O=new f(100,100,20,"#eebe0a"),K=new Q},render(t){O.set(L.x,L.y),O.render(t),C.ratateTo(L),C.draw(t)},destroy(){K.destroy()}};class Xe{constructor(e=0,i=0,n="#ffff00"){r(this,"x");r(this,"y");r(this,"color","");r(this,"rotation",0);this.x=e,this.y=i,this.color=n,this.rotation=0}ratateTo({x:e,y:i}){let n=e-this.x,s=i-this.y;this.rotation=Math.atan2(s,n)}draw(e){e.save(),e.translate(this.x,this.y),e.rotate(this.rotation),e.lineWidth=2,e.fillStyle=this.color,e.beginPath(),e.moveTo(-50,-25),e.lineTo(0,-25),e.lineTo(0,-50),e.lineTo(50,0),e.lineTo(0,50),e.lineTo(0,25),e.lineTo(-50,25),e.lineTo(-50,-25),e.closePath(),e.fill(),e.stroke(),e.restore()}}let S,W,E,$,y=0;const Ye={settings:{name:"waves"},init(t,e){S=new T(e.width/2,e.height/2,40,"#ffee00"),W=new T(e.width/2,e.height/2,40,"#00ff00"),E=new T(e.width/2,e.height/2,40,"#0000ff"),$=new T(e.width/2,e.height/2,40)},render(t,e){y+=.03;let i=e.width/2,n=e.width/2;S.x=i+Math.sin(y*.2)*i,W.y=n+Math.sin(y*.3)*n,E.y=n+Math.sin(y*.4)*n,E.x=i+Math.sin(y)*i,$.y=n+Math.sin(y*.5)*n,$.x=i+Math.cos(y*.2)*i,S.draw(t),W.draw(t),E.draw(t),$.draw(t)},destroy(){}};class T{constructor(e=100,i=100,n=20,s="#ff0000"){r(this,"x",200);r(this,"y",100);r(this,"scaleX",1);r(this,"scaleY",1);r(this,"lineWidth",1);r(this,"color","");r(this,"radius",10);r(this,"rotation",0);this.x=e,this.y=i,this.color=s,this.radius=n}ratateTo({x:e,y:i}){let n=e-this.x,s=i-this.y;this.rotation=Math.atan2(s,n)}draw(e){e.save(),e.translate(this.x,this.y),e.rotate(this.rotation),e.scale(this.scaleX,this.scaleY),e.lineWidth=this.lineWidth,e.fillStyle=this.color,e.beginPath(),e.arc(0,0,this.radius,0,Math.PI*2,!0),e.closePath(),e.fill(),this.lineWidth>0&&e.stroke(),e.restore()}}const Ie=[Ye,Pe];z([...Ie,...Te]);