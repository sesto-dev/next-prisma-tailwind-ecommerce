import nodemailer from 'nodemailer'

const host = process.env.MAIL_SMTP_HOST
const port = process.env.MAIL_SMTP_PORT
const user = process.env.MAIL_SMTP_USER
const pass = process.env.MAIL_SMTP_PASS

export default async function (to, content) {
    const { subject, text, html } = content

    let transporter = nodemailer.createTransport({
        host,
        port,
        secure: true,
        auth: {
            user,
            pass,
        },
    })

    await transporter.sendMail({
        from: user,
        to,
        subject,
        text,
        html,
    })
}
