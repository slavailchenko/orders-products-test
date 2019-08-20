<template>
  <v-layout>
    <v-toolbar-title class="headline text-uppercase">
      <span>Test</span>
      <span class="font-weight-light ml-3">ORDERS AND PRODUCTS</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-layout class="justify-center">
      <v-icon large color="blue">mdi-clock</v-icon>
      <span class="ml-2 mr-2">
        {{ hours }} : {{ minutes }} : {{ seconds }}
      </span>
      <span class="ml-6">
        {{ clientList.length }} connections
      </span>
    </v-layout>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { getZeroPad } from '../../filters';

export default {
  name: 'TopMenu',
  filters: { getZeroPad },
  data() {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  },
  computed: {
    ...mapGetters([
      'clientList',
    ]),
  },
  mounted() {
    this.$options.interval = setInterval(this.updateDateTime, 1000);
    this.$socket.on('user-connected', this.getConnectedClients);
    this.$socket.on('user-disconnected', this.getConnectedClients);
    this.getConnectedClients();
  },
  beforeDestroy() {
    clearInterval(this.$options.interval);
  },
  methods: {
    ...mapActions([
      'getConnectedClients',
    ]),
    clickedOnClient(id) {
      this.$socket.emit('nudge-client', {
        from: this.$socket.id,
        to: id,
      });
    },
    updateDateTime() {
      const now = new Date();
      this.hours = now.getHours();
      this.minutes = getZeroPad(now.getMinutes());
      this.seconds = getZeroPad(now.getSeconds());
    },
  },
};
</script>
