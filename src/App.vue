<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-app-bar>

    <main class="main-page">
      <v-content>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <navigation-menu/>
            <router-view></router-view>
          </v-layout>
        </v-container>
      </v-content>
    </main>
  </v-app>
</template>

<script>
import NavigationMenu from './components/menu/NavigationMenu.vue';

export default {
  name: 'App',
  components: {
    NavigationMenu,    
  },
  data: () => ({
    //
  }),
};
</script>

<style scoped>
  html {
    overflow: auto !important;
  }
  .main-page {
    background-color: #dedee9
  }
</style>