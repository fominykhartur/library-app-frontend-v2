<template>
    <v-container class="fill-height">
      <v-responsive class="d-flex align-center text-center fill-height">
        <v-sheet width="300" class="mx-auto" v-if="!jwt">
          <v-form fast-fail @submit.prevent>
            <v-text-field
            v-model="email"
            label="email"
            :rules="loginRules"
            ></v-text-field>

            <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="loginRules"
            :type="show1 ? 'text' : 'password'"
            label="password"
            @click:append="show1 = !show1"
            ></v-text-field>

            <v-btn type="submit"
            block
            class="mt-2"
            @click="login(email,password)"
            to="/"
            >Войти</v-btn>
          </v-form>
        </v-sheet>
        <div v-else class="mx-auto">
          Вы уже авторизированы
          <br>
          <br>
          <v-btn to="/">Назад</v-btn>
        </div>
      </v-responsive>
    </v-container>
  </template>
  
  <script lang="ts">
    import {getRequest, postRequest} from "@/plugins/api"
    export default{
      data(){
        return{
          jwt: localStorage.getItem("jwt"),
          show1: false,
          show2: true,
          email: "",
          password: "",
          loginRules: [
            (value:string) => {
              if (value?.length > 0) 
                return true
              return "Поле не должно быть пустым"
            }
          ],
        }
      },
      methods: {
        login:function(username:string,password:string){
          console.log(username,password)
          this.$emit("test")
          window.dispatchEvent(new CustomEvent("login"))
          postRequest("http://localhost:9000/library-api/auth/login", {"email": this.email,"password": this.password}).then(res=>{
            console.log(res)
            localStorage.setItem("jwt",res.data.jwt)
            localStorage.setItem("username",res.data.name)
            localStorage.setItem("id",res.data.id)
          })
        }
      },
      mounted(){
      }
    }
  </script>
  