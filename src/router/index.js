import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import RegistrationForm from '../views/RegistrationForm.vue';
import AuthorizationForm from '../views/AuthorizationForm.vue';
import PasswordRecovery from '../views/PasswordRecovery.vue';
import UserProfile from '../views/UserProfile.vue';
import Error404 from '../views/Error404.vue';
import MyGoals from '../views/MyGoals.vue';
import UserRating from '../views/UserRating.vue';
import SearchRecipes from '../views/SearchRecipes.vue';

import store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { transition: 'fade-in-right' },
  },
  {
    path: '/registration',
    name: 'RegistrationForm',
    component: RegistrationForm,
    meta: { transition: 'fade-in-right' },
  },
  {
    path: '/authorization',
    name: 'AuthorizationForm',
    component: AuthorizationForm,
    meta: { transition: 'fade-in-right' },
  },
  {
    path: '/password-recovery',
    name: 'PasswordRecovery',
    component: PasswordRecovery,
    meta: { transition: 'fade-in-right' },
  },
  {
    path: '/user-rating',
    name: 'UserRating',
    component: UserRating,
    beforeEnter: (to, from, next) => {
      if (store.getters.isUserAuthenticated) {
        next();
      } else {
        next('authorization');
      }
    },
  },
  {
    path: '/user-profile',
    name: 'UserProfile',
    component: UserProfile,
    beforeEnter: (to, from, next) => {
      if (store.getters.isUserAuthenticated) {
        next();
      } else {
        next('authorization');
      }
    },
  },
  {
    path: '/my-goals',
    name: 'MyGoals',
    component: MyGoals,
    beforeEnter: (to, from, next) => {
      if (store.getters.isUserAuthenticated) {
        next();
      } else {
        next('authorization');
      }
    },
  },
  {
    path: '/search-recipes',
    name: 'SearchRecipes',
    component: SearchRecipes,
    beforeEnter: (to, from, next) => {
      if (store.getters.isUserAuthenticated) {
        next();
      } else {
        next('authorization');
      }
    },
  },
  {
    path: '*',
    name: 'Error404',
    component: Error404,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
