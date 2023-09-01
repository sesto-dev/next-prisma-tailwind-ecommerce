const base = process.env.ZARINPAL_BASE_URL

export async function query({ token, query }) {
   const response = await fetch(base + '/api/v4/graphql', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ query }),
   })

   return await response.json()
}
