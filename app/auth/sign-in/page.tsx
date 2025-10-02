"use client";
import { DEVELOPMENT_API } from "@/components/common/Http";
import { authStorage } from "@/lib/hooks/auth";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

// Auth utility functions (could be moved to a separate file)

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Check if user is already logged in
  useEffect(() => {
    const { token, user } = authStorage.getAuth();
    if (token && user) {
      // Optional: Validate token expiration here
      router.push("/"); // Redirect to dashboard if already logged in
    }
  }, [router]);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch(`${DEVELOPMENT_API}/auth/sign-in`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await res.json();

      if (!res.ok || result.status !== 200) {
        // Laravel validation / login error
        if (result.errors && result.errors.email) {
          toast.error(result.errors.email[0]);
          setErrors({ email: result.errors.email[0] });
        } else if (result.message) {
          toast.error(result.message);
        } else {
          toast.error("Something went wrong, try again.");
        }
        return;
      }

      // Success - store auth data
      authStorage.setAuth(result);
      toast.success("Login successful");

      // Redirect to dashboard or intended page
      router.push("/");
    } catch (error) {
      toast.error("Server error, please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-600 via-indigo-100 to-purple-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md transform transition-all duration-500 scale-[1.02]">
        {/* Animated background elements */}
        <div className="absolute -z-10 top-1/4 left-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -z-10 top-1/3 right-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute -z-10 bottom-1/4 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>

        <div className="backdrop-blur-xl bg-white/30 dark:bg-gray-800/30 border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-2xl overflow-hidden">
          {/* Decorative header */}
          <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

          <div className="p-8">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-800 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <h5 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
                Welcome Back
              </h5>
              <p className="text-center text-gray-600 dark:text-gray-300">
                Sign in to access your account
              </p>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-300"
                  >
                    Your email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: "" });
                      }}
                      className={`bg-white/50 dark:bg-gray-700/50 border ${
                        errors.email
                          ? "border-red-500"
                          : "border-gray-200/50 dark:border-gray-600/50"
                      } text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent block w-full pl-10 p-2.5 transition-all duration-300 backdrop-blur-sm`}
                      placeholder="name@company.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-300"
                  >
                    Your password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password)
                          setErrors({ ...errors, password: "" });
                      }}
                      placeholder="••••••••"
                      className={`bg-white/50 dark:bg-gray-700/50 border ${
                        errors.password
                          ? "border-red-500"
                          : "border-gray-200/50 dark:border-gray-600/50"
                      } text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent block w-full pl-10 p-2.5 transition-all duration-300 backdrop-blur-sm`}
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100/50 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700/50 dark:border-gray-600 transition-all duration-300"
                    />
                  </div>
                  <label
                    htmlFor="remember"
                    className="ms-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-300"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative overflow-hidden text-white bg-gradient-to-r from-purple-500 to-purple-600 transition-all cursor-pointer hover:from-zinc-400 hover:to-slate-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 dark:focus:ring-blue-800 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  "Login to your account"
                )}
              </button>

              <div className="text-sm font-medium text-center text-gray-600 dark:text-gray-400">
                Can't Sign In?{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
                >
                  Contact Here
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
