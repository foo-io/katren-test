<template lang="pug">
#2GisMap(:style="styles")
</template>

<script>
import gMap from '2gis-maps'

export default {
  name: "c-map",
  props: {
    center: {
      type: Array,
      default: []
    },
    zoom: {
      type: Number,
      default: 13
    },
    styles: {
      type: Object,
      default: () => {
        return {width: '500px', height: '400px'}
      }
    }
  },
  data() {
    return {
      map: {panTo() {}}
    }
  },
  methods: {
    init() {
      gMap.then(() => {
        this.map = DG.map('2GisMap', {
          'center': this.center,
          'zoom': this.zoom
        })
      })
    }
  },
  created() {
    this.init()
  },
  watch: {
    center() {
      if (this.center !== null) {
        this.map.panTo(this.center)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
