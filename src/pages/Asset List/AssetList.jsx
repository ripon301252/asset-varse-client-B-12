import { useState, useEffect } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

import { IoTrashOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdAddToDrive } from "react-icons/md";

const AssetList = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [assets, setAssets] = useState([]);
  const axiosSecure = useAxiosSecure();

  // Fetch assets from backend
  useEffect(() => {
    axiosSecure
      .get("/assets")
      .then((res) => setAssets(res.data))
      .catch((err) => console.error(err));
  }, [axiosSecure]);

  // ============================
  // 🔥 Delete Handler
  // ============================
  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this asset?"
    );
    if (!confirmDelete) return;

    try {
      const res = await axiosSecure.delete(`/assets/${id}`);

      if (res.data.result.deletedCount > 0) {
        alert("Asset deleted!");
        // setAssets(assets.filter((item) => item._id !== id));
        setAssets((prevAssets) => prevAssets.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };
  const filteredAssets = assets.filter((asset) => {
    return (
      asset.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterType ? asset.type === filterType : true)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-3 mb-6">
        <h2 className="text-2xl font-bold">Asset List</h2>
        <Link to={`/addAsset`} className="btn btn-primary">
          + Add New Asset
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Search assets..."
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select select-bordered w-full"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">Filter by Type</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200">
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Qty</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredAssets.map((asset, i) => (
              <tr key={asset._id}>
                <td>{i + 1}</td>
                <td>
                  <img
                    src={asset.image}
                    alt={asset.name}
                    className="w-14 h-14 rounded-md border"
                  />
                </td>
                <td className="font-semibold">{asset.name}</td>
                <td>
                  <span
                    className={`badge ${
                      asset.type === "Returnable"
                        ? "badge-primary"
                        : "badge-secondary"
                    }`}
                  >
                    {asset.type}
                  </span>
                </td>
                <td className="font-bold">{asset.quantity}</td>
                <td>{new Date(asset.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="flex justify-start items-center gap-3 whitespace-nowrap">
                    {/* Edit */}
                    <div
                      className="relative overflow-visible tooltip tooltip-bottom"
                      data-tip="Edit"
                    >
                      <Link
                        to={`/editAsset/${asset._id}`}
                        className="btn btn-outline btn-square text-blue-500 hover:bg-blue-500 hover:text-black"
                      >
                        <FaRegEdit className="text-lg" />
                      </Link>
                    </div>
                    {/* Add Asset */}
                    <div
                      className="relative overflow-visible tooltip tooltip-bottom"
                      data-tip="Add Asset"
                    >
                      <Link
                        to={`/addAsset`}
                        className="btn btn-outline btn-square text-green-500 hover:bg-green-500 hover:text-black"
                      >
                        <MdAddToDrive className="text-lg" />
                      </Link>
                    </div>
                    {/* 🔥 Delete Button */}
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredAssets.length === 0 && (
          <p className="text-center py-10 text-gray-500">No assets found…</p>
        )}
      </div>
    </div>
  );
};

export default AssetList;
