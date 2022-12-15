<script setup lang="ts">


const inputText = ref<String>('')
const loadingGeneration = ref<String>('')

</script>


<template>
  <div>
    <v-row >
      <v-col cols="6">
        <VCard title="Input: Context 🙌" >
          <v-textarea 
            v-model="inputText" 
            :height="500"
            progress
            clearable
            clear-icon="mdi-close"
            counter
            label="Enter text"
            rows="30"
            auto-grow
            class="mb-3 mx-3"
          >

          </v-textarea>
        </VCard>
        <v-container class="d-flex flex-column align-end" >
          <v-btn width="100%"> Generate Questions </v-btn>
        </v-container>
      </v-col>
      <v-col cols="6">
        <VCard title="Ouput: Questions ">
          <VCardText>This is your second page.</VCardText>
          <VCardText>
            Chocolate sesame snaps pie carrot cake pastry pie lollipop muffin.
            Carrot cake dragée chupa chups jujubes. Macaroon liquorice cookie
            wafer tart marzipan bonbon. Gingerbread jelly-o dragée
            chocolate.
          </VCardText>
        </VCard>
      </v-col>

    </v-row>

  </div>
</template>

