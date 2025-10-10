import { ImageProduct } from "./ImageProduct";
import { VariantColor } from "./VariantColor";

export class ProductVariantGroup {
    constructor(data={}){
    this.id = data.id | null;
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
    this.variants = (data.variants || []).map(v => new VariantColor(v));
    this.images =(data.images || [] ).map(v=> new ImageProduct(v));
    // Lọc ảnh chính
    this.primaryImages = (data.images || []).filter(img => img.isPrimary);
    this.stockInventory = this.calculateTotalStock();
    }
    calculateTotalStock() {
    return this.variants.reduce((total, variant) => {
      if (Array.isArray(variant.variantsStorage)) {
        const stockVariant = variant.variantsStorage.reduce(
          (sum, storage) => sum + (Number(storage.stock) || 0),
          0
        );
        return total + stockVariant;
      }
      return total;
    }, 0);
  }

    
}