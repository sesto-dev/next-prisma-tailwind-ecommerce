export default function (req, res) {
    return res
        .setHeader(
            'Set-Cookie',
            'AJWT=; Max-Age=0; SameSite=Strict; HttpOnly; Path=/'
        )
        .status(200)
        .json({
            Success: true,
            Message: 'Successfully logged out...',
        })
}
