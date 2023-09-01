const base = process.env.ZARINPAL_BASE_URL

export async function register({ first_name, last_name, cell_number }) {
   const data = {
      first_name,
      last_name,
      cell_number,
   }

   const response = await fetch(base + '/api/oauth/register', {
      method: 'POST',
      body: JSON.stringify(data),
   })

   return await response.json()
}

export async function initialize() {
   const data = {
      username: process.env.ZARINPAL_USERNAME,
      channel: 'sms',
   }

   const response = await fetch(base + '/api/oauth/initialize', {
      method: 'POST',
      body: JSON.stringify(data),
   })

   return await response.json()
}

export async function verify({ password }) {
   const data = {
      grant_type: 'password',
      client_id: process.env.ZARINPAL_CLIENT_ID,
      client_secret: process.env.ZARINPAL_CLIENT_SECRET,
      username: process.env.ZARINPAL_USERNAME,
      password,
      scope: '*',
   }

   const response = await fetch(base + '/api/oauth/token', {
      method: 'POST',
      body: JSON.stringify(data),
   })

   return await response.json()
}

export async function refresh({ refresh_token }) {
   const data = {
      grant_type: 'refresh_token',
      client_id: process.env.ZARINPAL_CLIENT_ID,
      client_secret: process.env.ZARINPAL_CLIENT_SECRET,
      refresh_token,
      scope: '*',
   }

   const response = await fetch(base + '/api/oauth/token', {
      method: 'POST',
      body: JSON.stringify(data),
   })

   return await response.json()
}
