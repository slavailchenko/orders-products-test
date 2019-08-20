<template>
  <v-card class="mx-2 mt-1 pb-1">
    <p class="text-right">
      <v-btn @click="$emit('closeWindow')"
        class="pointer"
        icon>
        <v-icon>close</v-icon>
      </v-btn>
    </p>
    <h4 class="ml-5 pa-0 headline">{{ order_title }}</h4>
    <v-card-title class="table-header">
      <v-card-text>
        <v-btn icon class="pointer"
          slot="activator"
          tag="span"
          color="pink">
          <v-icon large>mdi-plus-circle</v-icon>
        </v-btn>Add product
      </v-card-text>
    </v-card-title>

    <v-card v-for="(product, i) in products"
      :key="i"
      class="d-flex justify-space-between mb-1 mr-2 ml-2"
      outlined>
      <v-card
        class="mr-1 title item-order-field"
        width="450"
        outlined
        tile>
        <v-card-text class="pb-0">
          {{ product.title }}
        </v-card-text>
        <v-card-text class="pt-0 overline">
          S/N {{ product.serialNumber }}
        </v-card-text>
      </v-card>
      <v-card
        class="d-flex ml-1 mr-1 item-order-field"
        width="40"
        outlined>
        <v-list-item>
          <v-icon color="red">delete</v-icon>
        </v-list-item>
      </v-card>
    </v-card>
  </v-card>
</template>

<script>
export default {
  name: 'ProductsFromOrder',
  props: {
    products: {
      type: Array,
      required: true,
    },
    order_title: {
      type: String,
      default: 'Order',
    },
  },
};
</script>

<style scoped>
.item-order-field {
  border: none !important;
}
</style>
