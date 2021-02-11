<template lang="pug">
  #app
    .container
      .page
        .page__title
          button(class="burger show-tablet" @click="reverseMenu")
            span(v-if="!isActive") 🍔
            span(v-else) ❌
          h1.page__title-text Weather

        .page__body
          .page__sidebar(v-show="isActive || !isMobile")
            CCities
          .page__content(v-show="!isActive || !isMobile")
            router-view
</template>

<script>
import CCities from "@/components/c-cities";

export default {
  name: 'App',
  computed: {
    isActive() {
      return this.$store.getters.getMenuStatus
    },
    isMobile() {
      return this.$store.getters.getMobileStatus
    },
  },
  mounted() {
    this.windowResize()
  },
  created() {
    window.addEventListener("resize", this.windowResize);
  },
  methods: {
    reverseMenu() {
      this.$store.dispatch('reverseMenu')
    },
    windowResize() {
      let windowWidth = window.outerWidth;
      let isMobile = windowWidth < 600;

      if (this.$store.getters.isMobile !== isMobile) {
        this.$store.dispatch('isMobile', isMobile)
      }
    },
  },
  components: {
    CCities
  }
}

</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700;900&display=swap')
@import "~@/assets/vars.sass"

#app
  font-family: 'Source Sans Pro', sans-serif
  min-width: 320px

.container
  max-width: 1000px
  margin: 0 auto

.page
  display: flex
  flex-direction: column
  background: $bg-page
  border-radius: 10px
  padding: 16px
  margin: 32px 16px

  @media screen and (max-width: $tablet-width)
    margin: 16px

  &__title
    display: flex
    justify-content: center
    border-bottom: 1px solid $border-color
    position: relative

    &-text
      margin: 0 16px 16px
      color: $page-title-color
      @media screen and (max-width: $tablet-width)
        font-size: 26px
      @media screen and (max-width: $mobile-width)
        font-size: 22px

  &__body
    display: flex

  &__sidebar
    display: flex
    width: 30%
    border-right: 1px solid $border-color

    @media screen and (max-width: $tablet-width)
      width: 100%
      border-right: 0
  &__content
    display: flex
    width: 70%
    @media screen and (max-width: $tablet-width)
      width: 100%
.burger
  border: 0
  background: 0
  padding: 0
  margin: 0
  left: 0
  outline: none
  position: absolute
  width: 29px
  height: 29px
  justify-content: center
  align-items: center
  @media screen and (max-width: $mobile-width)
    width: 25px
    height: 25px

.show-tablet
  display: none
  @media screen and (max-width: $tablet-width)
    display: flex
.show-desktop
  display: none
  @media screen and (min-width: $tablet-width)
    display: flex
</style>
