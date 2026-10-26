'use client'
import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number|null>(null);

  const toggleAccordion = (index:number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Kabbik Audiobook?",
      answer: "Kabbik Audiobook is a Bangladeshi digital platform offering thousands of audiobooks brought to life with immersive storytelling, background music, and sound effects. It features Bangla literature and Bangla-translated international bestsellers for captivating listening experiences. Users can enjoy content on mobile apps and the web with flexible subscription, one-time purchase, and rental options. Kabbik makes premium audio entertainment accessible while empowering local voice artists and creators, with a refund policy designed to ensure transparency and fairness."
    },
    {
      question: "How can I find the Kabbik Audiobook application (app) and website?",
      answer: "You can download the Kabbik Audiobook app by searching for \"Kabbik Audiobook\" on the Google Play Store or Apple App Store. You can also visit our official website at www.kabbik.com. For quick access to download the app directly, please visit: https://kabbik.com/download-app."
    },
    {
      question: "How do I sign up for a Kabbik account?",
      answer: "You can sign up for a Kabbik account using any of the following methods:\n\nMobile Number: Enter your phone number and verify it with a one-time password(OTP).\n\nGoogle Sign-In: Use your Google account for quick and easy access.\n\nFacebook Login: Sign in using your Facebook account for fast registration"
    },
    {
      question: "What is the service model, and how does it work?",
      answer: "Kabbik Audiobook & Podcast offers flexible access to content through subscription-based plans, one-time purchases, and rental options. Users can choose from Daily, Monthly, Half-Yearly, or Yearly recurring subscription plans to enjoy a wide range of audiobooks and podcasts. Alternatively, users may also purchase individual audiobooks separately, which will be available for listening for a validity period of 60 days from the date of purchase. This allows listeners to choose the option that best suits their needs and listening habits."
    },
    {
      question: "How do I subscribe, purchase, or activate the service?",
      answer: "To subscribe, purchase, or activate the Kabbik Audiobook service, visit www.kabbik.com or download the app by searching for \"Kabbik Audiobook\" on the Google Play Store or Apple App Store. You can also use the direct download link: https://kabbik.com/download-app.\n\nAfter installing the app, sign up or log in using any of the following methods:\n\nMobile Number: Enter your phone number and verify it with a one-time password (OTP).\n\nGoogle Sign-In: Use your Google account for quick and easy access.\n\nFacebook Login: Sign in using your Facebook account for fast registration.\n\nOnce logged in, select your preferred subscription plan, one-time purchase, or rental option, choose a suitable payment method, and complete the payment."
    },
    {
      question: "How do I unsubscribe or stop the service?",
      answer: "To unsubscribe, log in to your Kabbik Audiobook account through the app or website, go to the Profile section, and select Unsubscribe or Manage Subscription. You can also visit: https://kabbik.com/profile for guidance.\n\nIf you subscribed using Google Pay (Google Play), Apple Pay (Apple In-App Purchase), or Stripe, you must cancel your subscription directly from the respective platform or payment provider, as they manage billing on your behalf.\n\nOnce unsubscribed, your service will remain active until the end of the current billing period, and no further charges will be made. For any assistance, please contact support@wondersoftsolution.com"
    },
    {
      question: "I need a refund, as I didn't activate the service, or I didn't get the service although I was charged.",
      answer: "Subscription activation on Kabbik Audiobook requires OTP verification and multiple confirmation steps. Therefore, all successful subscriptions are considered to be made with the user's consent, and accidental or unauthorized activations are not possible.\n\nAs a result, refunds are generally not available for subscriptions that have been successfully activated, including renewed subscriptions.\n\nHowever, if you believe you were charged but did not receive access to the service due to a verified technical or system issue, you may contact our support team for review:\n\n📧 Email: support@wondersoftsolution.com\n📞 Mobile: 01915225026\n\nKabbik support team will investigate the issue, and if a genuine system error is identified, appropriate action will be taken in accordance with our Refund Policy."
    },
    {
      question: "Will I get any notification for activation or deactivation?",
      answer: "Yes, you will receive notifications for both activation and deactivation of your service. These notifications may be sent via SMS, in-app notifications, and/or on-screen confirmation messages on the app or website upon successful activation or deactivation."
    },
    {
      question: "I have subscribed, but I can't access premium content. What should I do?",
      answer: "Please contact Kabbik support at support@wondersoftsolution.com or call +880 1915-225026 (regular call charges may apply) for quick assistance."
    },
    {
      question: "Will the auto-renew feature work for the service?",
      answer: "Yes, if you have activated an auto-renewal subscription plan, your subscription will be renewed automatically at the end of each billing cycle. To ensure successful renewal, please make sure that your selected payment method (such as mobile balance or card) has sufficient funds at the time of renewal."
    },
    {
      question: "What are one-time subscription and rental options, and how do they work?",
      answer: "With the one-time subscription option, you can access the premium service and enjoy all available audiobooks for a selected validity period, such as 6 months or 1 year, without any recurring charges. This plan provides full access for the defined period and will automatically expire at the end of its validity.\n\nThe rental option allows you to listen to selected audiobooks for a shorter, fixed period, such as 60 days, at a lower cost. Both options are non-recurring and will automatically expire at the end of their respective validity periods unless you choose to subscribe, purchase, or rent the content again."
    },
    {
      question: "What payment methods are available, and when will my service be activated?",
      answer: "Kabbik Audiobook supports multiple payment methods, including bKash, Nagad, debit/credit cards, and mobile balance wallets (GP, Robi, Banglalink). For international users, payments can be made using Google Pay, Apple Pay, and Stripe. Once your payment is completed successfully, your service will be activated automatically without any further steps."
    },
    {
      question: "I am not receiving the OTP for login or password reset. What should I do?",
      answer: "Please make sure that you have entered your mobile number correctly and that your phone has network coverage to receive SMS messages. Also, wait a few moments and try requesting the OTP again.\n\nIf you still do not receive the OTP, please contact our support team for assistance by emailing support@wondersoftsolution.com or calling 01915225026."
    },
    {
      question: "Do I need internet access while using the app or listening to audiobooks?",
      answer: "Yes, an active internet connection is required to browse content and use the Kabbik Audiobook app or website. Standard data charges may apply as per your network provider. However, premium subscribers can download up to 50 audiobooks per month and enjoy listening to them offline without using mobile data."
    },
    {
      question: "Can I use Wi-Fi to download and listen to audiobooks or access the app services?",
      answer: "Yes, you can use a Wi-Fi connection to download audiobooks and access all features of the Kabbik Audiobook app and website. Using Wi-Fi can help you save mobile data while enjoying our services."
    },
    {
      question: "If I unsubscribe before my subscription validity ends, will I still have access to premium content?",
      answer: "Yes, even if you unsubscribe before the end of your current subscription period, you will continue to have access to premium content until the subscription validity expires. No further charges will be made after the expiry unless you choose to subscribe again."
    },
    {
      question: "Can I upgrade my current premium subscription plan?",
      answer: "Yes, you can upgrade your subscription plan at any time. Simply log in to your Kabbik Audiobook account, go to the Profile section, and select the Upgrade Plan option. You will see the available plans that are higher than your current package.\n\nOnce you choose a new plan and complete the instant payment, your upgraded plan will be activated immediately. The charges and validity of the new plan will start from the date of the upgrade."
    },
    {
      question: "What benefits do I get as a premium subscriber?",
      answer: "As a premium subscriber of Kabbik Audiobook, you will enjoy the following benefits:\n\n1. Access to 3,000+ audiobooks, including all existing and upcoming premium content\n2. Ad-free listening experience\n3. High-quality audio for immersive storytelling\n4. Offline downloads to listen without internet\n5. Sleep timer for convenient bedtime listening\n6. Music on/off option for personalized audio experience\n7. Playback speed control to suit your preference\n8. Early access to new releases and exclusive content\n9. Access to Kabbik rewards and refer & earn features"
    },
    {
      question: "How does the Kabbik Refer & Earn program work?",
      answer: "When you are a premium subscriber of Kabbik Audiobook, you will find your unique referral code in the Profile section under the \"Refer & Earn\" tab. Share this code with your friends. When a friend signs up using your code and purchases any premium subscription for the first time, they will receive a 20% discount, and you will earn TK. 20 cash for each successful referral.\n\nTo withdraw your earned amount, go to the Profile section under the \"Refer & Earn\" tab in the app or on the website and click the Claim button. Then follow the on-screen instructions to complete the process. The more you refer, the more you earn!"
    },
    {
      question: "How do Kabbik Reward Points work?",
      answer: "Kabbik Reward Points are earned when you complete certain activities on the platform, such as first sign-up, referring friends, subscribing to plans, renting audiobooks, enrolling in Kabbik Voice Artist and Presentation courses, or rating content. You can collect these points and redeem them for rewards like mobile recharge, data packs, gift Kabbik subscriptions, or vouchers (such as ৳5000 Diamond World/Aarong) from the Rewards section in your profile.\n\nAs you earn more points, you will also level up through stages such as Shrabon Suchona, Chhonder Jatra, Golpo Pathik, Shruti Premy, Kothar Karigor, and Shrabon Siddho. The more you use Kabbik, the more points and rewards you can enjoy!"
    },
    {
      question: "Whom should I contact for any queries regarding the Kabbik Audiobook service?",
      answer: "For any questions or issues during your service validity, you may contact our support team by emailing support@wondersoftsolution.com or calling 01915225026. Kabbik support team will be happy to assist you."
    }
  ];

  return (
    <div className="min-h-screen" style={{backgroundColor: '#050f1e'}}>
      {/* Header */}
      <header style={{backgroundColor: '#050f1e'}} className="shadow-sm border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* <h1 className="text-3xl font-bold text-slate-100">Kabbik Audiobook</h1> */}
          <p className="text-slate-300 text-cn2 sm:text-cxl mt-1">Frequently Asked Questions (FAQ)</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={{backgroundColor: '#050f1e'}}
              className="border border-slate-700 rounded-lg overflow-hidden"
            >
              {/* Question Header */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-slate-800 hover:bg-opacity-30 transition-colors duration-200"
              >
                <span className="text-slate-100 font-semibold pr-4">
                  {index + 1}. {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Answer Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-4 pt-2 border-t border-slate-700">
                  <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
}