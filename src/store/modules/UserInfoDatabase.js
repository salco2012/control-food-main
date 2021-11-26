import {
  getDatabase, ref, set, child, get, update,
} from 'firebase/database';

// const database = getDatabase();

export default {
  state: {
    infoCurrentUser: null,
    listAllUsers: null,
    // Избранные рецепты с бд
    selectRecipes: [],
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
    SET_SELECT_RECIPES(state, payload) {
      state.selectRecipes = payload;
    },
    PUSH_SELECT_RECIPES(state, payload) {
      state.selectRecipes.push(payload);
    },
    DELETE_SELECT_RECIPES(state, index) {
      state.selectRecipes.splice(index, 1);
    },
    CLEAR_SELECT_RECIPES(state) {
      state.selectRecipes = [];
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
    setSelectedRecipes({ rootState }, payload) {
      const db = getDatabase();
      const uidUser = rootState.UserAuth.user.userID;
      set(ref(db, `usersUID/${uidUser}/selectedRecipes`), payload);
    },
    getForm({ commit, rootState }) {
      return new Promise((resolve) => {
        const dbRef = ref(getDatabase());
        const uidUser = rootState.UserAuth.user.userID;
        resolve(get(child(dbRef, `usersUID/${uidUser}`)));
      })
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
      return new Promise((resolve) => {
        const dbRef = ref(getDatabase());
        resolve(get(child(dbRef, 'usersUID')));
      })
        .then((snapshot) => {
          if (snapshot.exists()) {
            commit('SET_ALL_USERS', snapshot.val());
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  getters: {
    selectRecipes(state) {
      return state.selectRecipes;
    },
  },
};
