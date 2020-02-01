import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCryptojs from 'vue-cryptojs'

import store from './store';
import VueAxios from 'vue-axios';
import axios from 'axios';

import App from './App.vue';
import Home from './views/Home.vue';
import Creditos from './views/Creditos.vue';
import Clientes from './views/Clientes.vue';
import InicioSesion from './views/InicioSesion.vue';
import RegistroSuperU from './views/RegistroSuperU.vue';
import Empleados from './views/Empleados.vue';
import money from 'v-money'

Vue.use(VueAxios, axios);
Vue.use(VueRouter)
Vue.use(VueCryptojs)
Vue.use(money, {precision: 4})

const routes =[
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/creditos',
        name: 'creditos',
        component: Creditos
      },
      {
        path: '/clientes',
        name: 'clientes',
        component: Clientes
      },{
        path: '/inicioSesion',
        name: 'inicioSesion',
        component: InicioSesion
      },
      {
        path: '/rsu',
        name: 'registroSuperU',
        component: RegistroSuperU
      },
      {
        path: '/empleados',
        name: 'empleados',
        component: Empleados
      }
];

const token = localStorage.getItem("token")
if(token){
  axios.defaults.headers.common['Authorization'] = token;
}

const router = new VueRouter({mode: 'history',routes:routes});
new Vue(App)
new Vue (Vue.util.extend({store,router},App)).$mount('#app'); 