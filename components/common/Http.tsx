import { authStorage } from "@/lib/hooks/auth";

export const DEVELOPMENT_API =
  process.env.DEVELOPMENT_API || "http://pos-backend.test/api";
export const PRODUCTION_API =
  process.env.PRODUCTION_API || "http://pos-backend.test";



export const Logout = async () => {
  if (!authStorage.isAuthenticated()) return;
  const res = await fetch(`${DEVELOPMENT_API}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authStorage.getAuth().token}`,
    },
  });
  authStorage.clearAuth();
};
