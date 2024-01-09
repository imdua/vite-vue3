<script setup>
import "./TodoTemplate.scss";
</script>

<template>
  <div class="TodoTemplate">
    <div class="app-title">일정관리</div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
