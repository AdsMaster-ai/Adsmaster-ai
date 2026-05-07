import React from 'react';

export default function FAQs() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 leading-relaxed font-sans">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-4">
        Frequently Asked Questions
      </h1>

      <div className="space-y-8">
        {/* General Section */}
        <div>
          <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">
            General
          </h2>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
              <p className="font-semibold text-gray-900 mb-2">What is AdsMaster?</p>
              <p className="text-gray-600 text-sm md:text-base">
                AdsMaster is a Google Ads management platform that connects to your Google Ads account via OAuth 2.0, helping you manage, optimize, and analyze your advertising campaigns from a single dashboard.
              </p>
            </div>
            <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
              <p className="font-semibold text-gray-900 mb-2">Who is AdsMaster for?</p>
              <p className="text-gray-600 text-sm md:text-base">
                AdsMaster is designed for businesses, marketers, and agencies who run Google Ads campaigns and want better tools to manage and optimize their ad spend efficiently.
              </p>
            </div>
          </div>
        </div>

        {/* Account Section */}
        <div>
          <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">
            Account & Login
          </h2>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
              <p className="font-semibold text-gray-900 mb-2">Is my Google account data safe?</p>
              <p className="text-gray-600 text-sm md:text-base">
                Yes. We use Google OAuth 2.0 and only request the minimum necessary permissions. We do not store your Google password, and you can revoke our access at any time from your Google Account settings.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div>
          <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">
            Pricing & Billing
          </h2>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
              <p className="font-semibold text-gray-900 mb-2">What plans does AdsMaster offer?</p>
              <p className="text-gray-600 text-sm md:text-base">
                We offer three monthly subscription plans: Starter (₹999/month), Professional (₹2,499/month), and Enterprise (₹4,999/month).
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-indigo-50 border border-indigo-100 rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold text-indigo-900 mb-2">Still have questions?</h3>
        <p className="text-indigo-700 mb-4 text-sm">Our team is happy to help you with any other queries.</p>
        <p className="font-semibold text-indigo-600">Contact: adsmaster0@zohomail.in</p>
      </div>

      <footer className="mt-12 pt-8 border-t border-gray-100 text-center text-sm text-gray-500">
        <p>© 2026 AdsMaster | www.adsmaster.in</p>
      </footer>
    </div>
  );
}