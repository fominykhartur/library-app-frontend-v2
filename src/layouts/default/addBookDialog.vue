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
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-autocomplete
                    label="Название книги"
                    v-model="inputName"
                    :items="newBooksNames"
                    @update:search="searchPreparedBook"
                    required
                  ></v-autocomplete>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    label="Автор"
                    v-model="inputAuthor"
                    :readonly="inputAuthorDisable"
                    hint="example of helper text only on focus"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    label="Категория"
                    v-model="inputCategory"
                    :readonly="inputCategoryDisable"
                    hint="example of persistent helper text"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="dialog = false"
            >
              Закрыть
            </v-btn>
            <v-btn 
              color="blue-darken-1"
              variant="text"
              @click="dialog = false"
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
  props: ['userbooks', 'fetchedBooks'],
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
  }),
  beforeMount(){
  },
  mounted(){
    console.log("mount")
    console.log(this.userbooks)
    console.log(this.newBooks)
    console.log("f",this.fetchedBooks)
    this.newBooks = Array.from( this.fetchedBooks.filter((newBook:any)=>{
        return this.userbooks.every((oldBook:any) =>{
            return newBook.id !== oldBook.id
        })
    }))
    this.newBooksNames = Array.from(this.newBooks.map((item:any)=>item.book_name))
    this.newBooksAuthors = Array.from(this.newBooks.map((item:any)=>item.author_name))
    this.newBooksCategories = Array.from(this.newBooks.map((item:any)=>item.category_name))
    console.log(this.newBooks,"qwe")
    console.log(this.newBooksNames, this.newBooksAuthors, this.newBooksCategories)
  },
  methods: {
    searchPreparedBook: function(){
    this.inputAuthorDisable=false
    this.inputCategoryDisable=false
      if (Array.from(this.newBooks.filter((item:any)=>item.book_name==this.inputName))){
        this.inputAuthor=Array.from(this.newBooks.filter((item:any)=>item.book_name==this.inputName))[0]?.author_name
        this.inputAuthorDisable=true
        this.inputCategory=Array.from(this.newBooks.filter((item:any)=>item.book_name==this.inputName))[0]?.category_name
        this.inputCategoryDisable=true
      }
    },
  }
}
</script>