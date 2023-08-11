export async function createSerialNumber(batch = 3) {
    let voucher = ''

    voucher = voucher.concat(generate())
    for (let i = 1; i < batch; i++) {
        voucher = voucher.concat('-')
        voucher = voucher.concat(generate())
    }

    return voucher
}

function generate() {
    let generation = ''

    while (generation.length != 5) {
        generation = Math.random().toString(36).slice(8).toUpperCase()
    }

    return generation
}
