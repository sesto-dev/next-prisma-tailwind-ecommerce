import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { NextApiRequest, NextApiResponse } from 'next'

export function getRequestBody(req: NextApiRequest) {
    const contentType = req.headers['content-type']

    let json

    if (contentType === 'application/json') {
        json = req.body
    } else if (contentType === 'application/json-string') {
        json = JSON.parse(req.body)
    } else {
        throw new Error('Unsupported Content-Type')
    }

    return json
}

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

export function slugify(str) {
    str = str.replace(/^\s+|\s+$/g, '')

    // Make the string lowercase
    str = str.toLowerCase()

    // Remove accents, swap ñ for n, etc
    var from =
        'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;'
    var to =
        'AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------'
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
    }

    // Remove invalid chars
    str = str
        .replace(/[^a-z0-9 -]/g, '')
        // Collapse whitespace and replace by -
        .replace(/\s+/g, '-')
        // Collapse dashes
        .replace(/-+/g, '-')

    return str
}
