import { boot } from 'quasar/wrappers';
import Firebase from 'src/services/Firebase';

declare module 'vue/types/vue' {
  interface Vue {
    $firebase: Firebase;
  }
}

export default boot(({ store, Vue }) => {
  Vue.prototype.$firebase = new Firebase();
  Vue.prototype.$isOnline = false;
  Vue.prototype.$firebase.onAuthStateChanged((user: firebase.User) => {
    store.dispatch('currentUser/setIsOnline', user ? true : false);
    //store.dispatch('currentUser/setUser', user);
  });
});
