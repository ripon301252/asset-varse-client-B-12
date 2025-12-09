import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    role: "employee",
    status: "active",
    photoURL: "",
  });

  const [loading, setLoading] = useState(true);
  const [newPhoto, setNewPhoto] = useState(null);

  // Fetch employee data
  useEffect(() => {
    axiosSecure
      .get(`/users/${id}`)
      .then((res) => setEmployee(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id, axiosSecure]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    setNewPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedData = { ...employee };

    // If new photo uploaded → upload to imgbb
    if (newPhoto) {
      const formData = new FormData();
      formData.append("image", newPhoto);

      const photoAPI = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_photo_host_key
      }`;

      const photoRes = await axios.post(photoAPI, formData);
      updatedData.photoURL = photoRes.data.data.url;
    }

    try {
      const res = await axiosSecure.put(`/users/${id}`, updatedData);
      if (res.data.modifiedCount > 0) {
        alert("Employee updated successfully!");
        navigate("/employeeList");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update employee");
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Employee</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Name */}
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="input input-bordered w-full"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          placeholder="Email"
          className="input input-bordered w-full"
          required
        />

        {/* Old Photo Preview */}
        {employee.photoURL && (
          <img
            src={employee.photoURL}
            alt="Employee"
            className="w-24 h-24 rounded-full object-cover mx-auto border"
          />
        )}

        {/* Photo Upload */}
        <input
          type="file"
          onChange={handlePhotoChange}
          className="file-input file-input-bordered w-full"
        />

        {/* Role */}
        <select
          name="role"
          value={employee.role}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="employee">Employee</option>
          <option value="hr">HR</option>
        </select>

        {/* Status */}
        <select
          name="status"
          value={employee.status}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button type="submit" className="btn btn-primary">
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;
