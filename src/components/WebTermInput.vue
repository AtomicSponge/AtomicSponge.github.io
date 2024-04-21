<!--
  atomicsponge.website
  Copyright (c) 2024 Matthew Evans - See LICENSE.md
-->

<script setup lang="ts">
import WebTermInfo from './WebTermInfo.vue'

const props = defineProps<{ userip:string }>()
const userInput = defineModel()  //  Store input from form
const emit = defineEmits([ 'user-input' ])

userInput.value = ''
var infoKey:number = 0          //  Key for forcing info display update
var history:Array<string> = []  //  Array of previously ran commands
var historyIndex:number = -1    //  Index for browsing previous commands

/**
 * Run when the input form is submitted
 * @param event 
 */
const submit = () => {
  if (!userInput.value) return  //  no input, don't process
  //  add the entered command to the start of the history
  history.unshift(<string>userInput.value)
  //  only keep the most recent entered commands
  if(history.length > 20) history = history.slice(0, 19)
  historyIndex = -1  //  reset history index
  infoKey += 1  //  force update info display
  if(infoKey === Number.MAX_SAFE_INTEGER) infoKey = 0
  emit('user-input', userInput.value)  //  send the input
  userInput.value = ''  //  reset user input
}

/**
 * Up arrow event to cycle input history
 */
const historyUp = () => {
  if(history.length > 0) {  //  Make sure there's history
    //  Iterate only if we're not at the end
    if(historyIndex < history.length - 1) {
      historyIndex += 1
      userInput.value = history[historyIndex]
    }
  }
}

/**
 * Down arrow event to cycle input history
 */
const historyDown = () => {
  //  Iterate only if we're not at the start
  if(historyIndex > 0) {
    historyIndex -= 1
    userInput.value = history[historyIndex]
  } else {
    //  Otherwise clear history
    historyIndex = -1
    userInput.value = ''
  }
}
</script>

<template>
  <div id="terminal-input">
    <WebTermInfo :key="infoKey" :userip="props.userip"/>
    <span id="input-area">
      <span class="prompt">$</span>&nbsp;
      <form @submit.prevent="submit">
      <input type="text" name="input-box" v-model="userInput" @keyup.up="historyUp" @keyup.down="historyDown" autofocus/>
      </form>
    </span>
  </div>
</template>

<style lang="stylus" scoped>
@import '../style.styl'

#terminal-input
  //termstyle()
  display flex
  flex-direction column

#input-area
  //termstyle()
  display flex
  flex-direction row

.prompt
  prompt()

input[type=text]
  termstyle()
  width 97vw
  border 0 none
  padding 0px
  outline none
  caret-color term_cr_color
</style>
