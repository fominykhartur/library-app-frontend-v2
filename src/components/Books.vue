<template>
  <v-container>
    <!-- <v-responsive class="d-flex align-center text-center fill-height"> -->
    <v-card>
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
      <v-data-table
        :headers="headers"
        :items="booksdata"
        :search="search"
        :loading="loading"
        @update:options="getBookList"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.columns.book_id }}</td>
            <td>{{ item.columns.book_name }}</td>
            <td>{{ item.columns.author_name }}</td>
            <td>{{ item.columns.category_name }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>

    <!-- </v-responsive> -->
  </v-container>
</template>

<script lang="ts">
import { getRequest, postRequest } from "@/plugins/api";
export default {
  data() {
    return {
      search: "",
      itemsPerPage: 10,
      headers: [
        { key: "book_id", title: "ID", order: "asc" },
        { key: "book_name", title: "Название" },
        { key: "author_name", title: "Автор" },
        { key: "category_name", title: "Категория" },
      ],
      booksdata: [],
      loading: true,
      totalItems: 0,
    };
  },
  methods: {
    getBookList: function () {
      this.loading = true;
      getRequest(
        `${import.meta.env.VITE_HOST}/library-api/public/allBooks`
      ).then((res) => {
        console.log(res);
        this.booksdata = res.data;
        this.totalItems = res.data.length;
        this.loading = false;
      });
    },
  },
  beforeMount() {
    this.getBookList();
  },
  mounted() {
    console.log(this.booksdata);
  },
};
</script>
