import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    current: 'Moscow',
    cities: [],
    default: ['Moscow', 'Novosibirsk']
  },
  mutations: {
    setCurrent: (state, city) => state.current = city,
    initLocalStorage: state => {
      if (!localStorage.getItem('appCities')) {
        localStorage.setItem('appCities', JSON.stringify(state.default))
      }
      state.cities = JSON.parse(localStorage.getItem('appCities'))
    },
    updateCities: (state, city) => {
      localStorage.setItem('appCities', JSON.stringify([...state.cities, city]))
      state.cities = JSON.parse(localStorage.getItem('appCities'))
    },
  },
  actions: {
    changeCity: (ctx, city) => {
      ctx.commit('setCurrent', city)
    },
    addNewCity: (ctx, city) => {
      ctx.commit('updateCities', city)
    },
  },
  getters: {
    getCurrent: state => state.current,
    getCities: state => state.cities,
  },
})
