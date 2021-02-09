<template lang="pug">
div
  .content(v-if="errors.length === 0")
    h3 This is weather in {{ current }}
  .errors(v-else)
    ul
      li(v-for="error in errors")
        p {{ error }}
</template>

<script>
export default {
  name: "Weather",
  data() {
    return {
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
    if (!this.cities.includes(this.$route.params.city) && this.$route.params.city) {
      this.errors.push(`City "${this.$route.params.city}" not found in the list of cities!`)
    } else {
      this.errors = []
    }
  },
  watch: {
    $route(to, from) {
      this.$store.dispatch('changeCity', to.params.city)
    }
  }
}
</script>

<style scoped>

</style>
