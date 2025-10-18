import { useMemo } from "react";
import { useCategories } from "./useCategori";

export const useBreadcrumb = ({ product, variant, category }) => {
  const { categories,findCategoryById } = useCategories();

  return useMemo(() => {
    const items = [{ name: "Trang chủ", link: "/" }];

    // 1. Lấy category cần dùng
 const categoryToUse = category || (product ? findCategoryById(categories, product.category) : null);

    // Khai báo linkPath trước khi dùng
    let linkPath = "";

    if (categoryToUse) {
      const flattenParents = (cat) => {
        let result = [];
        if (cat.parents && cat.parents.length > 0) {
          cat.parents.forEach(parent => {
            result.push(...flattenParents(parent));
          });
        }
        result.push(cat);
        return result;
      };

      const chain = flattenParents(categoryToUse);

      // 2. Tạo link parent → child
      chain.forEach(cat => {
        linkPath += `/${cat.slug}`;
        items.push({ name: cat.name, link: linkPath });
      });
    }

    // 3. Nếu có product, thêm product + variant
    console.log("Itemcate: ",);
    if (product) {
      linkPath += `/${product.slug}`;
      items.push({ name: product.name, link: linkPath });
      if (variant) {
        linkPath += `/${variant.id}`;
        items.push({ name: `${product.name} ${variant.storage || ""}`, link: linkPath });
      }
    }

    return items;
  }, [categories, product, variant, category]);
};
