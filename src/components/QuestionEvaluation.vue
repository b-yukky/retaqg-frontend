
<script setup lang="ts">
import router from '@/router'
import { Evaluation } from '@/types'
import api from '@axios'
import { isNullOrUndefined } from '@core/utils/index'


const props = defineProps(['question'])

const openedPanels = ref<number[]>([])
const loading = ref<boolean>(false)
const questionEvaluation = ref<Evaluation>()
const nextQuestionId = ref<number>(0)

const tickLabelsDifficulty = ref({
  0: 'Self-evident',
  1: 'Easy',
  2: 'Medium',
  3: 'Hard',
  4: 'Impossible',
})

const tickLabelsRelevance = ref({
  0: 'Irrelevant',
  1: 'Bad',
  2: 'Tolerable',
  3: 'Good',
  4: 'Very relevant',
})

const tickLabelsFamiliarity = ref({
  0: 'Unfamiliar',
  1: 'Novice',
  2: 'Amateur',
  3: 'Qualified',
  4: 'Expert',
})

const tickLabelsChoices = ref({
  0: 'Terrible',
  1: 'Confused',
  2: 'Tolerable',
  3: 'Suitable',
  4: 'Ideal',
})
const familiarityTooltip = ref('Rate how familiar, knowledgeable and experienced you are with the topic of the context paragraph. High ratings indicate you already possess knowledge on the topic.')
const acceptabilityTooltip = ref('Tick True if you think the question is understandable, coherent and grammatically correct, regardless of its relevance with the context paragraph.')
const relevanceTooltip = ref('Rate how much the question is relevant, suitable, purposeful and appropriate for self-studying on the given paragraph. Low ratings indicate the question is useless, unrelated or not beneficial for the reader. ')
const difficultyTooltip = ref('Rate how difficult the question is to answer after reading the context paragraph, without prior knowledge. Please avoid transposing your current knowledge when judging the difficulty of the question. If the question is only answerable with external knowledge, it is considered as “impossible” difficulty. A question is self-evident if you can answer without reading the context and with a low familiarity with the topic.')
const choicesTooltip = ref('Rate how relevant are the given choices as potential answers. Choices should be each different from each other, and no other choice answer should be correct apart from the real answer highlighted in green. If this is not respected, ratings should be lower than 2 (confused or terrible). An Ideal situation would be if the given choices are all distinct, coherent, understandable and challenging.')

onMounted(() => {
  openedPanels.value = [0]
  loading.value = true
  api.get(`evaluation/question/${props.question.id}`).then( response => {
    loading.value = false
    questionEvaluation.value = response.data
  }).catch(e => { console.log(e); loading.value = false })
})

const sendEvaluation = () => {
  loading.value = true
  api.put(`evaluation/`, questionEvaluation.value).then( response => {
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
        <div class="d-flex ma-3">
          <div class="align-self-center">
            <v-tooltip :text="familiarityTooltip">
              <template v-slot:activator="{ props }">
                <v-chip v-bind="props" label link outlined color="warning" :style="{ 'width': '120px'}"> Familiarity </v-chip>
              </template>
            </v-tooltip>
          </div>
          <div class="flex-grow-1">
            <v-slider
              v-model="questionEvaluation.familiarity"
              :ticks="tickLabelsFamiliarity"
              :max="4"
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
              :max="4"
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
              :max="4"
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
              :max="4"
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
          > Next
          </v-btn>
      </div>
  </div>
</template>
