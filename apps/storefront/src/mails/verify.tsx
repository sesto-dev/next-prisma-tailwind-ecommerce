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

export const VercelInviteUserEmail = ({
   name = 'My Project',
   code = ``,
}: VercelInviteUserEmailProps) => {
   const previewText = `Verify your email.`

   return (
      <Html>
         <Head />
         <Preview>{previewText}</Preview>
         <Tailwind>
            <Body className="bg-white my-auto mx-auto font-sans">
               <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
                  <Section className="mt-[32px]">{name}</Section>
                  <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0"></Heading>
                  <Text className="text-black text-[14px] leading-[24px]">
                     Hello! Welcome to {name}!
                  </Text>
                  <Text className="text-black text-[14px] leading-[24px]">
                     There’s one quick step you need to complete before gaining
                     full access to your account. Let’s make sure this is the
                     right address we should use for your new account.
                  </Text>

                  <Text className="text-black text-[14px] leading-[24px]">
                     {code}
                  </Text>
                  <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                  <Text className="text-[#666666] text-[12px] leading-[24px]">
                     Don't like these emails?{' '}
                     <Link href={process.env.NEXT_PUBLIC_URL + '/unsubscribe'}>
                        Unsubscribe
                     </Link>
                     .
                  </Text>
               </Container>
            </Body>
         </Tailwind>
      </Html>
   )
}

export default VercelInviteUserEmail
