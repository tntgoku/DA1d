// Service để upload ảnh lên server
import { apiClient } from './getAPI';
// Service để lưu thông tin ảnh vào database
export const uploadImageService = async (productId, imageData) => {
  try {
    console.log('Uploading images for product:', productId);
    console.log('Image data:', imageData);
      const formData = new FormData();
    
      // Mảng metadata
      const metadata = imageData.map((img, index) => ({
        altImg: img.imgAlt || "",
        variantId: img.variantId || 0,
        displayOrder: img.displayOrder || 0,
        isPrimary: img.isPrimary || false,
        imageType: img.imageType || "variant",
      }));
    
      // Đính kèm file
        imageData.forEach((img) => {
        formData.append("files", img.originalFile); // gửi danh sách file
      });
      // Đính kèm object metadata (chuyển sang JSON)
      formData.append("metadata", JSON.stringify(metadata));
    const response = await apiClient.post(`upload/product/${productId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if(response.data.status===200){
      alert('Upload successful');
      console.log('Upload successful:', response.data.data);
      return response.data.data;
    }else{
      console.error('Upload failed:', response.data.message);
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('Save image error:', error);
    throw error;
  }
};
