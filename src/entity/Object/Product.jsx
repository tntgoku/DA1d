import { Variant,groupVariantsByColor } from "./Variant";
import {ImageProduct} from "./ImageProduct"
export class Product {
  constructor(data) {
    this.id = data.id;
    this.productType = data.productType || "physical";
    this.category=data.category;
    this.name = data.name || "";
    this.slug = data.slug || "";
    this.description = data.description || null;
    this.brand = data.brand || "";
    this.model = data.model || null;
    this.specifications = data.specifications || null;
    this.isActive = data.isActive ?? true;
    this.isFeatured = data.isFeatured ?? false;
    this.isHot = data.isHot ?? false;
    this.createdAt = data.createdAt || null;
    this.updatedAt = data.updatedAt || null;
    // Chuyển variants về class Variant
    this.variants = (data.variants || []).map(v => new Variant(v));
    this.images =(data.images || [] ).map(v=> new ImageProduct(v));
    // Lọc ảnh chính
    this.primaryImages = (data.images || []).filter(img => img.isPrimary);
  }

  // Method helper
  getVariantByColor(color) {
    return this.variants.filter(v => v.color.toLowerCase() === color.toLowerCase());
  }

  getAvailableVariants() {
    return this.variants.filter(v => v.isAvailable());
  }

  getPrimaryImageUrls() {
    return this.primaryImages.map(img => img.imgSrc);
  }
    getVariantsGroupedByColor() {
    return groupVariantsByColor(this.variants);
  }
}
export const groupProductsByVariant = (productJsonList) => {
  const products = productJsonList.map(p => new Product(p));

  const allVariants = [];
  products.forEach(product => {
    product.variants.forEach(variant => {
      allVariants.push({
        variant,
        product, // giữ reference product cha
      });
    });
  });

  // Group theo product name + storage (ví dụ)
  const groupMap = {};
  allVariants.forEach(({ variant, product }) => {
    const key = `${product.name}-${variant.storage}`; // nhóm theo tên + dung lượng
    if (!groupMap[key]) {
      groupMap[key] = [];
    }
    groupMap[key].push({ variant, product });
  });

  // Convert thành ProductGroup instance
  return Object.values(groupMap).map(items => {
    // Chuyển về dạng Product với các variant trong nhóm
    const groupedProduct = new Product({
      ...items[0].product, // lấy thông tin product cha
      variants: items.map(i => i.variant), // chỉ giữ variants trong nhóm
      images: items[0].product.images, // giữ ảnh từ product cha
    });
    return groupedProduct;
  });
};