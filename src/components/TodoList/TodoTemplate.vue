<script setup>
import { ref } from 'vue'
import TodoInsert from './TodoInsert.vue'
import TodoList from './TodoList.vue'
import TodoEdit from './TodoEdit.vue'
import './TodoTemplate.scss'

/**
 * reactive()는 ref()와 다르게 원시타입을 사용할 수 없다.
 * 즉, object, array만 사용 가능하다.
 * reactive 안에는 함수도 집어넣을 수 있다.
 */
const todos = ref([
  { id: 1, text: '리액트 기초 알아보기', checked: true },
  { id: 2, text: '컴포넌트 스타일링 하기', checked: false },
  { id: 3, text: '투두 리스트 만들기', checked: false },
])
/**
 * ref()는 원시타입일 때 주로 사용한다.
 * String, Number, Object 등 어떤 타입이든 사용 가능하다.
 * reactive()에서는 Object 타입만 가능하다. (Object, Array, Map, Set)
 * ref()는 .value를 통해서 접근할 수 있고, reactive()는 붙이지 않아도 그냥 접근 가능하다.
 * object일 경우 ref()는 재할당 하면 반응형을 유지하지만,
 * reactive()는 재할당 하면 반응형을 잃어버린다.
 */
const nextId = ref(4)
const insertToggle = ref(false)
const selectedTodo = ref(null)

const onInsert = (val) => {
  todos.value.push({ id: nextId, text: val, checked: false })
  nextId.value++
}
const findItemIndex = (id) => {
  return todos.value.findIndex((todo) => todo.id === id)
}
const onToggle = (id) => {
  const bool = todos.value[findItemIndex(id)].checked
  todos.value[findItemIndex(id)].checked = !bool
}
const onRemove = (id) => {
  todos.value.splice(findItemIndex(id), 1)
}
const onChangeSelectedTodo = (todo) => {
  selectedTodo.value = todo
  insertToggle.value = true
}
const onUpdate = (param) => {
  todos.value[findItemIndex(param.id)].text = param.val
  insertToggle.value = false
}
</script>

<template>
  <div class="TodoWrapper">
    <div class="todo-template">
      <div class="app-title">일정관리 (vite-vue3)</div>
      <div class="content">
        <TodoInsert @insert="onInsert" />
        <TodoList
          :todos="todos"
          @toggle="onToggle"
          @remove="onRemove"
          @change="onChangeSelectedTodo"
        />
        <TodoEdit
          v-if="insertToggle"
          :selected-todo="selectedTodo"
          @update="onUpdate"
        />
        <!-- on-insert-toggle="{onInsertToggle}"
          insert-toggle="{insertToggle}" -->
      </div>
    </div>
    <div />
  </div>
</template>

<style lang="scss" scoped></style>
