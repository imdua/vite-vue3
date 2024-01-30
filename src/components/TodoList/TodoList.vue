<script setup>
import TodoListItem from './TodoListItem.vue'
import './TodoList.scss'

defineProps(['todos'])
</script>

<template>
  <div class="TodoList">
    <TodoListItem
      v-for="(todo, idx) in todos"
      :key="idx"
      class="todolist-item"
      :todo="todo"
    />
    <!-- onToggle={onToggle}
          onRemove={onRemove}
          onInsertToggle={onInsertToggle}
          onChangeSelectedTodo={onChangeSelectedTodo} -->
  </div>
</template>

<style lang="scss" scoped></style>
