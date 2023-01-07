<script setup lang="ts">
import { requiredValidator } from '@/@core/utils/validators'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import type { User } from '@/types'

const loading = ref<boolean>(false)
const dialog = ref<boolean>(true)
const user = ref<User>({username: '', password: ''})
const showPassword = ref<boolean>(false)
const errorMessage = ref('')

const authStore = useAuthStore()

const login = () => {
  loading.value = true

  authStore.login(user.value).then((response)=> {
    loading.value  = false
    router.replace({path: '/evaluate'})
  }).catch(e => { console.log(e); errorMessage.value = e.response.data.detail; loading.value = false})
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
          Please login to continue
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="11">
              <v-text-field
                v-model="user.username"
                :rules="[requiredValidator]"
                name="input-10-1"
                label="Username or UUID"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="user.password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[]"
                :type="showPassword ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-alert v-if="errorMessage" outlined type="error" dense > {{ errorMessage }} </v-alert>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="router.push('/evaluate')"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            variant="tonal"
            @click="login"
          >
            Log in
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
