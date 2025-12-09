// src/pages/MyAssets/MyAssets.jsx
import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { IoTrashOutline } from "react-icons/io5";

const MyAssets = () => {
  const { user } = useAuth();
  const [myAssets, setMyAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:3000/asset_requests?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMyAssets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  // =============================
  // Delete handler
  // =============================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this asset request?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/asset_requests/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.deletedCount > 0 || data.result?.deletedCount > 0) {
        alert("Asset request deleted successfully!");
        // UI থেকে remove করা
        setMyAssets((prev) => prev.filter((asset) => asset._id !== id));
      } else {
        alert("Failed to delete asset request.");
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
      <h2 className="text-2xl font-bold mb-6">My Assets</h2>

      {myAssets.length === 0 ? (
        <p className="text-gray-600">
          You have not requested or been assigned any assets yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200">
                <th>#</th>
                <th>Asset Name</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Reason</th>
                <th>Date</th>
                <th>Action</th> {/* Delete column */}
              </tr>
            </thead>
            <tbody>
              {myAssets.map((asset, index) => (
                <tr key={asset._id} className="hover:bg-gray-100">
                  <th>{index + 1}</th>
                  <td className="capitalize">{asset.assetName}</td>
                  <td>{asset.quantity}</td>
                  <td>
                    <span
                      className={`font-bold ${
                        asset.status === "approved"
                          ? "text-green-600"
                          : asset.status === "rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {asset.status}
                    </span>
                  </td>
                  <td>{asset.reason || "-"}</td>
                  <td>{new Date(asset.createdAt).toLocaleDateString()}</td>
                  <td>
                    {/* Delete Button */}
                    <div
                      className="relative overflow-visible tooltip tooltip-bottom"
                      data-tip="Delete"
                    >
                      <button
                        onClick={() => handleDelete(asset._id)}
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

export default MyAssets;
