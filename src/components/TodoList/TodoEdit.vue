<template>
  <div class="background">
    <form
      :onSubmit="onSubmit"
      class="todoedit__insert"
    >
      <h2>수정하기</h2>
      <input
        v-model="txtVal"
        type="text"
        placeholder="할 일을 입력하세요."
      />
      <button type="submit">수정하기</button>
    </form>
  </div>
</template>

<script setup>
import './TodoEdit.scss'
import {
  ref, onMounted,
  // watch
} from 'vue'

const props = defineProps({
  selectedTodo: {
    type: Object,
    default: () => { },
  },
})
const emit = defineEmits(['update'])
const txtVal = ref('')

const onSubmit = (e) => {
  emit('update', {
    id: props.selectedTodo.id,
    val: txtVal.value
  })
  e.preventDefault()
}

onMounted(() => {
  txtVal.value = props.selectedTodo.text
})
// watch(txtVal, (newVal) => {
//   console.log(newVal)
// })
</script>

<style lang="scss" scoped></style>

