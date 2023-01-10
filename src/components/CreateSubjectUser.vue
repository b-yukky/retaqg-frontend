<script setup lang="ts">
import api from '@axios'
import type { User } from '@/types'
import useClipboard from 'vue-clipboard3'

const loading = ref(false)
const userInfo = ref<User>({} as User)
const { toClipboard } = useClipboard()

const generateUser = () => {
  loading.value = true
  api.post('auth/user/create-subject/').then( response => {
    loading.value = false
    userInfo.value = response.data
    console.log(response.data)
  })
}

const copyLoginURL = async () => {
  try {
    await toClipboard(userInfo.value.login_url)
    console.log('Copied to clipboard')
  } catch(e) {
    console.error(e)
  }
}

</script>

<template>
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
        <span>
          Login URL:
          <v-chip 
          label
          link
          color="primary"
          v-if="userInfo.login_url" 
        >
          {{ userInfo.login_url }} 
        </v-chip>
        <v-btn
          v-if="userInfo.login_url"
          size="small"
          icon="mdi-clipboard-text"
          variant="text"
          @click="copyLoginURL"
          :disabled="loading"
          :loading="loading"
          color="warning"
        >
        </v-btn>
        </span>
      </v-card-text>
      <VCardText>
      <v-btn
          @click="generateUser"
          :disabled="loading"
          :loading="loading"
        >
          Generate
      </v-btn>
      </VCardText>
    </VCard>
</template>

