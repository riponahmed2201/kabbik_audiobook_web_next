import React from 'react';
import styles from './static/termsAndCondition.module.css'

export default function TermsAndConditions() {
  return (
    <div className={styles.rootCont +` text-justify`}>
      <div className={styles.container}>
      <div className={styles.circularGradient}></div>
      <div className={styles.circularGradient2}></div>
      
      <div className={styles.content}>
        {/* <h1 className={styles.mainTitle}>Terms and Conditions</h1> */}
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Terms Of Use</h2>
          <p className={styles.paragraph+` text-justify`}>
            {`These Terms of Use govern the use of 'Kabbik' website (www.Kabbik.com) ("Website"), 
            the 'Kabbik' application also available on Android ("Application") and iOS ("Application") 
            by any person.`}
          </p>
          <p className={styles.paragraph+` text-justify`}>
            {`On the Website/Application, a User can listen to audio works published by the publisher 
            and to some extent, audio works uploaded by other Users.`}
          </p>
          <p className={styles.paragraph+` text-justify`}>
           {` Company Content, Sourced Content and User Contents shall together be referred to as 
            "Content". In order to enrich the User's experience while utilizing the Website/Application, 
            Company may offer ancillary features ("Features") including but not limited to:`}
          </p>
          <ul className={styles.list+` text-justify`}>
            <li>submitting reviews on the Content</li>
            <li>{`setting a username, profile picture and entering other details on the User's profile`}</li>
          </ul>
          <p className={styles.paragraph+` text-justify`}>
            All material uploaded by the User while using these ancillary Features shall be referred 
            to as User Content.
          </p>
          <p className={styles.paragraph+` text-justify`}>
            {`All the above features offered by the Company shall be referred to as services. By browsing 
            through the Website/Application and availing the Services, You agree to be bound by these 
            Terms of Use read along with the Privacy Policy and have the authority to enter into a 
            binding contract with Company.`}
          </p>
          <p className={styles.paragraph+` text-justify`}>
            {`This is an electronic record under the Information Technology Act, 2000 and rules there under. 
            Therefore, no signature is required to make the Terms of Use binding on the User. These Terms 
            of Use along with the Privacy Policy have been formulated as required under Rule 3 (1) (a) of 
            the Information Technology (Intermediaries Guidelines and Digital Media Ethics Code) Rules, 2021.`}
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Payment</h2>
          
          <h6 className={styles.subsectionTitle}>Pay per Content</h6>
          <p className={styles.paragraph+` text-justify`}>
           {` Users may have the option to pay and listen to certain Content. Upon payment, the User shall 
            have access to listen to the Content for perpetuity till User's account is active on the 
            Website/Application.`}
          </p>

          <h6 className={styles.subsectionTitle}>Limited License</h6>
          <p className={styles.paragraph+` text-justify`}>
            {`User's shall have a limited license to view the Content accessed upon payment and no other 
            rights such as right to transfer, resell or any ownership rights in the Content shall vest 
            in the User. User may access such paid Content solely through his/her account. The price for 
            each Content shall be as determined by the Company from time to time.`}
          </p>

          <h6 className={styles.subsectionTitle}>Mode of Payment</h6>
          <p className={styles.paragraph+` text-justify`}>
            A User may make payments using any of the options available on the Website/Application including:
          </p>
          <ul className={styles.list+` text-justify`}>
            <li>{`through wallets linked with the Website/Application;`}</li>
            <li>{`debit/credit cards;`}</li>
            <li>{`Unified Payment Interface;`}</li>
            <li>{`Net banking;`}</li>
            <li>such other payment options as are made available on the Website/Application from time to time.</li>
          </ul>
          <p className={styles.paragraph+` text-justify`}>
            {`These payment gateways are managed solely by third party service providers and therefore the 
            use of such payment gateways will be governed by the terms and conditions of such third-party 
            service providers. The User agrees that his/her use of a third-party payment gateway is at 
            their sole option and risk.`}
          </p>

          <h6 className={styles.subsectionTitle}>Free Access</h6>
          <p className={styles.paragraph+` text-justify`}>
            {`Company may offer the User access to limited portions of any paid Content for free at its 
            discretion to any or all Users.`}
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>In-app subscription (Apple)</h2>
          
          <h6 className={styles.subsectionTitle}>Length of subscription</h6>
          <ul className={styles.list+` text-justify`}>
            <li><strong>{`Monthly subscription:`}</strong> {`Monthly subscription to the Audiobook Subscription 
            service, including access to full audiobook content for the subscription period.`}</li>
            <li><strong>{`Yearly subscription:`}</strong> {`Yearly subscription to the Audiobook Subscription 
            service, including access to full audiobook content for the subscription period.`}</li>
            <li><strong>{`Half-yearly subscription:`}</strong> {`Half-yearly subscription to the Audiobook 
            Subscription service, including access to full audiobook content for the subscription period.`}</li>
          </ul>

          <h6 className={styles.subsectionTitle}>{`Price of subscription (Applicable for apple In-app subscription)`}</h6>
          <ul className={styles.list}>
            <li>{`Monthly subscription: $0.99 USD per month.`}</li>
            <li>Half-yearly subscription: $4.99 USD per six months.</li>
            <li>Yearly subscription: $9.99 USD per year.</li>
          </ul>

          <h6 className={styles.subsectionTitle}>Payment will be charged to iTunes Account at confirmation of purchase 
          (Applicable for apple subscription)</h6>
          <p className={styles.paragraph}>
            Your iTunes account will be charged for the subscription at the time of purchase.
          </p>

          <h6 className={styles.subsectionTitle}>Payment will be processed by third-party service providers 
          (Applicable for third party subscription)</h6>
          <p className={styles.paragraph}>
            Your payment will be processed by third-party service providers, such as bKash, Nagad, and Upai. 
            You will be redirected to their website to complete your payment and agree to their terms and 
            conditions before payment starts.
          </p>

          <h6 className={styles.subsectionTitle}>{`Subscription automatically renews unless auto-renew is turned off 
          at least 24-hours before the end of the current period (Applicable for apple subscription)`}</h6>
          <p className={styles.paragraph}>
            Your subscription will automatically renew unless you cancel at least 24 hours before the end 
            of the current subscription period.
          </p>

          <h6 className="subsectionTitle">{`Account will be charged for renewal within 24-hours prior to 
          the end of the current period, and identify the cost of the renewal (Applicable for apple subscription)`}</h6>
          <p className="paragraph">
            {`Your account will be charged for the renewal within 24 hours before the end of the current 
            subscription period, at a cost of:`}
          </p>
          <ul className="list">
            <li>Monthly subscription: $0.99 USD</li>
            <li>Half-yearly subscription: $4.99 USD</li>
            <li>Yearly subscription: $9.99 USD</li>
          </ul>

          <h6 className="subsectionTitle">{`Subscriptions may be managed by the user and auto-renewal may 
          be turned off by going to the user's Account Settings after purchase`}</h6>
          <p className="paragraph">
            You can manage your subscriptions and turn off auto-renewal by going to your Account Settings 
            after purchase.
          </p>

          <p className="paragraph">
            We will active user premium feature after successful subscription.
          </p>

          <h6 className="subsectionTitle">{`Refund Policy (For Apple Subscriptions)`}</h6>
          <p className="paragraph">
            You can cancel your subscription at any time by going to your Account Settings. However, you 
            will not be refunded for any unused portion of the subscription period.
          </p>

          <p className="paragraph">
            If you have any questions or concerns about your apple subscription, please contact us at 
            wondersoftsolution@gmail.com.
          </p>
        </section>
      </div>

      <style jsx>{`
        
      `}</style>
    </div>
    </div>
  );
}