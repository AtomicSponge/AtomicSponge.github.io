<!--
  atomicsponge.website
  Copyright (c) 2024 Matthew Evans - See LICENSE.md
-->

<script setup lang="ts">
const props = defineProps<{
  display:string
}>()
</script>

<template>
  <div class="term-display">
    <div v-html="props.display"></div>
    <div>&nbsp;</div>
  </div>
</template>

<style lang="stylus" scoped>
@import '../style.styl'

.term-display
  display flex
  flex-direction column
  //termstyle()

//:deep(.term-display)
  //termstyle()
</style>
