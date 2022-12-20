
<script setup lang="ts">
import type { EvaluationStats } from '@/types'
import api from '@axios'

const stats = ref<EvaluationStats>()

const progress = computed(() => {
  if (stats.value !== undefined)
    return Math.ceil(
      (stats.value.questions_completed / 
      (stats.value.questions_completed + stats.value.questions_remaining))*100
    )
  else return 0
})

onMounted(() => {
  api.get('evaluation/stats/').then((response) => {
    stats.value = response.data
  }).catch(e => { console.log(e) })
})

</script>

<template>
  <div>
    <VCard 
        title="Statistics ✨"
        fluid
        width="300"
      >
      <v-card-text>
        <v-row>
          <v-col cols="5" class="pb-0">
            Completed:
          </v-col>
          <v-col cols="7" class="pb-0">
            <strong>{{  stats?.questions_completed }}</strong>
          </v-col>
          <v-col cols="5">
            Remaining:
          </v-col>
          <v-col cols="7">
            <strong> {{ stats?.questions_remaining }}</strong>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <span class="pr-3"> Progress </span>
        <v-progress-linear
          v-model="progress"
          color="on-success"
          height="16"
          striped
          class="mt-1"
          >
          <span class="text-overline"> {{ Math.ceil(progress) }}% </span>
        </v-progress-linear>
      </v-card-actions>

    </VCard>
  </div>
</template>

<style scoped>
.green {
  color: #4caf50;
}
</style>
