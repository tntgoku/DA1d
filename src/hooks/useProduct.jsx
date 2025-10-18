import { useState ,useEffect,useMemo } from "react";
import { useProductFilters } from "./useProductFilter";
import { categoryService } from "../services/CateService";
import { productService } from "../services/productService";
import{ProductVariantGroup} from "../entity/Object/ProductVariantGroup"
import {uploadImageService} from "../services/uploadImageService";
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
        // TẠO BẢN SAO ĐỂ TRÁNH THAO TÁC TRỰC TIẾP VỚI OBJECT GỐC
        let productDataToSend = { ...formData }; 
        if (editingProduct) {
            // --- CẬP NHẬT SẢN PHẨM HIỆN CÓ (UPDATE) ---
            
            let finalImages = productDataToSend.images || []; 
            // 1. Tách ảnh cần upload (có file/blob URL) và ảnh cũ (đã có ID/URL)
            const imagesToUpload = (productDataToSend.images || []).filter(img => img.file || img.imgSrc.startsWith('blob:'));
            const existingImages = (productDataToSend.images || []).filter(img => img.id && !img.file && !img.imgSrc.startsWith('blob:'));
            
            // 2. Upload ảnh mới (Nếu có)
            if (imagesToUpload.length > 0) {
                const rescreateimage = await uploadImageService(productDataToSend.id, imagesToUpload);
                
                if(rescreateimage && rescreateimage.length > 0){
                    const uploadedImages = rescreateimage.map((img) => ({
                        id: img.id,
                        imgSrc: img.imageUrl, // Cấu trúc từ Server
                        imgAlt: img.altImg,   
                        variantId: img.variantId,
                        displayOrder: img.displayOrder,
                        isPrimary: img.isPrimary,
                    }));
                    
                    // GỘP: Ảnh cũ (đã tồn tại) + Ảnh mới (vừa upload)
                    finalImages = [...existingImages, ...uploadedImages];
                    console.log("Server trả về ảnh đã upload:", rescreateimage);
                } else {
                    // Upload thất bại, chỉ giữ lại ảnh cũ để gửi đi
                    alert("Cập nhật ảnh thất bại. Chỉ giữ lại ảnh hiện có.");
                    finalImages = existingImages;
                }
            } else {
                // Không có ảnh mới, chỉ giữ lại ảnh cũ
                finalImages = existingImages;
            }
            // 3. Gán mảng ảnh hoàn chỉnh (cũ + mới) vào dữ liệu gửi đi
            productDataToSend.images = finalImages; 
            // 4. Gọi API cập nhật sản phẩm
            const resproduct = await productService.updateProduct(productDataToSend.id, productDataToSend);
            if(resproduct && resproduct.status === 200){
                alert("Update sản phẩm thành công");
            } else {
                alert("Update sản phẩm thất bại");
            }
            // ❌ Loại bỏ: setProducts(updated); được gọi ở đầu hàm
            // setProducts chỉ nên được gọi khi API thành công, sau khi lấy dữ liệu mới nhất.
        } else {
            // --- TẠO MỚI SẢN PHẨM (CREATE) ---
            // 1. Tạo bản nháp sản phẩm để gửi đi lần 1 (CHƯA CÓ ID ẢNH)
            // LƯU Ý: Không thể upload ảnh trước vì chưa có Product ID để gán!
            const resCreateProduct = await productService.createProduct(productDataToSend);
            
            if (!resCreateProduct || resCreateProduct.status !== 200 || !resCreateProduct.data) {
                alert("Tạo sản phẩm thất bại.");
                return;
            }
            
            const createdProduct = resCreateProduct.data;
            let finalImages = createdProduct.images || [];
            // 2. Kiểm tra và Upload ảnh (NẾU CÓ) - Chỉ khi đã có Product ID
            const imagesToUpload = (productDataToSend.images || []).filter(img => img.file || img.imgSrc.startsWith('blob:'));
            if (imagesToUpload.length > 0) {
                const rescreateimage = await uploadImageService(createdProduct.id, imagesToUpload);
                if (rescreateimage && rescreateimage.length > 0) {
                    const uploadedImages = rescreateimage.map((img) => ({
                        id: img.id,
                        imgSrc: img.imageUrl,
                        // ... Gán các trường khác
                    }));
                    // Gán ảnh vừa upload vào sản phẩm mới tạo
                    createdProduct.images = uploadedImages;
                    finalImages = uploadedImages;
                    
                    // 3. GỌI LẠI API UPDATE/ADD IMAGES để gán ảnh vào sản phẩm vừa tạo
                    await productService.updateProduct(createdProduct.id, createdProduct);
                    
                    console.log("Server trả về ảnh khi CREATE:", rescreateimage);
                } else {
                    console.log("Create ảnh thất bại sau khi tạo sản phẩm.");
                }
            }
        }
        
        // --- CẬP NHẬT UI SAU KHI THAO TÁC API THÀNH CÔNG ---
        // Luôn tải lại toàn bộ danh sách để đảm bảo UI đồng bộ với Server
        const data = await productService.getAllProduct();
        const productsWithGroupedVariants = data.map(p => {
            // Giả định p.getVariantsGroupedByColor() và ProductVariantGroup có sẵn
            const groupedVariants = p.getVariantsGroupedByColor();
            return new ProductVariantGroup({
                ...p,
                variants: groupedVariants,
            });
        });
        setProducts(productsWithGroupedVariants);
        
        setShowFormDetail(false);
        setEditingProduct(null);

    } catch (error) {
        console.error("❌ Lỗi khi gửi API:", error);
        alert("Lỗi không xác định trong quá trình xử lý sản phẩm.");
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
