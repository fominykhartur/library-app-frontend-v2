import{g as m}from"./api-0fb06587.js";import{_ as p}from"./_plugin-vue_export-helper-c27b6911.js";import{r as f,o as i,c as d,w as u,a as s,z as g,A as V,b as r,d as C,x as B,s as o,B as l,f as U,q as b,i as x}from"./index-94ff83c7.js";const k={data(){return{search:"",itemsPerPage:10,headers:[{key:"user_id",title:"ID"},{key:"username",title:"Имя"},{title:""}],usersdata:[],loading:!0,totalItems:0}},methods:{getUsersList:function(){this.loading=!0,m("http://localhost:9000/library-api/public/getUserList").then(e=>{console.log(e),this.usersdata=e.data,this.totalItems=e.data.length,this.loading=!1})}},beforeMount(){this.getUsersList()},mounted(){console.log(this.usersdata)}},E={width:"10%"},y={width:"20%"};function F(e,n,c,w,t,_){const h=f("v-data-table");return i(),d(b,null,{default:u(()=>[s(g,null,{default:u(()=>[s(V,null,{default:u(()=>[r(" Список пользователей "),s(C),s(B,{modelValue:t.search,"onUpdate:modelValue":n[0]||(n[0]=a=>t.search=a),"append-icon":"mdi-magnify",label:"Поиск","single-line":"","hide-details":""},null,8,["modelValue"])]),_:1}),s(h,{headers:t.headers,items:t.usersdata,search:t.search,loading:t.loading,"onUpdate:options":_.getUsersList},{item:u(({item:a})=>[o("tr",null,[o("td",E,l(a.columns.user_id),1),o("td",null,l(a.columns.username),1),o("td",y,[s(U,{onClick:A=>e.$router.push(`users/${a.columns.user_id}`)},{default:u(()=>[r("Открыть профиль")]),_:2},1032,["onClick"])])])]),_:1},8,["headers","items","search","loading","onUpdate:options"])]),_:1})]),_:1})}const v=p(k,[["render",F]]),T=x({__name:"Users",setup(e){return(n,c)=>(i(),d(v))}});export{T as default};
