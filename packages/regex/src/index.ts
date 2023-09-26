const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/
const iranianPhoneRegex = /^0[0-9]{2,}[0-9]{7,}$/

export function isEmailValid(email: string) {
   return emailRegex.test(email)
}

export function isPhoneNumberValid(phoneNumber: string) {
   return phoneRegex.test(phoneNumber)
}

export function isIranianPhoneNumberValid(phoneNumber: string) {
   return iranianPhoneRegex.test(phoneNumber)
}
