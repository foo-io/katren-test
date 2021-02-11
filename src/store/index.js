import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    current: {
      id: 2145091,
      name: "Moscow, Moscow City, Russia",
      region: "Moscow City", "country": "Russia",
      lat: 55.75,
      lon: 37.62,
      url: "moscow-moscow-city-russia"
    },
    cities: [],
    default: [
      { "id": 2145091, "name": "Moscow, Moscow City, Russia", "region": "Moscow City", "country": "Russia", "lat": 55.75, "lon": 37.62, "url": "moscow-moscow-city-russia" },
      { "id": 2156152, "name": "Novosibirsk, Novosibirsk, Russia", "region": "Novosibirsk", "country": "Russia", "lat": 55.04, "lon": 82.93, "url": "novosibirsk-novosibirsk-russia" },
      { "id": 3247379, "name": "Mexico City, The Federal District, Mexico", "region": "The Federal District", "country": "Mexico", "lat": 19.43, "lon": -99.13, "url": "mexico-city-the-federal-district-mexico" },
      { "id": 2179091, "name": "Rostov-On-Don, Rostov, Russia", "region": "Rostov", "country": "Russia", "lat": 47.24, "lon": 39.71, "url": "rostov-on-don-rostov-russia" },
      { "id": null, "name": "Undefined City", "region": "null", "country": "null", "lat": 0, "lon": 0, "url": "undefined" }
    ],
    menu: false,
    isMobile: false
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
    resetCities: state => {
      localStorage.setItem('appCities', JSON.stringify(state.default))
      state.cities = JSON.parse(localStorage.getItem('appCities'))
    },
    reverseMenu: state => {
      state.menu = !state.menu
    },
    isMobile: (state, status) => {
      state.isMobile = status
    },
  },
  actions: {
    changeCity: (ctx, city) => {
      ctx.commit('setCurrent', city)
    },
    addNewCity: (ctx, city) => {
      ctx.commit('updateCities', city)
    },
    resetCities: ctx => {
      ctx.commit('resetCities')
    },
    reverseMenu: ctx => {
      ctx.commit('reverseMenu')
    },
    isMobile: (ctx, status) => {
      ctx.commit('isMobile', status)
    }
  },
  getters: {
    getCurrent: state => state.current,
    getCities: state => state.cities,
    getDefault: state => state.default,
    getMenuStatus: state => state.menu,
    getMobileStatus: state => state.isMobile,
  },
})
