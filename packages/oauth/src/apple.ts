const teamID = process.env.NEXT_PUBLIC_APPLE_TEAM_ID
const clientID = process.env.NEXT_PUBLIC_APPLE_CLIENT_ID
const redirectURI = process.env.NEXT_PUBLIC_URL + "/callback/apple"
const state = "RANDOMLY_GENERATED_STATE"
const clientSecret = process.env.APPLE_CLIENT_SECRET

export function getAppleSignInURL() {
  return `https://appleid.apple.com/auth/authorize?response_type=code&client_id=${clientID}&redirect_uri=${redirectURI}&state=${state}&scope=name%20email`
}

export async function generatePublicKeys() {
  try {
    const endpoint = "https://appleid.apple.com/auth/keys"

    const response = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })

    return await response.json()
  } catch (error) {
    console.log({ error })
  }
}

export async function generateTokens({ code }) {
  try {
    const endpoint = "https://appleid.apple.com/auth/token"

    const params = {
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectURI,
      client_id: clientID,
      client_secret: clientSecret
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams(params)
    })

    return await response.json()
  } catch (error) {
    console.log({ error })
  }
}

export async function validateTokens({ refresh_token }) {
  try {
    const endpoint = "https://appleid.apple.com/auth/token"

    const params = {
      refresh_token,
      grant_type: "refresh_token",
      redirect_uri: redirectURI,
      client_id: clientID,
      client_secret: clientSecret
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams(params)
    })

    return await response.json()
  } catch (error) {
    console.log({ error })
  }
}

export async function revokeTokens({ refresh_token }) {
  try {
    const endpoint = "https://appleid.apple.com/auth/revoke"

    const params = {
      token: refresh_token,
      token_type_hint: "refresh_token",
      redirect_uri: redirectURI,
      client_id: clientID,
      client_secret: clientSecret
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams(params)
    })

    return await response.json()
  } catch (error) {
    console.log({ error })
  }
}
