import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'; // плагин для обработки и хранения состояния между обновлениями страниц.
import UserAuth from './modules/UserAuth';
import UserInfoDatabase from './modules/UserInfoDatabase';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    isLoading: false,
  },
  mutations: {
    LOADING_FALSE(state) {
      state.isLoading = false;
    },
    LOADING_TRUE(state) {
      state.isLoading = true;
    },
  },
  modules: { UserAuth, UserInfoDatabase },
  plugins: [
    createPersistedState({
      paths: ['UserAuth', 'UserInfoDatabase'],
      storage: window.sessionStorage,
    }),
  ],
});
