import querystring from 'querystring'

const redirect_uri = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL

const client_id = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ID

export function getGoogleURL() {
   const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'

   const options = {
      redirect_uri,
      client_id,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
         'https://www.googleapis.com/auth/userinfo.profile',
         'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
   }

   const qs = new URLSearchParams(options)

   return `${rootUrl}?${qs.toString()}`
}

export async function getGoogleTokens({ code }) {
   const url = 'https://oauth2.googleapis.com/token?'
   const values = {
      code,
      client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ID,
      client_secret: process.env.GOOGLE_OAUTH_SECRET,
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL,
      grant_type: 'authorization_code',
   }

   return await fetch(url + querystring.stringify(values), {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
   })
      .then(async (res) => await res.json())
      .catch((error) => {
         throw new Error(error.message)
      })
}

export async function getGoogleUser({ id_token, access_token }) {
   return await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
         method: 'GET',
         headers: {
            Authorization: `Bearer ${id_token}`,
         },
      }
   )
      .then(async (res) => await res.json())
      .catch((error) => {
         console.error(`Failed to fetch user`)
         throw new Error(error.message)
      })
}
