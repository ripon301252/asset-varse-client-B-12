import React from "react";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Forbidden from "../pages/Fobidden";

const HR = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  // Loading state চেক
  if (loading || roleLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  // Role check
  if (role !== "hr") {
    return <Forbidden />;
  }

  return children;
};

export default HR;
