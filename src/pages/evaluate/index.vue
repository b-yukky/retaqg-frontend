<script setup lang="ts">
import router from '@/router'
import { isUserLoggedIn } from '@/router/utils'
import { useAuthStore } from '@/stores/auth'
import api from '@axios'

const loading = ref<boolean>(false)

const noEvaluationsMessage = ref(false)
const maxQuestions = ref(0)
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
  }).catch(e => { loading.value = false; router.replace({path: '/pretest/english'}) })
  } else {
    router.replace({path: '/login'})
  }
}

onMounted(() => {
  api.get('experiment/settings/active/').then(response => {
    console.log(response.data)
    maxQuestions.value = response.data.max_questions_per_subject
  })
})

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
            This research study aims at evaluating the performance and quality of AI-generated questions on reading material for self-practice learning.<br>
            In this experiment, you will have to evaluate a set of AI-generated questions on different text paragraphs.<br>
            For each question, there are multiple choices that are generated. The supposedly correct answer, determined by the AI, is colored in green.
            <br>
            You will first need to <strong>read carefully</strong> the given context paragraph, and then rate the associated question by the following metrics:
            </p>
          </div>
          <v-list lines="false" bg-color="#16b1ff00">
              <v-list-item title="Self-Confidence" color="warning">
              <v-list-item-subtitle>
                Rate how confident you are in your understanding of the context paragraph. If you don't understand the context well-enough, it may be harder to evaluate the quality of the question. High ratings indicate you sufficiently understood the text so you are confident in your evaluation.
              </v-list-item-subtitle>
              </v-list-item>
              <v-list-item title="Acceptability">
                <v-list-item-subtitle>
                  Mark as "True" if you think the question is understandable, coherent and grammatically correct, regardless of its relevance to the context paragraph.
                  A question that is not grammatically sound, confusing, or unclear to read is considered unacceptable.
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item title="Relevance">
                <v-list-item-subtitle>
                  Rate how much the question is relevant, suitable, purposeful and appropriate for self-practice on the given paragraph.<br> Low ratings indicate the question is useless, unrelated or not beneficial for the reader. High ratings indicate the question is the right one to ask.
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item title="Difficulty">
                <v-list-item-subtitle>
                  Rate the difficulty of the question after reading the given context, without relying on any prior knowledge. If the answer to the question requires knowledge not found within the given text, it is deemed to be of an "impossible" difficulty level.
                  A question is "self-evident" if individuals can discern the answer without reading the text and without any knowledge on the topic. 
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item title="Choices">
                <v-list-item-subtitle>
                  Rate how relevant are the proposed choices. Choices should be distinct from one another, and the only correct answer should be the one indicated in green. If this is not respected, ratings should be lower than 4 (confused or terrible). An Ideal situation would be if the given choices are all distinct, coherent, understandable and challenging. <br>
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
            <div>
              <p class="text-subtitle-1 text-high-emphasis">You may encounter the same paragraph repeatedly in sequence, each time with a different question (but possibly similar) for you to evaluate. </p>
            </div>
          <v-divider class="my-4 bg-light-blue-lighten-4"></v-divider>

          <div class="d-flex flex-row align-center justify-space-between">
            <div>
              <!-- <p>Estimated time: <v-chip v-if="maxQuestions">~{{ 1.5*maxQuestions }}-{{ 3*maxQuestions }}min</v-chip> (depending on your english proficiency) </p> -->

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
