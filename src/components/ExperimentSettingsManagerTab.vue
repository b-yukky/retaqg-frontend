<script setup lang="ts">
import api from '@axios'
import type { ExperimentSettings } from '@/types'
import ExperimentSettingsCard from './ExperimentSettingsCard.vue'
const loading = ref(false)

const experiments = ref<ExperimentSettings[]>([])

const tab = ref(0)

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
    <VCard title="Experiment Settings" v-if="experiments">
      <v-tabs v-model="tab">
        <v-tab v-for="settings in experiments" :key="settings.name">
          {{  settings.name }}
        </v-tab>
      </v-tabs>
        <v-card-text>
          <v-window v-model="tab">
            <v-window-item v-for="settings in experiments" :key="settings.name">
              <ExperimentSettingsCard :settings="settings"></ExperimentSettingsCard>
            </v-window-item>
          </v-window>
        </v-card-text>
    </VCard>
</template>

