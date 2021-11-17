import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VuelidateErrorExtractor, { templates } from 'vuelidate-error-extractor';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { initializeApp } from 'firebase/app';
import locale from 'element-ui/lib/locale/lang/ru-RU'; // установил русский язык для компонентов element
import VuePageTransition from 'vue-page-transition';
import firebaseConfig from './config/firebase';
import 'firebase/database';
import 'firebase/messaging';
import 'firebase/storage';
import App from './App.vue';
import router from './router';
import store from './store';
import RegistrationForm from './views/RegistrationForm.vue';
import ElFormItemExtended from './components/ElFormItemExtended.vue';
import AuthorizationForm from './views/AuthorizationForm.vue';

// Initialize Firebase
initializeApp(firebaseConfig);

const messages = {
  required: 'Поле {attribute} является обязательным!',
  email: 'Укажите корректный {attribute}!',
  minLength: 'Минимальная длина 6 символов!',
  sameAs: 'Пароли должны совпадать!',
  between: 'Значение не допустимо!',
  alphaRus: 'Допустимы только русские буквы!',
};

Vue.use(VuePageTransition);
Vue.use(ElementUI, { locale });
Vue.use(Vuelidate);
Vue.use(VuelidateErrorExtractor, {
  messages,
  attributes: {
    name: '"Имя"',
    email: '"E-mail адрес"',
    password: '"Пароль"',
    repeatPassword: '"Повторите пароль"',
    gender: '"Пол:"',
    age: '"возраст"',
    height: '"рост"',
    weight: '"вес"',
  },
});

Vue.component('AuthorizationForm', AuthorizationForm);
Vue.component('ElFormItemExtended', ElFormItemExtended);
Vue.component('RegistrationForm', RegistrationForm);
Vue.component('formWrapper', templates.FormWrapper);

Vue.use(ElementUI);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
