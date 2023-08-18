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

export function countObjectsWithIdMatch(arrayOfObjects, variantid) {
    const count = arrayOfObjects.reduce((accumulator, currentObject) => {
        if (currentObject['variant']['id'] === variantid) {
            return accumulator + 1
        }
        return accumulator
    }, 0)

    console.log({ count })
    return count
}
