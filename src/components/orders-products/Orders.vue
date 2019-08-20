<template>
  <v-layout row wrap>
    <v-flex :class="isOpenProducts ? 'xs4' : 'xs10'">
      <v-card class="mx-4 mt-1 pb-1">
        <v-card-title class="table-header">
          <v-btn
            color="pink"
            icon
            class="pointer"
            slot="activator"
            tag="span">
            <v-icon large>mdi-plus-circle</v-icon>
          </v-btn>

          <h3 class="ml-5 headline">Orders / {{ data.length }}</h3>
          <v-spacer></v-spacer>
        </v-card-title>

        <v-card v-for="(order, index) in data"
          :key="index"
          class="d-flex ma-4"
          outlined>
          <v-card v-show="!isOpenProducts"
            class="ml-1 mr-1 item-order-field"
            width="350"
            outlined>
            <v-card-text>{{ order.title }}</v-card-text>
          </v-card>
          <v-card
            class="mr-1 title item-order-field"
            width="150"
            outlined 
            tile>
            <v-list-item two-line>
              <v-icon
                class="mr-1"
                @click="showProducts(order)">
                list
              </v-icon>
              <v-list-item-content>
                <v-list-item-title>{{ order.productUnits }}</v-list-item-title>
                <v-list-item-subtitle class="overline">
                  products
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
          <v-card
            class="ml-1 mr-1 text-center item-order-field"
            width="140"
            outlined>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-subtitle class="mb-0 overline">
                  {{ order.date | toDateWithoutDay }}
                </v-list-item-subtitle>
                <v-list-item-title>
                  {{ order.date | toDate }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
          <v-card v-show="!isOpenProducts" 
            class="ml-1 mr-1 item-order-field"
            width="150"
            outlined>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-subtitle 
                  class="mb-0 overline">
                  {{ order.priceUSD | toCurrency('USD') }}
                </v-list-item-subtitle>
                <v-list-item-title>
                  {{ order.priceUAH | toCurrency('UAH') }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
          <v-card
            v-show="!isOpenProducts"
            class="ml-1 mr-1 text-center item-order-field"
            width="40"
            outlined
          >
            <v-list-item>
              <v-icon
              color="red"
              @click="$modal.show('modal::show', {
                    contentMessage: `Are you sure delete ${order.title}?`,
                    confirmMethod: deleteOrder.bind(null, index),
                  })">
                delete
            </v-icon>
            </v-list-item>
          </v-card>
          <v-card
            v-show="isOpenProducts && order.isActive"
            class="pt-3 ml-1 mr-1 text-center item-order-active"
            width="60"
            outlined>
            <v-icon large color="white">mdi-chevron-right</v-icon>
          </v-card>
        </v-card>
      </v-card>
    </v-flex>
    <v-flex xs7 v-show="isOpenProducts">
      <products-from-order
        :products="productsFromOrder"
        :order_title="selectedOrder.title"
        @closeWindow="hideWindow" 
      />
    </v-flex>
  </v-layout>
</template>

<script>
import { orders, products } from '../../data';
import { toDate, toDateWithoutDay, toCurrency } from '../../filters';
import ProductsFromOrder from './ProductsFromOrder.vue';

export default {
  name: 'Orders',
  filters: { toDate, toDateWithoutDay, toCurrency },
  components: { ProductsFromOrder },
  computed: {},
  data() {
    return {
      data: [],
      isOpenProducts: false,
      selectedOrder: {},
      productsFromOrder: [],
    };
  },
  created() {
    this.data = orders;
    this.data.forEach(el => {
      let priceUAH = 0;
      let priceUSD = 0;
      let productsOfOrder = products.filter(product => {
        if (product.order === el.id) {
          priceUAH += product.price[1].value;
          priceUSD += product.price[0].value;
          return true;
        }
      });
      el.productUnits = productsOfOrder.length;
      el.priceUAH = priceUAH;
      el.priceUSD = priceUSD;
      el.isActive = false;
    });
  },
  methods: {
    showProducts(order) {
      this.data.forEach(item => item.isActive = item.id === order.id ? true : false);
      this.isOpenProducts = true;
      this.selectedOrder = order;
      this.productsFromOrder = products.filter(
        product => product.order === order.id
      );
    },
    hideWindow() {
      this.isOpenProducts = false;
      this.data.forEach(item => item.isActive = false);
    },
    deleteOrder(index) {
      this.data.splice(index, 1);
      this.$modal.hide('modal::hide');
    },
  },
};
</script>

<style scoped>
.item-order-field {
  border: none !important;
}
.item-order-active {
  background-color: grey;
}
</style>
