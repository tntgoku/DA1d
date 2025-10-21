export class Variant {
  constructor(data={}) {
    this.variantId = data.variantId  || "";
    this.productId =data.productId || "";
    this.nameVariants = data.nameVariants || "";
    this.sku = data.sku || "";
    this.color = data.color || "";
    this.colorCode = data.colorCode || null;
    this.storage = data.storage || null;
    this.ram = data.ram || null;
    this.regionCode = data.regionCode || null;
    this.isActive = data.isActive ?? true;
    this.createdAt = data.createdAt || null;
    this.updatedAt = data.updatedAt || null;
    this.price = data.price || 0;
    this.sale_price = data.sale_price || 0;
    this.list_price = data.list_price || 0;
    this.discount = data.discount || null;
    this.warrantly = data.warrantly || null;
    this.stock = data.stock || 0;
    this.status = data.status || "available";
  }

  // Method helper, ví dụ: format price
  getFormattedPrice() {
    return this.price?.toLocaleString() ;
  }

  isAvailable() {
    return this.status === "available" && this.stock > 0;
  }
}
export const groupVariantsByColor = (variants) => {
  if (!Array.isArray(variants)) return [];

  // Gom nhóm theo màu sắc
  const grouped = variants.reduce((acc, variant,index) => {
    const colorKey = variant.color?.trim().toLowerCase() || "không xác định";

    if (!acc[colorKey]) {
      acc[colorKey] = {
        idColor :variant.colorCode ||Math.floor(Math.random() * 10000000),
        color: variant.color || "Không xác định",
        variants: [],
      };
    }

    acc[colorKey].variants.push(variant);
    return acc;
  }, {});

  // Trả ra mảng
  return Object.values(grouped);
};
