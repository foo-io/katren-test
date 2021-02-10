<template lang="pug">
  #app
    .container
      .page
        .page__title
          h1.page__title-text Weather
        //.page__output
          pre Current city: {{ $store.getters.getCurrent }}

        .page__body
          .page__sidebar
            CCities
          .page__content
            router-view
</template>

<script>
import CCities from "@/components/c-cities";

export default {
  name: 'App',
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

.container
  max-width: 1000px
  margin: 0 auto

.page
  display: flex
  flex-direction: column
  background: $bg-page
  border-radius: 10px
  overflow: hidden
  padding: 16px
  margin: 32px 0

  &__title
    display: flex
    justify-content: center
    border-bottom: 1px solid $border-color

    &-text
      margin: 0 16px 16px
      color: $page-title-color

  &__body
    display: flex

  &__sidebar
    display: flex
    width: 30%
    border-right: 1px solid $border-color

  &__content
    display: flex
    width: 70%
</style>
