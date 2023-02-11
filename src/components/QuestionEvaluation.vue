
<script setup lang="ts">
import router from '@/router'
import { Evaluation } from '@/types'
import api from '@axios'
import { isNullOrUndefined } from '@core/utils/index'
import { useContextStore } from '@/stores/context'

const props = defineProps(['question', 'confidence'])
const contextStore = useContextStore()

const openedPanels = ref<number[]>([])
const loading = ref<boolean>(false)
const questionEvaluation = ref<Evaluation>()
const nextQuestionId = ref<number>(0)

const tickLabelsDifficulty = ref({ 0: 'Self-evident', 1: '', 2: 'Easy', 3: '', 4: 'Medium', 5: '', 6: 'Hard', 7: '', 8: 'Impossible' })
const tickLabelsRelevance = ref({ 0: 'Irrelevant', 1: '', 2: 'Bad', 3: '', 4: 'Tolerable', 5: '', 6: 'Good', 7: '', 8: 'Very relevant' })
const tickLabelsConfidence = ref({ 0: 'Obscure', 1: '', 2: 'Uncertain', 3: '', 4: 'Understandable', 5: '', 6: 'Clear', 7: '', 8: 'Very confident'})
const tickLabelsChoices = ref({ 0: 'Terrible', 1: '', 2: 'Confused', 3: '', 4: 'Tolerable', 5: '', 6: 'Suitable', 7: '', 8: 'Ideal' })

const confidenceTooltip = ref("Rate how confident you are in your understanding of the context paragraph. If you don\'t understand the context well-enough, it may be harder to evaluate the quality of the question. High ratings indicate you sufficiently understood the text so you are confident in your evaluation.")
const acceptabilityTooltip = ref('Tick True if you think the question is understandable, coherent and grammatically correct, regardless of its relevance with the context paragraph. A question that is not grammatically sound, confusing, or unclear to read is considered unacceptable.')
const relevanceTooltip = ref('Rate how much the question is relevant, suitable, purposeful and appropriate for self-studying on the given paragraph. Low ratings indicate the question is useless, unrelated or not beneficial for the reader. High ratings indicate the question is the right one to ask.')
const difficultyTooltip = ref('Rate the difficulty of the question after reading the given context, without relying on any prior knowledge. If the answer to the question requires knowledge not found within the given text, it is deemed to be of an "impossible" difficulty level. A question is "self-evident" if individuals can discern the answer without requiring any prior knowledge on the topic.')
const choicesTooltip = ref('Rate how relevant are the given choices as potential answers. Choices should be distinct from one another, and the only correct response should be the one indicated in green. If this is not respected, ratings should be lower than 2 (confused or terrible). An Ideal situation would be if the given choices are all distinct, coherent, understandable and challenging.')

onMounted(() => {
  openedPanels.value = [0]
  loading.value = true
  api.get(`evaluation/question/${props.question.id}`).then( response => {
    loading.value = false
    if (response.data.confidence == 0)
      response.data.confidence = props.confidence
    if (!response.data.acceptability)
      response.data.acceptability = undefined
    questionEvaluation.value = response.data
  }).catch(e => {
    if (e.response.status == 403) {
      router.replace({path: '/pretest/english/'})
    }
    console.log(e); 
    loading.value = false 
  })
})

const sendEvaluation = () => {
  loading.value = true
  api.put(`evaluation/`, questionEvaluation.value).then( response => {
    loading.value = false
    if (response.status == 200) {
      if (questionEvaluation.value != undefined)
        contextStore.setLastConfidence(questionEvaluation.value.confidence)
      if (response.data.id) {
        nextQuestionId.value = response.data.id
        router.replace({path: `/evaluate/${nextQuestionId.value}`})
      } else
        router.replace({path: '/evaluate/add-questions'})
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
        <div class="d-flex ma-3">
          <div class="align-self-center">
            <v-tooltip :text="confidenceTooltip">
              <template v-slot:activator="{ props }">
                <v-chip v-bind="props" label link outlined color="warning" :style="{ 'width': '120px'}"> Confidence </v-chip>
              </template>
            </v-tooltip>
          </div>
          <div class="flex-grow-1">
            <v-slider
              v-model="questionEvaluation.confidence"
              :ticks="tickLabelsConfidence"
              :max="8"
              step="1"
              show-ticks="always"
              tick-size="4"
              class="px-5"
              color="warning"
            >
            </v-slider>
          </div>
        </div>
        <div class="d-flex ma-3">
          <div class="align-self-center">
            <v-tooltip :text="acceptabilityTooltip">
              <template v-slot:activator="{ props }">
                <v-chip
                  v-bind="props"
                  label
                  outlined
                  color="success"
                  :style="{ 'width': '120px'}"
                > Acceptability
                </v-chip>
              </template>
            </v-tooltip>

            </div>
            <div>
              <v-radio-group class="ml-5" inline v-model="questionEvaluation.acceptability" >
                <v-radio :value="false" color="error">
                  <template v-slot:label>
                    <span><strong class="text-red"> Not acceptable </strong></span>
                  </template>
                </v-radio>
                <v-radio :value="true" color="success">
                  <template v-slot:label>
                    <span><strong> Acceptable </strong></span>
                  </template>
                </v-radio>
              </v-radio-group>
            </div>
        </div>
        <div class="d-flex ma-3">
          <div class="align-self-center">
            <v-tooltip :text="relevanceTooltip">
              <template v-slot:activator="{ props }">
                <v-chip v-bind="props" label link outlined color="error" :style="{ 'width': '120px'}"> Relevance </v-chip>
              </template>
            </v-tooltip>
          </div>
          <div class="flex-grow-1">
            <v-slider
              v-model="questionEvaluation.relevance"
              :ticks="tickLabelsRelevance"
              :max="8"
              step="1"
              show-ticks="always"
              tick-size="4"
              class="px-5"
              color="error"
            >
            </v-slider>
          </div>
        </div>

        <div class="d-flex ma-3">
          <div class="align-self-center">
            <v-tooltip :text="difficultyTooltip">
              <template v-slot:activator="{ props }">
                <v-chip v-bind="props" label link outlined color="primary" :style="{ 'width': '120px'}"> Difficulty </v-chip>
              </template>
            </v-tooltip>
          </div>
          <div class="flex-grow-1" >
            <v-slider
              v-model="questionEvaluation.difficulty"
              :ticks="tickLabelsDifficulty"
              :max="8"
              step="1"
              show-ticks="always"
              tick-size="4"
              class="px-5"
              color="primary"
            >
            </v-slider>
          </div>
        </div>

        <div class="d-flex ma-3">
          <div class="align-self-center">
            <v-tooltip :text="choicesTooltip">
              <template v-slot:activator="{ props }">
                <v-chip v-bind="props" label link outlined color="info" :style="{ 'width': '120px'}"> Choices </v-chip>
              </template>
            </v-tooltip>
          </div>
          <div class="flex-grow-1" >
            <v-slider
              v-model="questionEvaluation.choices"
              :ticks="tickLabelsChoices"
              :max="8"
              step="1"
              show-ticks="always"
              tick-size="4"
              class="px-5"
              color="info"
            >
            </v-slider>
          </div>
        </div>

      </div>
      <div class="ma-3" :style="{ 'text-align': 'right'}">
          <v-btn 
            class="my-3" 
            @click="sendEvaluation"
            append-icon="mdi-skip-next"
            size="large"
            color="primary"
            :style="{ 'width': '200px'}"
            :disabled="loading || isNullOrUndefined(questionEvaluation?.acceptability)"
          > Next
          </v-btn>
      </div>
  </div>
</template>
