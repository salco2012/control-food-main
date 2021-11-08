import Vue from 'vue';
import Vuex from 'vuex';
import UserAuth from './modules/UserAuth';
import UserInfoRegister from './modules/UserInfoRegister';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: { UserAuth, UserInfoRegister },
});
