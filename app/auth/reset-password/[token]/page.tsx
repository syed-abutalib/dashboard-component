"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { DEVELOPMENT_API } from "@/components/common/Http";

export default function ResetPassword() {
  const { token } = useParams(); // dynamic param from /auth/reset-password/[token]
  const searchParams = useSearchParams();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 👇 Auto-fill email from query param
  useEffect(() => {
    const emailFromQuery = searchParams.get("email");
    if (emailFromQuery) {
      setEmail(emailFromQuery);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !passwordConfirmation) {
      toast.error("All fields are required.");
      return;
    }

    if (password !== passwordConfirmation) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(`${DEVELOPMENT_API}/reset-password`, {
        token,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      toast.success(res.data.message || "Password reset successful.");
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1000);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-600 via-indigo-100 to-purple-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md transform transition-all duration-500 scale-[1.02]">
        <div className="backdrop-blur-xl bg-white/30 dark:bg-gray-800/30 border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-2xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          <div className="p-8">
            <h5 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
              Reset Password
            </h5>
            <p className="text-center text-gray-600 dark:text-gray-300">
              Enter new password for your account
            </p>

            <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                readOnly // ✅ email comes from reset link, should not be editable
                className="bg-gray-200 dark:bg-gray-700 border border-gray-300 text-gray-900 dark:text-white text-sm rounded-lg w-full p-2.5 cursor-not-allowed"
              />
              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 text-gray-900 dark:text-white text-sm rounded-lg w-full p-2.5"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 text-gray-900 dark:text-white text-sm rounded-lg w-full p-2.5"
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full text-white cursor-pointer bg-gradient-to-r from-purple-500 to-purple-600 font-medium rounded-lg text-sm px-5 py-2.5 shadow-lg hover:shadow-xl disabled:opacity-70"
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
