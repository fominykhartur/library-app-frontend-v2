<template>
    <v-toolbar dark prominent >
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

    <v-toolbar-title>LibraryApp</v-toolbar-title>
    <v-row>
        <v-btn to="/users">Пользователи</v-btn>
        <v-btn to="/books">Книги</v-btn>
    </v-row>
    <v-spacer></v-spacer>
    <v-row v-if="isAuth">
        <v-btn @click="$router.push(`/users/${id}`)">Мои книги</v-btn> 
    </v-row>
    <v-spacer></v-spacer>
    
    <v-btn v-if="!isAuth" to="/auth" dark>
        Войти
    </v-btn>
    <v-btn v-else @click="logout" to="/auth" dark>
        Выйти
    </v-btn>
    </v-toolbar>
  </template>

<script lang="ts">
export default{
    data(){
        return{
            jwt: localStorage.getItem("jwt"),
            id: localStorage.getItem("id"),
            isAuth: localStorage.getItem("jwt")?true:false,
        }
    },
    methods: {
        logout: function(){
            localStorage.removeItem("jwt")
            localStorage.removeItem("name")
            localStorage.removeItem("id")
            this.jwt = ''
            this.id = ''
            this.isAuth=false
            console.log("Вышел")
        },
    },
    mounted(){
        window.addEventListener('login', (event:any) => {
            this.jwt = localStorage.getItem("jwt");
            this.id = localStorage.getItem("id")
            this.isAuth = true
        });
    },
    watch: {

    },
}
</script>
