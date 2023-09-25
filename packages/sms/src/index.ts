export async function sendBulkSMS({ Mobiles, MessageText }) {
   const response = await fetch(`https://api.sms.ir/v1/send/bulk`, {
      method: 'POST',
      body: JSON.stringify({
         lineNumber: process.env.SMS_NUMBER,
         MessageText,
         Mobiles,
      }),
      headers: {
         'X-API-KEY': process.env.SMS_API_KEY,
         'Content-Type': 'application/json',
      },
   })

   return await response.json()
}

export async function sendLikeToLikeSMS({ Mobiles, MessageText }) {
   const response = await fetch(`https://api.sms.ir/v1/send/likeToLike`, {
      method: 'POST',
      body: JSON.stringify({
         lineNumber: process.env.SMS_NUMBER,
         MessageText,
         Mobiles,
      }),
      headers: {
         'X-API-KEY': process.env.SMS_API_KEY,
         'Content-Type': 'application/json',
      },
   })

   return await response.json()
}

export async function sendTransactionalSMS({ Mobile, TemplateId, Parameters }) {
   const response = await fetch(`https://api.sms.ir/v1/send/verify`, {
      method: 'POST',
      body: JSON.stringify({
         TemplateId,
         Mobile,
         Parameters,
      }),
      headers: {
         'X-API-KEY': process.env.SMS_API_KEY,
         'Content-Type': 'application/json',
         Accept: 'text/plain',
      },
   })

   return await response.json()
}
