<template>
  <v-app>
    <tool-bar />
    <!-- <default-bar /> -->

    <default-view />
  </v-app>
</template>

<script lang="ts" setup>
  import ToolBar from './ToolBar.vue';
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
</script>
