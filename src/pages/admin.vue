<script setup lang="ts">
import api from '@/plugins/axios'

import CreateSubjectUser from '@/components/CreateSubjectUser.vue'
import SubjectsInfoTable from '@/components/SubjectsInfoTable.vue'
import ExperimentSettingsManagerTab from '@/components/ExperimentSettingsManagerTab.vue'

import type { ExperimentSettings } from '@/types'



</script>

<template>
  <div>
    <div class="my-2">
      <CreateSubjectUser></CreateSubjectUser>
    </div>
    <div class="my-2">
      <SubjectsInfoTable></SubjectsInfoTable>
    </div>
    <div class="my-2">
      <ExperimentSettingsManagerTab></ExperimentSettingsManagerTab>
    </div>
  </div>
</template>

