import { GetterTree } from 'vuex';
import { StoreInterface } from '../index';
import state, { CurrentUserStateInterface } from './state';

const getters: GetterTree<CurrentUserStateInterface, StoreInterface> = {
  email() {
    return state.email;
  },
  isOnline() {
    return state.isOnline;
  }
};

export default getters;
