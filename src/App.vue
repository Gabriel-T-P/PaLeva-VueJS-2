<template>
  <v-app>
    <Menu/>
    
    <v-container class="text-center">
      <router-view/>
    </v-container>
  </v-app>
</template>

<script>

import Menu from '../src/components/Menu.vue'

export default {
  name: 'App',
  components:{
    Menu
  }
};
</script>
