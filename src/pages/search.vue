
<script setup lang="ts">

import QuestionsPanels from '@/components/QuestionsPanels.vue'
import type { Paragraph, Question } from '@/types'
import api from '@axios'
import { isEmptyArray, isNullOrUndefined } from '@core/utils/index'
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"

import { AgGridVue } from 'ag-grid-vue3'
import { ref } from 'vue'

defineComponent({
  name: 'searchComponent'
})

const questions = ref<Question[]>([])
const paragraphs = ref<Paragraph[]>([])
const loadingQuestion = ref(false)
const loadingParagraphs = ref(false)
const displayParagraphText = ref('')

const gridApi = ref(null)
const onGridReady = (params: any) => {
  gridApi.value = params.api
}
const onFirstDataRendered = (params: any) => {
  const allColumnIds: any = []
  params.columnApi.getColumns().forEach((column: any) => {
    allColumnIds.push(column.getId())
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
        { field: "topic", },
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

const getQuestionsFromParagraph = (params: any) => {
  const selectedRows = params.api.getSelectedRows()
  const paragraph_id = selectedRows[0].id
  displayParagraphText.value = selectedRows[0].text
  loadingQuestion.value = true
  api.get(`question/detail/paragraph/${paragraph_id}`).then(
    response => {
      questions.value = response.data
      loadingQuestion.value = false
    }).catch(e => { console.log(e) } )
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
        class="ag-theme-alpine mx-5 mb-3"
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
      <QuestionsPanels v-if="!isEmptyArray(questions) && !isNullOrUndefined(questions)" :questions="questions"></QuestionsPanels>

    </VCard>
  </div>
</template>

<style scoped>
.green {
  color: #4caf50;
}

.ag-theme-alpine {
    --ag-foreground-color: rgb(var(--v-theme-on-background));
    --ag-background-color: rgb(var(--v-theme-background));
    --ag-odd-row-background-color: rgb(var(--v-theme-surface));
    --ag-border-color: rgb(var(--v-theme-grey-50));
    --ag-header-background-color: rgb(var(--v-theme-surface));

}


.ag-theme-alpine .ag-header-cell-label {
    --ag-foreground-color: rgb(var(--v-theme-on-background));
    font-style: italic;
}

</style>

<route lang="yaml">
  meta:
    layout: default
</route>
