<template>
    <v-container >
      <!-- <v-responsive class="d-flex align-center text-center fill-height"> -->
        <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items-length="totalItems"
        :items="usersdata"
        :loading="loading"
        class="elevation-1"
        item-value="username"
        @update:options="getUsersList"
        ></v-data-table-server>
      <!-- </v-responsive> -->
    </v-container>
  </template>
  
  <script lang="ts">
    import {getRequest, postRequest} from "@/plugins/api"
    export default{
      data(){
        return{
            itemsPerPage: 10,
            headers:[{key: 'user_id', title: 'ID'},{key: 'username', title: 'Name'}],
            usersdata: [],
            loading: true,
            totalItems: 0,
        }
      },
      methods: {
        getUsersList: function(){
            this.loading = true
            getRequest("http://localhost:9000/library-api/users/getUserList")
            .then(res=>{
                console.log(res)
                this.usersdata = res.data
                this.totalItems = res.data.length
                this.loading = false
            })
        }
      },
      beforeMount(){
        this.getUsersList()
    },
    mounted(){
        console.log(this.usersdata)
      }
    }
  </script>
  