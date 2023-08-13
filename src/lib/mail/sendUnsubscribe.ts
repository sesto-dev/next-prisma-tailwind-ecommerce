import sendMail from 'lib/mail/helpers/sendMail'

export default async function sendUnsubscribe({ name, to, unsubscribe_url }) {
    const subject = 'Successfully unsubscribed.'

    await sendMail({ to, subject, body: getBody(), unsubscribe_url })
}

function getBody() {
    return `
		<p>
			You successfully unsubscribed from our emaill list.
		</p>
	`
}
