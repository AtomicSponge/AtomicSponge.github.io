<!--
  atomicsponge.website
  By:  Matthew Evans
  See LICENSE.md
-->

<script setup lang="ts">
const props = defineProps<{
  userip:string
}>()

/**
 * Get the current time (HH:MM:SS)
 * @returns Current time formatted as a string
 */
const currentTime = ():string => {
  return new Date().toLocaleTimeString(navigator.language, {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}
</script>

<template>
  <div class="term-info">
    <span class="time">{{ currentTime() }}</span>
    <span class="user">{{ props.userip }}</span>
    <span class="site">
      <a href="https://www.wtfsystems.net" style="color: inherit; text-decoration: none;">www.wtfsystems.net</a>
    </span>
  </div>
</template>

<style lang="stylus" scoped>
@import '../style.styl'

.term-info
  display inline
  margin-bottom 6px

.time
  infobar(time_bg_color, time_fg_color)

.user
  infobar(user_bg_color, user_fg_color)

.site
  infobar(site_bg_color, site_fg_color)
</style>
