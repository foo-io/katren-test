<template lang="pug">
  .content(v-if="errors.length === 0")
    h3.content__title {{ current.name }}
    .weather
      .weather__item(v-for="item in weather")
        .weather__item-key {{ item.formatedDate }}
        .weather__item-value {{ item.avgTemp + '°C, ' +  item.condition }}

    .map
      TGisMap(
        :center="[current.lat, current.lon]"
        :styles="{height: '200px'}"
        :zoom="10")

  .errors(v-else)
    ul
      li(v-for="error in errors")
        p {{ error }}
</template>

<script>
import moment from "moment"
import TGisMap from "@/components/c-map"

moment.defineLocale('en', null)
moment.locale('en', {
  calendar : {
    lastDay : '[Yesterday]',
    sameDay : '[Today]',
    nextDay : '[Tomorrow]',
    nextWeek : 'dddd',
  }
})

export default {
  name: "Weather",
  data() {
    return {
      weather: [],
      temp: [],
      errors: []
    }
  },
  computed: {
    current() {
      return this.$store.getters.getCurrent;
    },
    cities() {
      return this.$store.getters.getCities;
    }
  },
  mounted() {
    this.checkin()

    if (this.$route.params.city === undefined) {
      this.getWeather('moscow-moscow-city-russia')
    } else {
      this.getWeather(this.$route.params.city)
    }
  },
  methods: {
    getCurrentObject(search = this.$route.params.city) {
      let array = this.cities
      let obj = array.find(obj => obj.url === search)

      return obj;
    },
    checkin() {
      this.errors = []

      if (!this.getCurrentObject() && this.$route.params.city) {
        this.errors.push(`City "${this.$route.params.city}" not found in the list of cities!`)
      } else {
        this.$store.dispatch('changeCity', this.getCurrentObject())
      }
    },
    async getWeather(city) {
      const API_KEY = 'c685ce0d903c4fb6872171136211002'
      this.weather = [] // обнуляем массив
      this.temp = [] // создам временный массив для пуша асинх. ответов
      this.checkin() // проверяем

      if (this.errors.length === 0) {

        const forecastResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3`)
        const forecast = await forecastResponse.json().then(data => {
          if (forecastResponse.ok) {
            let days = data.forecast.forecastday
            let id = 1
            days.forEach(day => {
              let obj = {
                id: id,
                date: day.date,
                formatedDate: moment().add(id-1, 'day').calendar() + ', ' + moment(day.date, 'YYYY-MM-DD').format('Do MMMM'),
                avgTemp: day.day.avgtemp_c,
                condition: day.day.condition.text
              }
              this.temp.push(obj)
              id++
            })
          } else {
            this.errors.push(data.error.message)
          }
        }).catch(e => {
          this.errors.push(e)
        })

        if (this.errors.length === 0) {
          const yesterday = await moment(this.temp[1].date).add(-2, 'day').format('YYYY-MM-DD')

          const historyResponse = await fetch(`http://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${city}&dt=${yesterday}`)
          const history = await historyResponse.json().then(data => {
            let days = data.forecast.forecastday

            days.forEach(day => {
              let obj = {
                id: 0,
                date: day.date,
                formatedDate: moment().add(-1, 'day').calendar() + ', ' + moment(day.date, 'YYYY-MM-DD').format('Do MMMM'),
                avgTemp: day.day.avgtemp_c,
                condition: day.day.condition.text
              }
              this.temp.push(obj)
            })
          }).then(() => {
            this.weather = this.temp.sort((a, b) => {
              return a.id - b.id;
            })
          })
        }
      }
    }
  },
  watch: {
    $route(to, from) {
      this.getWeather(to.params.city);
      this.$store.dispatch('changeCity', this.getCurrentObject(to.params.city))
    },
    cities() {
      this.checkin()
    },
    current() {
      this.checkin()
    },
  },
  components: {
    TGisMap
  }
}
</script>

<style lang="sass" scoped>
@import "~@/assets/vars.sass"

.content
  display: flex
  flex-direction: column
  width: 100%
  margin-left: 16px
  &__title
    font-weight: 600
    color: $h3-title
    margin: 16px 0 32px

.weather
  &__item
    display: flex
    margin-bottom: 16px

    &:last-child
      margin-bottom: 0
    &-key
      display: flex
      justify-content: flex-end
      width: 50%
      margin-right: 8px
    &-value
      display: flex
      width: 50%
      margin-left: 8px

.map
  border-radius: 10px
  overflow: hidden
  margin-top: 32px
</style>
