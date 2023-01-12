<script setup lang="ts">
import api from '@axios'
import type { ExperimentSettings } from '@/types'

const loading = ref(false)
const props = defineProps(['settings'])
const settings = toRef(props, 'settings')

const updateSettings = () => {
  loading.value = true
  console.log(settings)
  api.put(`experiment/settings/${settings.value.id}`, settings.value).then(response => {
    loading.value = false
    console.log(response.data)
  }).catch((e)=> { loading.value = false})
}

</script>

<template>
    <VCard title="Experiment Settings" v-if="settings">
      <v-card-text>
        <p>
          Name: 
          <v-text-field 
            v-if="settings.name"
          > 
            {{ settings.name }} 
          </v-text-field>
        </p>
        <p>
          <v-checkbox v-model="settings.active" label="Active"> </v-checkbox>
        </p>
        <p>
          Maximum evaluations per question:
          <v-text-field 
          color="primary"
          v-if="settings.max_eval_per_question"
          v-model="settings.max_eval_per_question"
        >
        </v-text-field>
        </p>
        <p>
          Maximum questions per subject:
          <v-text-field 
          color="primary"
          v-if="settings.max_questions_per_subject"
          v-model="settings.max_questions_per_subject"
        >
        </v-text-field>
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn variant="flat" @click="updateSettings" :loading="loading">
          Save
        </v-btn>
      </v-card-actions>
    </VCard>
</template>

