<template lang="pug">
div.sidebar
  h3.sidebar__title The city-list
  ul.citylist
    li(v-for="city in cities" class="citylist__item")
      router-link(
        :to="{ path: city.url }"
        class="citylist__item-link"
        active-class="_active"
        ) {{ city.name }}
  CAdd
</template>

<script>
import CAdd from "@/components/c-add";

export default {
  name: "c-cities",
  components: { CAdd },
  computed: {
    cities() {
      return this.$store.getters.getCities;
    }
  },
  watch: {
    $route() {
      this.$store.dispatch('reverseMenu')
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~@/assets/vars.sass"

.sidebar
  margin-right: 16px

  &__title
    font-weight: 600
    color: $h3-title
    margin: 16px 0
  @media screen and (max-width: $tablet-width)
    margin-right: 0

.citylist
  list-style: none
  margin: 0 0 16px 0
  padding: 0
  display: flex
  flex-direction: column

  &__item
    display: flex
    margin-bottom: 12px

    &-link
      text-decoration: none
      color: $citylist-item-color
      line-height: 24px

      &:hover
        color: $citylist-item-active-color
      &._active
        color: $citylist-item-active-color
        font-weight: 600

    &:last-child
      margin-bottom: 0
</style>
