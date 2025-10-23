import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { getAPI, patchAPI } from "./api"
import { uploadToCloudinary } from "./UploadCloudnary";

export default function ProfilePage() {
  let DefaultisEditable = {
    username: false,
    age: false,
    number: false,
    photo: false,
  }
  const [pending, setpending] = useState(false)
  const [isEditable, setisEditable] = useState(DefaultisEditable)
  const [response, setresponse] = useState({})
  const [preview, setPreview] = useState(response?.photo || null);
  useEffect(() => {
    async function getProfile() {
      const endpoint = 'profile/'
      const res = await getAPI(endpoint)
      setresponse(res)
    }
    getProfile()
  }, [])


  const handleSubmit = async (e) => {
    try {
      setpending(true)
      e.preventDefault();
      const formData = new FormData(e.target);
      const editData = {}
      const username = formData.get("username")
      const age = formData.get("age")
      const number = formData.get("number")
      let photo = formData.get("photo")
      if (username !== response?.username) editData.username = username;
      if (age != response?.age) editData.age = age;
      if (number != response?.number) editData.number = number;
      photo = await uploadToCloudinary([photo])
      if (photo != response?.photo) editData.photo = photo;
      
      const endpoint = 'editProfile/'
      if (Object.keys(editData).length > 0) {
        const res = await patchAPI(endpoint, editData)
        console.log(res)
      } else {
        console.log(
          "no API called"
        )
      }
    } catch (e) {
      console.log(e)
    } finally {
      setpending(false)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  const photoUrl = (() => {
  if (preview) return preview;
  if (response?.photo) {
    try {
      // Parse if it's a stringified array
      const arr = JSON.parse(response.photo.replace(/'/g, '"'));
      return Array.isArray(arr) ? arr[0] : response.photo;
    } catch {
      // Fallback if it's already a plain URL
      return response.photo;
    }
  }
  return null;
})();

  return (

    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6 border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">
          👤 Profile Settings
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

{/* Profile Photo */}
<div>
  

  {/* Circle Preview */}
  <div className="flex justify-center mb-2">
    <div className="relative w-24 h-24 rounded-full overflow-hidden border border-slate-300">
      {photoUrl ? (
      <img
        src={photoUrl}
        alt="Profile Preview"
        className="w-full h-full object-cover rounded-xl"
      />
    ) : (
      <div
        className={[
          "flex items-center justify-center w-full h-full text-slate-400",
          isEditable?.photo ? "bg-white" : "bg-slate-100",
        ].join(" ")}
      >
        No image
      </div>
    )}
    </div>
  </div>
      <label className="block text-sm font-medium text-slate-600 mb-2">
    Profile Photo
  </label>
  {/* File input styled like other fields */}
  <div className="flex items-center gap-2">
    <label className="flex-1 relative w-full">
      <input
        type="file"
        name="photo"
        accept="image/*"
        onChange={handleFileChange}
        disabled={!isEditable?.photo}
        className={[
          "w-full px-4 py-2 border border-slate-300 rounded-xl text-slate-700 focus:outline-none cursor-pointer",
          !isEditable?.photo ? "bg-slate-100" : "bg-white",
        ].join(" ")}
      />
      {/* Show placeholder text inside input */}
      

    </label>

    {/* Pencil button */}
    <button
      type="button"
      className={[
        "p-2 rounded-lg hover:bg-slate-100 transition",
        isEditable?.photo ? "bg-slate-100" : "bg-white",
      ].join(" ")}
      onClick={() =>
        setisEditable((prev) => ({ ...prev, photo: !prev.photo }))
      }
    >
      <Pencil size={18} className="text-slate-700" />
    </button>
  </div>
</div>





          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              User Name
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="username"
                defaultValue={response?.username}
                readOnly={!isEditable?.username}
                className={["w-full px-4 py-2 border border-slate-300 rounded-xl  text-slate-700 focus:outline-none",
                  `${!isEditable?.username ? 'bg-slate-100' : 'bg-white'}`
                ].join(" ")}
              />
              <button
                type="button"
                className={[" cursor-pointer p-2 rounded-lg hover:bg-slate-100 transition", `${isEditable?.username ? 'bg-slate-100' : "bg-white"}`].join(" ")}
              >
                <Pencil size={18} className="text-slate-700" onClick={() => setisEditable(prev => ({ ...prev, username: !prev?.username }))} />
              </button>
            </div>
          </div>

          {/* age */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Age
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="age"
                defaultValue={response?.age}
                readOnly={!isEditable?.age}
                className={["w-full px-4 py-2 border border-slate-300 rounded-xl  text-slate-700 focus:outline-none",
                  `${!isEditable?.age ? 'bg-slate-100' : 'bg-white'}`
                ].join(" ")}
              />
              <button
                type="button"
                className={[" cursor-pointer p-2 rounded-lg hover:bg-slate-100 transition", `${isEditable?.age ? 'bg-slate-100' : "bg-white"}`].join(" ")}
              >
                <Pencil size={18} className="text-slate-700" onClick={() => setisEditable(prev => ({ ...prev, age: !prev?.age }))} />
              </button>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Phone number
            </label>
            <div className="flex items-center gap-2">
              <input
                type="tel"
                name="number"
                defaultValue={response?.number}
                readOnly={!isEditable?.number}
                className={["w-full px-4 py-2 border border-slate-300 rounded-xl  text-slate-700 focus:outline-none",
                  `${!isEditable?.number ? 'bg-slate-100' : 'bg-white'}`
                ].join(" ")}
              />
              <button
                type="button"
                className={[" cursor-pointer p-2 rounded-lg hover:bg-slate-100 transition", `${isEditable?.number ? 'bg-slate-100' : "bg-white"}`].join(" ")}
              >
                <Pencil size={18} className="text-slate-700" onClick={() => setisEditable(prev => ({ ...prev, number: !prev?.number }))} />
              </button>
            </div>
          </div>

          {/* Save Button */}
          <button

            type="submit"
            className={["w-full text-white py-2 rounded-xl font-semibold  mt-4",
              `${pending ? 'bg-slate-300' : 'cursor-pointer bg-slate-800 hover:bg-slate-700 transition-all'}`
            ].join(" ")}
          >
            Save Changes
          </button>

        </form>
      </div>
    </div>
  );
}
