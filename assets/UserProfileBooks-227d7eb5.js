import{g as f,p as m}from"./api-cf9061d3.js";import{_}from"./_plugin-vue_export-helper-c27b6911.js";import{o as r,c as b,w as u,a as o,C as v,f as g,D as F,b as k,z as D,A as V,q as w,e as B,n as c,E as y,F as S,G as M,d as E,s as h,r as C,y as p,B as d,x as P,H as q,g as A,I as T,i as I}from"./main-7447155b.js";const R={props:["userbooks"],data:()=>({dialog:!1,newBooks:[{author_name:"",category_name:""}],newBooksNames:[""],newBooksAuthors:[""],newBooksCategories:[""],inputName:"",inputAuthor:"",inputAuthorDisable:!1,inputCategory:"",inputCategoryDisable:!1,inputStatus:"Не прочитано",allCategories:[],allAuthors:[],addButtonDisabled:!0}),beforeMount(){this.getAuthors(),this.getCategories()},computed:{isAddButtonDisabled:function(){return!(this.inputName&&this.inputAuthor&&this.inputCategory)}},methods:{searchPreparedBook:function(){var e,t;this.inputAuthorDisable=!1,this.inputCategoryDisable=!1,Array.from(this.newBooks.filter(l=>l.book_name==this.inputName)).length>0&&(this.inputAuthor=(e=Array.from(this.newBooks.filter(l=>l.book_name==this.inputName))[0])==null?void 0:e.author_name,this.inputAuthorDisable=!0,this.inputCategory=(t=Array.from(this.newBooks.filter(l=>l.book_name==this.inputName))[0])==null?void 0:t.category_name,this.inputCategoryDisable=!0)},getAllBooks:function(){f("http://localhost:9000/library-api/public/allBooks").then(e=>{this.removeUserBooks(e.data)})},removeUserBooks:function(e){this.newBooks=Array.from(e.filter(t=>this.userbooks.every(l=>t.book_id!==l.book_id))),this.newBooksNames=Array.from(this.newBooks.map(t=>t.book_name)),this.newBooksAuthors=Array.from(new Set(this.newBooks.map(t=>t.author_name))),this.newBooksCategories=Array.from(new Set(this.newBooks.map(t=>t.category_name)))},closeDialog:function(){this.dialog=!1,this.inputName="",this.inputAuthor="",this.inputCategory=""},addBookToUser:function(){m("http://localhost:9000/library-api/users/addNewBook",{bookName:this.inputName,authorName:this.inputAuthor,categoryName:this.inputCategory,status:this.inputStatus==="Прочитано"?1:0}).then(e=>{this.inputName="",this.inputAuthor="",this.inputCategory="",this.addButtonDisabled=!0,window.dispatchEvent(new CustomEvent("newBookAdd")),this.getAllBooks()})},getCategories:function(){f("http://localhost:9000/library-api/books/categories").then(e=>{this.allCategories=e.data.map(t=>t.category_name)})},getAuthors:function(){f("http://localhost:9000/library-api/books/authors").then(e=>{this.allAuthors=e.data.map(t=>t.author_name)})}}},L=h("span",{class:"text-h5"},"Добавление новой книги",-1);function O(e,t,l,U,s,i){return r(),b(B,{justify:"center"},{default:u(()=>[o(v,{modelValue:e.dialog,"onUpdate:modelValue":t[4]||(t[4]=a=>e.dialog=a),persistent:""},{activator:u(({props:a})=>[o(g,F({color:"primary"},a),{default:u(()=>[k(" Добавить книгу ")]),_:2},1040)]),default:u(()=>[o(D,null,{default:u(()=>[o(V,null,{default:u(()=>[L]),_:1}),o(w,null,{default:u(()=>[o(B,null,{default:u(()=>[o(c,{cols:"10",sm:"6",md:"6",lg:"3"},{default:u(()=>[o(y,{label:"Название книги",modelValue:e.inputName,"onUpdate:modelValue":t[0]||(t[0]=a=>e.inputName=a),items:e.newBooksNames,onClickOnce:i.getAllBooks,"onUpdate:search":i.searchPreparedBook,required:""},null,8,["modelValue","items","onClickOnce","onUpdate:search"])]),_:1}),o(c,{cols:"10",sm:"6",md:"6",lg:"3"},{default:u(()=>[o(y,{label:"Автор",modelValue:e.inputAuthor,"onUpdate:modelValue":t[1]||(t[1]=a=>e.inputAuthor=a),items:e.allAuthors,onClick:i.getAuthors,readonly:e.inputAuthorDisable},null,8,["modelValue","items","onClick","readonly"])]),_:1}),o(c,{cols:"10",sm:"6",md:"6",lg:"3"},{default:u(()=>[o(y,{label:"Категория",modelValue:e.inputCategory,"onUpdate:modelValue":t[2]||(t[2]=a=>e.inputCategory=a),items:e.allCategories,onClick:i.getCategories,readonly:e.inputCategoryDisable,required:""},null,8,["modelValue","items","onClick","readonly"])]),_:1}),o(c,{cols:"10",sm:"6",md:"6",lg:"3"},{default:u(()=>[o(S,{label:"Статус",modelValue:e.inputStatus,"onUpdate:modelValue":t[3]||(t[3]=a=>e.inputStatus=a),items:["Прочитано","Не прочитано"],required:""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),o(M,null,{default:u(()=>[o(E),o(g,{color:"blue-darken-1",variant:"text",onClick:i.closeDialog},{default:u(()=>[k(" Закрыть ")]),_:1},8,["onClick"]),o(g,{color:"blue-darken-1",variant:"text",disabled:i.isAddButtonDisabled,onClick:i.addBookToUser},{default:u(()=>[k(" Добавить ")]),_:1},8,["disabled","onClick"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})}const j=_(R,[["render",O]]),x={data(){return{username:"",isMy:this.$route.params.id===localStorage.id,search:"",itemsPerPage:10,headers:[{key:"id",title:"ID"},{key:"book_name",title:"Название книги"},{key:"author_name",title:"Автор"},{key:"category_name",title:"Категория"}],userbooks:[],filteredBooks:[],loading:!0,totalItems:0,categories:["Все"],select:"Все",fetchedBooks:[],isLoading:!1}},computed:{},methods:{getUsername:function(){m("http://localhost:9000/library-api/public/username",{id:this.$route.params.id}).then(e=>{console.log(e.data),this.username=e.data[0].username,console.log(this.username)})},getUserBooks:function(){this.loading=!0,m("http://localhost:9000/library-api/public/userBooks",{id:this.$route.params.id}).then(e=>{console.log("userbooks",e),this.userbooks=e.data,this.totalItems=e.data.length,this.loading=!1}),m("http://localhost:9000/library-api/public/userCategories",{id:this.$route.params.id}).then(e=>{this.categories=["Все",...e.data.map(t=>t.category_name)],console.log("categories",this.categories)}),this.categoryChange()},categoryChange:function(){console.log("test change menu",this.select),console.log(this.userbooks.filter(e=>e.category_name===this.select)),this.select==="Все"?this.filteredBooks=this.userbooks:this.filteredBooks=this.userbooks.filter(e=>e.category_name===this.select)},statusChange:function(e,t){console.log("Изменение статуса",e,t,+!t),console.log(this.filteredBooks),t=+!t,m("http://localhost:9000/library-api/users/changeBookStatus",{id:e,status:t}).then(l=>{console.log(l),this.getUserBooks()})}},beforeMount(){this.isMy&&this.headers.push({key:"status",title:"Статус"}),console.log(this.isMy),this.getUsername(),this.getUserBooks()},mounted(){window.addEventListener("newBookAdd",()=>{console.log("Обновление книг после добавления новой"),this.getUserBooks()})},components:{AddBookDialog:j}},z={key:0},G={key:1},H={key:0};function $(e,t,l,U,s,i){const a=C("v-data-table"),N=C("AddBookDialog");return r(),p(T,null,[o(w,null,{default:u(()=>[o(D,null,{default:u(()=>[o(V,null,{default:u(()=>[s.isMy?(r(),p("div",z,"Мои книги")):(r(),p("div",G,"Список книг: "+d(s.username),1)),o(E),o(P,{modelValue:s.search,"onUpdate:modelValue":t[0]||(t[0]=n=>s.search=n),"append-icon":"mdi-magnify",label:"Поиск","single-line":"","hide-details":""},null,8,["modelValue"])]),_:1}),o(q,{onVnodeUpdated:i.categoryChange,modelValue:s.select,"onUpdate:modelValue":t[1]||(t[1]=n=>s.select=n),items:s.categories,label:"Выбор категории"},null,8,["onVnodeUpdated","modelValue","items"]),o(a,{headers:s.headers,items:s.filteredBooks,search:s.search,loading:s.loading,"loading-text":"Собираем книги","no-data-text":"Пустая библиотека","items-per-page-text":"Книг на странице","onUpdate:menu":i.getUserBooks},{item:u(({item:n})=>[h("tr",null,[h("td",null,d(n.columns.id),1),h("td",null,d(n.columns.book_name),1),h("td",null,d(n.columns.author_name),1),h("td",null,d(n.columns.category_name),1),s.isMy?(r(),p("td",H,[o(g,{"min-width":"150",onClick:K=>i.statusChange(n.columns.id,n.columns.status)},{default:u(()=>[k(d(n.columns.status==1?"Прочитано":"Непрочитано"),1)]),_:2},1032,["onClick"])])):A("",!0)])]),_:1},8,["headers","items","search","loading","onUpdate:menu"])]),_:1})]),_:1}),s.isMy?(r(),b(N,{key:0,userbooks:s.userbooks},null,8,["userbooks"])):A("",!0)],64)}const J=_(x,[["render",$]]),Y=I({__name:"UserProfileBooks",setup(e){return(t,l)=>(r(),b(J))}});export{Y as default};
