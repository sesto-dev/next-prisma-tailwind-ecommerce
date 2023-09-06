import type { NextApiRequest, NextApiResponse } from 'next'

import { IdentifyAccess, signJWT, verifyAndGetJWTPayload } from '@/lib/jwt'
import { isVariableValid } from '@/lib/utils'
import Refresh from 'middlewares/Refresh'

export default Refresh(async (req: NextApiRequest, res: NextApiResponse) => {
   try {
      const { id } = await IdentifyAccess({
         req,
         secret: process.env.REFRESH_TOKEN_SECRET,
      })

      return res.status(200).json({
         AccessToken: await signJWT({
            id,
            secret: process.env.ACCESS_TOKEN_SECRET,
            expiresIn: '30d',
         }),
      })
   } catch (error) {
      const message = error.message
      console.error({ error, message })
      return res.status(400).json({ error, message })
   }
})
