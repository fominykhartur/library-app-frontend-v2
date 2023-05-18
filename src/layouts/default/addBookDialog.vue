<template v-bind="$props">
    <v-row justify="center" >
      <v-dialog
        v-model="dialog"
        persistent
      >
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            v-bind="props"
          >
            Добавить книгу
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Добавление новой книги</span>
          </v-card-title>
          <!-- <v-card-text> -->
            <v-container>
              <v-row>
                <v-col
                  cols="10"
                  sm="6"
                  md="6"
                  lg="3"
                >
                  <v-combobox
                    label="Название книги"
                    v-model="inputName"
                    :items="newBooksNames"
                    @click.once="getAllBooks"
                    @update:search="searchPreparedBook"
                    required
                  ></v-combobox>
                </v-col>
                <v-col
                  cols="10"
                  sm="6"
                  md="6"
                  lg="3"
                >
                  <v-combobox
                    label="Автор"
                    v-model="inputAuthor"
                    :items="allAuthors"
                    @click="getAuthors"
                    :readonly="inputAuthorDisable"
                  ></v-combobox>
                </v-col>
                <v-col
                  cols="10"
                  sm="6"
                  md="6"
                  lg="3"
                >
                  <v-combobox
                    label="Категория"
                    v-model="inputCategory"
                    :items="allCategories"
                    @click="getCategories"
                    :readonly="inputCategoryDisable"
                    required
                  ></v-combobox>
                </v-col>
                <v-col
                  cols="10"
                  sm="6"
                  md="6"
                  lg="3"
                >
                  <v-autocomplete
                    label="Статус"
                    v-model="inputStatus"
                    :items="['Прочитано', 'Не прочитано']"
                    required
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
          <!-- </v-card-text> -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="closeDialog"
            >
              Закрыть
            </v-btn>
            <v-btn 
              color="blue-darken-1"
              variant="text"
              :disabled="isAddButtonDisabled"
              @click="addBookToUser"
            >
              Добавить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>

<script lang="ts">
import {getRequest, postRequest} from "@/plugins/api"
export default {
  props: ['userbooks'],
  data: () => ({
    dialog: false,
    newBooks: [{author_name:'',category_name:'',}],
    newBooksNames: [''],
    newBooksAuthors: [''],
    newBooksCategories: [''],
    inputName: '',
    inputAuthor: '',
    inputAuthorDisable: false,
    inputCategory: '',
    inputCategoryDisable: false,
    inputStatus: "Не прочитано",
    allCategories: [],
    allAuthors: [],
    addButtonDisabled: true,
  }),
  beforeMount(){
    this.getAuthors()
    this.getCategories()
  },
  computed:{
    isAddButtonDisabled: function(){
      return !(this.inputName && this.inputAuthor && this.inputCategory)
    }
  },
  methods: {
    searchPreparedBook: function(){
    this.inputAuthorDisable=false
    this.inputCategoryDisable=false
    if (Array.from(this.newBooks.filter((item:any)=>item.book_name==this.inputName)).length > 0){
      this.inputAuthor=Array.from(this.newBooks.filter((item:any)=>item.book_name==this.inputName))[0]?.author_name
      this.inputAuthorDisable=true
      this.inputCategory=Array.from(this.newBooks.filter((item:any)=>item.book_name==this.inputName))[0]?.category_name
      this.inputCategoryDisable=true
    }
    },
    getAllBooks: function(){
      getRequest(`${import.meta.env.VITE_HOST}/library-api/public/allBooks`)
      .then(res=>{
      // this.newBooks=res.data
      this.removeUserBooks(res.data)
    })
  },
  removeUserBooks:function(books:any[]){
    this.newBooks = Array.from( books.filter((newBook:any)=>{
      return this.userbooks.every((oldBook:any) =>{
          return newBook.book_id !== oldBook.book_id
      })
    }))
    this.newBooksNames = Array.from(this.newBooks.map((item:any)=>item.book_name))
    this.newBooksAuthors = Array.from(new Set(this.newBooks.map((item:any)=>item.author_name)))
    this.newBooksCategories = Array.from(new Set(this.newBooks.map((item:any)=>item.category_name)))
    },
    closeDialog: function(){
      this.dialog = false
      this.inputName=""
      this.inputAuthor=""
      this.inputCategory=""
    },
    addBookToUser: function(){
      postRequest(`${import.meta.env.VITE_HOST}/library-api/users/addNewBook`,{bookName:this.inputName,
                                                                        authorName:this.inputAuthor,
                                                                        categoryName:this.inputCategory,
                                                                        status: this.inputStatus==="Прочитано"?1:0})
      .then((res)=>{
        this.inputName=""
        this.inputAuthor=""
        this.inputCategory=""
        this.addButtonDisabled=true
        window.dispatchEvent(new CustomEvent("newBookAdd"))
        this.getAllBooks()
      })
    },
    getCategories: function(){
      getRequest(`${import.meta.env.VITE_HOST}/library-api/books/categories`)
      .then(res=>{
        this.allCategories=res.data.map((item:any)=>item.category_name)
      })
    },
    getAuthors: function(){
      getRequest(`${import.meta.env.VITE_HOST}/library-api/books/authors`)
      .then(res=>{
        this.allAuthors=res.data.map((item:any)=>item.author_name)
      })
    }
},
}
</script>