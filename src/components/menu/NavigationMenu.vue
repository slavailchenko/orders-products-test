<template>
  <v-card 
    class="mx-4 mt-5" 
    max-width="300" 
    tile 
    fixed>
    <v-navigation-drawer>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="../../assets/user.png" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>John Smith</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list rounded>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                v-model="item.model"
                v-text="item.text"
                :to="item.route"
                @click="navAction(item)"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  name: 'NavigationMenu',
  data() {
    return {
      routes: [],
      items: [
        {
          text: 'Orders',
          icon: 'dashboard',
          model: false,
          route: { name: 'Orders' },
          path: '/orders',
        },
        {
          text: 'Products',
          icon: 'store',
          model: false,
          route: { name: 'Products' },
          path: '/products',
        },
      ]
    };
  },
  mounted() {
    this.createRoutes(this.items);
  },
  methods: {
    navAction(item) {
      console.log(this.$router);
      this.$router.push({ path: item.path });
    },
    createRoutes(items) {
      this.routes = [];
      items.forEach(item => this.routes.push(item));
    },
  },
};
</script>
