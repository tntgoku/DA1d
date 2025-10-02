// ProductsSection.jsx (phiên bản đã cập nhật)
import { useState, useEffect, useMemo } from 'react';
import { productsvariant1, categories } from '../../entity/Entity';
import { ItemProducts } from './ItemProduct/Itemproduct';
import { createProduct, updateProduct } from '../../service/productService';
import { DiscountPeriods } from './ItemProduct/FormDiscountPeroid';
import FormDetailProduct from './ItemProduct/Formdetailproduct'; // Import component mới
const ProductsSection = () => {
  const [products, setProducts] = useState(productsvariant1);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [showFeaturedModal, setShowFeaturedModal] = useState(false);

  // Thêm state để quyết định hiển thị FormDetailProduct
  const [showFormDetail, setShowFormDetail] = useState(false);

  // Các state khác giữ nguyên...
  const [showProductDiscountModal, setShowProductDiscountModal] = useState(false);
  const [selectedProductForDiscount, setSelectedProductForDiscount] = useState(null);
  const [productDiscounts, setProductDiscounts] = useState([]);
  const [productDiscountFormData, setProductDiscountFormData] = useState({
    percentage_value: 0,
    product_id: '',
    discount_period_id: ''
  });

  // Hàm mở modal thêm/sửa sản phẩm
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setShowFormDetail(true); // Hiển thị FormDetailProduct thay vì modal
  };

  // Hàm chỉnh sửa sản phẩm
  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowFormDetail(true); // Hiển thị FormDetailProduct thay vì modal
  };

  // Hàm xử lý submit form từ FormDetailProduct
  const handleFormSubmit = (formData) => {
    if (editingProduct) {
      // Cập nhật sản phẩm
      const updatedProducts = products.map(product => 
        product.id === editingProduct.id 
          ? { 
              ...formData, 
              id: editingProduct.id,
              price: parseInt(formData.price), 
              stock: parseInt(formData.stock),
              images: formData.images || [],
              featuredImageIndex: formData.featuredImageIndex || 0,
            } 
          : product
      );
      setProducts(updatedProducts);
      updateProduct(editingProduct);
    } else {
      // Thêm sản phẩm mới
      const newProduct = {
        ...formData,
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        price: parseInt(formData.price),
        stock: parseInt(formData.stock),
        imgSrc: formData.images[formData.featuredImageIndex] || ''
      };
      setProducts([...products, newProduct]);
      createProduct(newProduct);
    }
    
    setShowFormDetail(false);
    setEditingProduct(null);
  };

  // Hàm hủy form
  const handleFormCancel = () => {
    setShowFormDetail(false);
    setEditingProduct(null);
  };

  // Các hàm khác giữ nguyên...
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Không xác định';
  };

  const handleDelete = (id) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm này? ${id}`)) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const toggleFeaturedProduct = (productId) => {
    setFeaturedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const getFeaturedProducts = useMemo(() => {
    return products.filter(product => featuredProducts.includes(product.id));
  }, [products, featuredProducts]);

  const filteredProducts = useMemo(() => {
    const term = (searchTerm || '').trim().toLowerCase();
    if (!products || products.length === 0) return [];
    if (!term) return products;

    return products.filter(product => {
      const name = (product.name || '').toString().toLowerCase();
      const categoryName = getCategoryName(product.category).toLowerCase();
      return name.includes(term) || categoryName.includes(term);
    });
  }, [products, searchTerm]);
 // Hàm thêm giảm giá sản phẩm
  const handleAddProductDiscount = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/product-discount-periods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productDiscountFormData),
      });

      if (response.ok) {
        // Refresh danh sách
        fetchProductDiscounts(selectedProductForDiscount.id);
        // Reset form
        setProductDiscountFormData({
          percentage_value: 0,
          product_id: selectedProductForDiscount.id,
          discount_period_id: ''
        });
      }
    } catch (error) {
      console.error('Error adding product discount:', error);
    }
  };

  // Hàm xóa giảm giá sản phẩm
  const handleRemoveProductDiscount = async (productDiscountId) => {
    if (window.confirm('Bạn có chắc muốn xóa giảm giá này?')) {
      try {
        const response = await fetch(`/api/product-discount-periods/${productDiscountId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchProductDiscounts(selectedProductForDiscount.id);
        }
      } catch (error) {
        console.error('Error removing product discount:', error);
      }
    }
  };
  // Hàm xử lý input change cho form giảm giá
  const handleProductDiscountInputChange = (e) => {
    const { name, value, type } = e.target;
    setProductDiscountFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleOpenProductDiscountModal = (product) => {
    setSelectedProductForDiscount(product);
    setProductDiscountFormData({
      percentage_value: 0,
      product_id: product.id,
      discount_period_id: ''
    });
    setShowProductDiscountModal(true);
  };

  return (
    <div>
      {/* Hiển thị FormDetailProduct khi cần */}
      {showFormDetail && (
        <FormDetailProduct
          product={editingProduct}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          categories={categories}
        />
      )}

      {/* Phần giao diện chính của ProductsSection */}
      {!showFormDetail && (
        <>
          <div className="header d-flex justify-content-between align-items-center">
            <h4>Quản lý Sản phẩm</h4>
            <div>
              <button className="btn btn-primary me-2 btn-primary-2" onClick={() => setShowFeaturedModal(true)}>
                <i className="fas fa-star"></i> Sản phẩm nổi bật
              </button>
              <button className="btn btn-primary-2 btn-success" onClick={handleOpenAddModal}>
                <i className="fas fa-plus"></i> Thêm sản phẩm
              </button>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header" style={{display: 'flex', gap: 25, alignItems: 'center'}}>
                  <span>Danh sách Sản phẩm</span>
                  <div className="search-match">
                    <form className="input-groups1">
                      <input 
                        className="input-group-field auto-search search-auto form-control" 
                        placeholder="Bạn cần tìm gì..." 
                        autoComplete="off" 
                        type="text" 
                        name="query"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button type="button" className="btn icon-fallback-text" title="Search">
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </button>
                    </form>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover text-center align-middle">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Hình ảnh</th>
                          <th>Tên sản phẩm</th>
                          <th>Danh mục</th>
                          <th>Giá</th>
                          <th>Tồn kho</th>
                          <th>Trạng thái</th>
                          <th>Nổi bật</th>
                          <th>Thao tác</th>
                        </tr>
                      </thead>
                      <tbody className=''>
                        {filteredProducts.map(product => (
                          <ItemProducts 
                            key={product.id}
                            product={product} 
                            handleDelete={handleDelete} 
                            handleEdit={handleEdit}
                            getCategoryName={getCategoryName}
                            isFeatured={featuredProducts.includes(product.id)}
                            onToggleFeatured={toggleFeaturedProduct}
                            onManageDiscount={() => handleOpenProductDiscountModal(product)}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}


      <DiscountPeriods
        setShowProductDiscountModal={setShowProductDiscountModal}
        handleAddProductDiscount={handleAddProductDiscount}
        showProductDiscountModal={showProductDiscountModal}
        productDiscountFormData={productDiscountFormData}
        handleProductDiscountInputChange={handleProductDiscountInputChange}
        productDiscounts={productDiscounts}
        handleRemoveProductDiscount={handleRemoveProductDiscount}
        selectedProductForDiscount={selectedProductForDiscount}
      />
    </div>
  );
}

export default ProductsSection;