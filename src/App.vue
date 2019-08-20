<template>
  <v-app>
    <v-app-bar app>
      <top-menu />
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

    <v-dialog v-model="dialog" persistent width="400">
      <confirm-modal
        :message="contentMessage"
        :submit="confirmMethod" />
    </v-dialog>

  </v-app>
</template>

<script>
import NavigationMenu from './components/menu/NavigationMenu.vue';
import TopMenu from './components/menu/TopMenu';
import ConfirmModal from './components/modal/ConfirmModal.vue';

export default {
  name: 'App',
  components: {
    NavigationMenu,
    TopMenu,
    ConfirmModal,  
  },
  data() {
    return {
      dialog: false,
      contentMessage: '',
      confirmMethod: null,
    }
  },
  mounted() {
    this.$modal.$event.$on('modal::show', (data) => {
      this.dialog = true;
      Object.keys(data).forEach((key) => {
        this[key] = data[key];
      });
    });
    this.$modal.$event.$on('modal::hide', () => {
      this.dialog = false;
    });
  },
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