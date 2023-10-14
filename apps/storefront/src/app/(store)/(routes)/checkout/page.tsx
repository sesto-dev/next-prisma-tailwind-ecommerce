const PrivacyPolicy = () => {
   return (
      <div className="min-h-screen py-12">
         <div className="container mx-auto p-4">
            <h1 className="text-3xl font-semibold mb-4">Privacy Policy</h1>

            <p className="mb-4">
               This Privacy Policy describes how Your E-commerce Store collects,
               uses, and protects your personal information when you use our
               website.
            </p>

            <h2 className="text-xl font-semibold mb-2">
               1. Information We Collect
            </h2>
            <p className="mb-4">
               We may collect personal information, such as your name, email
               address, and shipping address, when you make a purchase on our
               website.
            </p>

            <h2 className="text-xl font-semibold mb-2">
               2. How We Use Your Information
            </h2>
            <p className="mb-4">
               We use your personal information to process and fulfill your
               orders, provide customer support, and send you updates about your
               orders.
            </p>

            {/* Include more sections as needed for your specific privacy policy. */}

            <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
            <p className="mb-4">
               If you have any questions or concerns about our Privacy Policy,
               please contact us at{' '}
               <a href="mailto:contact@yourstore.com">contact@yourstore.com</a>.
            </p>
         </div>
      </div>
   )
}

export default PrivacyPolicy
