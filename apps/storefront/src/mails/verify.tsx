import {
   Body,
   Button,
   Container,
   Column,
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
            <Body className="my-auto mx-auto font-sans">
               <Container className="border border-solid border-neutral-500/25 rounded mx-auto p-6">
                  <Heading className="mt-0">{name}</Heading>
                  <Text className="">
                     Let’s make sure this is the right address we should use for
                     your new account.
                  </Text>
                  <div className="w-3/4 bg-neutral-500/5 border border-solid border-neutral-400/25 rounded-lg px-6">
                     <Text className="text-lg">{code}</Text>
                  </div>
                  <Text className="">
                     Input the code above to gain access to your account.
                  </Text>
               </Container>
            </Body>
         </Tailwind>
      </Html>
   )
}
