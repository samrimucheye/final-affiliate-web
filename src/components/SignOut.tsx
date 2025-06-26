"use client";
import { signOut } from "next-auth/react";
import React from "react";

const SignOut: React.FC = () => {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Sign Out
    </button>
  );
};

export default SignOut;
