<template>
  <v-app :style="{background: $vuetify.theme.themes.light.background}">
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-icon
        class="white--text mr-2"
      >
        mdi-forum
      </v-icon>

      <span
        class="text-h6 font-weight-bold white--text"
      >
        Low-Bandwith-Video-Chat
      </span>

      <v-spacer></v-spacer>

      <v-btn
        target="_blank"
        text
        class="white--text"
        @click="handleSettiingsClick"
      >
        <v-icon left>mdi-cog</v-icon>
        <span class="mr-2">Settings</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import {
    mapMutations
  } from 'vuex'

export default {
  name: 'App',

  data: () => ({
    //
  }),

  created() {
    this.$store.dispatch('bindUsers')
  },

  methods: {
    ...mapMutations(['setOpenDialog']),

    handleSettiingsClick: function() {
      this.setOpenDialog(true)
    },
  }
};
</script>
