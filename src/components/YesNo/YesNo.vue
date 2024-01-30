<script setup>
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('질문에는 일반적으로 물음표가 포함됩니다.')
const imgUrl = ref('')
const loading = ref(false)

watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.indexOf('?') > -1) {
    loading.value = true
    imgUrl.value = ''
    answer.value = '생각중...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      const json = await res.json()
      answer.value = json.answer === 'yes' ? '네' : '아니오'
      imgUrl.value = json.image
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    } finally {
      loading.value = false
    }
    console.log(answer.value, imgUrl.value)
  }
})
</script>

<template>
  <p>
    예/아니오 질문:
    <input v-model="question" :disabled="loading" />
  </p>
  <p>{{ answer }}</p>
  <img
  v-if="imgUrl !== ''"
  :src="imgUrl">
</template>