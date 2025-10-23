import { useActionState, useState } from "react";
import { postApi } from "./api";
import { useNavigate } from "react-router-dom";
import { uploadToCloudinary } from "./UploadCloudnary";


export default function PostProduct() {
  const navigate = useNavigate()
  const [pending, setpending] = useState(false)


  const handleForm = async (e) => {
    try {
      setpending(true)
      e.preventDefault();
      const formData = new FormData(e.target)
      const name = formData.get("name");
      const description = formData.get("description");
      const type = formData.get("type");
      const price = formData.get("price");
      const photos = formData.getAll("photos");
      if (!name || !description || !type || !price || !photos) {
        return {
          error: "all fields are required",
          name: name,
          description: description,
          type: type,
          price: price,
          photos:photos
        }
      }
      const link_photos = await uploadToCloudinary(photos)
      console.log("link_photos : ",link_photos)
      const payload = {
        name: name,
        description: description,
        type: type,
        price: price,
        photos: link_photos
      }
      const endpoint = "postProduct/"
      console.log("payload : ",payload)
      let res = await postApi(endpoint, payload)
      console.log(res)
      if (res?.message) {
        navigate("/")
      }
    } catch (e) {
      console.log(e)
    } finally {
      setpending(false)
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
          Add Product
        </h2>

        <form onSubmit={handleForm} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter product name"
              className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-700"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter product description"
              className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-700"
              rows="3"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Type
            </label>
            <select
              id="type"
              name="type"
              className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-700"
            >
              <option value="">Select Type</option>
              <option value="Rent">Rent</option>
              <option value="Sell">Sell</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              placeholder="Enter price"
              className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-700"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="photos"
              className="cursor-pointer block w-full text-center rounded-xl border border-dashed border-slate-400 py-4 text-slate-600 hover:bg-slate-100 transition"
            >
              Click to upload photos
            </label>

            <input
              id="photos"
              name="photos"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const preview = document.getElementById("preview");
                preview.innerHTML = ""; // clear old previews

                Array.from(e.target.files).forEach((file) => {
                  const img = document.createElement("img");
                  img.src = URL.createObjectURL(file);
                  img.className =
                    "w-20 h-20 object-cover rounded-lg m-1 border border-slate-300 shadow-sm hover:scale-105 transition-transform";
                  preview.appendChild(img);

                  // Clean up URL after image loads (avoids memory leaks)
                  img.onload = () => URL.revokeObjectURL(img.src);
                });
              }}
            />

            <div
              id="preview"
              className="flex flex-wrap justify-start gap-2 border border-slate-200 rounded-xl p-2 min-h-[80px] bg-slate-50"
            ></div>
          </div>



          <button
            type="submit"
            className={["w-full text-white font-semibold py-2.5 rounded-xl hover:scale-[1.02] transition-transform shadow-lg",
              `${pending ? 'bg-slate-200' : 'cursor-pointer bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900'}`
            ].join(" ")}

          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
