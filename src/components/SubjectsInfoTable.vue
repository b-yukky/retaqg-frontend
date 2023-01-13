<script setup lang="ts">
import api from '@axios'
import type { Profile } from '@/types'
import { VDataTable } from 'vuetify/labs/VDataTable'

const loading = ref(false)

const profiles = ref<Profile[]>([] as Profile[])

const headers = ref([
  {
    align: 'start',
    sortable: false,
    key: 'name',
  },
  { title: 'user', key: 'user'},
  { title: 'Used', key: 'groups'},
  { title: 'English lvl.', key: 'english_proficiency'},
  { title: 'Progress', key: 'completed_questions'},
  { title: 'Created in', key: 'date_joined'},
])

const jauge = ref(64)

onMounted(() => {
  loading.value = true
  api.get('experiment/subjects/info/').then(response => {
    loading.value = false
    profiles.value = response.data
    console.log(response.data)
  })
})

function progress(completed: number, max:number) {
  return Math.ceil(
    (completed / (completed + max))*100)
}

</script>

<template>
    <VCard title="List of evaluators 🥼">
      <VDataTable 
        class="elevation-1"
        :headers="headers"
        :items="profiles"
      >

      <template v-slot:item.groups="{ item }">
        <template v-for="group in item.raw.groups" :key="group.name">
          <v-chip v-if="group.name == 'en_verified'" icon><v-icon><v-icon>mdi-check</v-icon></v-icon></v-chip>
        </template>
      </template>

      <template v-slot:item.english_proficiency="{ item }">
        <v-chip v-if="item.raw.english_proficiency == 0" label color="success">Beginner</v-chip>
        <v-chip v-else-if="item.raw.english_proficiency == 1" label color="info">Intermediate</v-chip>
        <v-chip v-else-if="item.raw.english_proficiency == 2" label color="warning">Proficient</v-chip>
        <v-chip v-else-if="item.raw.english_proficiency == 3" label color="error">Native</v-chip>
      </template>

      <template v-slot:item.completed_questions="{ item }">
        <v-progress-linear
          :model-value="Math.ceil((item.raw.completed_questions  / item.raw.max_questions)*100)"
          :color="item.raw.completed_questions >= item.raw.max_questions ? 'success': 'warning'"
          striped
          height="14"
        >
        <span class="text-overline"> {{ Math.ceil((item.raw.completed_questions  / item.raw.max_questions)*100) }}% ({{ item.raw.completed_questions }}) </span>
        </v-progress-linear>
      </template>

      <template v-slot:item.date_joined="{ item }">
        {{ item.raw.date_joined.split("T")[0]}}
      </template>
    </VDataTable>
    </VCard>
</template>

