<!-- 작성예시 1: 빌드방식 사용하지 않을 때 이용 가능. 다소 장황함. -->
<!-- <script>
import "./TodoInsert.scss";
import { ref } from "vue";

export default {
  emits: ["insert"],
  setup(props, { emit }) {
    const todoText = ref("");
    const onInsert = (val) => {
      emit("insert", val);
    };
    const objectOfAttrs = {
      id: "todo-insert",
      class: "TodoInsert",
    };
    return {
      todoText,
      onInsert,
      objectOfAttrs,
    };
  },
};
</script> -->

<!-- 작성예시 2: 싱글 파일 컴포넌트(*.vue) 사용시에 사용 가능. 더 심플해짐.-->
<script setup>
import './TodoInsert.scss'
import { ref } from 'vue'

const todoText = ref('')
const emit = defineEmits(['insert'])
const onInsert = (val) => {
  emit('insert', val)
}
const objectOfAttrs = {
  id: 'todo-insert',
  class: 'TodoInsert',
}
</script>

<template>
  <div v-bind="objectOfAttrs">
    <input type="text" placeholder="할 일을 입력하세요." v-model="todoText" />
    <button type="button" @click="onInsert(todoText)">
      <font-awesome-icon :icon="['fas', 'plus']" />
    </button>
  </div>
</template>
