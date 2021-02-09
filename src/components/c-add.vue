<template lang="pug">
.city__add
  p(v-if="error") {{ error }}
  input(v-model="inputCity" placeholder="Enter city...")
  button(@click="addNewCity") Add city

</template>

<script>
export default {
  name: "c-add",
  data() {
    return {
      inputCity: '',
      error: ''
    }
  },
  methods: {
    addNewCity() {
      if (this.inputCity.length > 0) {
        this.error = ''

        // TODO: checkin -> существует ли такой город
        this.$store.dispatch('addNewCity', this.inputCity) // собственно после проверки конечно что такой город существует!!!
        this.$router.push(`/${this.inputCity}`)
        this.inputCity = ''
      } else {
        this.error = 'Please, enter the name of the city!'
      }
    }
  }

}
</script>

<style scoped>

</style>
