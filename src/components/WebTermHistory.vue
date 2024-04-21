<!--
  atomicsponge.website
  Copyright (c) 2024 Matthew Evans - See LICENSE.md
-->

<script setup lang="ts">
import WebTermInfo from './WebTermInfo.vue'

const props = defineProps<{
  history:string
  userip:string
}>()
</script>

<template>
  <div class="term-history" v-if="props.history">
    <span><WebTermInfo :userip="props.userip"/></span>
    <span>&nbsp;&nbsp;<span class="prompt">$</span> {{ props.history }}</span>
    <span><br/></span>
    <span><br/></span>
  </div>
</template>

<style lang="stylus" scoped>
@import '../style.styl'

//.term-history
  //termstyle()
  //display flex
  //flex-direction column

.prompt
  prompt()
</style>
