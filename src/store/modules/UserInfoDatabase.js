import { getDatabase, ref, set } from 'firebase/database';

// const database = getDatabase();

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    setForm({ rootState }, payload) {
      const db = getDatabase();
      const uidUser = rootState.UserAuth.user.userID;
      set(ref(db, `usersUID/${uidUser}`), payload);
    },
  },
  getters: {},
};
