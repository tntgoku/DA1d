import { useState ,useEffect,useMemo } from "react";
import { useProductFilters } from "./useProductFilter";
import { categoryService } from "../service/CateService";
import { productService } from "../service/productService";
import{ProductVariantGroup} from "../entity/Object/ProductVariantGroup"
export const normalizeProducts = (products) => {
  if (!products || !Array.isArray(products)) return [];
  return products.map(product => ({
    ...product,
    primaryImages: (product.images || []).filter(img => img.isPrimary),
    variants: product.variants || [],
  }));
};


export const useProductsSection = (Listproducts = []) => {
  const [products, setProducts] = useState(Listproducts);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [showFormDetail, setShowFormDetail] = useState(false);
  const [showProductDiscountModal, setShowProductDiscountModal] = useState(false);
  const [selectedProductForDiscount, setSelectedProductForDiscount] = useState(null);
  const [productDiscounts, setProductDiscounts] = useState([]);
  const itemsPerPage = 10;
  const [productDiscountFormData, setProductDiscountFormData] = useState({
    percentage_value: 0,
    product_id: "",
    discount_period_id: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await categoryService.getAllCate();
        setCategories(res);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // 🧩 Filter sản phẩm
const { filteredProducts, filters, setFilters } = useProductFilters(products); // ✅ thêm dòng này
  

  //  CRUD Sản phẩm
const handleFormSubmit = async (formData) => {  
  try {
    if (editingProduct) {
      const updated = products.map((p) =>
        p.id === editingProduct.id ? { ...p, ...formData } : p
      );
      setProducts(updated);
      // 🟢 Gọi API cập nhật và chờ phản hồi
      const res = await productService.updateProduct(formData.id, formData);
      console.log("Update gửi lên:", formData);
      console.log("Server trả về khi UPDATE:", res.data);
      const data = await productService.getAllProduct();
              const productsWithGroupedVariants = data.map(p => {
                const groupedVariants = p.getVariantsGroupedByColor();
                return new ProductVariantGroup({
                  ...p,            // giữ nguyên tất cả thông tin
                  variants: groupedVariants, // gán variants đã group
                });
              });
      setProducts(productsWithGroupedVariants);
    } else {
      const newProduct = {
        ...formData,
        id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
        price: formData.price,
        stock: formData.stock,
        imgSrc: formData.images?.[formData.featuredImageIndex] || "",
      };
      setProducts([...products, newProduct]);
      console.log("Create gửi lên:", newProduct);
      // 🟢 Gọi API thêm mới và chờ phản hồi
      const res = await productService.createProduct(newProduct);
        const data = await productService.getAllProduct();
              const productsWithGroupedVariants = data.map(p => {
                const groupedVariants = p.getVariantsGroupedByColor();
                return new ProductVariantGroup({
                  ...p,            // giữ nguyên tất cả thông tin
                  variants: groupedVariants, // gán variants đã group
                });
              });
      setProducts(productsWithGroupedVariants);
      console.log("Server trả về khi CREATE:", res.data);
    }
    setShowFormDetail(false);
    setEditingProduct(null);
  } catch (error) {
    console.error("❌ Lỗi khi gửi API:", error);
  }
};
const handleDelete =  async (id) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm này ${id} ?`)) {
      const reponse= await productService.deleteProduct(id);
      if(reponse.status===200){
        alert(`Xóa thành công sản phẩm :${id}`);
        setProducts(products.filter((product) => product.id !== id));
      }
    }
};
const toggleFeaturedProduct = async (productId, isFeatured) => {
    const newFeaturedState = !isFeatured; 
    // console.log("Trạng thái cũ:", isFeatured);
    // console.log("Trạng thái mới:", newFeaturedState);
    
    const updatedProducts = products.map((p) =>
        p.id === productId 
            ? { 
                ...p, 
                isFeatured: newFeaturedState //  cập nhật trạng thái mới
              } 
            : p
    );
    
    const productToSend = updatedProducts.find(product => product.id === productId);

    if (!productToSend) {
        console.error(`Lỗi: Không tìm thấy sản phẩm có ID ${productId} sau khi cập nhật.`);
        alert("Lỗi: Không tìm thấy sản phẩm để gửi.");
        return;
    }
    
    console.log("Sản phẩm gửi lên server:", productToSend);

    const reponse = await productService.updateProduct(productId, productToSend);
    
    if (reponse.status === 200) {
        if(reponse.data?.isFeatured===true){
          alert(`Bạn đã set Sản phẩm ${reponse.data?.name || 'này'} lên nổi bật.`);
        }
        setProducts(updatedProducts);
        console.log("Phản hồi thành công:", reponse.data);
    } else {
        console.error("Lỗi khi cập nhật sản phẩm:", reponse); 
        const errorMessage = reponse.data?.message || `Lỗi: ${reponse.status} - Không thể cập nhật trạng thái nổi bật.`;
        alert(`Có lỗi xảy ra: ${errorMessage}`);
    }
};
  const handleEditProduct = (product) => {
  setEditingProduct(product);
  setShowFormDetail(true);
};

  const getFeaturedProducts = useMemo(() => {
    return products.filter((product) => featuredProducts.includes(product.id));
  }, [products, featuredProducts]);

  // 💸 Giảm giá
  const handleAddProductDiscount = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/product-discount-periods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productDiscountFormData),
      });
      if (response.ok) {
        fetchProductDiscounts(selectedProductForDiscount.id);
      }
    } catch (error) {
      console.error("Error adding product discount:", error);
    }
  };

  const handleRemoveProductDiscount = async (productDiscountId) => {
    if (window.confirm("Bạn có chắc muốn xóa giảm giá này?")) {
      try {
        const response = await fetch(`/api/product-discount-periods/${productDiscountId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchProductDiscounts(selectedProductForDiscount.id);
        }
      } catch (error) {
        console.error("Error removing product discount:", error);
      }
    }
  };

  const handleProductDiscountInputChange = (e) => {
    const { name, value, type } = e.target;
    setProductDiscountFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleOpenProductDiscountModal = (product) => {
    setSelectedProductForDiscount(product);
    setProductDiscountFormData({
      percentage_value: 0,
      product_id: product.id,
      discount_period_id: "",
    });
    setShowProductDiscountModal(true);
  };
 const handleCloseProductDiscountModal=()=>{
   setShowProductDiscountModal(false);
 }
  return {
    products,
    categories,
    filters,
    filteredProducts,
    editingProduct,
    showFormDetail,
    featuredProducts,
    showProductDiscountModal,
    productDiscountFormData,
    productDiscounts,
    selectedProductForDiscount,

    setFilters,
    setShowFormDetail,
    setEditingProduct,
    handleFormSubmit,
    handleEditProduct,
    handleDelete,
    toggleFeaturedProduct,
    getFeaturedProducts,
    handleAddProductDiscount,
    handleRemoveProductDiscount,
    handleProductDiscountInputChange,
    handleCloseProductDiscountModal,
    handleOpenProductDiscountModal,
  };
};
