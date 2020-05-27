import { ActionTree } from 'vuex';
import { StoreInterface } from '../index';
import { CurrentUserStateInterface } from './state';

const actions: ActionTree<CurrentUserStateInterface, StoreInterface> = {
  setUser({ commit }, payload) {
    console.log('USAHHHH');
    //commit('setUser', payload);
  },
  setIsOnline({ commit }, isOnline) {
    commit('setIsOnline', isOnline);
  }
};

export default actions;
