<script setup lang="ts">
import router from '@/router'
import { isUserLoggedIn } from '@/router/utils'
import { useAuthStore } from '@/stores/auth'
import api from '@axios'

const loading = ref<boolean>(false)

const noEvaluationsMessage = ref(false)
const authStore = useAuthStore()

const startEvaluation = () => {
  loading.value = true
  if (isUserLoggedIn()) {
    api.get('question/evaluation/select/').then(response => {
      loading.value = false
      if (response.status == 200) {
        if (response.data.id) {
          router.replace({path: `/evaluate/${response.data.id}`})
        } else
          router.replace({path: '/evaluate/add-questions'})
      } else {
        noEvaluationsMessage.value = true
      }
  }).catch(e => { loading.value = false })
  } else {
    router.replace({path: '/login'})
  }
}

</script>

<template>
  <div class="d-flex justify-md-center">
    <v-row class="pa-0">
      <v-col cols="12" class="pa-0">
        <VCard
          title="Evaluate questions"
        >

          <v-card-text>
            <v-alert
          title="Information"
          variant="tonal"
          color="info"
        >
          <div>
            <p class="text-subtitle-1 text-high-emphasis mb-0">
            This research study aims at evaluating the performance of AI-generated questions on some reading material for self-practice learning.<br>
            In this experiment, you will have to evaluate a set of AI-generated questions on different text paragraphs.<br>
            <br>
            You will first need to read the given context paragraph, and then rate the question by the following metrics:
            </p>
          </div>
          <v-list lines="false" bg-color="#16b1ff00">
              <v-list-item title="Familiarity" color="warning">
              <v-list-item-subtitle>
                Rate how familiar, knowledgeable and experienced you are with the topic of the context paragraph. High ratings indicate you already possess knowledge on the topic.
              </v-list-item-subtitle>
              </v-list-item>
              <v-list-item title="Acceptability">
                <v-list-item-subtitle>
                  Tick True if you think the question is understandable, coherent and grammatically correct, regardless of its relevance with the context paragraph.
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item title="Relevance">
                <v-list-item-subtitle>
                  Rate how much the question is relevant, suitable, purposeful and appropriate for self-practice on the given paragraph.<br> Low ratings indicate the question is useless, unrelated or not beneficial for the reader. 
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item title="Difficulty">
                <v-list-item-subtitle>
                  Rate how difficult the question is to answer after reading the context paragraph, without prior knowledge. Please avoid using your previous knowledge when judging the difficulty of the question. If the question is only answerable with external knowledge, it is considered as “impossible” difficulty. A question is self-evident if you can answer without reading the context and with a low familiarity with the topic.
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item title="Choices">
                <v-list-item-subtitle>
                  Rate how relevant are the given choices as potential answers. Choices should be each different from each other, and no other choice answer should be correct apart from the real answer highlighted in green. If this is not respected, ratings should be lower than 2 (confused or terrible). An Ideal situation would be if the given choices are all distinct, coherent, understandable and challenging.
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          <v-divider class="my-4 bg-light-blue-lighten-4"></v-divider>

          <div class="d-flex flex-row align-center justify-space-between">
            <div>
              You can stop and come back whenever you want to resume the evaluations.
            </div>

            <v-btn
              color="info"
              variant="outlined"
              @click="startEvaluation"
            >
              Start
            </v-btn>
          </div>
        </v-alert>

          </v-card-text>


          <v-card-actions>
            <v-alert 
              v-if="noEvaluationsMessage" 
              type="success" 
              density="compact"
            > No questions to evaluate yet.
            </v-alert>
          </v-card-actions>

          <v-progress-linear
            :active="loading"
            indeterminate
            color="primary"
          ></v-progress-linear>

        </VCard>
      </v-col>
    </v-row>
  </div>
</template>

<route lang="yaml">
  meta:
    layout: evaluation
    name: evaluate
</route>
