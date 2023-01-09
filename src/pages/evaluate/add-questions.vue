<script setup lang="ts">
import { requiredValidator } from '@/@core/utils/validators'
import router from '@/router'
import api from '@axios'

const loading = ref<boolean>(false)
const dialog = ref<boolean>(true)
const errorMessage = ref('')

const continueEvaluation = () => {
  loading.value = true
  api.post('my-profile/add-questions/').then( response => {
    loading.value = false
    if (response.status == 200) {
      router.replace({path: `/evaluate/${response.data.id}`})
    } else {
      router.replace({path: '/evaluate'})
    }
  })
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
        <v-card-title class="text-h5">
          Thank you!
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              Thank you very much for participating in this study, you have evaluated the necessary number of questions. <br><br>
              Press the button <strong>"Finish"</strong> if you want to leave here.<br><br> However, if you want to keep helping and evaluating questions, you can press the button <strong>"Continue"</strong>. <br>
              If you decide to continue, you can quit on the way or come back whenever you want. Please do not lose your login URL.
            </v-col>
            <v-col>
              <v-alert v-if="errorMessage" outlined type="error" dense > {{ errorMessage }} </v-alert>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="info"
            variant="tonal"
            @click="router.push('/evaluate')"
          >
            Finish
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="tonal"
            @click="continueEvaluation"
            :disabled="loading"
          >
            Continue
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
