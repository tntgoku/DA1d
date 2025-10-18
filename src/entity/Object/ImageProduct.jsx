
export class ImageProduct {
      constructor(data) {
      this.id= data.id,
        this.imgSrc=data.imgSrc || "",
        this.imgAlt=data.imgAlt || "",
        this.originalFile=data.originalFile || null,
        // de phan bien anh nao la lay id variantid
        this.variantId = data.variantId || null, // Liên kết với variant
        this.isPrimary=data.isPrimary || false,
        this.displayOrder=data.displayOrder
      }
    getImageUrls() {
    return this.imgSrc;
  }
}