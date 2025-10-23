export const uploadToCloudinary = async (files) => {
  const cloudName = import.meta.env.VITE_CLOUDNARY_NAME;
  const uploadPreset = import.meta.env.VITE_PRESET;
console.log(uploadPreset,cloudName)
  if (!files || files.length === 0) return [];

  const fileArray = Array.isArray(files) ? files : Array.from(files);
  console.log("fileArray : ",fileArray)
  const uploadPromises = fileArray.map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (!response.ok) throw new Error(data.error?.message || "Upload failed");
    return data.secure_url;
  });

  return await Promise.all(uploadPromises);
};
