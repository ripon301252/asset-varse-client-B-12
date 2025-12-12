import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";
import toast from "react-hot-toast";

const AddAsset = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      type: "Returnable",
      quantity: 1,
      company: "",
    },
  });

  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    if (!data.photo || data.photo.length === 0) {
      toast.error("Please select a photo.");
      return;
    }

    const photoFile = data.photo[0];
    const formData = new FormData();
    formData.append("image", photoFile);

    const imgBbUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_photo_host_key
    }`;

    try {
      // 1️⃣ Upload to ImgBB
      const imgBbRes = await axios.post(imgBbUrl, formData);
      const imageUrl = imgBbRes.data.data.display_url;

      // 2️⃣ Save Asset Info to Backend
      const newAsset = {
        name: data.name,
        company: data.company,
        type: data.type,
        quantity: Number(data.quantity),
        image: imageUrl,
        createdAt: new Date(),
      };

      const res = await axiosSecure.post("/assets", newAsset);

      if (res.data.insertedId) {
        toast.success("Asset added successfully!");
        reset();
      } else {
        toast.error("Failed to add asset. Try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add asset. Try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 my-10">
      <h2 className="text-2xl font-bold mb-6">Add New Asset</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Asset Name */}
        <div>
          <label className="block mb-1 font-semibold">Asset Name</label>
          <input
            type="text"
            placeholder="Enter asset name"
            className={`input input-bordered w-full ${
              errors.name && "border-red-500"
            }`}
            {...register("name", { required: "Asset name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Company Name */}
        <div>
          <label className="block mb-1 font-semibold">Company Name</label>
          <input
            type="text"
            placeholder="Enter company name"
            className={`input input-bordered w-full ${
              errors.company && "border-red-500"
            }`}
            {...register("company", { required: "Company name is required" })}
          />
          {errors.company && (
            <p className="text-red-500 mt-1">{errors.company.message}</p>
          )}
        </div>

        {/* Asset Type */}
        <div>
          <label className="block mb-1 font-semibold">Asset Type</label>
          <select
            className="select select-bordered w-full"
            {...register("type", { required: true })}
          >
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="block mb-1 font-semibold">Quantity</label>
          <input
            type="number"
            className={`input input-bordered w-full ${
              errors.quantity && "border-red-500"
            }`}
            {...register("quantity", {
              required: "Quantity is required",
              min: { value: 1, message: "Quantity must be at least 1" },
            })}
          />
          {errors.quantity && (
            <p className="text-red-500 mt-1">{errors.quantity.message}</p>
          )}
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block mb-1 font-semibold">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input w-full"
          />
          {errors.photo && (
            <p className="text-red-500 mt-1">Photo is required.</p>
          )}
        </div>

        {/* Submit */}
        <div>
          <button type="submit" className="btn btn-primary w-full">
            Add Asset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAsset;
