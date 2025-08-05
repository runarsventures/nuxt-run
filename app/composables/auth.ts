import { createAuthClient } from 'better-auth/vue'
import type { User } from 'better-auth'

export function useAuth() {
  const headers = import.meta.server ? useRequestHeaders() : undefined

  const authClient = createAuthClient({
    fetchOptions: {
      headers,
    },
  })

  const sessionFetching = import.meta.server ? ref(false) : useState('auth:sessionFetching', () => false)
  const user = useState<User | null>('auth:user', () => null)
  const isAuthenticated = computed(() => user.value !== null)

  const fetchSession = async () => {
    if (sessionFetching.value) {
      return
    }
    sessionFetching.value = true

    const { data } = await authClient.getSession()

    user.value = data?.user || null
    sessionFetching.value = false
  }

  const fetchSessionFromServer = async () => {
    sessionFetching.value = true

    const res = await $fetch('/api/session', { headers })

    if (res?.user) {
      user.value = {
        ...res.user,
        createdAt: new Date(res.user.createdAt),
        updatedAt: new Date(res.user.updatedAt),
      }
    }

    sessionFetching.value = false
  }

  return {
    client: authClient,
    isAuthenticated,
    user,
    fetchSessionFromServer,
    fetchSession,
  }
}
