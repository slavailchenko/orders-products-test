import Vue from 'vue';
import Router from 'vue-router';
import Orders from './components/orders-products/Orders.vue';
import Products from './components/orders-products/Products.vue';

Vue.use(Router);

const router = new Router({
  history: true,
  routes: [
    {
      path: '/orders',
      name: 'Orders',
      component: Orders,
    },
    {
      path: '/products',
      name: 'Products',
      component: Products,
    },
  ],
});

router.beforeEach((to, from, next) => next());

export default router;
