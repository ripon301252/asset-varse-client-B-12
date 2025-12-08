// src/pages/MyAssets/MyAssets.jsx
import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";

const MyAssets = () => {
  const { user } = useAuth();
  const [myAssets, setMyAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Backend থেকে employee এর assets fetch
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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Assets</h2>

      {myAssets.length === 0 ? (
        <p className="text-gray-600">You have not requested or been assigned any assets yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead>
              <tr className="bg-base-200">
                <th>#</th>
                <th>Asset Name</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Reason</th>
                <th>Date</th>
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
