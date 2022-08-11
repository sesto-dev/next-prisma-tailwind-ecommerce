export default function (locale) {
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
