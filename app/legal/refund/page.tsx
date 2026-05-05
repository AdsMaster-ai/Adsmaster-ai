import React from 'react';

export default function RefundPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 leading-relaxed font-sans">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Refund Policy</h1>
      
      <p className="mb-4">
        AdsMaster AI ("we", "our", "us") operates a strict no-refund policy for all subscription plans. 
        This policy explains our stance on payments and cancellations.
      </p>

      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-8 text-center">
        <h3 className="text-xl font-bold text-red-700 mb-2">No Refund Policy</h3>
        <p className="text-red-900 font-medium">
          All subscription payments made to AdsMaster are <strong>final and non-refundable</strong>. 
          Please read this carefully before purchasing any plan.
        </p>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-900">1. Our Refund Policy</h2>
      <p className="mb-4">
        Once a payment is made and a subscription is activated, we do not offer refunds, partial refunds, 
        or credits for any reason. This applies to all monthly and annual plans.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-900">2. Subscription Access</h2>
      <p className="mb-4">
        When you subscribe, you receive full access to all features for the entire duration of your period. 
        Even if you cancel mid-cycle, you will keep your premium access until the 30-day period expires.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-900">3. Exceptions: Billing Errors</h2>
      <p className="mb-4">
        The only exception is a duplicate charge or billing error caused by our system. If you were 
        charged twice incorrectly, contact us at <strong>adsmaster0@zohomail.in</strong> within 7 days 
        with your payment details for a resolution.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-900">4. Cancellation</h2>
      <p className="mb-4">
        You can cancel your subscription at any time via Account Settings. No further charges will be 
        made after cancellation, but no refunds will be issued for the remaining days in your current cycle.
      </p>

      <footer className="mt-12 pt-8 border-t border-gray-100 text-center text-sm text-gray-500">
        <p>© 2025 AdsMaster | www.adsmaster.in</p>
      </footer>
    </div>
  );
}