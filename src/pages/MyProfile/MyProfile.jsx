import React, {  useState } from "react";

import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";


const MyProfile = () => {
  // const { user, updateUser } = useContext(AuthContext);
  const { user, updateUserProfile} = useAuth()
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUserProfile({ displayName: name, photoURL })
      .then(() =>{
        toast.success("Profile updated!")
      })
      .catch((err) => {
        toast.error(err.message)
      });
  };

  return (
    <div className="min-h-screen  bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 flex justify-center items-center px-4 py-8">
      <title>KidsToy - My Profile</title>

      <div className="card w-full max-w-md backdrop-blur-lg bg-white/10  rounded-2xl p-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-center mb-2 ">
          My Profile
        </h1>
        <p className="text-center  mb-6">
          Manage your <span className=" font-medium">
              <span className=""> Asset</span><span className="text-orange-500">Verse </span>
              </span> account  
        </p>

        {/* Profile Info */}
        <div className="text-center mb-6">
          {photoURL ? (
            <img
              src={photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto shadow-lg object-cover border-1 border-gray-300-300"
            />
          ) : (
            <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-4xl text-gray-500 shadow-inner">
              👤
            </div>
          )}
          
          <p className=" font-semibold mt-2">
            {name || "No Name Set"}
          </p>
          <p className="text-sm ">{user?.email}</p>
        </div>

        {/* Update Form */}
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="label-text font-semibold ">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="input input-bordered w-full  bg-white/20 focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div>
            <label className="label-text font-semibold ">Photo URL</label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Enter photo URL"
              className="input input-bordered w-full bg-white/20 focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <button
            type="submit"
            className="btn bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold w-full hover:opacity-90 outline-none border-none"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
