<template>
  <v-flex xs9>
    <v-layout row wrap>
      <v-flex d-flex x11>
        <v-card class="mx-4 mt-1 pb-1">
          <v-card-title class="table-header">
            <h3 class="ml-5 headline">Products / {{ data.length }}</h3>
            <v-spacer></v-spacer>

            <v-select
              v-model="filters.type"
              :items="typeSelect"
              label="Type"
              clearable
              menu-props="auto, bottom"
            ></v-select>

            <v-spacer></v-spacer>
          </v-card-title>

          <v-card
            v-for="(product, index) in filterItems(data, filters)"
            :key="index"
            class="d-flex ma-4"
            outlined>
            <v-card
              class="d-flex mr-1 title item-product-field"
              width="60"
              outlined
              tile>
              <v-list-item>
                <v-list-item-avatar>
                  <img src="../../assets/no-product-image.png">
                </v-list-item-avatar>
              </v-list-item>
            </v-card>
            <v-card
              class="mr-1 title item-product-field"
              width="350"
              outlined
              tile>
              <v-card-text class="pb-0">{{ product.title }}</v-card-text>
              <v-card-text
                class="pt-0 overline">
                S/N {{ product.serialNumber }}
              </v-card-text>
            </v-card>
            <v-card
              class="ml-1 mr-1 item-product-field"
              width="100"
              outlined>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ product.type }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
            <v-card
              class="ml-1 mr-1 text-center item-product-field"
              width="180"
              outlined>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ product.guarantee.start | toDate }}
                  </v-list-item-title>
                  <v-list-item-title>
                    {{ product.guarantee.end | toDate }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
            <v-card
              class="ml-1 mr-1 item-product-field"
              width="150"
              outlined>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-subtitle
                    class="mb-0 overline">
                    {{ product.price[0].value | toCurrency('USD') }}
                  </v-list-item-subtitle>
                  <v-list-item-title>
                    {{ product.price[1].value | toCurrency('USD') }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
            <v-card
              class="ml-1 mr-1 text-center item-product-field"
              width="350"
              outlined>
              <v-list-item>
                <v-list-item-content>
                  <v-card-text>{{ product.orderTitle }}</v-card-text>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import { orders, products } from '../../data';
import {
  toDate,
  toDateWithoutDay,
  toCurrency,
} from '../../filters';

export default {
  name: 'Products',
  filters: { toDate, toDateWithoutDay, toCurrency },
  computed: {},
  data() {
    return {
      data: [],
      typeSelect: [],
      filters: { type: null },
    };
  },
  created() {
    this.data = products;
    this.data.forEach((el) => {
      el.orderTitle = orders.find(order => order.id === el.order).title;
    });
    this.typeSelect = [...new Set(this.data.map(product => product.type))];
  },
  methods: {
    filterItems(items, filters) {
      return Object.keys(filters).reduce((acc, filter) => {
        if (!filters[filter]) return acc;
        return acc.filter(item => item[filter] === filters[filter]);
      }, items);
    },
  },
};
</script>

<style scoped>
  .item-product-field {
    border: none !important;
  }
</style>
