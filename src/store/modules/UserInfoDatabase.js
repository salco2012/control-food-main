import {
  getDatabase, ref, set, child, get, update,
} from 'firebase/database';

// const database = getDatabase();

export default {
  state: {
    infoCurrentUser: null,
    listAllUsers: null,
  },
  mutations: {
    CLEAR_INFO_USER(state) {
      state.infoCurrentUser = null;
    },
    SET_INFO_CURRENT_USER(state, payload) {
      state.infoCurrentUser = payload;
    },
    SET_ALL_USERS(state, payload) {
      state.listAllUsers = payload;
    },
    CLEAR_ALL_USERS(state) {
      state.listAllUsers = null;
    },
  },
  actions: {
    setForm({ rootState }, payload) {
      const db = getDatabase();
      const uidUser = rootState.UserAuth.user.userID;
      set(ref(db, `usersUID/${uidUser}`), payload);
    },
    setUserСalories({ rootState }, payload) {
      const db = getDatabase();
      const uidUser = rootState.UserAuth.user.userID;
      update(ref(db, `usersUID/${uidUser}/userСalories`), payload);
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
    getListAllUsers({ commit }) {
      const dbRef = ref(getDatabase());
      get(child(dbRef, 'usersUID')).then((snapshot) => {
        if (snapshot.exists()) {
          commit('SET_ALL_USERS', snapshot.val());
        } else {
          console.error('Данные не доступны');
        }
      });
    },
  },
  getters: {},
};
