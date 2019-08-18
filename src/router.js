import Vue from 'vue';
import Router from 'vue-router';
// import store from './store';
import Orders from './components/orders-products/Orders.vue';
import Products from './components/orders-products/Products.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/orders',
      name: 'Orders',
      component: Orders,
      meta: {
        public: true,
      },
    },
    {
      path: '/products',
      name: 'Products',
      component: Products,
      meta: {
        public: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => next());

export default router;
