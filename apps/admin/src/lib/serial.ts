export function generateSerial({
   batchCount = 1,
   batchSize = 5,
   alphanumeric = false,
}) {
   function generateAlphanumerics() {
      let generation = ''

      while (generation.length != batchSize) {
         generation = Math.random().toString(36).slice(8).toUpperCase()
      }

      return generation
   }

   function generateNumerics() {
      let generation = ''

      while (generation.length != batchSize) {
         generation = Math.floor(Math.random() * Math.pow(10, batchSize))
            .toString()
            .padStart(batchSize, '0')
      }

      return generation
   }

   let voucher = ''

   voucher = voucher.concat(
      alphanumeric ? generateAlphanumerics() : generateNumerics()
   )

   for (let i = 1; i < batchCount; i++) {
      voucher = voucher.concat('-')
      voucher = voucher.concat(
         alphanumeric ? generateAlphanumerics() : generateNumerics()
      )
   }

   return voucher
}
