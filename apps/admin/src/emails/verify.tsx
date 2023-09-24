import {
   Body,
   Button,
   Column,
   Container,
   Head,
   Heading,
   Hr,
   Html,
   Img,
   Link,
   Preview,
   Row,
   Section,
   Tailwind,
   Text,
} from '@react-email/components'
import React from 'react'

interface VercelInviteUserEmailProps {
   name?: string
   code?: string
}

export default function Verification({
   name = 'My Project',
   code = ``,
}: VercelInviteUserEmailProps) {
   const previewText = `Verify your email.`

   return (
      <Html>
         <Head />
         <Preview>{previewText}</Preview>
         <Tailwind>
            <Body className="my-auto mx-auto w-full max-w-lg">
               <Container className="border border-solid border-neutral-500/25 rounded mx-auto p-6">
                  <Heading className="mt-0">{name}</Heading>
                  <Text>
                     Let’s make sure this is the right address we should use for
                     your account.
                  </Text>
                  <div className="w-3/4 bg-neutral-500/5 border border-solid border-neutral-400/25 rounded-lg px-6">
                     <pre className="text-base">{code}</pre>
                  </div>
                  <Text>
                     Your confirmation code is above. Enter it in your open
                     browser window and we'll help you get signed in. If you
                     didn't try to login, you can safely ignore this email.
                  </Text>
                  <Hr className="border border-solid border-neutral-500/25 my-4 mx-0 w-full" />
                  <Text className="text-xs text-center mx-auto text-neutral-500/75">
                     © {new Date().getFullYear()} {name}™. All Rights
                     Reserved.
                  </Text>
               </Container>
            </Body>
         </Tailwind>
      </Html>
   )
}
