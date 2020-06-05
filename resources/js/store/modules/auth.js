import axios from 'axios'

const state = {
    currentUser: getSavedState('auth.currentUser'),
}

const mutations = {
    SET_CURRENT_USER(state, newValue) {
        state.currentUser = newValue;
        saveState('auth.currentUser', newValue);
        setDefaultAuthHeaders(state);
    },
    CACHE_USER(state, newUser) {
        state.cached.push(newUser)
    },
}

const getters = {
    loggedIn(state) {
        return !!state.currentUser;
    },
    getCurrentUser(state) {
        return state.currentUser;
    },
}

const actions = {
    init({ state, dispatch }) {
        setDefaultAuthHeaders(state);
        dispatch('validate');
    },
    logIn({ commit, dispatch, getters }, { username, password } = {}) {
        if (getters.loggedIn) return dispatch('validate');

        return axios.post(`${process.env.MIX_VUE_APP_BASE_URI}auth`, { username, password })
            .then((response) => {
                const user = response.data;
                commit('SET_CURRENT_USER', user.data);
                return user;
            }).catch(error => {
                return Promise.reject(error);
            });
    },
    logOut({ commit }, { id }) {
        return axios.delete(`${process.env.MIX_VUE_APP_BASE_URI}users/${id}`)
            .then((response) => {
                const user = response.data;
                commit('SET_CURRENT_USER', null);
                localStorage.clear();
                return user;
            }).catch(error => {
                return Promise.reject(error);
            });
    },
    validate({ commit, state }) {
        if (!state.currentUser) {
            return Promise.resolve(null);
        }
        else {
            commit('SET_CURRENT_USER', state.currentUser);
        }

        return axios.get(`${process.env.MIX_VUE_APP_BASE_URI}users/${state.currentUser.id}`)
            .then(response => {
                const user = response.data;
                commit('SET_CURRENT_USER', user.data);
                return user;
            }).catch(error => {
                if (error.response.status === 401) {
                    commit('SET_CURRENT_USER', null);
                }
                return null;
            });
    },
    signUp({ commit, dispatch, getters }, params) {
        return axios.post(`${process.env.MIX_VUE_APP_BASE_URI}register`, params)
            .then((response) => {
                const user = response.data;
                //commit('SET_CURRENT_USER', user.data);
                return user;
            }).catch(error => {
                return Promise.reject(error);
            });
    },
}

// ===
// Private helpers
// ===

function getSavedState(key) {

    if (window.localStorage.getItem(key) != 'undefined') {
        return JSON.parse(window.localStorage.getItem(key));
    }
    else {
        return null;
    }
}

function saveState(key, state) {
    window.localStorage.setItem(key, JSON.stringify(state));
}

function setDefaultAuthHeaders(state) {
    axios.defaults.headers.common.Authorization = state.currentUser
        ? 'Bearer ' + state.currentUser.token
        : '';
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
}
