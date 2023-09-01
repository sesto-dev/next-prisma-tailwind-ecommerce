import sendMail from './helpers/sendMail'

export default async function sendSubscribe({ name, to, unsubscribe_url }) {
   const subject = 'Successfully subscribed.'

   await sendMail({ name, to, subject, body: getBody(), unsubscribe_url })
}

function getBody() {
   return `
		<p>
			You successfully subscribed to our email list.
		</p>
	`
}
