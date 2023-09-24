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
import * as React from 'react'

interface VercelInviteUserEmailProps {
   orderNum?: string
   payable?: string
   id?: string
}

const baseUrl = process.env.VERCEL_URL
   ? `https://${process.env.VERCEL_URL}`
   : ''

export const VercelInviteUserEmail = ({
   orderNum = '0',
   payable = '0',
   id = 'My Project',
}: VercelInviteUserEmailProps) => {
   const previewText = `Order #${orderNum} was created was created with a value of $${payable}.`
   const orderLink = process.env.NEXT_PUBLIC_URL + `/orders/${id}`
   return (
      <Html>
         <Head />
         <Preview>{previewText}</Preview>
         <Tailwind>
            <Body className="bg-white my-auto mx-auto font-sans">
               <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
                  <Section className="mt-[32px]">
                     <Img
                        src={`${baseUrl}/static/vercel-logo.png`}
                        width="40"
                        height="37"
                        alt="Vercel"
                        className="my-0 mx-auto"
                     />
                  </Section>
                  <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                     Check the order.
                  </Heading>
                  <Text className="text-black text-[14px] leading-[24px]">
                     Hello!
                  </Text>
                  <Text className="text-black text-[14px] leading-[24px]">
                     Order #{orderNum} was created was created with a value of $
                     {payable}.
                  </Text>

                  <Section className="text-center mt-[32px] mb-[32px]">
                     <Button
                        pX={20}
                        pY={12}
                        className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center"
                        href={orderLink}
                     >
                        See the order.
                     </Button>
                  </Section>
                  <Text className="text-black text-[14px] leading-[24px]">
                     or copy and paste this URL into your browser:{' '}
                     <Link
                        href={orderLink}
                        className="text-blue-600 no-underline"
                     >
                        {orderLink}
                     </Link>
                  </Text>
                  <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                  <Text className="text-[#666666] text-[12px] leading-[24px]">
                     If you were not expecting this invitation, you can ignore
                     this email. If you are concerned about your account's
                     safety, please reply to this email to get in touch with us.
                  </Text>
               </Container>
            </Body>
         </Tailwind>
      </Html>
   )
}

export default VercelInviteUserEmail
