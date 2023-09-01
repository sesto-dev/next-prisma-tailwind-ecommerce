import sendMail from './helpers/sendMail'

export default async function sendUnsubscribe({ name, to, unsubscribe_url }) {
   const subject = 'Successfully unsubscribed.'

   await sendMail({ name, to, subject, body: getBody(), unsubscribe_url })
}

function getBody() {
   return `
		<p>
			You successfully unsubscribed from our email list.
		</p>
	`
}
