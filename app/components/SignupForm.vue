<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { client } = useAuth()

const form = ref({
  email: '',
  password: '',
  name: '',
})

const isLoading = ref(false)
const errorMessage = ref<string | undefined>(undefined)

const handleSubmit = async () => {
  isLoading.value = true
  await client.signUp.email({
    email: form.value.email,
    password: form.value.password,
    name: form.value.name,
    callbackURL: '/dashboard',
  }, {
    onSuccess: () => {
      isLoading.value = false
      navigateTo('/dashboard')
    },
    onError: (error) => {
      isLoading.value = false
      errorMessage.value = error.error.message
    },
  })
}

const signInWithGoogle = async () => {
  await client.signIn.social({
    provider: 'google',
    callbackURL: '/dashboard',
  })
}
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card>
      <CardHeader class="text-center">
        <CardTitle class="text-xl">
          Sign Up
        </CardTitle>
        <CardDescription>
          Enter your information to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleSubmit">
          <div class="grid gap-6">
            <div class="flex flex-col gap-4">
              <Button
                variant="outline"
                class="w-full"
                @click="signInWithGoogle"
              >
                <Icon name="mdi:google" />
                Sign Up with Google
              </Button>
            </div>
            <div class="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span class="bg-card text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
            </div>
            <div class="grid gap-6">
              <div class="grid gap-3">
                <Label for="name">Name</Label>
                <Input
                  id="name"
                  v-model="form.name"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div class="grid gap-3">
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div class="grid gap-3">
                <div class="flex items-center">
                  <Label for="password">Password</Label>
                </div>
                <Input
                  id="password"
                  v-model="form.password"
                  type="password"
                  required
                />
              </div>
              <Button
                type="submit"
                class="w-full"
                :disabled="isLoading"
              >
                Sign Up
                <Icon
                  v-if="isLoading"
                  name="mdi:loading"
                  class="animate-spin"
                />
              </Button>
            </div>
            <div
              v-if="errorMessage"
              class="text-red-500 text-center text-sm"
            >
              {{ errorMessage }}
            </div>
            <div class="text-center text-sm">
              Already have an account?
              <NuxtLink
                to="/login"
                class="underline underline-offset-4"
              >
                Login
              </NuxtLink>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
    <div class="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
      By clicking continue, you agree to our <a href="#">Terms of Service</a>
      and <a href="#">Privacy Policy</a>.
    </div>
  </div>
</template>
