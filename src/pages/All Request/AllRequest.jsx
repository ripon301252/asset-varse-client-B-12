import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { MdApproval } from "react-icons/md";
import { TbPlayerEject } from "react-icons/tb";
import { IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router";

const AllRequests = () => {
  const [requests, setRequests] = useState([]);
  const axiosSecure = useAxiosSecure();

  // Fetch all requests
  const fetchRequests = () => {
    axiosSecure
      .get("/asset_requests")
      .then((res) => setRequests(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Approve request → status update + asset quantity decrement
  const handleApprove = async (reqId) => {
    try {
      // ❗ body পাঠানো যাবে না
      const res = await axiosSecure.put(`/asset_requests/${reqId}/approve`);

      if (res.data.message) {
        alert(res.data.message);
        fetchRequests();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to approve request");
    }
  };

  // Reject request → just update status
  const handleReject = async (reqId) => {
    try {
      const res = await axiosSecure.put(`/asset_requests/${reqId}/reject`);
      if (res.data.message) {
        alert(res.data.message);
        fetchRequests();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to reject request");
    }
  };

  // Delete request
  const handleDelete = async (reqId) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this request?"
    );
    if (!confirmDelete) return;

    try {
      const res = await axiosSecure.delete(`/asset_requests/${reqId}`);
      // backend অনুযায়ী চেক
      if (res.data.result?.deletedCount > 0) {
        alert("Request deleted!");
        fetchRequests(); // UI update
      } else {
        alert("Delete failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete request");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">All Requests</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200">
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Asset</th>
              <th>Qty</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, i) => (
              <tr key={req._id}>
                <th>{i + 1}</th>
                <td>{req.userName}</td>
                <td>{req.email}</td>
                <td>{req.assetName}</td>
                <td>{req.quantity}</td>
                <td>
                  <span
                    className={`badge ${
                      req.status === "pending"
                        ? "badge-warning"
                        : req.status === "approved"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="flex justify-start items-center gap-3 whitespace-nowrap">
                    {/* Approve */}
                    {req.status === "pending" && (
                      <div
                        className="relative overflow-visible tooltip tooltip-bottom"
                        data-tip="Approve"
                      >
                        <button
                          onClick={() => handleApprove(req._id)}
                          className="btn btn-outline btn-square text-blue-500 hover:bg-blue-500 hover:text-black"
                          title="Approve"
                        >
                          <MdApproval className="text-lg" />
                        </button>
                      </div>
                    )}

                    {/* Reject */}
                    {req.status === "pending" && (
                      <div
                        className="relative overflow-visible tooltip tooltip-bottom"
                        data-tip="Reject"
                      >
                        <button
                          onClick={() => handleReject(req._id)}
                          className="btn btn-outline btn-square text-yellow-500 hover:bg-yellow-500 hover:text-black"
                          title="Reject"
                        >
                          <TbPlayerEject className="text-lg" />
                        </button>
                      </div>
                    )}

                    {/* Delete */}
                    <div
                      className="relative overflow-visible tooltip tooltip-bottom"
                      data-tip="Delete"
                    >
                      <button
                        onClick={() => handleDelete(req._id)}
                        className="btn btn-outline btn-square text-[#f87171] hover:bg-[#f87171] hover:text-black"
                        title="Delete"
                      >
                        <IoTrashOutline className="text-lg" />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {requests.length === 0 && (
          <p className="text-center py-10 text-gray-500">No requests found…</p>
        )}
      </div>
    </div>
  );
};

export default AllRequests;
