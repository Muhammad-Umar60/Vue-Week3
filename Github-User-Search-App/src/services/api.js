export default async function fetchUser(query) {
  const url = `https://api.github.com/search/users?q=${query}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('API Error')
  }

  await new Promise((res) => setTimeout(res, 1000))
  const data = await response.json()
  return data.items.slice(0, 5)
}
