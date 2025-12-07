import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState("user");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchRole = async () => {
      setIsLoading(true);
      try {
        const res = await axiosSecure.get(`/users/${user.email}/role`);
        setRole(res.data?.role || "user");
      } catch (err) {
        console.error(err);
        setRole("user");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRole();
  }, [user?.email, axiosSecure]);

  return { role, isLoading };
};

export default useRole;
