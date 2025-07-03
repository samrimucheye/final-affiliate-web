"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validatePassword = (pwd: string) => pwd.length >= 8;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setSuccess(false);

    if (!token) {
      setMessage("Invalid or missing token.");
      return;
    }

    if (password !== confirm) {
      setMessage("Passwords do not match.");
      return;
    }

    if (!validatePassword(password)) {
      setMessage("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "An error occurred.");
      }

      setSuccess(true);
      setMessage("✅ Password reset successful. Redirecting to login...");

      setTimeout(() => {
        router.push("/login");
      }, 2500);
    } catch (err: any) {
      setMessage(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          className="w-full border border-gray-300 px-4 py-2 rounded"
          disabled={loading || success}
        />

        <input
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          minLength={8}
          className="w-full border border-gray-300 px-4 py-2 rounded"
          disabled={loading || success}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-60"
          disabled={loading || success}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        {message && (
          <p
            className={`text-center text-sm mt-2 ${
              success ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <div className="text-xs text-gray-500 text-center">
          Password must be at least 8 characters.
        </div>
      </form>
    </div>
  );
}
