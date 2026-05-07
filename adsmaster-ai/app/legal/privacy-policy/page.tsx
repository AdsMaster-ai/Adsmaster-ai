import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 leading-relaxed font-sans">
      <header className="mb-10 text-center bg-gradient-to-br from-indigo-600 to-indigo-800 py-10 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-2 text-white">Privacy Policy</h1>
        <p className="text-indigo-100 opacity-90">AdsMaster – www.adsmaster.in</p>
      </header>

      <div className="bg-blue-50 border-l-4 border-indigo-500 p-4 rounded-r-md text-sm text-indigo-800 mb-8">
        Last Updated: June 1, 2025 | Effective Date: June 1, 2025
      </div>

      <p className="mb-6">
        Welcome to <strong>AdsMaster</strong>. This Privacy Policy explains how we collect, use, and protect your information when you use <strong>www.adsmaster.in</strong>.
      </p>

      {/* Section 1 */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b-2 border-indigo-100 pb-2 text-indigo-950">1. Information We Collect</h2>
      
      <h3 className="text-lg font-semibold text-indigo-700 mt-4 mb-2">1.1 Information You Provide</h3>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Account Information:</strong> Name, email address, password</li>
        <li><strong>Payment Information:</strong> Billing details via our secure payment processor (we do not store card numbers)</li>
        <li><strong>Google Account Data:</strong> Via Google OAuth – name, email, profile picture, and Google Ads account access as permitted by you</li>
        <li><strong>Communications:</strong> Emails or messages you send us</li>
      </ul>

      <h3 className="text-lg font-semibold text-indigo-700 mt-4 mb-2">1.2 Automatically Collected</h3>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>IP address, browser type, OS, pages visited, timestamps</li>
        <li>Device information and unique identifiers</li>
        <li>Usage data – features used, session duration</li>
      </ul>

      <div className="bg-green-50 border border-green-200 rounded-lg p-5 my-6 text-green-800">
        <p><strong>Cookie Notice:</strong> AdsMaster does not currently use tracking or advertising cookies. Only strictly necessary session cookies for authentication may be used.</p>
      </div>

      {/* Section 2 */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b-2 border-indigo-100 pb-2 text-indigo-950">2. How We Use Your Information</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>To provide, operate, and improve our services</li>
        <li>To process your subscription and manage your account</li>
        <li>To connect with and manage your Google Ads account as authorized</li>
        <li>To send transactional emails (receipts, security alerts, updates)</li>
        <li>To respond to support requests</li>
        <li>To detect and prevent fraud or abuse</li>
        <li>To comply with legal obligations</li>
      </ul>

      {/* Section 3 */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b-2 border-indigo-100 pb-2 text-indigo-950">3. Google OAuth & Limited Use Policy</h2>
      <p className="mb-4">
        AdsMaster's use of information from Google APIs complies with the <a href="https://developers.google.com/terms/api-services-user-data-policy" className="text-indigo-600 underline">Google API Services User Data Policy</a>, including Limited Use requirements.
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>We only request Google data scopes necessary for our services</li>
        <li>We do not sell your Google user data to any third parties</li>
        <li>We do not use Google data for advertising purposes unrelated to your own campaigns</li>
        <li>We do not allow humans to read your Google data without your consent except for security or legal reasons</li>
        <li>You can revoke access anytime at <a href="https://myaccount.google.com/permissions" className="text-indigo-600 underline">myaccount.google.com/permissions</a></li>
      </ul>

      {/* Section 4 */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b-2 border-indigo-100 pb-2 text-indigo-950">4. Sharing Your Information</h2>
      <p className="mb-6">We do not sell or rent your personal data. We may share data only with:</p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Service Providers:</strong> Hosting, payment processing, email delivery partners under data agreements</li>
        <li><strong>Legal Requirements:</strong> When required by law or governmental authority</li>
        <li><strong>Business Transfers:</strong> In connection with a merger or acquisition, with notice to you</li>
      </ul>

      {/* Section 5-7 (Condensed) */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b-2 border-indigo-100 pb-2 text-indigo-950">5. Data Retention</h2>
      <p className="mb-6">We retain your data as long as your account is active. After account deletion, personal data is deleted within 30 days except where legally required to retain.</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b-2 border-indigo-100 pb-2 text-indigo-950">6. Data Security</h2>
      <p className="mb-6">We use SSL/TLS encryption, secure servers, and access controls to protect your data. No internet transmission is 100% secure, but we follow industry best practices.</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b-2 border-indigo-100 pb-2 text-indigo-950">7. Your Rights</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Access, correct, or delete your personal data</li>
        <li>Request data portability</li>
        <li>Withdraw consent at any time</li>
      </ul>
      <p className="mb-6 italic">Email us at <a href="mailto:adsmaster0@zohomail.in" className="text-indigo-600">adsmaster0@zohomail.in</a> to exercise these rights.</p>

      {/* Footer / Contact */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b-2 border-indigo-100 pb-2 text-indigo-950">10. Contact Us</h2>
      <ul className="list-none mb-10 space-y-2">
        <li><strong>Email:</strong> <a href="mailto:adsmaster0@zohomail.in" className="text-indigo-600">adsmaster0@zohomail.in</a></li>
        <li><strong>Website:</strong> <a href="https://www.adsmaster.in" className="text-indigo-600">www.adsmaster.in</a></li>
      </ul>

      <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>© 2025 AdsMaster | All Rights Reserved</p>
      </footer>
    </div>
  );
}