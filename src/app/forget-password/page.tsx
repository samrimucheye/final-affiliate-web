"use client";
import React, { useState } from "react";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/forgetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setSubmitted(true);
    } catch (err: any) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          Forgot Password
        </h2>
        {submitted ? (
          <div className="text-green-600 text-center font-medium">
            If an account with that email exists, a password reset link has been
            sent.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}
        <div className="mt-6 text-center">
          <a href="/login" className="text-indigo-600 hover:underline text-sm">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
