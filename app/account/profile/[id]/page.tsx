"use client";
import Layout from "@/components/layout/Layout";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { DEVELOPMENT_API } from "@/components/common/Http";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const params = useParams();
  const userId = params?.id as string;

  if (!userId) {
    return (
      <Layout>
        <h1 className="text-white mx-24 text-7xl">User not found</h1>
      </Layout>
    );
  }
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    status: "",
    current_password: "",
    new_password: "",
    created_at: "",
    new_password_confirmation: "",
  });

  const [profileImage, setProfileImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await fetch(`${DEVELOPMENT_API}/auth/user/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          const userData = data.user;
          setUserData((prev) => ({
            ...prev,
            name: userData.name || "",
            email: userData.email || "",
            phone: userData.phone || "",
            description: userData.description || "",
            status: userData.status || "",
            created_at: userData.created_at || "",
          }));
          if (userData.image) {
            setProfileImage(data.image_url);
          }
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);
      formData.append("description", userData.description);

      if (userData.current_password && userData.new_password) {
        formData.append("current_password", userData.current_password);
        formData.append("new_password", userData.new_password);
        formData.append(
          "new_password_confirmation",
          userData.new_password_confirmation
        );
      }

      // Attach image if changed
      const fileInput = document.getElementById(
        "profile-image"
      ) as HTMLInputElement;
      if (fileInput && fileInput.files && fileInput.files[0]) {
        formData.append("image", fileInput.files[0]);
      }

      const token = localStorage.getItem("auth_token");

      // Send the user ID in the URL as per your Laravel route
      const res = await fetch(`${DEVELOPMENT_API}/auth/update/${userId}`, {
        method: "POST", // Using PUT method as per your Laravel route
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type header when sending FormData - browser will set it automatically with boundary
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to update");

      toast.success("Profile updated successfully!");
      setUserData((prev) => ({
        ...prev,
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      }));
      setIsEditing(false);
    } catch (err: any) {
      alert(err.message || "Something went wrong ❌");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
          <div className="text-white text-xl">Loading profile...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              My Profile
            </h1>
            <p className="text-gray-400 mt-2">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-700/30">
            <div className="md:flex">
              {/* Profile Image Section */}
              <div className="md:w-1/3 p-8 bg-gradient-to-b from-purple-900/30 to-gray-900/50 flex flex-col items-center justify-center">
                <div className="relative group">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-purple-500/30 shadow-lg mx-auto mb-6 relative">
                    <Image
                      src={profileImage || "/api/placeholder/150/150"}
                      alt="Profile"
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                    {isEditing && (
                      <label
                        htmlFor="profile-image"
                        className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-300 rounded-full"
                      >
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
                            strokeWidth={2}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <input
                          id="profile-image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                    )}
                  </div>
                </div>

                <h2 className="text-2xl font-semibold text-white text-center">
                  {userData.name}
                </h2>
                <p className="text-purple-400 text-center mt-1">
                  {userData.description || ""}
                </p>

                <div className="mt-6 w-full">
                  <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
                    <h3 className="text-sm font-medium text-gray-400">
                      Account Status
                    </h3>
                    <div className="flex items-center mt-1">
                      {userData.status === "on going" ? (
                        <>
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-green-400 text-sm">Active</span>
                        </>
                      ) : (
                        <>
                          <div className="h-2 w-2 rounded-full bg-red-600 mr-2"></div>
                          <span className="text-red-400 text-sm">Disabled</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-400">
                      Account Created At
                    </h3>
                    {userData.created_at ? (
                      <>
                        <p className="text-gray-300 text-sm mt-1">
                          {new Date(userData.created_at).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              {/* Profile Form Section */}
              <div className="md:w-2/3 p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">
                    Profile Information
                  </h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      isEditing
                        ? "bg-gray-600 text-white hover:bg-gray-700"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                    }`}
                  >
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label className="block text-gray-400 text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 disabled:opacity-70"
                      />
                    </div>

                    <div className="form-group">
                      <label className="block text-gray-400 text-sm font-medium mb-2">
                        Email Address (Can't Be Changed)
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        disabled
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 disabled:opacity-70"
                      />
                    </div>

                    <div className="form-group md:col-span-2">
                      <label className="block text-gray-400 text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 disabled:opacity-70"
                      />
                    </div>

                    <div className="form-group md:col-span-2">
                      <label className="block text-gray-400 text-sm font-medium mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={userData.description}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 disabled:opacity-70"
                      />
                    </div>

                    {isEditing && (
                      <>
                        <div className="md:col-span-2 mt-4 pt-4 border-t border-gray-700/50">
                          <h3 className="text-lg font-semibold text-white mb-4">
                            Change Password
                          </h3>
                        </div>

                        <div className="form-group">
                          <label className="block text-gray-400 text-sm font-medium mb-2">
                            Current Password
                          </label>
                          <input
                            type="password"
                            name="current_password"
                            value={userData.current_password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                          />
                        </div>

                        <div className="form-group">
                          <label className="block text-gray-400 text-sm font-medium mb-2">
                            New Password
                          </label>
                          <input
                            type="password"
                            name="new_password"
                            value={userData.new_password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                          />
                        </div>

                        <div className="form-group">
                          <label className="block text-gray-400 text-sm font-medium mb-2">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            name="new_password_confirmation"
                            value={userData.new_password_confirmation}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {isEditing && (
                    <div className="mt-8 flex justify-end">
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:-translate-y-1 flex items-center disabled:opacity-70"
                      >
                        {isSaving ? (
                          <>
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
                            Saving...
                          </>
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
