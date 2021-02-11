<template lang="pug">
content-loader(
  width='660'
  height='120'
  viewBox="0 0 660 120"
  primaryColor="#eee"
  secondaryColor="#e0e0e0"
  )
  rect(x="168" y="0" rx="3" ry="3" width="155" height="18")
  rect(x="336" y="0" rx="3" ry="3" width="139" height="18")
  rect(x="192" y="34" rx="3" ry="3" width="131" height="18")
  rect(x="336" y="34" rx="3" ry="3" width="181" height="18")
  rect(x="163" y="68" rx="3" ry="3" width="160" height="18")
  rect(x="336" y="68" rx="3" ry="3" width="160" height="18")
  rect(x="172" y="102" rx="3" ry="3" width="151" height="18")
  rect(x="336" y="102" rx="3" ry="3" width="125" height="18")
</template>

<script>
import { ContentLoader } from 'vue-content-loader'

export default {
  name: "c-loader",
  components: {
    ContentLoader
  }
}
</script>

<style scoped>

</style>
