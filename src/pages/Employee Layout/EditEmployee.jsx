import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const EditEmployee = () => {
  const { id } = useParams(); // Employee ID
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    role: "employee",
    status: "active",
  });
  const [loading, setLoading] = useState(true);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.put(`/users/${id}`, employee);
      if (res.data.modifiedCount > 0) {
        alert("Employee updated successfully!");
        navigate("/employeeList"); // Back to employee list
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update employee");
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Employee</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="input input-bordered w-full"
          required
        />
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          placeholder="Email"
          className="input input-bordered w-full"
          required
        />
        <select
          name="role"
          value={employee.role}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="employee">Employee</option>
          <option value="hr">HR</option>
        </select>
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
