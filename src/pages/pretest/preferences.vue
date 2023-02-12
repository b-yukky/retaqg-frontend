<script setup lang="ts">
import { Profile, Topic } from '@/types'
import api from '@axios'
import router from '@/router'
import { VueDraggableNext } from 'vue-draggable-next'

const loading = ref<boolean>(false)
const dialog = ref<boolean>(true)
const errorMessage = ref('')

const profile = ref<Profile>({'topic_preferences': {}} as Profile)
const topics = ref<Topic[]>([] as Topic[])
const selectedTopics = ref<Topic[]>([] as Topic[])

const next = () => {
  loading.value = true
  selectedTopics.value.forEach((el, i) => { profile.value.topic_preferences[i] = el})
  api.put('my-profile/', profile.value).then( response => {
    loading.value  = false
    console.log('response', response.data)
    router.replace({path: '/evaluate'})
  }).catch( e => { console.log(e); loading.value  = false })
}

const limitSelectedTopics = () => {
  if (selectedTopics.value.length > 10) {
    selectedTopics.value.pop()
  }
}

onMounted(() => {
  loading.value = true
  api.get('topics').then((response) => {
    loading.value = false
    topics.value = response.data
    console.log(response.data)
  })
})
function log(event) {
  selectedTopics.value.forEach((el, i) => { profile.value.topic_preferences[i] = el})
  console.log(profile.value)
}

</script>

<template>
  <div class="d-flex justify-md-center">
    <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="490"
      scroll-strategy="none"
    >

      <v-card>
        <v-card-title class="text-h6">
          Please select your topic preferences
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" class="px-0">
              <v-select
                v-model="selectedTopics"
                :items="topics"
                item-title="name"
                item-value="name"
                label="Select"
                multiple
                hint="Pick your prefered topics"
                persistent-hint
                @update="log"
                @update:model-value="limitSelectedTopics"
              >

              </v-select>
            </v-col>
            <v-col cols="12" class="px-0">
              Drag and move to order your preferences:
              <div class="flex-grow-1 py-2">
                  <vue-draggable-next :list="selectedTopics" @change="log">
                    <template v-for="(topic, i) in selectedTopics" :key="i">
                      <v-chip variant="outlined" size="large" class="mx-1" :style="{ 'cursor': 'pointer' }">
                      {{ i + 1 }}.
                      {{ topic }}
                      </v-chip>
                    </template>
                  </vue-draggable-next>
              </div>
            </v-col>
            <v-col class="py-0">
              <v-alert v-if="errorMessage" outlined type="error" dense > {{ errorMessage }} </v-alert>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="tonal"
            @click="next"
            :disabled="loading"
          >
            Next
          </v-btn>
        </v-card-actions>
        <v-progress-linear
        :active="loading"
        indeterminate
        color="primary"
      ></v-progress-linear>
      </v-card>
    </v-dialog>
  </v-row>
  </div>
</template>



<route lang="yaml">
  meta:
    layout: evaluation
</route>
