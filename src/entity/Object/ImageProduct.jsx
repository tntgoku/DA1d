
export class ImageProduct {
      constructor(data) {
      this.id= data.id,
        this.imgSrc=data.imgSrc || "",
        this.imgAlt=data.imgAlt || "",
        this.isPrimary=data.isPrimary || false,
        this.displayOrder=data.displayOrder
      }
    getImageUrls() {
    return this.imgSrc;
  }
}