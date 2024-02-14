<script setup>
import {watch} from 'vue'
import TodoListItem from './TodoListItem.vue'
import './TodoList.scss'

const props = defineProps({
  todos: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['toggle', 'remove'])
const onToggle = (id) => {
  emit('toggle', id)
}
const onRemove = (id) => {
  emit('remove', id)
}

watch(props.todos, (newVal, oldVal) => {
  console.log('new', newVal, 'old', oldVal)
})
</script>

<template>
  <div class="TodoList">
    <TodoListItem
      v-for="(todo, idx) in todos"
      :key="idx"
      class="todolist-item"
      :todo="todo"
      @toggle="onToggle"
      @remove="onRemove"
    />
    <!-- onToggle={onToggle}
          onRemove={onRemove}
          onInsertToggle={onInsertToggle}
          onChangeSelectedTodo={onChangeSelectedTodo} -->
  </div>
</template>

<style lang="scss" scoped></style>
