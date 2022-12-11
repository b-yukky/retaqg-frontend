<template>
  <div class="h-100 d-flex align-center justify-space-between">
    <!-- 👉 Footer: left content -->
    <span class="d-flex align-center">
      &copy;
      {{ new Date().getFullYear() }}
      - <a
        href="https://limu.ait.kyushu-u.ac.jp/e/index.html"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary ms-1"
      >LIMU</a> - Bryan Djafer
    </span>
    <!-- 👉 Footer: right content -->
    <span class="d-md-flex gap-x-4 text-primary d-none">
      <a
        href=""
        target="noopener noreferrer"
      >Contact</a>
    </span>
  </div>
</template>
