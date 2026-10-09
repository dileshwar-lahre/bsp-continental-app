'use client';

import { useState } from 'react';

export default function WpOtpSendPage() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('');

    try {
      const res = await fetch('/api/wpotpsend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sendTo: phone }),
      });

      const data = await res.json();

      if (data.success) {
        setStatusMessage('OTP successfully sent to your WhatsApp number!');
      } else {
        setStatusMessage('Failed to send OTP. Please check the number.');
      }
    } catch (error) {
      setStatusMessage('An error occurred while sending OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-emerald-400">WhatsApp OTP Verification</h2>
        
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Mobile Number (e.g. 919752...)</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500 text-white"
              placeholder="Enter mobile number"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>

        {statusMessage && (
          <p className="mt-4 text-center text-sm text-gray-300 bg-gray-900 p-3 rounded-lg border border-gray-700">
            {statusMessage}
          </p>
        )}
      </div>
    </div>
  );
}