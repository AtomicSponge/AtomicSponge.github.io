<!--
  atomicsponge.website
  By:  Matthew Evans
  See LICENSE.md
-->

<script setup lang="ts">
import { ref, onBeforeMount, nextTick } from 'vue'

import WebTermOutput from './components/WebTermOutput.vue'
import WebTermInput from './components/WebTermInput.vue'

import { TermProcessor } from './modules/TermProcessor.js'

const history = ref('')
const display = ref('')
const userIP = ref('127.0.0.1')

/**
 * Get data from input component
 * @param cmd 
 */
const processInput = (cmd:string) => {
  const displayData = resolveCommand(cmd)
  history.value = cmd
  display.value = displayData
  nextTick(() => { 
    window.scrollTo(0, document.body.scrollHeight)
  })
}

/**
 * Process the received command
 * @param cmd 
 * @returns 
 */
const resolveCommand = (cmd:string) => {
  const cmdArr:Array<string> = cmd.split(' ')
  if(String(cmdArr[0]).toLowerCase() === 'clear') return 'clear'  //  Special case for clearing console
  return TermProcessor.processCommand(cmdArr)
}

//  Set vue before mount
onBeforeMount(async () => {
  //  Get user IP address
  const res = await (async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json')
      return response.json()
    } catch (error) {  //  Catch connection errors
      return { 'ip': '127.0.0.1' }
    }
  })()
  userIP.value = res.ip

  display.value = TermProcessor.processCommand(['motd'])
})
</script>

<template>
  <div id="term-window">
    <WebTermOutput :history="history" :display="display" :userip="userIP"/>
    <WebTermInput @user-input="processInput" :userip="userIP"/>
    <span ref="bottom"></span>
  </div>
</template>
