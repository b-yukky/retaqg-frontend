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
        router.replace({path: `/evaluate/${response.data.id}`})
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
    <VCard
      width="60%"
      title="Evaluate questions"
    >

      <v-card-text>
        <v-alert
      color="info"
      title="Information"
      variant="tonal"
    >
      <div>
        You will be asked to evaluate some questions.
      </div>

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
  </div>
</template>

<route lang="yaml">
  meta:
    layout: evaluation
    name: evaluate
</route>
