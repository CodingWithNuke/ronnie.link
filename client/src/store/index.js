import Vue from 'vue'
import Vuex from 'vuex'
import api from '../utils/api';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    urls: []
  },
  mutations: {
    SET_URLS(state, urls) {
      state.urls = urls;
    },
    ADD_URL(state, url) {
      state.urls = [...state.urls, url];
    },
    REMOVE_URL(state, url) {
      state.urls = state.urls.filter(urlItem => urlItem._id !== url._id);
    }
  },
  actions: {
    async fetchUrls({ commit }) {
      try {
        const urls = await api.get('/urls').then(res => res.data);

        commit('SET_URLS', urls);
      } catch (error) {
        console.log(error);
      }
    },
    async createUrl({ commit }, payload) {
      try {
        const url = await api.post('/urls', {
          url: payload.url,
          slug: payload.slug,
          code: payload.code
        }).then(res => res.data)

        commit('ADD_URL', url)
      } catch (error) {
        console.log(error);
      }
    },
    async deleteUrl({ commit }, payload) {
      try {
        const url = await api.delete(`/urls/${payload.id}`, {
          data: {
            code: payload.code
          }
        }).then(res => res.data)

        commit('REMOVE_URL', url)
      } catch (error) {
        console.log(error);
      }
    }
  },
  getters: {
    urls: state => state.urls
  }
})
