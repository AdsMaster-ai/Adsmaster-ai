import React from 'react';

export default function ContactUs() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 leading-relaxed font-sans">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-4">
        Contact Us
      </h1>
      <p className="mb-8 text-gray-600">
        We're here to help – AdsMaster Team
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm h-fit">
          <h2 className="text-xl font-bold mb-6 text-gray-900 border-b pb-2">Get In Touch</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0">✉</div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email</p>
                <p className="text-indigo-600 font-medium">adsmaster0@zohomail.in</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0">🕐</div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Support Hours</p>
                <p className="text-gray-900 font-medium">Monday – Friday<br/>10:00 AM – 6:00 PM IST</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-xl text-blue-800 text-sm border border-blue-100">
            ⚡ <strong>Response Time:</strong> We typically respond within 24–48 business hours.
          </div>
        </div>

        {/* Info Card / Instructions */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-gray-900">How to reach us?</h2>
          <p className="text-gray-600 mb-4 text-sm md:text-base">
            For the fastest support, please send an email to our official support address with the following details:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 mb-6">
            <li>Your Registered Name</li>
            <li>Subject of your query (Billing, Tech, etc.)</li>
            <li>Detailed description of the issue</li>
          </ul>
          
          <a 
            href="mailto:adsmaster0@zohomail.in" 
            className="block w-full text-center bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition-all shadow-md"
          >
            Send Email Now →
          </a>
        </div>
      </div>

      {/* Legal Links Footer Area */}
      <div className="mt-12">
        <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">Legal & Policy Pages</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Google Ads Disclosure', 'Refund Policy', 'FAQs'].map((policy) => (
            <div key={policy} className="p-3 border border-gray-100 rounded-lg bg-gray-50 text-center text-xs font-semibold text-gray-600">
              {policy}
            </div>
          ))}
        </div>
      </div>

      <footer className="mt-12 pt-8 border-t border-gray-100 text-center text-sm text-gray-500">
        <p>© 2026 AdsMaster | www.adsmaster.in</p>
      </footer>
    </div>
  );
}