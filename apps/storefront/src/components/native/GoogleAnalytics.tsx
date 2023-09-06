import Script from 'next/script'

export default function GoogleAnalytics() {
   const isProduction = process.env.NODE_ENV === 'production'
   const googleID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

   const gtag = `https://www.googletagmanager.com/gtag/js?id=${googleID}`
   const gscript = {
      __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleID}', {
                  page_path: window.location.pathname,
                });
              `,
   }

   if (googleID && isProduction)
      return (
         <>
            <Script src={gtag} async />
            <Script id="gscript" dangerouslySetInnerHTML={gscript} />
         </>
      )
}
