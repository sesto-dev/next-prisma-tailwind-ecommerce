import sendMail from './helpers/sendMail'

export default async function sendVerifyMail({
   name,
   to,
   email_verification_code,
   verify_url,
   unsubscribe_url,
}) {
   const subject = 'Verify your Email!'

   await sendMail({
      name,
      to,
      subject,
      body: getBody({ name, email_verification_code, verify_url }),
      unsubscribe_url,
   })
}

function getBody({ name, email_verification_code, verify_url }) {
   return `
		<h4>Hello! Welcome to ${name}!</h4>
		<p>
			There’s one quick step you need to complete before gaining full
			access to your account. Let’s make sure this is the right address we
			should use for your new account.
		</p>
		<br />
		<h2>${email_verification_code}</h2>
	`
}
