
<script setup lang="ts">

</script>

<template>
  <div>

      <VExpansionPanels multiple>
        <VExpansionPanel
          v-for="question in questions"
          :key="question.id">
          <VExpansionPanelTitle @click="createChoices(question)"> {{ question.text }} 
            <v-spacer></v-spacer>
            <VChip class="ml-2"> {{ question.status }}</VChip>
            <VChip class="mx-2"> {{ question.model.name }}</VChip>
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
