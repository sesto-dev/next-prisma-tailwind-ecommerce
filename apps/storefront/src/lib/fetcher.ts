export async function fetcher<JSON = any>(input: RequestInfo): Promise<JSON> {
    const res = await fetch(input)
    return res.json()
}
