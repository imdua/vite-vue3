<script setup>
import { ref } from "vue";
import "./TodoListItem.scss";

const props = defineProps({
  todo: {
    type: Object,
    default: () => {},
  },
});
const text = ref(props.todo.text);
const onToggle = (id) => {
  console.log(id);
};
</script>

<template>
  <div class="TodoListItem-virtualized">
    <li class="TodoListItem">
      <div
        :class="['checkbox', { checked: todo.checked }]"
        @click="onToggle(todo.id)"
      >
        <input type="checkbox" :checked="todo.checked" />
        <div class="text">{{ text }}</div>
      </div>
      <div
        class="edit"
        @click="
          () => {
            onChangeSelectedTodo(todo);
            onInsertToggle();
          }
        "
      >
        <font-awesome-icon :icon="['fas', 'pen']" />
      </div>
      <div class="remove" @click="() => onRemove(id)">
        <font-awesome-icon :icon="['fas', 'circle-minus']" />
      </div>
    </li>
  </div>
</template>
