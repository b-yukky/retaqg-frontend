<script setup lang="ts">
import api from '@axios'
import type { User } from '@/types'

const loading = ref(false)
const userInfo = ref<User>({} as User)

const generateUser = () => {
  loading.value = true
  api.post('auth/user/create-subject/').then( response => {
    loading.value = false
    userInfo.value = response.data
    console.log(response.data)
  })
}

const copyLoginURL = () => {
  console.log('im copyyying')
  navigator.clipboard.writeText(userInfo.value.login_url)
}

</script>

<template>
  <div>
    <VCard title="Create subject user 🥼">
      <v-card-text>
        <p>
          UUID: 
          <v-chip 
            label
            outlined
            v-if="userInfo.id"
          > 
            {{ userInfo.id }} 
          </v-chip>
        </p>
        <p>
          Login URL: 
          <v-chip 
            label
            link
            color="primary"
            @click="copyLoginURL"
            v-if="userInfo.login_url" 
          >
            {{ userInfo.login_url }} 
          </v-chip>
        </p>
      </v-card-text>
      <VCardText>
        <v-btn
          @click="generateUser"
          :disabled="loading"
        >
          Create
      </v-btn>
      </VCardText>
    </VCard>
  </div>
</template>

