import Vue from 'vue';
import Vuex from 'vuex';
import UserAuth from './modules/UserAuth';
import UserInfoDatabase from './modules/UserInfoDatabase';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: { UserAuth, UserInfoDatabase },
});
