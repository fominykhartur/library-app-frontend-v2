import{p as f}from"./api-508c2bdb.js";import{o as a,c as r,w as s,a as u,l as w,t as h,u as g,v as _,x as p,f as m,b as i,y as V,q as x,s as d,i as b}from"./index-a2b6bb0b.js";import{_ as y}from"./_plugin-vue_export-helper-c27b6911.js";const k={data(){return{jwt:localStorage.getItem("jwt"),show1:!1,show2:!0,email:"",password:"",loginRules:[o=>(o==null?void 0:o.length)>0?!0:"Поле не должно быть пустым"]}},methods:{login:function(o,e){console.log(o,e),console.log("http://localhost:9000/library-api/auth/login"),f("http://localhost:9000/library-api/auth/login",{email:this.email,password:this.password}).then(l=>{console.log(l),localStorage.setItem("jwt",l.data.jwt),localStorage.setItem("username",l.data.name),localStorage.setItem("id",l.data.id),window.dispatchEvent(new CustomEvent("login"))})}},mounted(){console.log("http://localhost:9000")}},B={key:1,class:"mx-auto"},C=d("br",null,null,-1),E=d("br",null,null,-1);function S(o,e,l,R,t,c){return a(),r(x,{class:"fill-height"},{default:s(()=>[u(w,{class:"d-flex align-center text-center fill-height"},{default:s(()=>[t.jwt?(a(),V("div",B,[i(" Вы уже авторизированы "),C,E,u(m,{to:"/"},{default:s(()=>[i("Назад")]),_:1})])):(a(),r(h,{key:0,width:"300",class:"mx-auto"},{default:s(()=>[u(g,{"fast-fail":"",onSubmit:e[4]||(e[4]=_(()=>{},["prevent"]))},{default:s(()=>[u(p,{modelValue:t.email,"onUpdate:modelValue":e[0]||(e[0]=n=>t.email=n),label:"email",rules:t.loginRules},null,8,["modelValue","rules"]),u(p,{modelValue:t.password,"onUpdate:modelValue":e[1]||(e[1]=n=>t.password=n),"append-icon":t.show1?"mdi-eye":"mdi-eye-off",rules:t.loginRules,type:t.show1?"text":"password",label:"password","onClick:append":e[2]||(e[2]=n=>t.show1=!t.show1)},null,8,["modelValue","append-icon","rules","type"]),u(m,{type:"submit",block:"",class:"mt-2",onClick:e[3]||(e[3]=n=>c.login(t.email,t.password)),to:"/"},{default:s(()=>[i("Войти")]),_:1})]),_:1})]),_:1}))]),_:1})]),_:1})}const j=y(k,[["render",S]]),q=b({__name:"Auth",setup(o){return(e,l)=>(a(),r(j))}});export{q as default};
