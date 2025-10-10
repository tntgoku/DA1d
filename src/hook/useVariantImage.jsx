// src/hooks/useVariantImage.js
import { useState } from "react";

export const useVariantImage = () => {
  const [ListImgVariant, setListImgVariant] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const preview = files.map((file) => ({
      imgSrc: URL.createObjectURL(file),
      imgAlt: file.name,
      file,
    }));
    setListImgVariant(preview);
  };

  return { ListImgVariant, handleImageUpload };
};
