import axios from 'axios'
import { store } from '../../store';

const baseURL = process.env.MIX_VUE_APP_BASE_URI;

const state = {
    students: [],
}

const mutations = {
    FETCH_STUDENTS(state, students) {
        state.students = students;
    },
}

const getters = {
    getAllStudents(state) {
        return state.students;
    },
}

const actions = {
    init({ state, dispatch }) {
        setDefaultAuthHeaders(state);
    },
    fetchStudents({ commit }) {
        return axios.get(`${baseURL}students`).then(response => {
            commit("FETCH_STUDENTS", response.data.data);
            return response.data;
        }).catch(error => {
            return Promise.reject(error);
        });
    },
}

function setDefaultAuthHeaders(state) {
    let currentUser = store.getters['auth/getCurrentUser'];

    axios.defaults.headers.common.Authorization = currentUser
        ? 'Bearer ' + currentUser.token
        : '';
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
}
