<template>
  <div class="h-full flex flex-col items-center justify-center gap-6">
    <h1 class="text-4xl font-bold">
      Welcome {{ session.data?.user?.name }}
    </h1>
    <div class="flex gap-2">
      <Button @click="navigateTo('/')">
        Home
      </Button>
      <Button @click="client.signOut()">
        Sign Out
      </Button>
      <Button @click="client.deleteUser()">
        Delete User
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
})

const { client } = useAuth()
const session = client.useSession()
</script>
