
<script setup lang="ts">
import router from '@/router'
import { Evaluation } from '@/types'
import api from '@axios'
import { isNullOrUndefined } from '@core/utils/index'


const props = defineProps(['question'])

const openedPanels = ref<number[]>([])
const loading = ref<boolean>(false)
const questionEvaluation = ref<Evaluation>()
const questionEvaluationId = ref<number>(0)
const nextQuestionId = ref<number>(0)

const acceptabilityTooltip = ref('Tick the checkbox if you judge the question as acceptable, satisfactory, tolerable for self-studying on this paragraph.')

onMounted(() => {
  openedPanels.value = [0]
  loading.value = true
  api.get(`evaluation/question/${props.question.id}`).then( response => {
    loading.value = false
    questionEvaluation.value = response.data
    questionEvaluationId.value = response.data.id
  }).catch(e => { console.log(e); loading.value = false })
})

const sendEvaluation = () => {
  loading.value = true
  if (questionEvaluationId.value == null)
    questionEvaluationId.value = 0
  api.put(`evaluation/${questionEvaluationId.value}`, questionEvaluation.value).then( response => {
    loading.value = false
    if (response.status == 200) {
      nextQuestionId.value = response.data.id
      router.replace({path: `/evaluate/${nextQuestionId.value}`})
    } else {
      router.replace({path: '/evaluate'})
    }
  }).catch(e => { loading.value = false })
}

</script>

<template>
  <div>
    <v-progress-linear
        :active="loading"
        indeterminate
        color="primary"
      ></v-progress-linear>
      <div v-if="!isNullOrUndefined(questionEvaluation)" class="d-flex flex-column">
        <span class="ml-3 mb-2"> {{ acceptabilityTooltip }}</span>
        <div class="d-flex mx-3 justify-space-between">
          <div class="d-flex">
            <v-badge dot color="success">
                <v-chip
                  label
                  outlined
                  color="success"
                > Acceptability
                </v-chip>
              </v-badge>
              <div class="ml-3">
                <v-checkbox v-model="questionEvaluation.acceptability" color="success"></v-checkbox>
              </div>
          </div>
        </div>
        
        <div class="d-flex mx-3">
          <div class="align-self-center">
            <v-chip label link outlined color="error" width="200"> Relevance </v-chip>
          </div>
          <div>
            <v-rating
              v-model="questionEvaluation.relevance"
              hover
              length="5"
              color="error"
              size="40"
            >
            </v-rating>
          </div>
        </div>

        <div class="d-flex mx-3">
          <div class="align-self-center">
            <v-chip label link outlined color="primary" width="200"> Difficulty </v-chip>
          </div>
          <div>
            <v-rating
              v-model="questionEvaluation.difficulty"
              hover
              length="5"
              color="primary"
              size="40"
            >
            </v-rating>
          </div>
        </div>

      </div>
      <span class="mx-3">
          <v-btn class="my-3" @click="sendEvaluation"> Send </v-btn>
      </span>
  </div>
</template>
