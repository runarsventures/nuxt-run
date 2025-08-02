import type { ClientOptions, InferUserFromClient } from 'better-auth/client'
import { createAuthClient } from 'better-auth/vue'

export function useAuth() {
  const authClient = createAuthClient({})

  const user = useState<InferUserFromClient<ClientOptions> | null>('auth:user', () => null)
  const sessionFetching = import.meta.server ? ref(false) : useState('auth:sessionFetching', () => false)

  const isAuthenticated = computed(() => user.value !== null)

  const fetchSession = async () => {
    if (sessionFetching.value) {
      return
    }
    sessionFetching.value = true
    const { data } = await authClient.useSession(useFetch)
    user.value = data.value?.user || null
    sessionFetching.value = false
  }

  return {
    client: authClient,
    user,
    isAuthenticated,
    fetchSession,
  }
}
