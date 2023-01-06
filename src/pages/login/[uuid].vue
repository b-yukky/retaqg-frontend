<script setup lang="ts">
import router from '@/router'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const loading = ref(false)
const errorMessage = ref('')

const authStore = useAuthStore()

const loginAndRedirect = () => {
  loading.value = true

  authStore.loginNoPassword(route.params.uuid).then((response)=> {
    loading.value  = false
    router.replace({path: '/evaluate'})
  }).catch(e => { console.log(e); router.replace({path: '/evaluate'}); loading.value = false})

}

onMounted(() => {
  loginAndRedirect()
})


</script>

<template>
  <div class="d-flex">
    <v-progress-linear
        :active="loading"
        indeterminate
        color="primary"
      ></v-progress-linear>
  </div>
</template>

<route lang="yaml">
  meta:
    layout: evaluation
    name: evaluate
</route>
