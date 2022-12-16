var V=Object.defineProperty;var Z=(t,e,n)=>e in t?V(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var o=(t,e,n)=>(Z(t,typeof e!="symbol"?e+"":e,n),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerpolicy&&(s.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?s.credentials="include":r.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function ee(t){const e=t.reduce((y,x)=>({...y,[x.settings.name]:x}),{}),n=document.getElementById("menu"),i=document.getElementById("canvas"),r=document.body,s=i.getContext("2d");let l=ne(),a=te(l,e),b,N=!0;re(e,n,Q,a),U();function U(){let y={width:a.settings.width||r.offsetWidth,height:a.settings.height||r.offsetHeight};i.width=y.width,i.height=y.height,a.init(i,y),G()}function Q(y){b&&cancelAnimationFrame(b),a&&a.destroy(i),a=e[y],U()}function G(){N&&s.clearRect(0,0,i.width,i.height);let y={width:i.width,height:i.height},x=a.render(s,y);typeof x=="boolean"&&(N=x),b=requestAnimationFrame(G)}}function te(t,e){let n=e[t];return t===""||n==null?Object.values(e)[0]:n}function ne(){return window.location.hash.slice(1)||""}function ie(t){window.history.pushState({},t,`#${t}`)}function re(t,e,n,i){let r;Object.keys(t).map(s=>{let l=t[s],a=document.createElement("div");return a.classList.add("menu__item"),a.innerText=l.settings.name,i===l&&(r=a,r.classList.add("menu__item_selected")),a.addEventListener("click",()=>{r!==a&&(r&&r.classList.remove("menu__item_selected"),r=a,r.classList.add("menu__item_selected"),ie(s),n(s))}),e.appendChild(a),a})}let g=class{constructor(e=0,n=0,i=0,r="#ff6600"){o(this,"x");o(this,"y");o(this,"r");o(this,"c");o(this,"vx");o(this,"vy");o(this,"originX");o(this,"originY");this.x=e,this.y=n,this.r=i,this.c=r,this.vx=0,this.vy=0,this.originX=e,this.originY=n}set(e,n){this.x=e,this.y=n}think(e,n){let i=this.x-e.x,r=this.y-e.y;if(Math.sqrt(i*i+r*r)<e.r){let l=Math.atan2(r,i),a=e.x+Math.cos(l)*e.r,b=e.y+Math.sin(l)*e.r;this.vx+=a-this.x,this.vy+=b-this.y}this.vx+=n.spring.vx(this.x,this.originX,n),this.vy+=n.spring.vy(this.y,this.originY,n),this.vx*=n.friction.vx(this.x,this.originX,n),this.vy*=n.friction.vy(this.x,this.originX,n),this.x+=this.vx,this.y+=this.vy}render(e){e.beginPath(),e.arc(this.x,this.y,this.r,0,2*Math.PI),e.fillStyle=this.c,e.fill(),e.closePath()}};class se{constructor(e){o(this,"x",0);o(this,"y",0);o(this,"pressed",!1);o(this,"rect");o(this,"canvas");o(this,"touch_start",()=>{this.pressed=!0});o(this,"touch_end",()=>{this.pressed=!1,this.x=0,this.y=0});o(this,"touch_move",e=>{let n=0,i=0,r=e.touches[0];r.pageX||r.pageY?(n=r.pageX,i=r.pageY):(n=r.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,i=r.clientY+document.body.scrollTop+document.documentElement.scrollTop),n-=this.canvas.offsetLeft,i-=this.canvas.offsetTop,this.x=n,this.y=i});this.canvas=e,e.addEventListener("touchstart",this.touch_start,!1),e.addEventListener("touchmove",this.touch_move,!1),e.addEventListener("touchend",this.touch_end,!1)}destroy(){this.canvas.removeEventListener("touchstart",this.touch_start,!1),this.canvas.removeEventListener("touchmove",this.touch_move,!1),this.canvas.removeEventListener("touchend",this.touch_end,!1)}}class W{constructor(e){o(this,"x",0);o(this,"y",0);o(this,"rect");o(this,"canvas");o(this,"move",e=>{let n=0,i=0;e.pageX||e.pageY?(n=e.pageX,i=e.pageY):(n=e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,i=e.clientY+document.body.scrollTop+document.documentElement.scrollTop),n-=this.canvas.offsetLeft,i-=this.canvas.offsetTop,this.x=n,this.y=i});this.canvas=e,e.addEventListener("mousemove",this.move,!1)}destroy(){this.canvas.removeEventListener("mousemove",this.move,!1)}}class oe{constructor(){o(this,"keydown",e=>{console.log(e.code)});o(this,"keyup",e=>{console.log(e.code)});window.addEventListener("keydown",this.keydown,!1),window.addEventListener("keyup",this.keyup,!1)}destroy(){window.removeEventListener("keydown",this.keydown,!1),window.removeEventListener("keyup",this.keyup,!1)}}let k,A,L,le={friction:ce(),spring:de()};const ae={settings:{name:"balls_2"},init:(t,e)=>{k=new W(t),A=he(2e3,e),L=new g(100,100,20,"#eebe0a")},render:(t,e)=>{L.set(k.x,k.y),L.render(t),A.forEach(n=>{n.think(L,{...e,...le}),n.render(t)})},destroy(){k.destroy(),k=void 0,A=void 0,L=void 0}};function he(t,e){let n=[],i=e.width/10,r=e.height/10;for(let s=0;s<t;s++){let l=i+Math.random()*(e.width-i*2),a=r+Math.random()*(e.height-r*2);n.push(new g(l,a,l>e.width/2?2:3,l>e.width/2?"#00bcd4":"#bdb76b"))}return n}function de(){let t=0,e=0;return{vx(n,i,r){let s=i>r.width/2?t:e;return-(n-i)*s},vy(n,i,r){let s=i>r.width/2?t:e;return-(n-i)*s}}}function ce(){let t=.99,e=.4;return{vx(n,i,r){return i>r.width/2?t:e},vy(n,i,r){return i>r.width/2?t:e}}}let $,q,E,ue={friction:me(.5),spring:ge(.01)};const fe={settings:{name:"balls"},init:(t,e)=>{$=new W(t),q=ye(2e3,e),E=new g(100,100,20,"#eebe0a")},render:t=>{E.set($.x,$.y),E.render(t),q.forEach(e=>{e.think(E,ue),e.render(t)})},destroy(){$.destroy(),$=void 0,q=void 0,E=void 0}};function ye(t,e){let n=[],i=e.width/10,r=e.height/10;for(let s=0;s<t;s++){let l=i+Math.random()*(e.width-i*2),a=r+Math.random()*(e.height-r*2);n.push(new g(l,a,2,"#ff0000"))}return n}function ge(t){return{vx(e,n){return-(e-n)*t},vy(e,n){return-(e-n)*t}}}function me(t){return{vx(){return t},vy(){return t}}}let T,F,X,we={friction:Pe(.8),spring:Ye(.007)};const pe={settings:{name:"p_dor"},init:t=>{T=new W(t),F=Me().map(e=>(e.set(100+Math.random()*500,100+Math.random()*400),e)),X=new g(100,100,20,"#eebe0a")},render:t=>{X.set(T.x,T.y),X.render(t),F.forEach(e=>{e.think(X,we),e.render(t)})},destroy(){T.destroy(),T=void 0,F=void 0,X=void 0}},ve="#ff0000",_e=2,d=(t,e,n=ve)=>new g(t,e,_e,n),h=20;function Me(){return[...be(),...xe(),...ke(),...Le(),...$e(),...Ee(),...Te()]}function be(){return[...u(200,250,h,t=>d(t,100)),...u(100,150,h,t=>d(225,t))]}function xe(){return[...u(100,150,h,t=>d(270,t)),...P(270,135,h),...u(100,150,h,t=>d(310,t))]}function ke(){return[...u(170,220,h,t=>d(150,t)),...u(150,170,h,t=>d(t,170)),...u(170,220,h,t=>d(170,t))]}function Le(){return[...u(170,220,h,t=>d(190,t)),...Xe(190,220,h),...u(170,220,h,t=>d(230,t))]}function $e(){return[...u(170,220,h,t=>d(260,t)),...P(260,195,h,25)]}function Ee(){return[...P(325,185,h,15,1),...u(180,210,h,t=>d(310,t)),...u(180,210,h,t=>d(340,t)),...P(325,205,h,15,2)]}function Te(){return[...u(170,220,h,t=>d(370,t)),...P(370,185,h,15,1.5)]}function P(t,e,n,i=15,r=1.5){let s=[];for(var l=0;l<=n;l++)s.push(d(t+i*Math.cos(Math.PI*l/n+Math.PI*r),e+i*Math.sin(Math.PI*l/n+Math.PI*r)));return s}function Xe(t,e,n){let i=[];for(var r=0;r<n;r++)i.push(d(t+2*r,e-2.5*r));return i}function u(t,e,n,i){let r=e-t,s=Math.trunc(r/(n-1)),l=[];for(let a=t;a<=e;a+=s)l.push(i(a));return l}function Ye(t){return{vx(e,n){return-(e-n)*t},vy(e,n){return-(e-n)*t}}}function Pe(t){return{vx(){return t},vy(){return t}}}let j,Y,M,Ie={friction:Oe(.99),spring:Ce(0)};const Se={settings:{name:"balls_touch"},init:(t,e)=>{M=new se(t),j=Be(2e3,e),Y=new g(e.width/2,e.height/2,30,"#eebe0a")},render:t=>{M.pressed&&Y.set(M.x,M.y),Y.render(t),j.forEach(e=>{e.think(Y,Ie),e.render(t)})},destroy(){M.destroy(),M=void 0,j=void 0,Y=void 0}};function Be(t,e){let n=[],i=e.width/20,r=e.height/20;for(let s=0;s<t;s++){let l=i+Math.random()*(e.width-i*2),a=r+Math.random()*(e.height-r*2);n.push(new g(l,a,2,"#00bcd4"))}return n}function Ce(t){return{vx(e,n){return-(e-n)*t},vy(e,n){return-(e-n)*t}}}function Oe(t){return{vx(){return t},vy(){return t}}}const We=[Se,fe,ae,pe];let I,K,R,J;const Ae={settings:{name:"arrow"},init(t){K=new qe(150,150),I=new W(t),R=new g(100,100,20,"#eebe0a"),J=new oe},render(t){R.set(I.x,I.y),R.render(t),K.ratateTo(I),K.draw(t)},destroy(){J.destroy()}};class qe{constructor(e=0,n=0,i="#ffff00"){o(this,"x");o(this,"y");o(this,"color","");o(this,"rotation",0);this.x=e,this.y=n,this.color=i,this.rotation=0}ratateTo({x:e,y:n}){let i=e-this.x,r=n-this.y;this.rotation=Math.atan2(r,i)}draw(e){e.save(),e.translate(this.x,this.y),e.rotate(this.rotation),e.lineWidth=2,e.fillStyle=this.color,e.beginPath(),e.moveTo(-50,-25),e.lineTo(0,-25),e.lineTo(0,-50),e.lineTo(50,0),e.lineTo(0,50),e.lineTo(0,25),e.lineTo(-50,25),e.lineTo(-50,-25),e.closePath(),e.fill(),e.stroke(),e.restore()}}class v{constructor(e=100,n=100,i=20,r="#ff0000"){o(this,"x",200);o(this,"y",100);o(this,"scaleX",1);o(this,"scaleY",1);o(this,"lineWidth",1);o(this,"color","");o(this,"radius",10);o(this,"rotation",0);this.x=e,this.y=n,this.color=r,this.radius=i}ratateTo({x:e,y:n}){let i=e-this.x,r=n-this.y;this.rotation=Math.atan2(r,i)}render(e){e.save(),e.translate(this.x,this.y),e.rotate(this.rotation),e.scale(this.scaleX,this.scaleY),e.lineWidth=this.lineWidth,e.fillStyle=this.color,e.beginPath(),e.arc(0,0,this.radius,0,Math.PI*2,!0),e.closePath(),e.fill(),this.lineWidth>0&&e.stroke(),e.restore()}}let m,_={angle:0,centrY:200,range:50,xspeed:3,yspeed:.05},S,w={angle:0,centryScale:1,range:.5,speed:.1},B,c={angleX:0,angleY:0,range:150,centerX:0,centerY:0,xspeed:.07,yspeed:.11};const Fe={settings:{name:"liner"},init(t,e){m=new v(0,0),S=new v(e.width/2,e.height/2,30,"#00ff00"),B=new v(e.width/2,e.height/2,30,"#0000ff"),c.centerX=e.width/2,c.centerY=e.height/2},render(t,e){return _.angle+=_.yspeed,m.x+=_.xspeed,m.y=_.centrY/2+Math.sin(_.angle)*_.range,m.x>e.width+m.radius&&(m.x=-m.radius,_.range+=1),S.scaleX=w.centryScale+Math.sin(w.angle)*w.range,S.scaleY=w.centryScale+Math.sin(w.angle)*w.range,w.angle+=w.speed,B.x=c.centerX+Math.sin(c.angleX)*c.range,B.y=c.centerY+Math.sin(c.angleY)*c.range,c.angleX+=c.xspeed,c.angleY+=c.yspeed,c.range+=.01,S.render(t),m.render(t),B.render(t),!1},destroy(){}};let z,D,C,O,H,f=40,p=0;const je={settings:{name:"waves"},init(t,e){z=new v(e.width/2,e.height/2,f,"#ffee00"),D=new v(e.width/2,e.height/2,f,"#00ff00"),C=new v(e.width/2,e.height/2,f,"#0000ff"),O=new v(e.width/2,e.height/2,f,"#f0f0f0"),H=new v(e.width/2,e.height/2,f)},render(t,e){p+=.03;let n=e.width/2,i=e.height/2;z.x=n+Math.sin(p*.2)*(n-f),D.y=i+Math.sin(p*.3)*(i-f),C.y=i+Math.sin(p*.4)*(i-f),C.x=n+Math.sin(p)*(n-f),O.y=i+Math.sin(p*.5)*(i-f),O.x=n+Math.cos(p*.2)*(n-f),H.x=n+Math.sin(p*2)*(n-f),z.render(t),D.render(t),C.render(t),O.render(t),H.render(t)},destroy(){}},Ke=[Fe,je,Ae];ee([...Ke,...We]);
