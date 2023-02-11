<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { Profile } from '@/types'
import api from '@axios'
import router from '@/router'

const loading = ref<boolean>(false)
const dialog = ref<boolean>(true)
const errorMessage = ref('')

const userProfile = ref<Profile>({} as Profile)

const authStore = useAuthStore()

const next = () => {
  loading.value = true
  api.put('my-profile/', userProfile.value).then( response => {
    loading.value  = false
    router.replace({path: '/pretest/preferences/'})
  }).catch( e => { console.log(e); loading.value  = false })
}

const tickLabelsEnglishProficiency = ref({ 0: 'Beginner', 1: '', 2: 'Intermediate', 3: '', 4: 'Proficient', 5: '', 6: 'Native' })

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
          Please rate your english proficiency level
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" class="px-0">
              <div class="flex-grow-1">
                <v-slider
                  v-model="userProfile.english_proficiency"
                  :ticks="tickLabelsEnglishProficiency"
                  :max="6"
                  step="1"
                  show-ticks="always"
                  tick-size="4"
                  class="px-5"
                  color="warning"
                >
                </v-slider>
              </div>
            </v-col>
            <v-col>
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
