export default defineEventHandler(async () => {
  const result = await useDb().select().from(tables.countries)
  return result
})
