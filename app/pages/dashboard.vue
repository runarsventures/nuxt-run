<template>
  <div class="h-screen flex flex-col">
    <AppHeader />
    <div class="h-full flex flex-col items-center justify-center">
      <h1 class="text-4xl font-bold">
        Welcome to the dashboard
      </h1>
      <pre>{{ session.data?.user }}</pre>
      <Button @click="client.signOut()">
        Sign Out
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { client } = useAuth()
const session = client.useSession()
</script>
