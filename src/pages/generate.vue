<script setup lang="ts">
import QuestionsPanels from '@/components/QuestionsPanels.vue'
import type { Model, Question, Dataset } from '@/types'
import api from '@axios'
import { isEmptyArray } from '@core/utils/index'

const questions = ref<Question[]>([])
const models = ref<Model[]>([])
const selectedModel = ref<any>()
const datasets = ref<Dataset[]>([])
const selectedDataset = ref<any>()

const countGenerations = ref<any>(1)

const inputText = ref<string>('')
const topic = ref<string>('')
const loadingGeneration = ref<boolean>(false)
const startTime = ref<number>(Date.now())
const endTime = ref<number>(Date.now())
const errors = ref<string>('')

const displayTime = ref<number>(Date.now())


const generateMCQ = () => {
  if (inputText.value.length > 100) {
    let timer = setInterval(refreshTime, 10)
    startTime.value = Date.now()
    loadingGeneration.value = true
    console.log('selected model', selectedModel.value)
    api.post('question/generate/v2/', {
      'text': inputText.value,
      'model': selectedModel?.value,
      'count': countGenerations.value,
      'topic': topic.value,
      'dataset': selectedDataset.value
    })
    .then(response => {
      loadingGeneration.value = false
      endTime.value = Date.now()
      clearInterval(timer)
      if (response.status == 200)
        questions.value = response.data
      else
        errors.value = 'This model could not generate any question on this paragraph.'
    }).catch(e => { clearInterval(timer); errorCatch(e) } )
  } else {
    errors.value = 'Please enter at least 100 characters.'
  }
}

const errorCatch = (e: any) => {
  errors.value = e
  loadingGeneration.value = false
}

const resetErrors = () => {
  errors.value = ''
}

const refreshTime = () => {
    displayTime.value =  Math.floor((Date.now() - startTime.value))
}

const executionTime = computed(() => {
  return Math.floor((endTime.value - startTime.value))
})

onMounted(() => {
  api.get('model/list/').then((response) => {
    models.value = response.data
    selectedModel.value = response.data[0].name
  }).catch(e => { console.log(e) })

  api.get('dataset/list/').then((response) => {
    datasets.value = response.data
    selectedDataset.value = response.data[0].name
  }).catch(e => { console.log(e) })
})

</script>

<template>
  <div>
    <v-row >
      <v-col cols="12" md="6" sm="12">
        <v-row>
          <v-col cols="6" >
            <v-card class="mb-3">
              <v-text-field
                label="Topic"
                v-model="topic"
                variant="solo"
              ></v-text-field>
            </v-card>
          </v-col>
          <v-col cols="6" >
            <v-card class="mb-3">
              <v-select
                label="Select dataset"
                :items="datasets"
                v-model="selectedDataset"
                item-title="name"
                item-value="name"
                variant="solo"
              ></v-select>
            </v-card>
          </v-col>
        </v-row>
        <VCard title="Input: Context 🙌" >
          <v-textarea 
            v-model="inputText" 
            :height="500"
            progress
            clearable
            clear-icon="mdi-close"
            counter
            label="Enter text"
            rows="30"
            auto-grow
            class="mb-3 mx-3"
            :loading="loadingGeneration"
          >

          </v-textarea>
        </VCard>
        <v-container class="d-flex flex-column" >
          <v-btn
            fab
            width="100%" 
            @click="generateMCQ" 
            :loading="loadingGeneration"
            :disabled="loadingGeneration"
          > Generate Questions 
          <v-icon class="ml-2" size="large" right>mdi-cog</v-icon>
        </v-btn>
        
          <v-alert 
            v-if="errors"
            type="error"
            class="mt-4" 
            dense
            style="cursor: pointer;"
            @click="resetErrors"
          > {{ errors }}
          </v-alert>
        </v-container>
      </v-col>
      <v-col cols="12" md="6" sm="12">
        <v-row>
          <v-col cols="6" md="6" sm="12">
            <v-card class="mb-3">
              <v-select
                label="Select model"
                :items="models"
                v-model="selectedModel"
                item-title="name"
                item-value="name"
                variant="solo"
              ></v-select>
            </v-card>
          </v-col>
          <v-col cols="6" md="6" sm="12">
            <v-card class="mb-3">
              <v-text-field
                v-model="countGenerations"
                label="Number of questions"
                single-line
                suffix="max questions"
                type="number"
              />
            </v-card>
          </v-col>
        </v-row>
        <VCard title="Output: Questions " min-height="500">
          <div class="d-flex flex-row justify-content-between">
            <div>
            <VCardText v-if="isEmptyArray(questions) && !loadingGeneration">Generated questions will appear here.</VCardText>
            <VCardText v-if="loadingGeneration">Generating questions... Generation may take up to one minute.</VCardText>  
          </div>
          <div class="flex-grow-1">
            <VCardText v-if="loadingGeneration"> Time lapsed: {{ displayTime }}ms </VCardText>
            <VCardText class="text-md-right" width="100%" v-if="!isEmptyArray(questions) && !loadingGeneration"> Execution time: {{ displayTime }}ms </VCardText>
          </div>
          </div>
          <QuestionsPanels v-if="!isEmptyArray(questions)" :questions="questions"></QuestionsPanels>
        </VCard>

      </v-col>

    </v-row>

  </div>
</template>

