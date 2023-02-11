import { defineStore } from 'pinia'

export const useContextStore = defineStore('context', () => {

  const lastContext = ref('')
  const lastConfidence = ref(0)

  function setLastContext(context: string) {
    lastContext.value = context
  }

  function getLastContext() {
    return lastContext.value
  }

  function setLastConfidence(confidence: number) {
    lastConfidence.value = confidence
  }

  function getLastConfidence() {
    return lastConfidence.value
  }

  return { lastContext, setLastContext, getLastContext, lastConfidence, setLastConfidence, getLastConfidence }
})
