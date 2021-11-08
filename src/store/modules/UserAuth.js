import {
  getAuth,
  createUserWithEmailAndPassword, // для создания нового пользователя
  signInWithEmailAndPassword, // для входа в систему
  sendPasswordResetEmail, // для сброса пароля
} from 'firebase/auth';

export default {
  state: {
    user: {
      isAuthenticated: false, // флаг который отвечает за аутентификацию
      userID: null, // сохраняем уникальное id пользователя
    },
    error: null,
    resetPassword: {
      errorResetPassword: null,
      successfulResetPassword: false,
    },
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = {
        isAuthenticated: true,
        userID: payload,
      };
    },
    EXIT_USER_PROFILE(state) {
      state.user = false;
    },
    SET_ERROR(state, payload) {
      state.error = payload;
    },
    CLEAR_ERROR(state) {
      state.error = null;
    },
    RESET_PASSWORD_ERROR(state, payload) {
      state.resetPassword = {
        errorResetPassword: payload,
        successfulResetPassword: false,
      };
    },
    RESET_PASSWORD_SUCCESSFUL(state) {
      state.resetPassword = {
        errorResetPassword: null,
        successfulResetPassword: true,
      };
    },
  },
  actions: {
    registration({ commit }, payload) {
      return new Promise((resolve) => {
        const createUser = createUserWithEmailAndPassword(
          getAuth(),
          payload.email,
          payload.password,
        );
        resolve(createUser);
      })
        .then((user) => {
          commit('SET_USER', user.user.uid);
          commit('CLEAR_ERROR');
        })
        .catch((error) => {
          // обрабатываем ошибку, записываем ее в state.error
          commit('SET_ERROR', error.code);
        });
    },
    async authorization({ commit }, payload) {
      try {
        const signIn = await signInWithEmailAndPassword(getAuth(), payload.email, payload.password);
        commit('SET_USER', signIn.user.uid);
        commit('CLEAR_ERROR');
      } catch (error) {
        commit('SET_ERROR', error.code);
      }
    },
    async resetPassword({ commit }, payload) {
      try {
        await sendPasswordResetEmail(getAuth(), payload.email);
        commit('RESET_PASSWORD_SUCCESSFUL');
      } catch (error) {
        commit('RESET_PASSWORD_ERROR', error.code);
      }
    },
  },
};
