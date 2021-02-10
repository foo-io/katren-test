<template lang="pug">
.city__add
  p(v-if="error") {{ error }}
  Autocomplete(
    :search="search"
    placeholder="Enter city..."
    aria-label="Enter city..."
    :get-result-value="getResultValue"
    @submit="addNewCity"
    ref="autocomplete"
    )
  //input(v-model="inputCity" placeholder="Enter city...")
  //button(@click="addNewCity") Add city
  //button(@click="resetCities()") Reset
</template>

<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'

const API_KEY = 'c685ce0d903c4fb6872171136211002'

export default {
  name: "c-add",
  data() {
    return {
      inputCity: '',
      error: ''
    }
  },
  components: {
    Autocomplete
  },
  methods: {
    addNewCity(cityObject) {
      this.error = ''

      this.$store.dispatch('addNewCity', cityObject) // собственно после проверки конечно что такой город существует!!!
      if (this.$route.params.city !== cityObject.url) {
        this.$router.push(`/${cityObject.url}`)
      }
      this.$refs.autocomplete.value = ''
    },
    resetCities() {
      this.$store.dispatch('resetCities')
      this.$router.push('/moscow')
    },
    search(input) {
      const url = `http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${encodeURI(input)}&limit=1`

      return new Promise(resolve => {
        if (input.length < 3) {
          return resolve([])
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
              resolve(data)
            })
      })
    },
    getResultValue(result) {
      return result.name
    }
  }

}
</script>

<style lang="sass" scoped>

</style>
