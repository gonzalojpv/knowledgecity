import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import 'bootstrap'
import './bootstrap'
import '../sass/_variables.scss'

Vue.use(VueRouter)
Vue.use(Vuelidate)

import App from './views/App'
import Home from './views/Home'
import Login from './views/Login'
import View404 from './views/View404'


import { store } from './store';

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                authRequired: true
            },
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/logout',
            name: 'logout',
            meta: {
                authRequired: true,
            },
        },
    ],
});

router.beforeEach((routeTo, routeFrom, next) => {

    if (store.getters['auth/loggedIn'] && routeTo.fullPath === '/logout') {
        store.dispatch('auth/logOut');
        next({ name: 'home' });
    }
    else if (store.getters['auth/loggedIn'] && (routeTo.fullPath === '/login')) {
        next({ name: 'home' });
    }
    else if (store.getters['auth/loggedIn']) {
        next({ name: 'home' });
    }
    else if (routeTo.fullPath == '/login') {
        next()
    }
    else {
        next({ name: 'login' });
    }
});

const app = new Vue({
    el: '#app',
    components: { App },
    router,
    store,
});
