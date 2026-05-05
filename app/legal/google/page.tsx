export default function GoogleAdsDisclosure() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 leading-relaxed font-sans">
      {/* Google-Themed Header */}
      <header className="mb-10 text-center bg-gradient-to-r from-red-500 to-yellow-500 py-10 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-2 text-white drop-shadow-md">Google Ads Disclosure</h1>
        <p className="text-white opacity-90">AdsMaster – How We Access & Use Your Google Data</p>
      </header>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md text-sm text-blue-800 mb-8">
        Last Updated: June 1, 2025 | Effective Date: June 1, 2025
      </div>

      <p className="mb-6">
        This disclosure explains how <strong>AdsMaster</strong> accesses, uses, and protects data obtained through Google APIs, including Google OAuth 2.0, in compliance with Google's policies.
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 my-6 text-blue-900">
        <p><strong>Important:</strong> AdsMaster's use of information received from Google APIs adheres to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" className="underline font-medium">Google API Services User Data Policy</a>, including the Limited Use requirements.</p>
      </div>

      {/* Section 1 */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b-2 border-indigo-100 pb-2 text-indigo-950">1. Why We Use Google OAuth</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Sign in securely using your Google account</li>
        <li>Connect your Google Ads account to our platform</li>
        <li>View, manage, and optimize your Google Ads campaigns from within AdsMaster</li>
        <li>Receive performance analytics and reporting on your ad spend</li>
      </ul>

      {/* Scopes Table */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b-2 border-indigo-100 pb-2 text-indigo-950">2. What Data We Access (Scopes)</h2>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 border border-blue-600">Google API Scope</th>
              <th className="p-3 border border-blue-600">Access Type</th>
              <th className="p-3 border border-blue-600">Why We Need It</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-blue-50 transition-colors">
              <td className="p-3 border border-blue-100 font-mono text-sm">profile / email</td>
              <td className="p-3 border border-blue-100">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-bold uppercase">Read</span>
              </td>
              <td className="p-3 border border-blue-100 text-sm">To identify you and manage your AdsMaster account</td>
            </tr>
            <tr className="hover:bg-blue-50 transition-colors">
              <td className="p-3 border border-blue-100 font-mono text-sm">Google Ads API (adwords)</td>
              <td className="p-3 border border-blue-100">
                <div className="flex gap-1">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-bold uppercase">Read</span>
                  <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs font-bold uppercase">Write</span>
                </div>
              </td>
              <td className="p-3 border border-blue-100 text-sm">To view and manage campaigns, budgets, and keywords on your behalf</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* What We Do NOT Do */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b-2 border-indigo-100 pb-2 text-indigo-950">4. What We Do NOT Do With Your Google Data</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
        <li>We do <strong>not</strong> sell your Google user data to third parties.</li>
        <li>We do <strong>not</strong> use your Google data for our own marketing.</li>
        <li>We do <strong>not</strong> use Google data to build individual profiles for advertising.</li>
        <li>We do <strong>not</strong> transfer Google data to AI/ML training systems.</li>
      </ul>

      {/* Revoking Access */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b-2 border-indigo-100 pb-2 text-indigo-950">6. Revoking Access</h2>
      <p className="mb-4 text-gray-700">You can revoke AdsMaster's access to your Google account at any time:</p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Via your <a href="https://myaccount.google.com/permissions" target="_blank" className="text-blue-600 hover:underline">Google Account Permissions page</a></li>
        <li>By deleting your AdsMaster account</li>
        <li>By contacting support at <a href="mailto:adsmaster0@zohomail.in" className="text-blue-600 hover:underline">adsmaster0@zohomail.in</a></li>
      </ul>

      {/* Contact Section */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b-2 border-indigo-100 pb-2 text-indigo-950">9. Contact Us</h2>
      <ul className="list-none mb-10 space-y-2">
        <li><strong>Email:</strong> <a href="mailto:adsmaster0@zohomail.in" className="text-indigo-600 hover:underline">adsmaster0@zohomail.in</a></li>
        <li><strong>Website:</strong> <a href="https://www.adsmaster.in" className="text-indigo-600 hover:underline">www.adsmaster.in</a></li>
      </ul>

      <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm italic">
        <p>© 2025 AdsMaster | Compliant with Google API Services Policies</p>
      </footer>
    </div>
  );
}