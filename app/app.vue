<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <NuxtRouteAnnouncer />
    <div class="text-2xl font-bold">
      Welcome to NuxtRun
    </div>

    <div v-if="data">
      <pre>{{ data }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch('/api/ping')
</script>
