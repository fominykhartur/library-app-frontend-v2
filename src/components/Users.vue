<template>
    <v-container >
      <!-- <v-responsive class="d-flex align-center text-center fill-height"> -->

      <v-card>
      <v-card-title>
        Список пользователей
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
          :items="usersdata"
          :search="search"
          :loading="loading"
          @update:options="getUsersList"
          >
          <template v-slot:item="{ item }">
            <tr>
              <td width="10%">{{ item.columns.user_id }}</td>
              <td>{{ item.columns.username }}</td>
              <td width="20%"><v-btn @click="$router.push(`users/${item.columns.user_id}`)">Открыть профиль</v-btn></td>
            </tr>
          </template>
        </v-data-table>
      </v-card>

      <!-- </v-responsive> -->
    </v-container>
  </template>
  
  <script lang="ts">
    import {getRequest, postRequest} from "@/plugins/api"
    export default{
      data(){
        return{
            search: '',
            itemsPerPage: 10,
            headers:[{key: 'user_id', title: 'ID'},
                     {key: 'username', title: 'Имя'},
                     {title: ''}
                    ],
            usersdata: [],
            loading: true,
            totalItems: 0,
        }
      },
      methods: {
        getUsersList: function(){
            this.loading = true
            getRequest(`${import.meta.env.VITE_HOST}/library-api/public/getUserList`)
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
  