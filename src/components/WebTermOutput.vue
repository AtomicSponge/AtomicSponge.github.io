<!--
  atomicsponge.website
  Copyright (c) 2024 Matthew Evans - See LICENSE.md
-->

<script setup lang="ts">
import { watch } from 'vue'

import WebTermHistory from './WebTermHistory.vue'
import WebTermDisplay from './WebTermDisplay.vue'

const props = defineProps<{
  history:string
  display:string
  userip:string
}>()

var outputHistory:Array<{history:string, display:string}> = []

watch([()=>props.history, ()=>props.display],
  ([newHistory, newDisplay]) => {
  //console.log(newDisplay)
  //console.log(newHistory)
  if(newDisplay === 'clear') {
    outputHistory = []
    return
  }
  outputHistory.push({ history: newHistory, display: newDisplay })
})
</script>

<template>
  <div class="term-output">
    <template v-for="(item, index) in outputHistory" :key="outputHistory">
      <WebTermHistory :history="item.history" :userip="props.userip"/>
      <WebTermDisplay :display="item.display"/>
      <hr v-if="index != 0"/>
    </template>
  </div>
</template>
