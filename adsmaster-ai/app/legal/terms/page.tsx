import React from 'react';

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 leading-relaxed font-sans">
      <header className="mb-10 text-center bg-gradient-to-br from-indigo-600 to-purple-700 py-10 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-2 text-white">Terms of Service</h1>
        <p className="text-indigo-100 opacity-90">AdsMaster – www.adsmaster.in</p>
      </header>

      <div className="bg-blue-50 border-l-4 border-indigo-500 p-4 rounded-r-md text-sm text-indigo-800 mb-8">
        Last Updated: June 1, 2025 | Effective Date: June 1, 2025
      </div>

      <p className="mb-6">
        Please read these Terms of Service ("Terms") carefully before using <strong>www.adsmaster.in</strong> operated by <strong>AdsMaster</strong>. By accessing or using our service, you agree to be bound by these Terms.
      </p>

      {/* Section 1 & 2 */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b-2 border-indigo-100 pb-2 text-indigo-950">1. Acceptance of Terms</h2>
      <p className="mb-6">By creating an account or using AdsMaster's services, you confirm that you are at least 18 years old, have read and understood these Terms, and agree to be legally bound by them.</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b-2 border-indigo-100 pb-2 text-indigo-950">2. Description of Service</h2>
      <p className="mb-6">AdsMaster is a Google Ads management platform that connects to your Google Ads account via OAuth 2.0 to help you manage, optimize, and analyze your advertising campaigns. Features vary by subscription plan.</p>

      {/* Pricing Table Section */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b-2 border-indigo-100 pb-2 text-indigo-950">3. Subscription Plans & Pricing</h2>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="p-3 border border-indigo-600">Plan</th>
              <th className="p-3 border border-indigo-600">Price</th>
              <th className="p-3 border border-indigo-600">Billing</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-indigo-50 transition-colors">
              <td className="p-3 border border-indigo-100 font-medium">Starter</td>
              <td className="p-3 border border-indigo-100">₹999/month</td>
              <td className="p-3 border border-indigo-100">Monthly</td>
            </tr>
            <tr className="hover:bg-indigo-50 transition-colors">
              <td className="p-3 border border-indigo-100 font-medium">Professional</td>
              <td className="p-3 border border-indigo-100">₹2,499/month</td>
              <td className="p-3 border border-indigo-100">Monthly</td>
            </tr>
            <tr className="hover:bg-indigo-50 transition-colors">
              <td className="p-3 border border-indigo-100 font-medium">Enterprise</td>
              <td className="p-3 border border-indigo-100">₹4,999/month</td>
              <td className="p-3 border border-indigo-100">Monthly</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mb-6 text-sm text-gray-600 italic">All prices are in Indian Rupees (INR). Subscriptions auto-renew unless cancelled.</p>

      {/* Warning Box for Refund Policy */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b-2 border-indigo-100 pb-2 text-indigo-950">7. No Refund Policy</h2>
      <div className="bg-red-50 border border-red-200 rounded-lg p-5 my-6 text-red-900">
        <p className="font-semibold mb-2">All subscription payments are non-refundable.</p>
        <p className="text-sm">Once a subscription plan is purchased, no refunds will be issued for any reason, including but not limited to: unused service period or accidental purchase. You will retain full access for the entire paid duration.</p>
      </div>

      {/* Other Sections (Simplified for brevity) */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b-2 border-indigo-100 pb-2 text-indigo-950">5. Acceptable Use</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Use the service for any unlawful purpose or in violation of Google's policies.</li>
        <li>Reverse engineer, decompile, or disassemble our software.</li>
        <li>Transmit malicious code, viruses, or harmful data.</li>
        <li>Resell or sublicense our service without written permission.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b-2 border-indigo-100 pb-2 text-indigo-950">10. Limitation of Liability</h2>
      <p className="mb-6">AdsMaster shall not be liable for any indirect, incidental, or consequential damages. Our total liability shall not exceed the amount paid by you in the last 3 months.</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b-2 border-indigo-100 pb-2 text-indigo-950">13. Governing Law</h2>
      <p className="mb-6">These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in India.</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b-2 border-indigo-100 pb-2 text-indigo-950">15. Contact</h2>
      <ul className="list-none mb-10 space-y-2">
        <li><strong>Email:</strong> <a href="mailto:adsmaster0@zohomail.in" className="text-indigo-600 hover:underline">adsmaster0@zohomail.in</a></li>
        <li><strong>Website:</strong> <a href="https://www.adsmaster.in" className="text-indigo-600 hover:underline">www.adsmaster.in</a></li>
      </ul>

      <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>© 2025 AdsMaster | Professional Ads Management Platform</p>
      </footer>
    </div>
  );
}