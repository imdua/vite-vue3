<script setup>
import { ref } from 'vue'

const menuList = ref([
  { title: 'TO DO LIST', name: 'todolist' },
  { title: 'Yes No !', name: 'yesno' },
])
</script>

<template>
  <div class="app-header">
    <div
      class="logo-area"
      @click="$router.push({ name: 'home' })"
    >
      <img
        src="/favicon.ico"
        alt=""
      >
      <span>HOME</span>
    </div>
    <ul>
      <li
        v-for="(list, idx) in menuList"
        :key="idx"
      >
        <router-link :to="{ name: list.name }">
          {{ list.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.app-header {
  box-shadow: 5px 0px 20px #dee2e6;
  .logo-area {
    display: grid;
    justify-content: space-evenly;
    justify-items: center;
    align-content: space-evenly;
    padding: 10px 0;
    cursor: pointer;
  }
  ul {
    list-style: none;
    margin: 20px 0 0 0;
    li {
      margin-bottom: 20px;
    }
  }
}
</style>
