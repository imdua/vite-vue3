<script setup>
import Header from './components/HeaderMain.vue'
</script>
<template>
  <div class="app-container">
    <Header />
    <div class="app-main">
      <router-view />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.app-container {
  display: grid;
  grid-template-columns: 1fr 7fr;
  // grid-gap: 20px;
  height: 100vh;
}
</style>
