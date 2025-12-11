import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("employee");
  const [photoFile, setPhotoFile] = useState(null);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      toast.error("Name and Email are required");
      return;
    }

    try {
      let photoURL = "";
      if (photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);

        const image_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_photo_host_key}`;
        const res = await axios.post(image_API_URL, formData);
        photoURL = res.data.data.display_url || res.data.data.url;
      }

      const newEmployee = { name, email, role, photoURL };

      const res = await axiosSecure.post("/users", newEmployee);
      if (res.data.insertedId) {
        toast.success("Employee added successfully!");
        navigate("/employeeList"); // redirect to list page
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add employee");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Employee</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Role</label>
          <select
            className="select select-bordered w-full"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="employee">Employee</option>
            <option value="hr">HR</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Photo</label>
          <input
            type="file"
            className="file-input w-full"
            onChange={(e) => setPhotoFile(e.target.files[0])}
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4">
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
