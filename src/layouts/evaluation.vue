<script setup lang="ts">
import { useThemeConfig } from '@core/composable/useThemeConfig'
import DefaultLayoutWithHorizontalNav from './components/DefaultLayoutWithHorizontalNav.vue'

// @layouts plugin
import { AppContentLayoutNav } from '@layouts/enums'

const { appContentLayoutNav } = useThemeConfig()


appContentLayoutNav.value = AppContentLayoutNav.Horizontal

</script>

<template>
  <template v-if="appContentLayoutNav === AppContentLayoutNav.Horizontal">
    <DefaultLayoutWithHorizontalNav ></DefaultLayoutWithHorizontalNav>
  </template>
</template>

<style lang="scss">
// As we are using `layouts` plugin we need its styles to be imported
@use "@layouts/styles/default-layout";

.layout-wrapper.layout-blank {
  flex-direction: column;
}
</style>
