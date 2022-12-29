export function getDiscordURL({ id }) {
    const state = JSON.stringify({ id })
    return process.env.NEXT_PUBLIC_DISCORD_OAUTH_URL + `&state=${state}`
}

export async function getDiscordTokens({ code }) {
    const baseURL = 'https://discord.com/api/oauth2/token'

    let params = new URLSearchParams()
    params.append('client_id', process.env.DISCORD_OAUTH_CLIENT_ID)
    params.append('client_secret', process.env.DISCORD_OAUTH_SECRET)
    params.append('grant_type', 'authorization_code')
    params.append('code', code)
    params.append(
        'redirect_uri',
        `${process.env.NEXT_PUBLIC_URL}/api/auth/discord`
    )
    params.append('scope', 'identify email')

    return await fetch(baseURL, {
        body: params,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
        },
    })
        .then(async (res) => await res.json())
        .catch((error) => {
            throw new Error(error.message)
        })
}

export async function getDiscordUser({ access_token }) {
    const url = 'https://discord.com/api/users/@me'

    return await fetch(url, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })
        .then(async (res) => await res.json())
        .catch((error) => {
            throw new Error(error.message)
        })
}
