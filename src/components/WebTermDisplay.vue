<!--
  atomicsponge.website
  By:  Matthew Evans
  See LICENSE.md
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
.term-display
  display flex
  flex-direction column
</style>
