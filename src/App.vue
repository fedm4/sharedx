<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script lang="ts">
//import { mapActions } from 'vuex';

export default {
  name: 'App'
  /*methods: {
    ...mapActions({ setIsOnline: 'currentUserModule/setIsOnline' })
  },*/
  /*mounted() {
    this.$firebase.onAuthStateChanged((user: unknown) =>
      this.setIsOnline(user ? true : false)
    );
  }*/
};
</script>
