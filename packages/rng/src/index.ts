export function getRandomFloat(min, max, precision) {
   if (min >= max || precision < 0) {
      throw new Error(
         'Invalid input: min should be less than max and precision should be non-negative.'
      )
   }

   const range = max - min
   const randomValue = Math.random() * range + min

   return parseFloat(randomValue.toFixed(precision))
}

export function cyrb128(seed: string) {
   let h1 = 1779033703,
      h2 = 3144134277,
      h3 = 1013904242,
      h4 = 2773480762

   for (let i = 0, k; i < seed.length; i++) {
      k = seed.charCodeAt(i)
      h1 = h2 ^ Math.imul(h1 ^ k, 597399067)
      h2 = h3 ^ Math.imul(h2 ^ k, 2869860233)
      h3 = h4 ^ Math.imul(h3 ^ k, 951274213)
      h4 = h1 ^ Math.imul(h4 ^ k, 2716044179)
   }

   h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067)
   h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233)
   h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213)
   h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179)

   return [
      (h1 ^ h2 ^ h3 ^ h4) >>> 0,
      (h2 ^ h1) >>> 0,
      (h3 ^ h1) >>> 0,
      (h4 ^ h1) >>> 0,
   ]
}

export function sfc32(a: number, b: number, c: number, d: number) {
   return function () {
      a >>>= 0
      b >>>= 0
      c >>>= 0
      d >>>= 0
      let t = (a + b) | 0
      a = b ^ (b >>> 9)
      b = (c + (c << 3)) | 0
      c = (c << 21) | (c >>> 11)
      d = (d + 1) | 0
      t = (t + d) | 0
      c = (c + t) | 0
      return (t >>> 0) / 4294967296
   }
}

export function getSeededRandomIntInRange(
   seed: string,
   min: number,
   max: number
) {
   const hash = cyrb128(seed)

   const rand = sfc32(hash[0], hash[1], hash[2], hash[3])

   return Math.floor(rand() * (max - min) + min)
}

export function getRandomIntInRange(min: number, max: number) {
   return Math.floor(Math.random() * (max - min) + min)
}

export function getMultipleRandomIntsInRange(
   count: number,
   min: number,
   max: number
) {
   const set = new Set()

   while (set.size < count) {
      set.add(Number(Math.floor(Math.random() * (max - min) + min)))
   }

   return Array.from(set)
}

export function getRandomBoolean() {
   return getRandomIntInRange(0, 2) == 0 ? false : true
}

export function getSeededRandomBoolean(seed: string) {
   return getSeededRandomIntInRange(seed, 0, 2) == 0 ? false : true
}

export function getRandomEntryFromArrayExcept(
   array: Array<any>,
   exception: any
) {
   if (array.length < 2)
      throw new Error('Cannot provide an array with one entry.')

   let randomIndex = Math.floor(Math.random() * (array.length - 0) + 0)

   while (array[randomIndex] == exception) {
      randomIndex = Math.floor(Math.random() * (array.length - 0) + 0)
   }

   return array[randomIndex]
}

export function getRandomIndexFromArrayExcept(
   array: Array<any>,
   exception: number
) {
   if (array.length < 2)
      throw new Error('Cannot provide an array with one entry.')

   let randomIndex = Math.floor(Math.random() * (array.length - 0) + 0)

   while (randomIndex == exception) {
      randomIndex = Math.floor(Math.random() * (array.length - 0) + 0)
   }

   return randomIndex
}
