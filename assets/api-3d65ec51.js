import{J as r}from"./index-e7449464.js";async function s(t){return await r.get(t,{headers:{Authorization:`Bearer ${localStorage.getItem("jwt")}`}})}async function n(t,e){return await r.post(t,e,{headers:{Authorization:`Bearer ${localStorage.getItem("jwt")}`}})}export{s as g,n as p};