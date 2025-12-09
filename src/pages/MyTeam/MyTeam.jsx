// src/pages/MyTeam/MyTeam.jsx
import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { IoTrashOutline } from "react-icons/io5";

const MyTeam = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch team members
  const fetchTeam = async () => {
    try {
      const res = await axiosSecure.get("/users");
      const members = res.data.filter(
        (u) => u.email !== user.email && u.team === user.team
      );
      setTeamMembers(members);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchTeam();
  }, [user]);

  // =============================
  // Delete handler
  // =============================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this team member?"
    );
    if (!confirmDelete) return;

    try {
      const res = await axiosSecure.delete(`/users/${id}`);
      if (res.data.deletedCount > 0 || res.data.result?.deletedCount > 0) {
        alert("Team member deleted successfully!");
        setTeamMembers((prev) => prev.filter((member) => member._id !== id));
      } else {
        alert("Failed to delete team member.");
      }
    } catch (err) {
      console.error(err);
      alert("Delete failed!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Team Members</h2>
      {teamMembers.length === 0 ? (
        <p className="text-gray-600">No team members found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-base-200">
                <th>#</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joining Date</th>
                <th>Status</th>
                <th>Contact</th>
                <th>Action</th> {/* Delete column */}
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member, i) => (
                <tr key={member._id} className="">
                  <td>{i + 1}</td>
                  <td>
                    {member.photoURL ? (
                      <img
                        src={member.photoURL}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                        {member.name?.[0]?.toUpperCase() || "U"}
                      </div>
                    )}
                  </td>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.role}</td>
                  <td>
                    {member.joiningDate
                      ? new Date(member.joiningDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        member.status === "active"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {member.status || "active"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline btn-info"
                      onClick={() =>
                        alert(
                          `Contact ${member.name} via email: ${member.email}`
                        )
                      }
                    >
                      Contact
                    </button>
                  </td>
                  <td>
                    {/* Delete Button */}
                    <div
                      className="relative overflow-visible tooltip tooltip-bottom"
                      data-tip="Delete"
                    >
                      <button
                        onClick={() => handleDelete(member._id)}
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
        </div>
      )}
    </div>
  );
};

export default MyTeam;
