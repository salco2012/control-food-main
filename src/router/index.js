import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import RegistrationForm from '../views/RegistrationForm.vue';
import AuthorizationForm from '../views/AuthorizationForm.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/registration',
    name: 'RegistrationForm',
    component: RegistrationForm,
  },
  {
    path: '/authorization',
    name: 'AuthorizationForm',
    component: AuthorizationForm,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
