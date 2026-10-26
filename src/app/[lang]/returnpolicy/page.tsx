export default function RefundReturnPolicy() {
  return (
    <div className="min-h-screen text-justify" style={{backgroundColor: '#050f1e'}}>
      {/* Header */}
      <header style={{backgroundColor: '#050f1e'}} className="shadow-sm border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* <h1 className="text-3xl font-bold text-slate-100">Kabbik Audiobook</h1> */}
          <p className="text-slate-300 text-clg sm:text-cxl mt-1">Refund & Return Policy</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8 py-12">
        <div style={{backgroundColor: '#050f1e'}} className="rounded-lg shadow-lg p-2 sm:p-12 border border-slate-700">
          
          {/* Introduction */}
          <div className="prose prose-slate max-w-none mb-8">
            <p className="text-slate-300 leading-relaxed">
              {`Kabbik Audiobook is a Bangladeshi digital audiobook platform offering thousands of audiobooks brought to life through immersive storytelling with background music and sound effects. It features Bangla literature and Bangla-translated international bestsellers, creating captivating listening experiences for every listener. Users can enjoy content anytime on mobile apps and the web with flexible subscription plans, one-time purchases, and rental options. Kabbik makes premium audio entertainment accessible and affordable while empowering local voice artists and creators. Our refund policy is designed to ensure transparency and fairness, protecting both our users and the platform.`}
            </p>
            <p className="text-slate-300 leading-relaxed mt-4">
              At Kabbik Audiobook we aim to maintain a fair and transparent refund policy for all users.
            </p>
            <p className="text-slate-300 leading-relaxed mt-4">
              {`Kabbik Audiobook offers both auto-renewal subscriptions and one-time subscription and rental plans. Users select their preferred plan and validity at the time of purchase, and all charges are applied according to the chosen billing cycle.`}
            </p>
            <p className="text-slate-300 leading-relaxed mt-4">
              Once a subscription is successfully activated, any charge made:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4 mt-3">
              <li>As part of an auto-renewal cycle, or</li>
              <li>For a one-time subscription or rental based on its stated validity,</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              will be considered intentional and non-refundable.
            </p>
            <p className="text-slate-300 leading-relaxed mt-4">
             {` Since all subscription purchases require OTP verification and multiple confirmation steps, users acknowledge that transactions are authorized knowingly. Therefore, refunds will not be provided for claims of accidental, mistaken, or unintended purchases.`}
            </p>
          </div>

          {/* Eligible for Refund */}
          <section className="mb-8">
            <h2 className="text-cn sm:text-2xl font-semibold text-slate-100 mb-4">✅  Eligible for Refund</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              {`A refund shall be applicable only in cases where a user is charged multiple times for the same subscription validity period, or incorrectly charged an amount or billing period, as a result of a verified system or technical error attributable to Kabbik Audiobook.`}
            </p>
            <p className="text-slate-300 leading-relaxed mb-4">
              All refund requests must be submitted within 48 hours of the transaction in question.
            </p>
            <p className="text-slate-300 leading-relaxed mb-3">
              Kabbik Audiobook reserves the right to:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Review transaction history and system logs,</li>
              <li>Verify the authenticity of refund claims, and</li>
              <li>Approve refunds solely where a genuine platform error is identified.</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              If approved, the refundable amount will be processed through the original payment method within a reasonable timeframe.
            </p>
          </section>

          {/* Not Eligible for Refund */}
          <section className="mb-8 bg-red-950 bg-opacity-30 border border-red-900 border-opacity-40 rounded-lg p-2 sm:p-6">
            <h2 className="text-cn sm:text-2xl font-semibold text-red-300 mb-4">❌ Not Eligible for Refund</h2>
            <p className="text-red-200 leading-relaxed mb-3">
              Refunds will not be issued for:
            </p>
            <ul className="list-disc list-inside text-red-200 space-y-2 ml-1 sm:ml-4">
              <li>Change of mind after purchase,</li>
              <li>Accidental or mistaken subscription claims,</li>
              <li>Valid auto-renewal charges,</li>
              <li>Expiry or non-usage of subscription benefits,</li>
              <li>Cancellation after successful activation,</li>
              <li>Any charge correctly applied as per the selected plan and validity.</li>
            </ul>
            <p className="text-red-200 leading-relaxed mt-4">
              {`Kabbik Audiobook's decision on all refund matters shall be final and binding.`}
            </p>
            <p className="text-red-200 leading-relaxed mt-4">
              Kabbik Audiobook reserves the right to modify, suspend, or discontinue this policy, in whole or in part, at any time without prior notice.
            </p>
          </section>

          {/* Subscription, One-Time Purchase, and Rental Policy */}
          <section className="mb-8 pb-8 border-b border-slate-700">
            <h2 className="text-cn sm:text-2xl font-semibold text-slate-100 mb-4">Subscription, One-Time Purchase, and Rental Policy</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Kabbik Audiobook may introduce various subscription plans from time to time to provide flexible access to its content and services.
            </p>
            <p className="text-slate-300 leading-relaxed mb-3">
              {`Users may subscribe to the available plans by paying the applicable fees at the offered frequencies (including daily, monthly, half-yearly, and yearly), or opt for one-time purchase and rental options for specific content for a specified validity period, as determined by Kabbik Audiobook from time to time. Each subscription plan will clearly state:`}
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4 mb-4">
              <li>Pricing,</li>
              <li>Validity period,</li>
              <li>Whether it is auto-renewal or one-time, and</li>
              <li>Associated benefits.</li>
            </ul>
            
            <h3 className="text-lg font-semibold text-slate-200 mb-3 mt-6">Subscription Terms:</h3>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>{`Payments must be made through payment methods enabled on the Kabbik Audiobook website (kabbik.com) or mobile application.`}</li>
              <li>{`Auto-renewal subscriptions will automatically renew at the end of each validity period unless canceled by the user before the renewal date.`}</li>
              <li>One-time subscriptions will expire automatically at the end of their validity period and will not renew unless repurchased.</li>
              <li>Subscription benefits remain active only while the subscription is valid and in good standing.</li>
            </ul>

            <p className="text-slate-300 leading-relaxed mb-3 mt-6">
              Kabbik Audiobook reserves the right to:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Change subscription pricing, plans, features, or benefits,</li>
              <li>Introduce new plans or discontinue existing ones, and</li>
              <li>Update billing practices from time to time at its discretion.</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              Any such changes will be effective upon posting on the website/application or as otherwise communicated.
            </p>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer style={{backgroundColor: '#050f1e'}} className="text-white py-8 mt-12 border-t border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400">© 2022 Kabbik Audiobook. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}