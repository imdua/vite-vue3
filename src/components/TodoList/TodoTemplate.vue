<script setup>
import { ref, watch, reactive } from 'vue'
import TodoInsert from './TodoInsert.vue'
import TodoList from './TodoList.vue'
// import TodoEdit from "./TodoEdit.vue";
import './TodoTemplate.scss'

const todos = reactive([
  { id: 1, text: '리액트 기초 알아보기', checked: true },
  { id: 2, text: '컴포넌트 스타일링 하기', checked: false },
  { id: 3, text: '투두 리스트 만들기', checked: false },
])
const nextId = ref(4)
const onInsert = (val) => {
  todos.push({ id: nextId, text: val, checked: false })
  nextId.value++
}
watch(todos, (newVal, oldVal) => {
  console.log(newVal, oldVal)
})
// watch([nextId, todos], ([newNextId, newTodos]) => {
//   console.log(newNextId)
//   console.log(newTodos)
// })
</script>

<template>
  <div class="TodoTemplate">
    <div class="app-title">일정관리 (vite)</div>
    <div class="content">
      <TodoInsert @insert="onInsert" />
      <TodoList :todos="todos" />
      <!-- onToggle="{onToggle}"
    onRemove="{onRemove}"
    onChangeSelectedTodo="{onChangeSelectedTodo}"
    onInsertToggle="{onInsertToggle}" -->
      <!-- <TodoEdit
    v-if="insertToggle"
    selectedTodo="{selectedTodo}"
    onInsertToggle="{onInsertToggle}"
    insertToggle="{insertToggle}"
    onUpdate="{onUpdate}"
  /> -->
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
