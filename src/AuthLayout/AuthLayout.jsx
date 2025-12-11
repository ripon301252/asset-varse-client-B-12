import React from "react";
import logoImg from "../assets/logo.png";
import authImg from "../assets/authImg.png";
import { Link, Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto py-10 ">
      <Link to={`/`} className="flex gap-12 relative">
        <div className="">
          <img className="w-14 absolute -mt-2" src={logoImg} alt="" />
        </div>
        <h3 className="text-2xl font-bold mb-16">Asset<span className="text-orange-500">Verse</span></h3>
        
      </Link>
      <div className="flex lg:flex-row gap-12 flex-col justify-between items-center lg:px-24">
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
        <div className="flex-1">
          <img className="w-full rounded-2xl" src={authImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
