<template>
  <v-container>
    <v-card>
      <v-card-title>
        <div v-if="isMy">Мои книги</div>
        <div v-else>Список книг: {{ username }}</div>
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
        <!-- <div class="text-center" v-if="!loading">
        <v-progress-circular 
          :size="100"
          width="10"
          color="grey"
          indeterminate
        ></v-progress-circular>
          <br>
          <br>
        </div> -->
        <!-- <v-skeleton-loader v-if="!isLoading"></v-skeleton-loader> -->
        <v-data-table
        :headers="headers"
        :items="filteredBooks"
        :search="search"
        :loading="loading"
        loading-text="Собираем книги"
        no-data-text="Пустая библиотека"
        items-per-page-text="Книг на странице"
        @update:menu="getUserBooks"
        >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.columns.id }}</td>
            <td>{{ item.columns.book_name }}</td>
            <td>{{ item.columns.author_name }}</td>
            <td>{{ item.columns.category_name}}</td>
            <td v-if="isMy"><v-btn min-width=150 @click="statusChange(item.columns.id,item.columns.status)">{{ item.columns.status==1?"Прочитано":"Непрочитано" }}</v-btn></td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
  <AddBookDialog v-if="isMy" :userbooks="userbooks"></AddBookDialog>
        </template>
  
  <script lang="ts">
    import {getRequest, postRequest} from "@/plugins/api"
    import AddBookDialog from "@/layouts/default/addBookDialog.vue"
    
    export default{
      data() {
        return {
            username: "",
            isMy: this.$route.params.id === localStorage.id ? true : false,
            search: "",
            itemsPerPage: 10,
            headers: [{ key: "id", title: "ID" }, { key: "book_name", title: "Название книги" }, { key: "author_name", title: "Автор" }, { key: "category_name", title: "Категория" },
            ],
            userbooks: [],
            filteredBooks: [],
            loading: true,
            totalItems: 0,
            categories: ["Все"],
            select: "Все",
            fetchedBooks: [],
            isLoading: false,
        };
    },
    computed: {
      // isLoading:function() {
      //   return this.userbooks.length > 0
      // }
    },
    methods: {
        getUsername: function () {
            postRequest(`${import.meta.env.VITE_HOST}/library-api/public/username`, { id: this.$route.params.id })
                .then(res => {
                console.log(res.data);
                this.username = res.data[0].username;
                console.log(this.username);
            });
        },
        getUserBooks: function () {
            this.loading = true;
            postRequest(`${import.meta.env.VITE_HOST}/library-api/public/userBooks`, { id: this.$route.params.id })
                .then(res => {
                console.log('userbooks',res);
                this.userbooks = res.data;
                this.totalItems = res.data.length;
                this.loading = false;
                // this.select = this.categories[0]
            });
            postRequest(`${import.meta.env.VITE_HOST}/library-api/public/userCategories`, { id: this.$route.params.id })
                .then(res => {
                this.categories = ["Все", ...res.data.map((item: any) => item.category_name)];
                console.log("categories", this.categories);
            });
            this.categoryChange();
        },
        categoryChange: function () {
            console.log("test change menu", this.select);
            console.log(this.userbooks.filter((item: any) => item.category_name === this.select));
            if (this.select === "Все") {
                this.filteredBooks = this.userbooks;
            }
            else {
                this.filteredBooks = this.userbooks.filter((item: any) => item.category_name === this.select);
            }
        },
        statusChange: function (id: number, status: number) {
            console.log("Изменение статуса", id, status, +(!status));
            console.log(this.filteredBooks);
            status = +(!status);
            postRequest(`${import.meta.env.VITE_HOST}/library-api/users/changeBookStatus`, { id, status })
                .then(res => {
                console.log(res);
                this.getUserBooks();
            });
        },
    },
    beforeMount() {
        if (this.isMy) {
            this.headers.push({ key: "status", title: "Статус" });
        }
        console.log(this.isMy);
        this.getUsername();
        this.getUserBooks();
    },
    mounted() {
      window.addEventListener('newBookAdd', () => {
        console.log("Обновление книг после добавления новой")
        this.getUserBooks();
        });
    },
    components: { AddBookDialog }
}
  </script>
  