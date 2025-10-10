// src/services/uploadService.js
export const uploadService = {
  async uploadImages(files) {
    const uploaded = await Promise.all(
      files.map(async (file) => {
        // Giả lập API upload
        return {
          name: file.name,
          url: URL.createObjectURL(file),
        };
      })
    );
    return uploaded;
  },
};
