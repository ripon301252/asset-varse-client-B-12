import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { IoTrashOutline } from "react-icons/io5";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { PiKeyReturnBold } from "react-icons/pi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import toast from "react-hot-toast"; // import toast

const MyAssets = () => {
  const { user } = useAuth();
  const [myAssets, setMyAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!user) return;

    const fetchMyAssets = async () => {
      try {
        const res = await axiosSecure.get(
          `/asset_requests?email=${user.email}`
        );
        const requests = res.data;

        const assetsWithDetails = await Promise.all(
          requests.map(async (req) => {
            if (!req.assetId) return req;

            try {
              const assetRes = await axiosSecure.get(`/assets/${req.assetId}`);
              const assetDetails = assetRes.data;

              return {
                ...req,
                assetName: assetDetails.name || req.assetName,
                image: assetDetails.image || "",
                type: assetDetails.type || "",
                company: assetDetails.company || "",
              };
            } catch (err) {
              console.error("Asset details fetch failed:", err);
              return req;
            }
          })
        );

        setMyAssets(assetsWithDetails);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchMyAssets();
  }, [user, axiosSecure]);

  // Delete asset request
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this asset request?"
    );
    if (!confirmDelete) return;

    try {
      const res = await axiosSecure.delete(`/asset_requests/${id}`);
      if (res.data.deletedCount > 0 || res.data.result?.deletedCount > 0) {
        toast.success("Asset request deleted successfully!"); // toast
        setMyAssets((prev) => prev.filter((asset) => asset._id !== id));
      } else {
        toast.error("Failed to delete asset request!"); // toast
      }
    } catch (err) {
      console.error(err);
      toast.error("Delete failed!"); // toast
    }
  };

  // Return asset
  const handleReturn = async (id) => {
    const confirmReturn = window.confirm(
      "Are you sure you want to return this asset?"
    );
    if (!confirmReturn) return;

    try {
      const res = await axiosSecure.put(`/asset_requests/${id}/return`);
      const data = res.data;

      if (data.modifiedCount > 0 || data.success) {
        toast.success("Asset returned successfully!"); // toast
        setMyAssets((prev) =>
          prev.map((asset) =>
            asset._id === id ? { ...asset, status: "returned" } : asset
          )
        );
      } else {
        toast.error("Failed to return asset!"); // toast
      }
    } catch (err) {
      console.error(err);
      toast.error("Return failed!"); // toast
    }
  };

  // Export PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("AssetVerse - My Assets Report", 14, 10);
    const tableColumn = [
      "Name",
      "Type",
      "Company",
      "Quantity",
      "Status",
      "Reason",
      "Date",
    ];

    const tableRows = [];

    myAssets.forEach((asset) => {
      tableRows.push([
        asset.assetName,
        asset.type || "-",
        asset.company || "-",
        asset.quantity,
        asset.status,
        asset.reason || "-",
        new Date(asset.createdAt).toLocaleDateString(),
      ]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.save("my_assets.pdf");
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">My Assets</h2>
        <button
          onClick={handleExportPDF}
          className="btn btn-sm btn-outline btn-success"
        >
          Export PDF
        </button>
      </div>

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
                <th>Image</th>
                <th>Name</th>
                <th>Type</th>
                <th>Company</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Reason</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {myAssets.map((asset, index) => (
                <tr key={asset._id} className="hover:bg-white/10">
                  <th className="sticky left-0 bg-white dark:bg-gray-900 z-10 px-4 py-2">
                    {index + 1}
                  </th>

                  <td>
                    {asset.image ? (
                      <img
                        src={asset.image}
                        alt={asset.assetName}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="capitalize">{asset.assetName}</td>
                  <td>{asset.type || "-"}</td>
                  <td>{asset.company || "-"}</td>
                  <td>{asset.quantity}</td>
                  <td>
                    <span
                      className={`font-bold ${
                        asset.status === "approved"
                          ? "text-green-600"
                          : asset.status === "rejected"
                          ? "text-red-600"
                          : asset.status === "returned"
                          ? "text-blue-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {asset.status}
                    </span>
                  </td>
                  <td>{asset.reason || "-"}</td>
                  <td>{new Date(asset.createdAt).toLocaleDateString()}</td>

                  <td>
                    <div className="flex justify-start items-center gap-3 whitespace-nowrap">
                      {/* Return */}
                      {asset.type === "Returnable" &&
                        asset.status === "approved" && (
                          <div
                            className="relative overflow-visible tooltip tooltip-bottom"
                            data-tip="Return"
                          >
                            <button
                              onClick={() => handleReturn(asset._id)}
                              className="btn btn-outline btn-square text-green-500 hover:bg-green-500 hover:text-black"
                              title="Return"
                            >
                              <PiKeyReturnBold className="text-lg" />
                            </button>
                          </div>
                        )}

                      {/* Request Asset */}
                      <div
                        className="relative overflow-visible tooltip tooltip-bottom"
                        data-tip="Request Asset"
                      >
                        <Link
                          to={`/requestAsset`}
                          className="btn btn-outline btn-square text-yellow-500 hover:bg-yellow-500 hover:text-black"
                          title="Request Asset"
                        >
                          <VscGitPullRequestGoToChanges className="text-lg" />
                        </Link>
                      </div>

                      {/* Delete */}
                      <div
                        className="relative overflow-visible tooltip tooltip-bottom"
                        data-tip="Delete"
                      >
                        <button
                          onClick={() => handleDelete(asset._id)}
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
        </div>
      )}
    </div>
  );
};

export default MyAssets;
