<template>
  <v-card class="px-2">
    <v-card-text class="subheading pa-4">
      {{ message }}
    </v-card-text>
    <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn @click="$modal.hide('modal::hide')"
      class="secondary"
      dark>
      Cancel
    </v-btn>
    <v-btn @click="submit()"
      class="accent"
      dark>
      <v-icon>delete</v-icon> 
      Delete
    </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'confirm-modal',
  props: {
    message: {
      type: String,
      required: true,
    },
    submit: {
      type: Function,
    },
  },
};
</script>
