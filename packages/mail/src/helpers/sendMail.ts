import getTransporter from './getTransporter'
import getEpilogue from '../markdown/getEpilogue'
import getPrologue from '../markdown/getPrologue'

const address = process.env.MAIL_SMTP_USER
const verbose = process.env.MAIL_SMTP_VERBOSE

interface Props {
   name: string
   to: string
   subject: string
   body: string
   unsubscribe_url: string
}

export default async function sendMail({
   name,
   to,
   subject,
   body,
   unsubscribe_url,
}: Props) {
   let transporter = await getTransporter()

   const mail = await transporter.sendMail({
      from: {
         name,
         address,
      },
      to,
      subject,
      text: subject,
      html:
         getPrologue({ name, subject }) +
         body +
         getEpilogue({ name, unsubscribe_url }),
   })

   if (verbose && verbose == 'true') {
      console.log({ mail })
   }
}
