<script setup>
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()
</script>

<template>
  <div class="h-100 d-flex align-center justify-space-between">
    <!-- 👉 Footer: left content -->
    <span class="d-flex align-center" :class="{ 'sm-text': mobile }">
      &copy;
      {{ new Date().getFullYear() }}
      - Kyushu University 
      <vspacer v-if="mobile"></vspacer>
      - <a
        href="https://limu.ait.kyushu-u.ac.jp/e/index.html"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary ms-1 mr-1"
      >LIMU</a> 
      - Bryan Djafer
    </span>
    <!-- 👉 Footer: right content -->
    <span class="d-md-flex gap-x-4 text-primary d-none">
      <a
        href="mailto:qa@limu.ait.kyushu-u.ac.jp"
        target="noopener noreferrer"
      >An issue? Contact here</a>
    </span>
  </div>
</template>

<style scoped>
.sm-text {
  font-size: 0.25em !important;
}

</style>
