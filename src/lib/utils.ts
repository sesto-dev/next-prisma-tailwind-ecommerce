import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
    const date = new Date(input)
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
}

export function absoluteUrl(path: string) {
    return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function isVariableValid(variable) {
    return variable !== null && variable !== undefined
}

export function validateBoolean(variable, value) {
    if (isVariableValid(variable) && variable === value) {
        return true
    }

    return false
}

export function isMacOs() {
    return window.navigator.userAgent.includes('Mac')
}
