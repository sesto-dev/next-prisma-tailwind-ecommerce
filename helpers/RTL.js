export function isLocaleRTL(locale) {
    const RTLs = new Set([
        'ar',
        'arc',
        'dv',
        'fa',
        'ha',
        'he',
        'khw',
        'ks',
        'ku',
        'ps',
        'ur',
        'yi',
    ])

    if (RTLs.has(locale)) return true

    return false
}

export function getLocaleDirection(locale) {
    return isLocaleRTL(locale) ? 'rtl' : 'ltr'
}

export function getLocaleAlignment(locale) {
    return isLocaleRTL(locale) ? 'right' : 'left'
}
