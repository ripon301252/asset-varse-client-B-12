import React from 'react';
import useRole from '../Hooks/useRole';
import useAuth from '../Hooks/useAuth';
import Forbidden from '../pages/Fobidden';



const HR = ({children}) => {
    const { loading, user } = useAuth();
  const { role, roleLoading } = useRole();
  

  if (loading || !user || roleLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  if (role !== "hr") {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default HR;