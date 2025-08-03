export default defineNuxtRouteMiddleware(async (to) => {
  const { fetchSession, fetchSessionFromServer, isAuthenticated } = useAuth()

  if (import.meta.server) {
    await fetchSessionFromServer()
  }

  if (import.meta.client) {
    await fetchSession()
  }

  if (to.meta.layout === 'dashboard' && !isAuthenticated.value) {
    if (to.path === '/') {
      return
    }
    return navigateTo('/')
  }
})
