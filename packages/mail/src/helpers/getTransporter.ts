import nodemailer from 'nodemailer'
import type { TransportOptions, Transport } from 'nodemailer'

const host = process.env.MAIL_SMTP_HOST
const port = process.env.MAIL_SMTP_PORT
const user = process.env.MAIL_SMTP_USER
const pass = process.env.MAIL_SMTP_PASS
const secure = process.env.MAIL_SMTP_SECURE
const tls = process.env.MAIL_SMTP_TLS_REJECT_UNAUTHORIZED
const cipher = process.env.MAIL_SMTP_TLS_CIPHER
const service = process.env.MAIL_SMTP_SERVICE
const verbose = process.env.MAIL_SMTP_VERBOSE

export default async function getTransporter() {
   const options = {
      host: host ? host : null,
      port: port ? port : null,
      secure: secure ? (secure == 'true' ? true : false) : null,
      auth: {
         user: user ? user : null,
         pass: pass ? pass : null,
      },
      tls: {
         rejectUnauthorized: tls ? (tls == 'true' ? true : false) : null,
         ciphers: cipher ? cipher : null,
      },
      service: service ? service : null,
   } as TransportOptions | Transport<unknown>

   if (verbose && verbose == 'true') {
      console.log({ options })
   }

   return nodemailer.createTransport(options)
}
