"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { DEVELOPMENT_API } from "@/components/common/Http";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrors({ email: "Email is required" });
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(`${DEVELOPMENT_API}/forgot-password`, {
        email,
      });

      // success response
      toast.success(res.data.message || "Reset link sent to your email.");
      setEmail("");
      setErrors({});
    } catch (error: any) {
      // Laravel validation error
      if (error.response?.data?.errors?.email) {
        const emailError = error.response.data.errors.email[0];
        setErrors({ email: emailError });
        toast.error(emailError);
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong, try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-600 via-indigo-100 to-purple-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="w-full max-w-md transform transition-all duration-500 scale-[1.02]">
          <span className="mb-3 inline-block">
            <Link
              href="/"
              className="text-base font-bold text-left text-gray-800 dark:text-white hover:underline"
            >
              <ArrowLeft className="inline-block" size={20} /> Back
            </Link>
          </span>
          <div className="absolute -z-10 top-1/4 left-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -z-10 top-1/3 right-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -z-10 bottom-1/4 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

          <div className="backdrop-blur-xl bg-white/30 dark:bg-gray-800/30 border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-2xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            <div className="p-8">
              <h5 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
                Forgot Password
              </h5>
              <p className="text-center text-gray-600 dark:text-gray-300">
                Enter your email to receive reset link
              </p>

              <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({});
                    }}
                    className={`bg-white/50 dark:bg-gray-700/50 border ${
                      errors.email
                        ? "border-red-500"
                        : "border-gray-200/50 dark:border-gray-600/50"
                    } text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent block w-full p-2.5`}
                    placeholder="name@company.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full cursor-pointer text-white bg-gradient-to-r from-purple-500 to-purple-600 font-medium rounded-lg text-sm px-5 py-2.5 shadow-lg hover:shadow-xl disabled:opacity-70"
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
