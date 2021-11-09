import {
  getDatabase, ref, set, child, get,
} from 'firebase/database';

// const database = getDatabase();

export default {
  state: {
    infoCurrentUser: null,
  },
  mutations: {
    CLEAR_INFO_USER(state) {
      state.infoCurrentUser = null;
    },
    SET_INFO_CURRENT_USER(state, payload) {
      state.infoCurrentUser = payload;
    },
  },
  actions: {
    setForm({ rootState }, payload) {
      const db = getDatabase();
      const uidUser = rootState.UserAuth.user.userID;
      set(ref(db, `usersUID/${uidUser}`), payload);
    },
    getForm({ commit, rootState }) {
      const dbRef = ref(getDatabase());
      const uidUser = rootState.UserAuth.user.userID;
      get(child(dbRef, `usersUID/${uidUser}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            commit('SET_INFO_CURRENT_USER', snapshot.val());
          } else {
            console.error('Данные не доступны');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  getters: {},
};
