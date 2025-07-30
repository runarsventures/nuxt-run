import { createAuthClient } from 'better-auth/vue'

export function useAuth() {
  const authClient = createAuthClient({})

  return {
    client: authClient,
  }
}
