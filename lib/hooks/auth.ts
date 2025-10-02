import { DEVELOPMENT_API } from "@/components/common/Http";
import { toast } from "react-toastify";
export const authStorage = {
  setAuth: (result: any) => {
    if (typeof window === "undefined") return; // 🛑 skip on server

    localStorage.setItem("auth_token", result.token);
    localStorage.setItem(
      "auth_user",
      JSON.stringify({
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
        status: result.user.status,
        expired: result.user.expired,
      })
    );
  },

  getAuth: () => {
    if (typeof window === "undefined") return { token: null, user: null }; // 🛑 skip on server

    const token = localStorage.getItem("auth_token");
    const userString = localStorage.getItem("auth_user");
    const user = userString ? JSON.parse(userString) : null;
    return { token, user };
  },

  clearAuth: () => {
    if (typeof window === "undefined") return; // 🛑 skip on server

    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  },

  isAuthenticated: () => {
    if (typeof window === "undefined") return false; // 🛑 skip on server
    const { token, user } = authStorage.getAuth();
    return !!token && !!user;
  },
};

export const logout = async (router: any) => {
  if (!authStorage.isAuthenticated()) return;

  try {
    const { token } = authStorage.getAuth();
    const response = await fetch(`${DEVELOPMENT_API}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Logout API call failed");
    }

    authStorage.clearAuth();
    toast.success("Logged out successfully");

    if (router) {
      router.push("/");
    } else {
      window.location.href = "/";
    }
  } catch (error) {
    console.error("Logout error:", error);
    // Even if API fails, clear local auth
    authStorage.clearAuth();
    toast.info("You have been signed out");

    if (router) {
      router.push("/");
    } else {
      window.location.href = "/";
    }
  }
};
