export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen text-justify" style={{backgroundColor: '#050f1e'}}>
      {/* Header */}
      <header style={{backgroundColor: '#050f1e'}} className="shadow-sm border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* <h1 className="text-3xl font-bold text-slate-100">Kabbik Audiobook</h1> */}
          <p className="text-slate-300 text-lg sm:text-cxl mt-1">Privacy Policy</p>
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
              {`Welcome to Kabbik Audiobook ("we", "our", or "us"), a Bangladeshi digital audiobook platform that brings stories to life through immersive storytelling enriched with background music and sound effects. It features Bangla literature as well as Bangla-translated versions of international bestsellers, creating captivating listening experiences for every kind of listener. Users can enjoy content anytime through mobile apps and the web with flexible subscription plans, one-time purchases, and rental options to suit different needs. The platform makes premium audio entertainment easily accessible and affordable. At the same time, Kabbik empowers local voice artists and creators to share their voices with a wider audience. Your privacy is important to us, and this Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and mobile applications (collectively, the "Service").`}
            </p>
            <p className="text-slate-300 leading-relaxed mt-4">
              By accessing or using our Service, you agree to the terms of this Privacy Policy.
            </p>
          </div>

          {/* Section 1 */}
          <section className="mb-8">
            <h2 className="text-cn sm:text-2xl font-semibold text-slate-100 mb-4">1. Information We Collect</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              We may collect the following types of information:
            </p>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-200 mb-2">{`a) Personal Information`}</h3>
              <p className="text-slate-300 leading-relaxed mb-3">
                Information that can identify you, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                <li>{`Name / Username`}</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>{`Address (if required for billing)`}</li>
                <li>{`Profile photo (e.g., from Google sign-in)`}</li>
                <li>Login credentials</li>
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-200 mb-2">{`b) Usage & App Data`}</h3>
              <p className="text-slate-300 leading-relaxed mb-3">
                To improve performance and user experience:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                <li>App interactions and in-app activity</li>
                <li>Search and listening behavior</li>
                <li>Purchase and subscription history</li>
                <li>In-app messages or support communications</li>
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-200 mb-2">{`c) Device & Log Information`}</h3>
              <p className="text-slate-300 leading-relaxed mb-3">
                Automatically collected data such as:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                <li>IP address</li>
                <li>Device type, OS, and app version</li>
                <li>Browser type</li>
                <li>Date & time of access</li>
                <li>Pages/screens viewed</li>
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-200 mb-2">{`d) Crash & Diagnostic Data`}</h3>
              <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4 mb-3">
                <li>Crash logs</li>
                <li>Stack traces</li>
                <li>Performance diagnostics</li>
              </ul>
              <p className="text-slate-300 leading-relaxed">
                Collected to improve stability and reliability.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-2">{`e) Cookies & Tracking Technologies`}</h3>
              <p className="text-slate-300 leading-relaxed mb-3">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                <li>Remember preferences</li>
                <li>Understand user behavior</li>
                <li>Improve our services</li>
              </ul>
              <p className="text-slate-300 leading-relaxed mt-4">
                You may disable cookies in your browser, but some features may not function properly.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-8">
            <h2 className="text-cn sm:text-2xl font-semibold text-slate-100 mb-4">2. How We Use Your Information</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              We use collected information to:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Provide and operate the Service</li>
              <li>Manage accounts and subscriptions</li>
              <li>Process payments and prevent fraud</li>
              <li>Personalize content and recommendations</li>
              <li>Improve features and performance</li>
              <li>Communicate updates, offers, and notifications</li>
              <li>Provide customer support</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-8">
            <h2 className="text-cn sm:text-2xl font-semibold text-slate-100 mb-4">3. Sharing of Information</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              We do not sell your personal information.
            </p>
            <p className="text-slate-300 leading-relaxed mb-3">
              We may share information only:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>{`With trusted service providers (payment gateways, analytics, hosting) strictly for service operation`}</li>
              <li>To comply with legal obligations or lawful requests</li>
              <li>To protect rights, safety, and security of users and Kabbik Audiobook</li>
              <li>In case of business transfer or merger</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              All partners are bound by confidentiality and data protection obligations.
            </p>
          </section>

          {/* Section 4 */}
          <section className="mb-8">
            <h2 className="text-cn sm:text-2xl font-semibold text-slate-100 mb-4">4. Data Retention</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              We retain your personal data only as long as necessary:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>To provide services,</li>
              <li>For legal, regulatory, or accounting requirements,</li>
              <li>Or to resolve disputes and enforce agreements.</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              When no longer needed, data is securely deleted or anonymized.
            </p>
          </section>

          {/* Section 5 */}
          <section className="mb-8">
            <h2 className="text-cn sm:text-2xl font-semibold text-slate-100 mb-4">5. Data Security</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              We implement industry-standard security measures:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>{`Encryption in transit (HTTPS/SSL) for data transfer`}</li>
              <li>Secure servers and access controls</li>
              <li>Regular monitoring and updates</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              However, no method of transmission or storage is 100% secure. We strive to protect your data but cannot guarantee absolute security.
            </p>
          </section>

          {/* Section 6 */}
          <section className="mb-8">
            <h2 className="text-cn sm:text-2xl font-semibold text-slate-100 mb-4">6. Communications</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              We may contact you via email, SMS, or in-app notifications for:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Account updates</li>
              <li>Service-related messages</li>
              <li>{`Newsletters or promotions (you can opt out anytime)`}</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="mb-8">
            <h2 className="text-cn sm:text-2xl font-semibold text-slate-100 mb-4">7. Third-Party Services & Analytics</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              We may use tools like Google Analytics, Firebase, or similar to:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Monitor usage,</li>
              <li>Analyze trends,</li>
              <li>Improve performance.</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              These third parties have their own privacy policies governing their use of data.
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-8">
            <h2 className="text-cn sm:text-2xl font-semibold text-slate-100 mb-4">{`8. Children's Privacy`}</h2>
            <p className="text-slate-300 leading-relaxed">
              {`Our Service is not intended for children under the age of 13 (or higher age as required by local law). We do not knowingly collect personal information from children. If we become aware of such data, we will delete it promptly.`}
            </p>
          </section>

          {/* Section 9 */}
          <section className="mb-8">
            <h2 className="text-cn sm:text-2xl font-semibold text-slate-100 mb-4">9. Your Privacy Rights</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              Depending on your jurisdiction, you may have the right to:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Access your data</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion</li>
              <li>Withdraw consent</li>
              <li>Object to certain processing</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              You may contact us to exercise these rights.
            </p>
          </section>

          {/* Section 10 */}
          <section className="mb-8">
            <h2 className="text-cn sm:text-2xl font-semibold text-slate-100 mb-4">10. Log Data</h2>
            <p className="text-slate-300 leading-relaxed">
              When you access our Service, we may collect log data such as IP address, device type, pages visited, time spent, and other statistics to analyze usage and improve our platform.
            </p>
          </section>

          {/* Section 11 */}
          <section className="mb-8">
            <h2 className="text-cn sm:text-2xl font-semibold text-slate-100 mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              We may update this Privacy Policy from time to time. Updates will be posted on this page with a new effective date.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Your continued use of the Service after changes means you accept the revised policy. For major changes, we may notify you via email or in-app notice.
            </p>
          </section>

          {/* Section 12 */}
          <section className="mb-8">
            <h2 className="text-cn sm:text-2xl font-semibold text-slate-100 mb-4">12. Fair Use Notice</h2>
            <p className="text-slate-300 leading-relaxed">
              {`This platform respects copyright laws applicable in Bangladesh and relevant international copyright conventions. Any use of content for purposes such as criticism, review, education, or research shall be governed by the principles of fair dealing as recognized under applicable law.`}
            </p>
          </section>

          {/* Section 13 - Contact */}
          <section className="mb-8 pb-8 border-b border-slate-700">
            <h2 className="text-cn sm:text-2xl font-semibold text-slate-100 mb-4">13. Contact Us</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
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