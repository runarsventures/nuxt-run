export default defineAuthenticatedEventHandler(async () => {
  const result = await useDb().select().from(tables.countries)
  return result
})
