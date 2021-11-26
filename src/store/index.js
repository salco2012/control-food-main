import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'; // плагин для обработки и хранения состояния между обновлениями страниц.
import UserAuth from './modules/UserAuth';
import UserInfoDatabase from './modules/UserInfoDatabase';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: { UserAuth, UserInfoDatabase },
  plugins: [
    createPersistedState({
      paths: ['UserAuth', 'UserInfoDatabase'],
      storage: window.sessionStorage,
    }),
  ],
});
