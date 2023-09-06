import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/lib/prisma'
import { generateSerial } from '@/lib/serial'

import { getGoogleTokens, getGoogleUser } from '@/lib/google'
import { signJWT } from '@/lib/jwt'

export default async function API(req: NextApiRequest, res: NextApiResponse) {
   try {
      const { id_token, access_token } = await getGoogleTokens({
         code: req.query.code,
      })

      const { id, email, name } = await getGoogleUser({
         id_token,
         access_token,
      })

      const exists = await prisma.user.findUnique({
         where: { email },
      })

      if (exists) {
         return res.status(200).json({
            Email: email,
            AccessToken: await signJWT({
               id: exists.id,
               secret: process.env.ACCESS_TOKEN_SECRET,
               expiresIn: '30d',
            }),
            RefreshToken: await signJWT({
               id: exists.id,
               secret: process.env.REFRESH_TOKEN_SECRET,
               expiresIn: '30d',
            }),
         })
      }

      if (!exists) {
         const user = await prisma.user.create({
            data: {
               email,
               name,
            },
         })

         return res.status(200).json({
            Email: email,
            AccessToken: await signJWT({
               id: user.id,
               secret: process.env.ACCESS_TOKEN_SECRET,
               expiresIn: '30d',
            }),
            RefreshToken: await signJWT({
               id: user.id,
               secret: process.env.REFRESH_TOKEN_SECRET,
               expiresIn: '30d',
            }),
         })
      }
   } catch (error) {
      const message = error.message
      return res.status(400).json({ error, message })
   }
}
