<template>
    <v-container>
    <div v-if="isMy">Это ты</div>
    <div v-else>Это не ты</div>
        <v-card>
            <v-btn @click="getUserBooks"></v-btn>
              <v-card-title>
              Список книг
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Поиск"
                single-line
                hide-details
              ></v-text-field>
              </v-card-title>
              <v-select @vnode-updated="categoryChange"
    v-model="select"
    :items="categories"
    label="Выбор категории"

  ></v-select>
              <v-data-table
                :headers="headers"
                :items="filteredBooks"
                :search="search"
                :loading="loading"
                @update:menu="getUserBooks"
                >
                <template v-slot:item="{ item }">
                  <tr>
                    <td>{{ item.columns.book_name }}</td>
                    <td>{{ item.columns.author_name }}</td>
                    <td>{{ item.columns.category_name}}</td>
                    <td><v-btn @click="statusChange(item.columns.book_id)">{{ item.columns.status==1?"Прочитано":"Непрочитано" }}</v-btn></td>
                </tr>
                </template>
              </v-data-table>
            </v-card>
    </v-container>
</template>
  
  <script lang="ts">
    import {getRequest, postRequest} from "@/plugins/api"
    export default{
      data(){
        return{
            props:{
                username:{
                    type: String,
                    required: true,
                },
            },
            username: this.$route.params.username,
            isMy: this.$route.params.id===localStorage.id?true:false,
            search: '',
            itemsPerPage: 10,
            headers:[{key: 'book_name', title: 'Название книги'},
                     {key: 'author_name', title: 'Автор'},
                     {key: 'category_name', title: 'Категория'},
                     {key: 'status', title: 'Статус'},
                     {title: ''}
                    ],
            userbooks: [],
            filteredBooks: [],
            loading: true,
            totalItems: 0,
            categories: ["Все"],
            select: "Все",
        }
      },
      methods: {
        getUserBooks: function(){
            this.loading = true
            postRequest("http://localhost:9000/library-api/users/userBooks",{id:this.$route.params.id})
            .then(res=>{
                console.log(res)
                this.userbooks = res.data
                this.totalItems = res.data.length
                this.loading = false
                // this.select = this.categories[0]
            })
            postRequest("http://localhost:9000/library-api/public/userCategories",{id:this.$route.params.id})
            .then(res=>{
                this.categories = ["Все", ...res.data.map((item:any)=>item.category_name)]
                console.log("categories", this.categories)
            })
            this.categoryChange()
        },
        categoryChange: function(){
            console.log("test change menu", this.select)
            console.log(this.userbooks.filter((item:any)=>item.category_name === this.select))
            if (this.select === "Все"){
                this.filteredBooks = this.userbooks
            }else{
                this.filteredBooks = this.userbooks.filter((item:any)=>item.category_name === this.select)
            }
        },
        statusChange: function(book_id:number){
            console.log("Изменение статуса", book_id)
            console.log(this.filteredBooks[0])
        }
      },
      beforeMount(){
        this.getUserBooks()
    },
    mounted(){
      }
    }
  </script>
  