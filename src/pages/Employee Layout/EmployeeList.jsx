// src/pages/EmployeeList/EmployeeList.jsx
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useRole from "../../Hooks/useRole";
import { IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { role } = useRole(); // HR or employee

  // Fetch all employees
  useEffect(() => {
    axiosSecure
      .get("/users")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  }, [axiosSecure]);

  // Delete employee
  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!confirmDelete) return;

    try {
      const res = await axiosSecure.delete(`/users/${id}`);
      if (res.data.result.deletedCount > 0) {
        alert("Employee deleted!");
        setEmployees((prev) => prev.filter((emp) => emp._id !== id));
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete employee");
    }
  };


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Employee List</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200">
              <th>#</th>
              <th>Employee</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              {role === "hr" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, i) => (
              <tr key={emp._id}>
                <td>{i + 1}</td>

                {/* Employee name + image */}
                <td className="flex items-center gap-3">
                  {emp.photoURL ? (
                    <img
                      src={emp.photoURL}
                      alt={emp.displayName || emp.name}
                      className="w-14 h-14 rounded-md object-cover border"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-white border">
                      {emp.name?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                  <span>{emp.displayName || emp.name}</span>
                </td>

                <td>{emp.email}</td>
                <td>{emp.role}</td>
                <td>{emp.status || "active"}</td>

                {role === "hr" && (
                  <td className="space-x-3">
                    {/* Edit Button */}
                    <div
                      className="relative overflow-visible tooltip tooltip-bottom"
                      data-tip="Edit"
                    >
                      <Link
                        to={`/editEmployee/${emp._id}`}
                        className="btn btn-outline btn-square text-blue-500 hover:bg-blue-500 hover:text-black"
                      >
                        <FaRegEdit className="text-lg" />
                      </Link>
                    </div>

                    {/* Add Employee Button */}
                    <div
                      className="relative overflow-visible tooltip tooltip-bottom"
                      data-tip="Add Employee"
                    >
                      <Link
                        to={`/addEmployee`}
                        className="btn btn-outline btn-square text-green-500 hover:bg-green-500 hover:text-black"
                      >
                        <AiOutlineUsergroupAdd className="text-lg" />
                      </Link>
                    </div>

                    {/* Delete Button */}
                    <div
                      className="relative overflow-visible tooltip tooltip-bottom"
                      data-tip="Delete"
                    >
                      <button
                        onClick={() => handleDelete(emp._id)}
                        className="btn btn-outline btn-square text-[#f87171] hover:bg-[#f87171] hover:text-black"
                      >
                        <IoTrashOutline className="text-lg" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {employees.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            No employees found…
          </p>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
