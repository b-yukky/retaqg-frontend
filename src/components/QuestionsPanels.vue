
<script setup lang="ts">
import type { Question } from '@/types'
import { isNullOrUndefined } from '@core/utils/index'
import { shuffle } from '@core/utils/operations'


const props = defineProps(['questions'])

const createChoices = (question: Question) => {
    if (isNullOrUndefined(question.choices)) {
      console.log(question.choices)
      question.choices = []
      question.distractors.forEach((distractor) => question.choices.push({ text: distractor.text, is_answer: false}))
      question.choices.push({ text: question.answer, is_answer: true})
      question.choices = shuffle(question.choices)
    }
  }

</script>

<template>
  <div>
      <VExpansionPanels multiple>
        <VExpansionPanel
          v-for="question in props.questions"
          :key="question.id">
          <VExpansionPanelTitle @click="createChoices(question)"> {{ question.text }} 
            <v-spacer></v-spacer>
            <VChip class="ml-2"> {{ question.status }}</VChip>
            <VChip v-if="!isNullOrUndefined(question.model)" class="mx-2"> {{ question.model.name }}</VChip>
          </VExpansionPanelTitle>
          <VExpansionPanelText>
            <VList>
              <VListItem :class="choice.is_answer == true ? 'green' : ''" v-for="choice in question.choices" 
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
