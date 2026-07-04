// hooks/useAuth.js
import { useEffect, useState } from "react";
import { getAuthUser } from "../services/api-endpoints";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    getAuthUser()
      .then((user) => setIsAuthenticated(!!user))
      .catch(() => setIsAuthenticated(false));
  }, []);

  return isAuthenticated;
}
