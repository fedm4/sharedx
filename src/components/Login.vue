<template>
  <q-form @submit="login" class="login-form q-pa-md">
    <q-input v-model="email" label="Email" class="q-mb-md" />
    <q-input
      v-model="password"
      type="password"
      label="Password"
      class="q-mb-lg"
    />
    <q-btn
      color="primary"
      label="Login"
      class="full-width q-mb-md"
      @click="login"
    />
    <q-btn
      class="full-width google-button"
      text-color="gray"
      @click="googleLogin"
    >
      <img src="../assets/googlelogo.svg" class="google-button-logo" />
      Login With Google
    </q-btn>
  </q-form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'Login'
})
export default class ClassComponent extends Vue {
  private email = '';
  private password = '';

  login() {
    this.$firebase
      .signInEmail(this.email, this.password)
      .catch((e: Error) => console.log(e));
  }
  googleLogin() {
    this.$firebase.signInWithGoogle().catch((e: Error) => console.log(e));
  }
}
</script>

<style lang="scss">
.google-button-logo {
  box-sizing: content-box;
  padding-right: 15px;
  width: 20px;
}
.login-form {
  margin: 0 auto;
  max-width: 500px;
}
</style>
