import axios from 'axios'
import { createStore } from 'vuex'

const API_URL = 'https://picsum.photos/v2/list?limit=100'

export const galleryStore = createStore({
  state() {
    return {
      photos: [],
      pending: false,
      error: null,
    }
  },
  mutations: {
    setPhotos: (state, photos) => (state.photos = photos),
    setError: (state, error) => (state.error = error),
    setPending: (state, pending) => (state.pending = pending),
  },
  actions: {
    fetchPhotos: async ({ commit }) => {
      try {
        commit('setPending', true)
        const { data: photos } = await axios.get(`${API_URL}`)
        commit('setPhotos', photos)
      } catch (error) {
        console.error('Error Occurred:', error)
        commit('setError', error)
      } finally {
        commit('setPending', false)
      }
    },
  },
  getters: {
    getSortedPhotos: (state) =>
      state.photos.sort((a, b) => a.author.localeCompare(b.author)),
    getError: (state) => state.error,
    getPending: (state) => state.pending,
  },
})
