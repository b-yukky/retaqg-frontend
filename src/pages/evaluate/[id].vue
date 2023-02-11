<script setup lang="ts">
import EvaluationSatistics from '@/components/EvaluationStatistics.vue'
import QuestionEvaluation from '@/components/QuestionEvaluation.vue'
import QuestionsPanels from '@/components/QuestionsPanels.vue'
import router from '@/router'
import axios from '@axios'
import { isEmpty } from '@core/utils/index'
import { useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'
import { useContextStore } from '@/stores/context'

const route = useRoute()
const question = ref()
const loading = ref(false)

const autoConfidence = ref(0)

const { mobile } = useDisplay()

const contextStore = useContextStore()


const getQuestionToEvaluate = () => {
  loading.value = true

  axios.get(`question/detail/${route.params.id}`).then(response => {
    question.value = response.data
    loading.value = false
    //  check if the paragraph is the same as the last one
    if (contextStore.getLastContext() == question.value.paragraph.text) {
      autoConfidence.value = contextStore.getLastConfidence()
    } else {
      autoConfidence.value = 0
    }
    contextStore.setLastContext(question.value.paragraph.text)
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
      <VRow>
        <VCol cols="12">
          <VCard 
            fluid
            >
            <v-card-title class="d-flex justify-space-between" >
              <span>Context Paragraph 📄</span>
              <v-chip v-if="question" color="error">{{ question.paragraph.topic ? question.paragraph.topic.name : 'Unknown'  }}</v-chip>
            </v-card-title>
            <VProgressLinear
                :active="loading"
                indeterminate
                color="primary"
            ></VProgressLinear>
            <VTextarea
              v-if="question"
              readonly
              :value="question.paragraph.text"
              class="mx-3 mb-3"
              :rows="getTextAreaRowsNumber"
            >
            </VTextarea>
          </VCard>
        </VCol>

        <VCol cols="12">
          <VCard 
            title="Question ❓"
            fluid
          >
          <QuestionsPanels v-if="!isEmpty(question)" :questions="[question]" :evalmode="true"></QuestionsPanels>

          </VCard>
        </VCol>

        <VCol cols="12">
          <VCard 
            title="Evaluation ✍️"
            fluid
          >
          <QuestionEvaluation v-if="!isEmpty(question)" :question="question" :confidence="autoConfidence"></QuestionEvaluation>

          </VCard>
        </VCol>
        <VCol v-if="mobile" cols="12">
          <EvaluationSatistics></EvaluationSatistics>
        </VCol>
      </VRow>
    </div>

    <div v-if="!mobile" class="ml-5">
      <EvaluationSatistics></EvaluationSatistics>
    </div>
    
  </div>
</template>

<route lang="yaml">
  meta:
    layout: evaluation
    name: evaluate
</route>
