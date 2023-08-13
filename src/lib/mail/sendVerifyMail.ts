import sendMail from 'lib/mail/helpers/sendMail'

export default async function sendVerifyMail({
    to,
    email_verification_code,
    verify_url,
    unsubscribe_url,
}) {
    const subject = 'Verify your Email!'

    await sendMail({
        to,
        subject,
        body: getBody({ email_verification_code, verify_url }),
        unsubscribe_url,
    })
}

function getBody({ email_verification_code, verify_url }) {
    return `
		<h4>Hello! Welcome to Oneli!</h4>
		<p>
			There’s one quick step you need to complete before gaining full
			access to your account. Let’s make sure this is the right address we
			should use for your new account.
		</p>
		<br />
		<p>
			Please enter this verification code on our
			<a href=${verify_url}>verification page.</a>
		</p>
		<h2>${email_verification_code}</h2>
	`
}
