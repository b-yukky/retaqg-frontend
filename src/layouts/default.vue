<script lang="ts" setup>
import { useThemeConfig } from '@core/composable/useThemeConfig'
import DefaultLayoutWithHorizontalNav from './components/DefaultLayoutWithHorizontalNav.vue'
import DefaultLayoutWithVerticalNav from './components/DefaultLayoutWithVerticalNav.vue'

// @layouts plugin
import { AppContentLayoutNav } from '@layouts/enums'

const { width: windowWidth } = useWindowSize()
const { appContentLayoutNav } = useThemeConfig()

// ℹ️ Performance: Only add `switchToVerticalNavOnLtOverlayNavBreakpoint` if `appContentLayoutNav` is horizontal
watchOnce(
  () => appContentLayoutNav.value === AppContentLayoutNav.Horizontal,
  () => {
    const { switchToVerticalNavOnLtOverlayNavBreakpoint } = useThemeConfig()

    // ℹ️ This will switch to vertical nav when define breakpoint is reached when in horizontal nav layout
    // Remove below composable usage if you are not using horizontal nav layout in your app
    switchToVerticalNavOnLtOverlayNavBreakpoint(windowWidth)
  },
)

appContentLayoutNav.value = AppContentLayoutNav.Vertical

</script>

<template>
  <template v-if="appContentLayoutNav === AppContentLayoutNav.Horizontal">
    <DefaultLayoutWithHorizontalNav />
  </template>
  <template v-else>
    <DefaultLayoutWithVerticalNav />
  </template>
</template>

<style lang="scss">
// As we are using `layouts` plugin we need its styles to be imported
@use "@layouts/styles/default-layout";
</style>
