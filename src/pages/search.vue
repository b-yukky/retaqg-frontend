
<script setup lang="ts">

import type { Paragraph, Question } from '@/types'
import api from '@axios'
import { isEmptyArray, isNullOrUndefined } from '@core/utils/index'
import { shuffle } from '@core/utils/operations'
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-material.css"
import { AgGridVue } from 'ag-grid-vue3'
import { ref } from 'vue'

defineComponent({
  name: 'searchComponent'
})

const paragraphs = ref<Paragraph[]>([])
const loadingQuestion = ref(false)
const loadingParagraphs = ref(false)
const displayParagraphText = ref('')

const gridApi = ref(null)
const onGridReady = (params: any) => {
  gridApi.value = params.api
}
const onFirstDataRendered = (params: any) => {
  const allColumnIds: any = [];
  params.columnApi.getColumns().forEach((column: any) => {
    allColumnIds.push(column.getId());
  })
  params.columnApi.autoSizeColumns(allColumnIds, false)
  params.api.sizeColumnsToFit()
}

onMounted(() => {
  loadingParagraphs.value = true
  api.get('paragraph/list/').then(
    response => {
      paragraphs.value = response.data
      loadingParagraphs.value = false
    }).catch(e => { console.log(e) } )
})

const columnDefs = reactive({
  value: [
        { field: "id", },
        { field: "text", width: 800},
        { field: "length", },
        { field: "Date", },
  ],
})

const defaultColDef = {
  sortable: true,
  filter: true,
  resizable: true,
  flex: 1
}
const questions = ref<Question[]>([])

const getQuestionsFromParagraph = (params: any) => {
  const selectedRows = params.api.getSelectedRows()
  const paragraph_id = selectedRows[0].id
  displayParagraphText.value = selectedRows[0].text
  loadingQuestion.value = true
  api.get(`question/detail/${paragraph_id}`).then(
    response => {
      questions.value = response.data
      loadingQuestion.value = false
    }).catch(e => { console.log(e) } )
}
const createChoices = (question: Question) => {
  if (isNullOrUndefined(question.choices))
    console.log(question.choices)
    question.choices = []
    question.distractors.forEach((distractor) => question.choices.push({ text: distractor.text, is_answer: false}))
    question.choices.push({ text: question.answer, is_answer: true})
    question.choices = shuffle(question.choices)
  }



</script>

<template>
  <div>
    <VCard
      class="mb-6"
      title="Paragraphs 🔎"
    >
      <v-progress-linear
        :active="loadingParagraphs"
        indeterminate
        color="primary"
      ></v-progress-linear>
      <ag-grid-vue
        style="height: 300px;"
        class="ag-theme-material mx-5 mb-3"
        animateRows="true"
        :columnDefs="columnDefs.value"
        :rowData="paragraphs"
        :defaultColDef="defaultColDef"
        rowSelection="single"
        @first-data-rendered="onFirstDataRendered"
        @selection-changed="getQuestionsFromParagraph"
      >
      </ag-grid-vue>

    </VCard>

    <VCard 
      class="mb-6"
      title="Selected paragraph 📄"
      fluid
    >
      <v-textarea 
        readonly
        :value="displayParagraphText"
        class="mx-3 mb-3"
      >
      </v-textarea>
    </VCard>

    <VCard title="Questions generated ❓" min-height="100px">
      <v-progress-linear
        :active="loadingQuestion"
        indeterminate
        color="primary"
      ></v-progress-linear>
      <VCardSubtitle v-if="isEmptyArray(questions) && !loadingQuestion"> Select a paragraph to display associated questions.</VCardSubtitle>
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
    </VCard>
  </div>
</template>

<style scoped>
.green {
  color: #4caf50;
}
</style>
