<script setup>
import { ref } from 'vue'
import TodoTemplate from './TodoTemplate.vue'
import TodoInsert from './TodoInsert.vue'
import TodoList from './TodoList.vue'
// import TodoEdit from "./TodoEdit.vue";

const todos = ref([
  { id: 1, text: '리액트 기초 알아보기', checked: true },
  { id: 2, text: '컴포넌트 스타일링 하기', checked: false },
  { id: 3, text: '투두 리스트 만들기', checked: false },
])
const onInsert = (val) => {
  console.log(val)
}
</script>

<template>
  <div class="TodoTop">
    <TodoTemplate>
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
    </TodoTemplate>
  </div>
</template>

<style lang="scss" scoped>
.TodoTop {
  width: 100%;
  height: 100%;
}
</style>
