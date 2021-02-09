<template lang="pug">
div
  h3 The city-list
  ul
    li(v-for="city in cities")
      router-link(:to="city") {{ city }}
  CAdd
</template>

<script>
import CAdd from "@/components/c-add";

export default {
  name: "c-cities",
  components: {CAdd},
  computed: {
    cities() {
      return this.$store.getters.getCities;
    }
  },
}
</script>

<style scoped>

</style>
