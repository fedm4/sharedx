import { MutationTree } from 'vuex';
import { CurrentUserStateInterface } from './state';

const mutation: MutationTree<CurrentUserStateInterface> = {
  setUser(state, payload) {
    state.user = payload;
  },
  setIsOnline(state, isOnline) {
    state.isOnline = isOnline;
  }
};

export default mutation;
