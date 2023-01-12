<script setup lang="ts">
import api from '@/plugins/axios'

import CreateSubjectUser from '@/components/CreateSubjectUser.vue'
import ExperimentSettingsCard from '@/components/ExperimentSettingsCard.vue'
import type { ExperimentSettings } from '@/types'

const experiments = ref<ExperimentSettings[]>([])

const getExperiments = () => {
  api.get('experiment/settings').then((response) => {
    experiments.value = response.data
    console.log(response.data)
  })
}

onMounted(() => {
  getExperiments()
})

</script>

<template>
  <div>
    <div class="my-2">
      <CreateSubjectUser></CreateSubjectUser>
    </div>
    <div class="my-2" v-for="experiment in experiments" :key="experiment.id">
      <ExperimentSettingsCard :settings="experiment"></ExperimentSettingsCard>
    </div>
  </div>
</template>

