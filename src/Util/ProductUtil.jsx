export const extractUniqueValues = (list, key) => {
  const set = new Set();

  for (const item of list) {
    const val = item[key];

    // Bỏ qua nếu null hoặc undefined
    if (val == null) continue;

    // Nếu là chuỗi thì trim, nếu là số thì giữ nguyên
    const cleanVal =
      typeof val === 'string'
        ? val.trim()
        : typeof val === 'number'
        ? val
        : String(val);

    // Chỉ thêm nếu có giá trị hợp lệ
    if (cleanVal !== '' && cleanVal !== undefined && cleanVal !== null) {
      set.add(cleanVal);
    }
  }

  // Sắp xếp: nếu là số thì sắp theo số, nếu là chuỗi thì sắp theo chữ
  const arr = [...set];
  return arr.every(v => typeof v === 'number')
    ? arr.sort((a, b) => a - b)
    : arr.sort();
};
import { Product } from "../entity/Object/Product";
import { categoryService } from "../service/CateService";
export const isFormEmpty = (data) => {
  if (data == null) return true;
  if (typeof data === "string") return data.trim() === "";
  if (Array.isArray(data)) return data.every(isFormEmpty);
  if (typeof data === "object")
    return Object.values(data).every(isFormEmpty);
  return false;
};
export const calculateTotalStock = (variants) => {
  if (!Array.isArray(variants) || variants.length === 0) return 0;

  return variants.reduce((sum, v) => sum + (Number(v.stock) || 0), 0);
};

// Lấy tên danh mục
export const getCategoryName = (categories, categoryId) => {
  const idcate = Number(categoryId);

  const findCategory = (cats) => {
    for (const cat of cats) {
      if (cat.id === idcate) return cat;
      if (cat.parents && cat.parents.length > 0) {
        const found = findCategory(cat.parents);
        if (found) return found;
      }
    }
    return null;
  };

  const category = findCategory(categories);
  return category ? category.name : "Không xác định";
};


export const totalStock = (product) => {
  if (!product || !Array.isArray(product.variants)) return 0;

  return product.variants.reduce((sum, variant) => {
    if (Array.isArray(variant.variantsStorage)) {
      const variantStock = variant.variantsStorage.reduce(
        (s, v) => s + (Number(v.stock) || 0),
        0
      );
      return sum + variantStock;
    }
    return sum;
  }, 0);
};

export const totalStockForProduct = (product) => {
  if (!product || !Array.isArray(product.variants)) return 0;

  let total = 0;

  product.variants.forEach(variant => {
    if (Array.isArray(variant.variantsStorage)) {
      variant.variantsStorage.forEach(storage => {
        total += Number(storage.stock) || 0;
      });
    }
  });

  return total;
};

// Util/ProductUtil.js
// export const getVariantsGroupedByColor = (product) => {
//   console.log("O",product);
// console.log("Grouped variants:", products.map(p => ({
//   id: p.id,
//   name: p.productName,
//   grouped: p.getVariantsGroupedByColor()
// })));
//   return product;
// };
