
<script setup lang="ts">
import type { Question } from '@/types'
import { isNullOrUndefined } from '@core/utils/index'
import { shuffle } from '@core/utils/operations'

const props = defineProps(['questions', 'evalmode'])

const openedPanels = ref<number[]>([])

const createChoices = (question: Question) => {
    if (isNullOrUndefined(question.choices)) {
      question.choices = []
      question.distractors.forEach((distractor) => question.choices.push({ text: distractor.text, is_answer: false}))
      question.choices.push({ text: question.answer, is_answer: true})
      question.choices = shuffle(question.choices)
    }
  }

const displayAnswer = ref(false)

onMounted(() => {
  createChoices(props.questions[0])
  openedPanels.value = [0]
})

watch(props, (newQ) => {
  openedPanels.value = [0]
  createChoices(props.questions[0])
})

</script>

<template>
  <div>
      <VExpansionPanels
        v-if="!isNullOrUndefined(props.questions)"
        multiple 
        v-model="openedPanels"
        @update="createChoices(props.questions[0])"
        :readonly="true"
        >
        <VExpansionPanel
          v-for="question in props.questions"
          :key="question.id"
          v-model="openedPanels"
          >
          <VExpansionPanelTitle @click="createChoices(question)"> 
            <v-row>
              <v-col>
                <div>
                  <span class="mr-4"> {{ question.text }} </span>
                  <VBtn
                  v-if="props.evalmode"
                  color="success"
                  size="small"
                  :variant="displayAnswer ? 'text' : 'tonal'"
                  :append-icon="displayAnswer ? 'mdi-eye' : 'mdi-eye-off'"
                  @click="displayAnswer = !displayAnswer"
                  class="my-1"
                  >
                answer
                </VBtn>
                </div>
              </v-col>
              <v-col v-if="!props.evalmode">
                <VChip 
                  v-if="!props.evalmode"
                  class="ml-2"
                  color="primary"
                  label
                > {{ question.status }}
              </VChip>
              <VChip 
                v-if="!isNullOrUndefined(question.model) && !props.evalmode" 
                class="mx-2"
                label
                variant="outlined"
                color="info"
              > {{ question.model.name }}
              </VChip>
              </v-col>
            </v-row>
          </VExpansionPanelTitle>
          <VExpansionPanelText>
            <VList>
              <VListItem :class="choice.is_answer == true && displayAnswer ? 'green' : ''" v-for="choice in question.choices" 
                :key="choice.text" 
                :value="choice.text">
                <template #prepend>
                  <VIcon
                    icon="mdi-record-circle-outline"
                    class="me-3"
                  />
                </template>
                  <span class="text-red !important"> {{ choice.text }}</span>
              </VListItem>
            </VList>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>

  </div>
</template>

<style scoped>
.green {
  color: #4caf50;
}
</style>
