import sendMail from 'lib/mail/helpers/sendMail'

export default async function sendSubscribe({ to, unsubscribe_url }) {
    const subject = 'Successfully subscribed.'

    await sendMail({ to, subject, body: getBody(), unsubscribe_url })
}

function getBody() {
    return `
		<p>
			You successfully subscribed to our emaill list.
		</p>
	`
}
