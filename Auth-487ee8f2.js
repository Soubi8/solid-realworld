import{c as e,u as s,a as r,N as t,i as o,e as i,t as l}from"./index.js";import{L as n}from"./ListErrors-13d37085.js";const a=l('<div class="auth-page"><div class="container page"><div class="row"><div class="col-md-6 offset-md-3 col-xs-12"><h1 class="text-xs-center"></h1><p class="text-xs-center"></p><form><fieldset class="form-group"><input class="form-control form-control-lg" type="text" placeholder="Email"></fieldset><fieldset class="form-group"><input class="form-control form-control-lg" type="password" placeholder="Password"></fieldset><button class="btn btn-lg btn-primary pull-xs-right" type="submit"></button></form></div></div></div></div>',22),c=l('<fieldset class="form-group"><input class="form-control form-control-lg" type="text" placeholder="Username"></fieldset>',3),d=["errors"];export default()=>{const[l,u]=e({username:"",inProgress:!1}),[,{register:f,login:g}]=s(),m=location.hash.includes("login"),p=m?"Sign in":"Sign up",v=r(t,m?{route:"register",children:"Need an account?"}:{route:"login",children:"Have an account?"}),h=e=>{e.preventDefault(),u({inProgress:!0}),(m?g(l.email,l.password):f(l.username,l.email,l.password)).then(()=>location.hash="/").catch(e=>u({errors:e})).finally(()=>u({inProgress:!1}))};return(()=>{const e=a.cloneNode(!0),s=e.firstChild.firstChild.firstChild,t=s.firstChild,f=t.nextSibling,g=f.nextSibling,x=g.firstChild,b=x.firstChild,C=x.nextSibling,$=C.firstChild,_=C.nextSibling;return t.textContent=p,o(f,v),o(s,r(n,{errors:()=>l.errors},d),g),g.onsubmit=h,o(g,!m&&(()=>{const e=c.cloneNode(!0),s=e.firstChild;return s.onchange=e=>u({username:e.target.value}),i(()=>s.value=l.username),e})(),x),b.onchange=e=>u({email:e.target.value}),$.onchange=e=>u({password:e.target.value}),_.textContent=p,i(e=>{const s=l.email,r=l.password,t=l.inProgress;return s!==e._v$&&(b.value=e._v$=s),r!==e._v$2&&($.value=e._v$2=r),t!==e._v$3&&(_.disabled=e._v$3=t),e},{_v$:void 0,_v$2:void 0,_v$3:void 0}),e})()};
