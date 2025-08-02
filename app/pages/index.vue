<template>
  <div class="h-screen flex flex-col">
    <header class="flex items-center justify-between px-6 py-4 border-b">
      <div class="flex items-center gap-2">
        <Icon
          name="lucide:gallery-vertical-end"
          size="20"
        />
        <h1 class="text-xl font-medium">
          NuxtRun
        </h1>
      </div>
      <NuxtLink
        v-if="!session.data?.user"
        to="/login"
      >
        <Button>
          Login
        </Button>
      </NuxtLink>
      <NuxtLink
        v-else
        to="/dashboard"
      >
        <Button>
          Dashboard
        </Button>
      </NuxtLink>
    </header>
    <div class="h-full flex flex-col items-center justify-center gap-6">
      <h1 class="text-4xl font-bold">
        Welcome to the landing page
      </h1>
      <p>
        This is a starter template for a Nuxt 4 project.
      </p>
      <NuxtLink to="/signup">
        <Button>
          Create an account
        </Button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { client } = useAuth()
const session = client.useSession()
</script>
