import Config from 'config/site'
import getTransporter from 'lib/mail/helpers/getTransporter'
import getEpilogue from 'lib/mail/markdown/getEpilogue'
import getPrologue from 'lib/mail/markdown/getPrologue'

const address = process.env.MAIL_SMTP_USER
const verbose = process.env.MAIL_SMTP_VERBOSE

interface Props {
    to: string
    subject: string
    body: string
    unsubscribe_url: string
}

export default async function SendMail({
    to,
    subject,
    body,
    unsubscribe_url,
}: Props) {
    let transporter = await getTransporter()

    const mail = await transporter.sendMail({
        from: {
            name: Config.name,
            address,
        },
        to,
        subject,
        text: subject,
        html:
            getPrologue({ subject }) + body + getEpilogue({ unsubscribe_url }),
    })

    if (verbose && verbose == 'true') {
        console.log({ mail })
    }
}
