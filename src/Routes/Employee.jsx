import React from "react";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Forbidden from "../pages/Fobidden";

const Employee = ({ children }) => {
  const { loading, user } = useAuth();
  const { role, roleLoading } = useRole();

  console.log("Logged in user:", user);
  console.log("Fetched role:", role);

  // ⛔ Step 1: Auth or Role loading
  if (loading || roleLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  
  if (!role) {
    return (
      <div className="flex justify-center items-center py-16">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

 
  if (role.toLowerCase() !== "employee") {
    return <Forbidden />;
  }

  return children;
};

export default Employee;
