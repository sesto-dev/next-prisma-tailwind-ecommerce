export default function (req, res) {
    res.setHeader(
        'Set-Cookie',
        'AJWT=; Max-Age=0; SameSite=Strict; HttpOnly; Path=/'
    )
    res.status(200).json('Success!')
}
