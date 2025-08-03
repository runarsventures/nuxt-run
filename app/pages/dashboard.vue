<template>
  <div class="h-full flex flex-col items-center justify-center gap-6">
    <h1 class="text-4xl font-bold">
      Welcome {{ user?.name }}
    </h1>
    <div class="flex gap-2">
      <Button @click="signOut">
        Sign Out
      </Button>
      <Button @click="deleteUser">
        Delete User
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
})

const { user, client } = useAuth()

const signOut = async () => {
  await client.signOut()
  await navigateTo('/')
}

const deleteUser = async () => {
  await client.deleteUser()
  await navigateTo('/')
}
</script>
