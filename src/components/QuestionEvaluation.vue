
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

const tickLabelsChoices = ref({
  0: 'Terrible',
  1: 'Confused',
  2: 'Tolerable',
  3: 'Suitable',
  4: 'Ideal',
})

const acceptabilityTooltip = ref('Tick the checkbox if you judge the question as acceptable, satisfactory, tolerable for self-studying on this paragraph.')

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
              <v-badge dot color="success">
                <v-chip
                  label
                  outlined
                  color="success"
                  :style="{ 'width': '120px'}"
                > Acceptability
                </v-chip>
              </v-badge>
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
            <v-chip label link outlined color="error" :style="{ 'width': '120px'}"> Relevance </v-chip>
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
            <v-chip label link outlined color="primary" :style="{ 'width': '120px'}"> Difficulty </v-chip>
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
            <v-chip label link outlined color="info" :style="{ 'width': '120px'}"> Choices </v-chip>
          </div>
          <div class="flex-grow-1" >
            <v-slider
              v-model="questionEvaluation.choices_quality"
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
      <span class="mx-3">
          <v-btn class="my-3" @click="sendEvaluation"> Send </v-btn>
      </span>
  </div>
</template>
