export default function TermsAndConditions() {
  return (
    <div className="min-h-screen text-justify" style={{backgroundColor: '#050f1e'}}>
      {/* Header */}
      <header style={{backgroundColor: '#050f1e'}} className="shadow-sm border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* <h1 className="text-3xl font-bold text-slate-100">Kabbik Audiobook</h1> */}
          <p className="text-slate-300 font-semibold text-cn2  sm:text-clg mt-1">Terms and Conditions / Terms of Use</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div style={{backgroundColor: '#050f1e'}} className="rounded-lg shadow-lg p-2 sm:p-12 border border-slate-700">
          {/* Effective Date & Website */}
          <div className="mb-8 pb-6 border-b border-slate-700">
            <p className="text-slate-300"><strong className="text-slate-200">Effective Date:</strong> 1st January, 2022</p>
            <p className="text-slate-300 mt-2">
              <strong className="text-slate-200">Website:</strong>{' '}
              <a href="https://kabbik.com" className="text-blue-400 hover:text-blue-300 underline">
                https://kabbik.com
              </a>
            </p>
          </div>

          {/* Introduction */}
          <div className="prose prose-slate max-w-none mb-8">
            <p className="text-slate-300 leading-relaxed">
              {`Welcome to Kabbik Audiobook ("we", "our", "us", or the "Company"), a Bangladeshi digital platform offering thousands of audiobooks brought to life with immersive storytelling, background music, and sound effects. It features Bangla literature and Bangla-translated international bestsellers for captivating listening experiences. Users can enjoy content on mobile apps and the web with flexible subscription plans, one-time purchases, and rental options. Kabbik makes premium audio entertainment accessible while empowering local voice artists and creators. These Terms and Conditions govern your access to and use of our website and mobile applications on Android and iOS (collectively, the "Service")`}
            </p>
            <p className="text-slate-300 leading-relaxed mt-4">
              {`By accessing or using our Service, you agree to be bound by these Terms and Conditions ("Terms") and our Privacy Policy. If you do not agree, please do not use the Service.`}
            </p>
            <p className="text-slate-300 leading-relaxed mt-4">
              These Terms constitute an electronic record under applicable laws and do not require physical or digital signatures.
            </p>
          </div>

          {/* Section 1 */}
          <section className="mb-8">
            <h2 className="text-cn sm:text-2xl  font-semibold text-slate-100 mb-4">1. Eligibility</h2>
            <p className="text-slate-300 leading-relaxed">
              {`You must be at least 13 years old (or the minimum age required by law in your jurisdiction) to use the Service. By using the Service, you represent that you have the legal capacity to enter into a binding agreement.`}
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-8">
            <h2 className="text-cn sm:text-2xl  font-semibold text-slate-100 mb-4">2. Description of Service</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              {`Kabbik Audiobook allows users to stream and listen to diverse audio content, including Bangla literature and Bangla-translated international bestsellers, along with other audio programs, provided by the Company, its licensors, and, where permitted, other users ("Content").`}
            </p>
            <p className="text-slate-300 leading-relaxed mb-3">We may also provide features such as:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Creating user profiles,</li>
              <li>Setting usernames and profile pictures,</li>
              <li>Submitting reviews or feedback,</li>
              <li>Receiving recommendations, and</li>
              <li>{`Other interactive features (collectively, "Features").`}</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              {`Content and Features together form part of our "Services"`}
            </p>
          </section>

          {/* Section 3 */}
          <section className="mb-8">
            <h2 className="text-cn sm:text-2xl  font-semibold text-slate-100 mb-4">3. User Accounts</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              To access certain features, you may be required to create an account. You agree to:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Provide accurate information,</li>
              <li>Keep your login credentials secure, and</li>
              <li>Be responsible for all activity under your account.</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              We reserve the right to suspend or terminate accounts for violations of these Terms.
            </p>
          </section>

          {/* Section 4 */}
          <section className="mb-8">
            <h2 className="text-cn sm:text-2xl  font-semibold text-slate-100 mb-4">4. Content & Limited License</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              All Content available on kabbik.com is the property of, or is licensed to, Wondersoft Solution, the owner of the Kabbik Audiobook platform, and is protected under applicable copyright and intellectual property laws.
            </p>
            <p className="text-slate-300 leading-relaxed mb-4">
              Upon payment or subscription, users are granted a limited, non-exclusive, non-transferable, revocable license to stream and access the Content solely for personal, non-commercial use through the Service.
            </p>
            <p className="text-slate-300 leading-relaxed mb-3">You may not:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>{`Download (unless explicitly allowed), copy, or reproduce Content,`}</li>
              <li>Modify, distribute, resell, sublicense, or publicly perform Content,</li>
              <li>Use Content for commercial purposes.</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              No ownership rights in the Content are transferred to you.
            </p>
          </section>

          {/* Section 5 */}
          <section className="mb-8">
            <h2 className="text-cn sm:text-2xl  font-semibold text-slate-100 mb-4">{`5. Payments & Access`}</h2>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-200 mb-2">{`a) Pay-Per-Content`}</h3>
              <p className="text-slate-300 leading-relaxed">
                {`Some Content may be available for individual purchase. Upon successful payment, you may access such Content for as long as your account remains active, subject to these Terms.`}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-2">{`b) Free Access`}</h3>
              <p className="text-slate-300 leading-relaxed">
                We may, at our discretion, allow limited free access to certain portions of paid Content.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-8">
            <h2 className="text-cn sm:text-2xl  font-semibold text-slate-100 mb-4">6. Subscriptions</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              {`Kabbik Audiobook may offer subscription plans, including daily, monthly, half-yearly, yearly, auto-renewal, rental or one-time plans.`}
            </p>
            <p className="text-slate-300 leading-relaxed mb-3 font-semibold">Key Terms:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Subscription fees and benefits will be displayed at the time of purchase.</li>
              <li>Subscriptions grant access to premium Content during the validity period only.</li>
              <li>Auto-renewal subscriptions will renew automatically unless canceled at least 24 hours before the end of the current period.</li>
              <li>One-time subscriptions will expire at the end of their validity and will not auto-renew.</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              Premium access will be activated after successful payment.
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-8">
            <h2 className="text-cn sm:text-2xl  font-semibold text-slate-100 mb-4">{`7. In-App Subscriptions (Apple)`}</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              {`For Apple users, subscriptions are handled through Apple's In-App Purchase system.`}
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Payment is charged to your Apple ID at confirmation of purchase.</li>
              <li>Subscriptions auto-renew unless canceled at least 24 hours before the end of the period.</li>
              <li>Your account will be charged within 24 hours prior to renewal at the applicable rate.</li>
              <li>You can manage or cancel subscriptions via your Apple account settings.</li>
              <li>{`Refunds, if any, are governed strictly by Apple's App Store policies. No refunds are provided for unused portions.`}</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              For Apple-related queries, contact:
              <a href="mailto:support@wondersoftsolution.com" className="text-blue-400 hover:text-blue-300 underline">
                support@wondersoftsolution.com
              </a>
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-8">
            <h2 className="text-cn sm:text-2xl  font-semibold text-slate-100 mb-4">{`8. In-App Subscriptions (Google Play / Google Pay)`}</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              {`For Android users, subscriptions and in-app purchases are handled through Google Play Billing and may be paid using Google Pay or other payment methods supported by Google.`}
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Payment will be charged to your Google account at the time of confirmation of purchase.</li>
              <li>Subscriptions will automatically renew unless canceled at least 24 hours before the end of the current subscription period.</li>
              <li>{`Your account will be charged for renewal within 24 hours prior to the end of the current period at the applicable subscription rate.`}</li>
              <li>You can manage or cancel your subscriptions at any time through your Google Play account settings.</li>
              <li>{`Refunds, if any, are subject strictly to Google Play's refund and subscription policies. No refunds will be provided for any unused portion of the subscription period unless required by Google's policies.`}</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              {`For Google Play–related queries, please contact:`}{' '}
              <a href="mailto:support@wondersoftsolution.com" className="text-blue-400 hover:text-blue-300 underline">
                support@wondersoftsolution.com
              </a>
            </p>
          </section>

          {/* Section 9 */}
          <section className="mb-8">
            <h2 className="text-cn sm:text-2xl  font-semibold text-slate-100 mb-4">9. Third-Party Payments (Android/Web)</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
             {` Payments may be processed through third-party providers and billing partners, including but not limited to mobile operator direct carrier billing (DOB) services such as Robi, Grameenphone (GP), and Banglalink, digital wallets like bKash, Nagad, and Upay, payment platforms such as Google Pay, Apple pay and Stripe, as well as debit/credit cards, or any other payment gateways made available on the kabbik audiobook website (kabbik.com) or mobile application from time to time.`}
            </p>
            <p className="text-slate-300 leading-relaxed mb-3">You agree that:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>These gateways are operated by third parties,</li>
              <li>Their terms and policies apply, and</li>
              <li>{`Kabbik Audiobook shall not be liable for any acts, omissions, errors, delays, or failures of third-party payment service providers, including their charging methods or services.`}</li>
            </ul>
          </section>

          {/* Section 10 */}
          <section className="mb-8">
            <h2 className="text-cn sm:text-2xl  font-semibold text-slate-100 mb-4">10. Refund Policy</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              {`All payments are generally non-refundable, except as expressly stated in our Refund Policy.`}
            </p>
            <p className="text-slate-300 leading-relaxed mb-4">
             {` Refunds may be granted only in cases of verified system errors resulting in duplicate charges within the same subscription validity period, if reported within 48 hours.`}
            </p>
            <p className="text-slate-300 leading-relaxed">
              Charges made correctly as per selected plans, including auto-renewals and one-time subscriptions, are non-refundable.
            </p>
          </section>

          {/* Section 11 */}
          <section className="mb-8">
            <h2 className="text-cn sm:text-2xl  font-semibold text-slate-100 mb-4">11. User Conduct</h2>
            <p className="text-slate-300 leading-relaxed mb-3">You agree not to:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Use the Service for unlawful purposes,</li>
              <li>Post or transmit harmful, abusive, or offensive content,</li>
              <li>Attempt to hack, disrupt, or misuse the platform,</li>
              <li>Infringe intellectual property or privacy rights.</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              We may suspend or terminate access for violations.
            </p>
          </section>

          {/* Section 12 */}
          <section className="mb-8">
            <h2 className="text-cn sm:text-2xl  font-semibold text-slate-100 mb-4">12. Termination</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              We may suspend or terminate your access at any time, with or without notice, if you breach these Terms or misuse the Service.
            </p>
            <p className="text-slate-300 leading-relaxed">
              You may stop using the Service at any time.
            </p>
          </section>

          {/* Section 13 */}
          <section className="mb-8">
            <h2 className="text-cn sm:text-2xl  font-semibold text-slate-100 mb-4">13. Disclaimer of Warranties</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
             {` The Service is provided on an "as is" and "as available" basis. We do not guarantee uninterrupted or error-free operation.`}
            </p>
            <p className="text-slate-300 leading-relaxed">
              To the fullest extent permitted by law, we disclaim all warranties, express or implied.
            </p>
          </section>

          {/* Section 14 */}
          <section className="mb-8">
            <h2 className="text-cn sm:text-2xl  font-semibold text-slate-100 mb-4">14. Limitation of Liability</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              {`Kabbik Audiobook shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service.`}
            </p>
            <p className="text-slate-300 leading-relaxed">
              {`Our total liability shall not exceed the amount paid by you to us in the preceding period, to the extent permitted by law.`}
            </p>
          </section>

          {/* Section 15 */}
          <section className="mb-8">
            <h2 className="text-cn sm:text-2xl  font-semibold text-slate-100 mb-4">15. Privacy</h2>
            <p className="text-slate-300 leading-relaxed">
              Your use of the Service is also governed by our Privacy Policy, which explains how we collect and use your data.
            </p>
          </section>

          {/* Section 16 */}
          <section className="mb-8">
            <h2 className="text-cn sm:text-2xl  font-semibold text-slate-100 mb-4">16. Changes to Terms</h2>
            <p className="text-slate-300 leading-relaxed">
              We may update these Terms at any time. Changes will be effective upon posting. Continued use of the Service constitutes acceptance of the updated Terms.
            </p>
          </section>

          {/* Section 17 */}
          <section className="mb-8">
            <h2 className="text-cn sm:text-2xl  font-semibold text-slate-100 mb-4">17. Governing Law</h2>
            <p className="text-slate-300 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of Bangladesh, without regard to conflict of law principles.
            </p>
          </section>

          {/* Section 18 - Contact */}
          <section className="mb-8 pb-8 border-b border-slate-700">
            <h2 className="text-cn sm:text-2xl  font-semibold text-slate-100 mb-4">18. Contact Us</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              For any questions or concerns regarding these Terms, please contact:
            </p>
            <div className="bg-slate-800 bg-opacity-50 rounded-lg p-4 space-y-2 border border-slate-700">
              <p className="text-slate-300">
                📧 Email:{' '}
                <a href="mailto:support@wondersoftsolution.com" className="text-blue-400 hover:text-blue-300 underline">
                  support@wondersoftsolution.com
                </a>
              </p>
              <p className="text-slate-300">
                🌐 Website:{' '}
                <a href="https://kabbik.com" className="text-blue-400 hover:text-blue-300 underline">
                  https://kabbik.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      {/* <footer style={{backgroundColor: '#050f1e'}} className="text-white py-8 mt-12 border-t border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400">© 2022 Kabbik Audiobook. All rights reserved.</p>
        </div>
      </footer> */}
    </div>
  );
}