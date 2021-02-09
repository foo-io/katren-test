<template lang="pug">
  #app
    .container
      .page
        .page__title
          h1.page__title-text Weather
        .page__output
          pre Current city: {{ $store.getters.getCurrent }}

        .page__body
          .page__sidebar
            CCities
          .page__content
            router-view
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import CCities from "@/components/c-cities";

export default {
  name: 'App',
  components: {
    CCities,
    HelloWorld
  }
}

</script>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif

.container
  max-width: 1000px
  margin: 0 auto

.page
  display: flex
  flex-direction: column

  &__title
    display: flex
    justify-content: center

    &-text

  &__body
    display: flex

  &__sidebar
    display: flex
    width: 30%

  &__content
    display: flex
    width: 70%
</style>
