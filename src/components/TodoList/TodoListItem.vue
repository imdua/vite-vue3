<script setup>
import './TodoListItem.scss'

/**
 * defineProps와 defineEmits는 script setup 내에서만 사용할 수 있으며,
 * import 할 필요 없이 script setup이 처리될 때 컴파일 된다.
 */
defineProps({
  todo: {
    type: Object,
    default: () => { },
  },
})
const emit = defineEmits(['toggle', 'change', 'remove'])

const onToggle = (id) => {
  emit('toggle', id)
}
const onRemove = (id) => {
  emit('remove', id)
}
const onChangeSelectedTodo = (todo) => {
  emit('change', todo)
}
</script>

<template>
  <div class="TodoListItem-virtualized">
    <li class="TodoListItem">
      <div
        :class="['checkbox', { checked: todo.checked }]"
        @click="onToggle(todo.id)"
      >
        <input
          type="checkbox"
          :checked="todo.checked"
        >
        <div class="text">
          {{ todo.text }}
        </div>
      </div>
      <div
        class="edit"
        @click="() => {
          onChangeSelectedTodo(todo)
          onInsertToggle()
        }"
      >
        <FontAwesomeIcon :icon="['fas', 'pen']" />
      </div>
      <div
        class="remove"
        @click="() => onRemove(todo.id)"
      >
        <FontAwesomeIcon :icon="['fas', 'circle-minus']" />
      </div>
    </li>
  </div>
</template>
