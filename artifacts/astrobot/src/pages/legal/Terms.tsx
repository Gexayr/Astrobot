import React from 'react';
import { Link } from 'wouter';
import { LegalLayout } from './LegalLayout';
import { LEGAL } from '@/lib/legal';

const Mail = () => <a href={`mailto:${LEGAL.contactEmail}`}>{LEGAL.contactEmail}</a>;

export default function Terms() {
  return (
    <LegalLayout title="Terms of Service">
      <p>
        These Terms govern your use of the {LEGAL.siteName} website and the AstroBot reservation (pre-order)
        program run by {LEGAL.companyName} (“<strong>we</strong>”, “<strong>us</strong>”). By using the site or
        submitting a form, you agree to these Terms. If you do not agree, please do not use the site.
      </p>

      <h2>1. Reservations (pre-orders)</h2>
      <ul>
        <li>
          <strong>No payment is taken.</strong> Submitting the reservation form records your interest and holds a
          place in the queue. It is not a purchase and does not create a binding sales contract.
        </li>
        <li>
          <strong>Non-binding for you.</strong> You can cancel a reservation at any time, free of charge, by emailing{' '}
          <Mail />.
        </li>
        <li>
          <strong>Confirmation before you pay.</strong> Before shipping we will contact you with the final price,
          delivery terms, estimated date and a payment link. A sales contract is formed only when you confirm and pay
          for the order, under the terms shown at that time.
        </li>
        <li>
          <strong>Early Bird price.</strong> The advertised Early Bird price applies to reservations made while the
          offer is shown on the site, subject to availability. Taxes, duties and shipping may vary by country and will
          be shown before payment.
        </li>
        <li>
          <strong>Availability and dates.</strong> Launch and delivery dates are estimates. We may limit quantities,
          decline or cancel reservations (for example, if they are fraudulent or we cannot ship to your country). If
          we cancel, we will let you know by email.
        </li>
      </ul>

      <h2>2. Product information</h2>
      <p>
        AstroBot is in development. Images, specifications, features and accessories shown on the site may change
        before release. Images may be renders or illustrations. We will tell you about material changes before you
        pay.
      </p>

      <h2>3. Use of the website</h2>
      <p>You agree not to:</p>
      <ul>
        <li>submit false information or another person’s data without their permission;</li>
        <li>send spam or automated requests, or try to overload, disrupt or gain unauthorised access to the site;</li>
        <li>use the site for any unlawful purpose.</li>
      </ul>
      <p>You must be at least 16 years old, or have a parent’s or guardian’s permission, to submit a form.</p>

      <h2>4. Intellectual property</h2>
      <p>
        The AstroBot name, logo, designs, images, text and code on this site belong to {LEGAL.companyName} or its
        licensors and are protected by law. You may view and share pages for personal, non-commercial purposes, but
        you may not copy, modify or reuse the content commercially without our written permission.
      </p>

      <h2>5. Privacy</h2>
      <p>
        We handle personal data as described in our <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>6. Disclaimer</h2>
      <p>
        The website is provided “as is” and “as available”. We work to keep information accurate and the site
        available, but we do not guarantee it will always be error-free or uninterrupted.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        To the extent permitted by law, we are not liable for indirect or consequential losses arising from your
        use of the website or from a reservation. Because no payment is taken for a reservation, our total
        liability in connection with a reservation is limited to the amount you have paid us for it, if any.
        Nothing in these Terms limits liability that cannot be limited by law, or your statutory rights as a
        consumer.
      </p>

      <h2>8. Changes</h2>
      <p>
        We may update these Terms. The date at the top shows the latest version. Changes do not affect orders you
        have already confirmed and paid for.
      </p>

      <h2>9. Governing law</h2>
      <p>
        These Terms are governed by the laws of {LEGAL.governingLaw}, without prejudice to mandatory consumer
        protection rules of the country where you live.
      </p>

      <h2>10. Contact</h2>
      <p>
        {LEGAL.companyName}, {LEGAL.companyAddress}
        <br />
        Email: <Mail />
      </p>
    </LegalLayout>
  );
}
