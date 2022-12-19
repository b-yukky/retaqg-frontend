<script setup lang="ts">
import QuestionEvaluation from '@/components/QuestionEvaluation.vue'
import QuestionsPanels from '@/components/QuestionsPanels.vue'

import axios from '@axios'
import { isEmpty } from '@core/utils/index'
import { useRoute } from 'vue-router'

const route = useRoute()
const question = ref()
const loading = ref(false)

const getQuestionToEvaluate = () => {
  loading.value = true

  axios.get(`question/detail/${route.params.id}`).then(response => {
    question.value = response.data
    loading.value = false
  })
}

const getTextAreaRowsNumber = computed(() => {
  if (question.value.paragraph)
    return Math.floor(question.value.paragraph.length / 100)
})

onMounted(() => {
  getQuestionToEvaluate()
})

</script>

<template>
  <div class="d-flex">
    <div class="flex-grow-1">
      <v-row>
        <v-col cols="12">
          <VCard 
            class="mb-6"
            title="Context Paragraph 📄"
            fluid
            >
            <v-progress-linear
                :active="loading"
                indeterminate
                color="primary"
            ></v-progress-linear>
            <v-textarea
              v-if="question"
              readonly
              :value="question.paragraph.text"
              class="mx-3 mb-3"
              :rows="getTextAreaRowsNumber"
            >
            </v-textarea>
          </VCard>
        </v-col>

        <v-col cols="12">
          <VCard 
            class="mb-6"
            title="Question ❓"
            fluid
          >
          <QuestionsPanels v-if="!isEmpty(question)" :questions="[question]"></QuestionsPanels>

          </VCard>
        </v-col>

        <v-col cols="12">
          <VCard 
            class="mb-6"
            title="Evaluation ✍️"
            fluid
          >
          <QuestionEvaluation v-if="!isEmpty(question)" :question="question"></QuestionEvaluation>

          </VCard>
        </v-col>

      </v-row>
    </div>

    <div>
      <VCard 
        class="mx-4 mb-6"
        title="Statistics ✨"
        fluid
        width="300"
        height="500"
      >
      </VCard>
    </div>
    
  </div>
</template>

<route lang="yaml">
  meta:
    layout: evaluation
  </route>
