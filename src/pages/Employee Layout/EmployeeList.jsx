import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router";
import { FaRegEdit } from "react-icons/fa";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const axiosSecure = useAxiosSecure();

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
      if (res.data.deletedCount > 0) {
        alert("Users deleted!");
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
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, i) => (
              <tr key={emp._id}>
                <td>{i + 1}</td>
                <td>{emp.displayName || emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
                <td>{emp.status || "active"}</td>
                <td>
                  <div
                    className="relative overflow-visible tooltip tooltip-bottom"
                    data-tip="Edit"
                  >
                    <Link
                      to={`/addAsset`}
                      className="btn btn-outline btn-square text-blue-500 hover:bg-blue-500 hover:text-black"
                    >
                      <FaRegEdit className="text-lg" />
                    </Link>
                  </div>

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
              </tr>
            ))}
          </tbody>
        </table>

        {employees.length === 0 && (
          <p className="text-center py-10 text-gray-500">No employees found…</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
