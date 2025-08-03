export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
    query: {
      disableRefresh: true,
    },
  })
  return session
})
