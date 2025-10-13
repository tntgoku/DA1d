import React, { useEffect, useState } from "react";
import Breadcrumb from "./Breadcrumb";
import { Link } from "react-router-dom";
import { useCategories } from "../hook/useCategori";
import { useBreadcrumb } from "../hook/useBreadcrumb";
import { productService } from "../service/productService";
import ItemProduct from "./client/Product/ItemProduct";
import { groupVariantsByStorage } from "../Util/ProductUtil";

export const MainListProduct = ({ categoryid, category }) => {
  const { categories, loading: loadingCate } = useCategories();
  const [products, setProducts] = useState([]);
  const [loadingProd, setLoadingProd] = useState(true);
  const [error, setError] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  
  console.log("Category ID:", categoryid);

  // Fetch products khi categoryid thay đổi
  useEffect(() => {
    if (!categoryid) {
      console.log("No category ID provided");
      setLoadingProd(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoadingProd(true);
        setError(null);
        console.log("Fetching products for category:", categoryid);
        const data = await productService.getProductsByCategory(categoryid);
        console.log("Fetched products:", data);
        setProducts(data || []); // Đảm bảo luôn là mảng
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
        setProducts([]);
      } finally {
        setLoadingProd(false);
      }
    };

    fetchProducts();
  }, [categoryid]);

  // Lấy category hiện tại
  const currentCategory = category;
  
  console.log("Products sau khi nhoms:", groupVariantsByStorage(products));

  // // Hiển thị loading
  // if (loadingProd) {
  //   return (
  //     <div className="body-wrap">
  //       <section className="bread-crumb">
  //         <div className="container">
  //           <Breadcrumb category={category} />
  //         </div>
  //       </section>
  //       <div className="container">
  //         <p>Loading products...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // // Hiển thị lỗi
  // if (error) {
  //   return (
  //     <div className="body-wrap">
  //       <section className="bread-crumb">
  //         <div className="container">
  //           <Breadcrumb category={category} />
  //         </div>
  //       </section>
  //       <div className="container">
  //         <p className="error">{error}</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="body-wrap">
      <section className="bread-crumb">
        <div className="container">
          <Breadcrumb category={category} />
        </div>
      </section>

      <section className="product-list container">
        <h2>{currentCategory?.name || "Products"}</h2>
        {products.length === 0 ? (
          <p>No products found in this category.</p>
        ) : (
          <div className="products d-flex flex-wrap" >
            {products.map((product, index) => {
              const variant = product?.variants?.[0]; // hoặc .at(0)
              if (!variant) return null; // bỏ qua nếu không có variant
              const nameproduct = `${product.name} ${variant.storage ?? ""} ${variant.regionCode ?? ""}`;
              return (
                <ItemProduct
                  key={index}
                  idkey={index}
                  nameproduct={nameproduct}
                  product={variant}
                  description={product.description}
                  Listimg={product.images}
                />
              );
            })}
          </div>
        )}

      </section>
    </div>
  );
};