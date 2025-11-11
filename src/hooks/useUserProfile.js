// useUserProfile.js
//
// Custom React Hook for fetching and managing the authenticated user's full profile data.
//
// This hook handles:
// - Accessing the current authenticated user via the AuthContext.
// - Fetching user profile details from the backend using their `id`.
// - Managing loading, success, and error states via a `message` object.
// - Returning the profile data along with helper state (`loading`, `message`, and `setMessage`).
//
// Usage in component/page:
// const { profile, loading, message, setMessage } = useUserProfile();
//
// Dependencies:
// - AuthContext for current user access
// - getUserById API function for backend request
//
// Future: can be extended to include caching, refetch logic, or role-based checks.

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getCurrentUser } from "../api/user.api";

export default function useUserProfile({ setMessage }) {
  const { user } = useAuth(); // current auth user
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setMessage({ text: "Fetching profile", type: "loading" });

      try {
        if (!user?.id) return;

        const data = await getCurrentUser();
        setMessage({ text: "Successfully fetched profile", type: "success" });
        setProfile(data.data);
      } catch (err) {
        const errorMsg =
          err.response?.data?.error || "Failed to fetch profile.";
        setMessage({ text: errorMsg, type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  return { profile, loading };
}
