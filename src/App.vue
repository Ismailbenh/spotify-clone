<script setup lang="ts">
import "@/assets/styles/base.css"
import upperBar from '@/components/upperBar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <upperBar />
    <RouterView />
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
}
</style>