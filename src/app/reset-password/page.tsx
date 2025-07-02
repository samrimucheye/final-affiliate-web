"use client";
import { useEffect, useState } from "react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Get email from query string (e.g., /reset-password?email=someone@example.com)
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get("email");
    setEmail(emailParam);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!password || !confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!email) {
      setError("No user email found. Please log in.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/resetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword: password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Password reset successful. You can now log in.");
      } else {
        setError(data.error || "Failed to reset password.");
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)",
        padding: 16,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          padding: 32,
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: 24,
            color: "#3730a3",
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          Reset Password
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 18 }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontWeight: 500, color: "#6366f1" }}>
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #c7d2fe",
                fontSize: 16,
                outline: "none",
                transition: "border 0.2s",
              }}
              placeholder="Enter new password"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontWeight: 500, color: "#6366f1" }}>
              Confirm Password
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #c7d2fe",
                fontSize: 16,
                outline: "none",
                transition: "border 0.2s",
              }}
              placeholder="Confirm new password"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !email}
            style={{
              marginTop: 10,
              padding: "12px 0",
              borderRadius: 8,
              border: "none",
              background: loading
                ? "linear-gradient(90deg, #a5b4fc 0%, #818cf8 100%)"
                : "linear-gradient(90deg, #6366f1 0%, #3730a3 100%)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 16,
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 2px 8px rgba(99,102,241,0.08)",
              transition: "background 0.2s, box-shadow 0.2s",
            }}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
          {error && (
            <div
              style={{
                color: "#dc2626",
                background: "#fef2f2",
                borderRadius: 6,
                padding: "8px 12px",
                marginTop: 6,
                fontSize: 15,
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}
          {message && (
            <div
              style={{
                color: "#16a34a",
                background: "#f0fdf4",
                borderRadius: 6,
                padding: "8px 12px",
                marginTop: 6,
                fontSize: 15,
                textAlign: "center",
              }}
            >
              {message}
            </div>
          )}
        </form>
      </div>
      <style>{`
                                @media (max-width: 500px) {
                                        div[style*="max-width: 400px"] {
                                                padding: 18px !important;
                                                border-radius: 8px !important;
                                        }
                                        h2 {
                                                font-size: 1.3rem !important;
                                        }
                                }
                        `}</style>
    </div>
  );
}
