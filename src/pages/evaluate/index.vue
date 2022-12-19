<script setup lang="ts">
import router from '@/router'
import axios from '@axios'

const loading = ref<boolean>(false)

const startEvaluation = () => {
  loading.value = true
  axios.get('question/evaluation/select/').then(response => {
    loading.value = false
    router.push({path: `/evaluate/${response.data.id}`})
  }).catch(e => { console.log(e) })
}

</script>

<template>
  <div class="d-flex justify-md-center">
    <VCard
      width="60%"
      title="Evaluate questions"
    >

      <v-card-text>
        Some questions will be presented to you.

      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
      <VBtn
        outlined
        tile
        x-large
        @click="startEvaluation"
        >
      Start
      <v-icon x-large>mdi-play</v-icon>
      </VBtn>
      </v-card-actions>

    </VCard>
  </div>
</template>



<route lang="yaml">
  meta:
    layout: evaluation
  </route>
