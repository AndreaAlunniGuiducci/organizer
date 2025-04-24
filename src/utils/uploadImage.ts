export const uploadToImgBB = async (file: File | null): Promise<string> => {
  if (file === null) {
    return "https://i.ibb.co/8Lh7LbRy/placeholder.png";
  }
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_API}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return data.data.url; // questo è il link dell'immagine
};
