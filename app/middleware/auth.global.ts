export default defineNuxtRouteMiddleware(async (to) => {
  const { client } = useAuth()

  const { data: session } = await client.useSession(useFetch)
  if (!session.value) {
    if (to.path === '/dashboard') {
      return navigateTo('/')
    }
  }

  // // Fetch session between each navigation
  // if (import.meta.client) {
  //   await fetchSession()
  // }

  // if (to.meta.layout === 'dashboard' && !isAuthenticated.value) {
  //   // Avoid infinite redirect
  //   if (to.path === '/') {
  //     return
  //   }
  //   return navigateTo('/')
  // }
})
