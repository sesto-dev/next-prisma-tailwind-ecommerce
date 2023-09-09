import getTransporter from '../helpers/getTransporter'

const address = process.env.MAIL_SMTP_USER
const verbose = process.env.MAIL_SMTP_VERBOSE

interface Props {
   name: string
   to: string
   subject: string
   html: string
}

export default async function sendMail({ name, to, subject, html }: Props) {
   let transporter = await getTransporter()

   const mail = await transporter.sendMail({
      from: {
         name,
         address,
      },
      to,
      subject,
      text: subject,
      html,
   })

   if (verbose && verbose == 'true') {
      console.log({ mail })
   }
}
