import imageCompression from "browser-image-compression";

export const uploadImageToImgBB = async (file: File) => {
  // ✅ compress first
  const compressedFile = await compressImage(file);

  const formData = new FormData();
  formData.append("image", compressedFile);

  const res = await fetch("/admin/api/uploadImage", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Image upload failed");
  }

  return {
    url: data.url,
    deleteUrl: data.deleteUrl,
  };
};
  
export const deleteImageFromImgBB = async (deleteUrl?: string) => {
  if (!deleteUrl) return;

  try {
    await fetch(deleteUrl);
  } catch (error) {
    console.warn("Failed to delete image:", error);
  }
};

export const compressImage = async (file: File) => {
  const options = {
    maxSizeMB: 1,              // target max size
    maxWidthOrHeight: 1200,   // resize large images
    useWebWorker: true,
    fileType: "image/jpeg",   // normalize format
    initialQuality: 0.75,     // compression level
  };

  try {
    const compressedFile = await imageCompression(file, options);

    return new File([compressedFile], file.name, {
      type: "image/jpeg",
    });
  } catch (error) {
    console.error("Compression error:", error);
    return file; // fallback to original
  }
};