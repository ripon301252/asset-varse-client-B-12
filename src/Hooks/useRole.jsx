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
        console.log("Current role:", role);
        setRole(res.data?.role || "employee");
      } catch (err) {
        console.error(err);
        setRole("employee");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRole();
  }, [user?.email, axiosSecure, role]);

  return { role, isLoading };
};

export default useRole;





