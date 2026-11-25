import React from 'react';
import { Link } from 'wouter';
import { LegalLayout } from './LegalLayout';
import { LEGAL } from '@/lib/legal';

const Mail = () => <a href={`mailto:${LEGAL.contactEmail}`}>{LEGAL.contactEmail}</a>;

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy">
      <p>
        This Privacy Policy explains how {LEGAL.companyName} (“<strong>we</strong>”, “<strong>us</strong>”)
        collects, uses and protects personal data when you visit this website, subscribe to our updates or
        reserve an AstroBot. We collect as little as we need and never sell your data.
      </p>

      <h2>1. Who is responsible for your data</h2>
      <p>
        The data controller is {LEGAL.companyName}, {LEGAL.companyAddress}. For any privacy question or request,
        contact us at <Mail />.
      </p>

      <h2>2. What we collect</h2>
      <table>
        <thead>
          <tr>
            <th>When</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>You subscribe to updates</td>
            <td>Email address, date of subscription</td>
          </tr>
          <tr>
            <td>You reserve an AstroBot (pre-order)</td>
            <td>Name, email, quantity and — if you choose to provide them — phone number, country and comment</td>
          </tr>
          <tr>
            <td>You visit the site</td>
            <td>
              Technical data your browser sends automatically (IP address, browser type, requested page, time).
              It is used for security and abuse prevention and kept in server logs for a short period.
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        We do <strong>not</strong> collect payment details: reservations are currently free and no payment is taken
        on this website. We do not knowingly collect data from children — see section 9.
      </p>

      <h2>3. Why we use it and on what legal basis</h2>
      <ul>
        <li>
          <strong>Sending product news and launch updates</strong> — based on your consent. You can withdraw it at any
          time (see section 7).
        </li>
        <li>
          <strong>Handling your reservation</strong> — contacting you about availability, price, shipping and the
          final order. Legal basis: steps taken at your request before entering into a contract.
        </li>
        <li>
          <strong>Keeping the site secure</strong> — rate-limiting and preventing spam or abuse. Legal basis: our
          legitimate interest in operating a safe service.
        </li>
        <li>
          <strong>Meeting legal obligations</strong> — for example, accounting or responding to lawful requests from
          authorities.
        </li>
      </ul>
      <p>We do not use your data for automated decision-making or profiling.</p>

      <h2>4. Cookies and tracking</h2>
      <p>
        This website does not use advertising or analytics cookies and does not track you across other sites. If
        we add analytics in the future, we will update this policy and, where required, ask for your consent first.
      </p>
      <p>
        The site loads fonts from Google Fonts. When your browser requests them, Google receives your IP address.
        See <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google’s Privacy Policy</a>.
      </p>

      <h2>5. Who we share data with</h2>
      <p>We never sell or rent personal data. We share it only with service providers that help us run the site:</p>
      <ul>
        <li><strong>Hosting provider</strong> — stores the website and database on our behalf.</li>
        <li>
          <strong>Internal notification tools</strong> (e.g. Telegram) — used to notify our team about new
          reservations.
        </li>
        <li><strong>Email provider</strong> — used to send you updates and reservation emails.</li>
        <li>
          <strong>Shipping and payment partners</strong> — only once you place a final order, and only the data they
          need to deliver it.
        </li>
      </ul>
      <p>
        We may also disclose data if required by law or to protect our rights. Some providers may process data
        outside your country; where this happens we rely on appropriate safeguards such as Standard Contractual
        Clauses.
      </p>

      <h2>6. How long we keep it</h2>
      <ul>
        <li><strong>Subscribers</strong> — until you unsubscribe.</li>
        <li>
          <strong>Reservations</strong> — until the reservation is fulfilled or cancelled, and then up to 24 months, or
          longer if the law requires it (for example, for completed orders and invoices).
        </li>
        <li><strong>Server logs</strong> — up to 30 days.</li>
      </ul>

      <h2>7. Your rights</h2>
      <p>Depending on where you live (including under the GDPR and similar laws), you have the right to:</p>
      <ul>
        <li>access the personal data we hold about you and receive a copy;</li>
        <li>correct inaccurate data;</li>
        <li>have your data deleted;</li>
        <li>restrict or object to certain processing;</li>
        <li>data portability;</li>
        <li>withdraw consent at any time, without affecting earlier processing;</li>
        <li>lodge a complaint with your local data protection authority.</li>
      </ul>
      <p>
        To use any of these rights — including to unsubscribe or cancel a reservation — email <Mail />. Every update
        email also includes an unsubscribe link. We reply within 30 days.
      </p>

      <h2>8. Security</h2>
      <p>
        We use encrypted connections (HTTPS), limit access to personal data to people who need it, and protect our
        servers against abuse. No system is completely secure, but we work to protect your data and will notify you
        and the authorities of a breach where the law requires.
      </p>

      <h2>9. Children</h2>
      <p>
        AstroBot is designed for children, but this website and its forms are meant for parents, guardians and
        adults. Children under 16 should not submit personal data. If you believe a child has sent us data, contact
        us and we will delete it.
      </p>

      <h2>10. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The date at the top shows the latest version. If changes are
        significant, we will let subscribers know by email.
      </p>

      <h2>11. Contact</h2>
      <p>
        {LEGAL.companyName}, {LEGAL.companyAddress}
        <br />
        Email: <Mail />
      </p>
      <p>
        See also our <Link href="/terms">Terms of Service</Link>.
      </p>
    </LegalLayout>
  );
}
