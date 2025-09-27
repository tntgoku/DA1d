import { useState, useEffect, useMemo } from 'react';
import anh from '../../assets/anh1.webp';
import { productsvariant1, categories } from '../../entity/Entity'; // Import thêm categories
import {EditProductModal } from './ItemProduct/Editproduct';
import { ItemProducts} from './ItemProduct/Itemproduct';
const ProductsSection = () => {
  const [products, setProducts] = useState(productsvariant1);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
   const [featuredProducts, setFeaturedProducts] = useState([]);
  const [showFeaturedModal, setShowFeaturedModal] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [activeTab, setActiveTab] = useState('basic');
  const defaultFormData = {
  name: '',
  category: '',
  price: '',
  stock: '',
  status: 'Active',
  isFeatured: false,
  images: [],
  featuredImageIndex: 0,
  specifications: {
    color: '',
    storage: '',
    ram: '',
    screen: '',
    battery: '',
    chip: '',
    camera: '',
    weight: '',
    connectivity: '',
    features: ''
  }
};
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    status: 'Active',
    isFeatured: false,
    images:[],
     featuredImageIndex: 0, // thêm luôn nếu dùng
    specifications: {
      color: '',
      storage: '',
      ram: '',
      screen: '',
      battery: '',
      chip: '',
      camera: '',
      weight: '',
      connectivity: '',
      features: ''
    }
  });

  // Hàm lấy tên category từ id
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Không xác định';
  };



  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  // Cập nhật số lượng sản phẩm trong giỏ
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item =>
      item.id === productId 
        ? { ...item, quantity: newQuantity } 
        : item
    ));
  };

  // Reset form khi đóng modal
useEffect(() => {
  if (!showModal) {
    setFormData({
      name: '',
      category: '',
      price: '',
      stock: '',
      status: 'Active',
      isFeatured: false,
      images: editingProduct?.images || [],
      featuredImageIndex: editingProduct?.featuredImageIndex || 0,
      specifications: {
        color: '',
        storage: '',
        ram: '',
        screen: '',
        battery: '',
        chip: '',
        weight: '',
        connectivity: '',
        features: ''
      }
    });
    setEditingProduct(null);
    setActiveTab('basic');
  }
}, [showModal]);


  // Xử lý thay đổi input trong form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("No nam o day", name, value);
      console.log(value);
    if (name.startsWith('spec_')) {
      const specField = name.replace('spec_', '');
      setFormData({
        ...formData,
        specifications: {
          ...formData.specifications,
          [specField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    
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
    } else {
      // Thêm sản phẩm mới
      const newProduct = {
        ...formData,
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        price: parseInt(formData.price),
        stock: parseInt(formData.stock),
        imgSrc: formData.images[formData.featuredImageIndex] || '' // Ảnh chính
      };
      setProducts([...products, newProduct]);
    
    setShowModal(false);
  };
  }
  // Mở modal chỉnh sửa sản phẩm
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      id:product.id,
      product_id:product.product_id,
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      status: product.status,
      specifications: product.specifications || {
        color: product.color,
        storage: product.storage,
        ram: '',
        screen: '',
        battery: '',
        chip: '',
        camera: '',
        weight: '',
        connectivity: '',
        features: ''
      },
      images: product.images,
      featuredImageIndex:product.featuredImageIndex,
      isNew:product.isNew // Thêm trường ảnh
    });
    setShowModal(true);
  };

  // Xóa sản phẩm
  const handleDelete = (id) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm này? ${id}`)) {
      setProducts(products.filter(product => product.id !== id));
      setCartItems(cartItems.filter(item => item.id !== id));
    }
  };
  // Hàm thêm/xóa sản phẩm nổi bật
  const toggleFeaturedProduct = (productId) => {
    setFeaturedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };
const handleOpenAddModal = () => {
  setFormData({ ...defaultFormData }); // reset tất cả về mặc định
  setEditingProduct(null);
  setShowModal(true);
};
  // Hàm mở modal quản lý sản phẩm nổi bật
  const handleManageFeatured = () => {
    setShowFeaturedModal(true);
  };

  // Hàm lọc sản phẩm nổi bật
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
 // Khi editingProduct thay đổi, khởi tạo formData nếu đang edit
  useEffect(() => {
    if (editingProduct) {
      // Khởi tạo images nếu rỗng
      if (!formData.images || formData.images.length === 0) {
        handleInputChange({
          target: {
            name: 'images',
            value: editingProduct.images || []
          }
        });
      }
      // Khởi tạo featuredImageIndex nếu chưa có
      if (formData.featuredImageIndex === undefined || formData.featuredImageIndex === null) {
        handleInputChange({
          target: {
            name: 'featuredImageIndex',
            value: editingProduct.featuredImageIndex || 0
          }
        });
      }
      // Khởi tạo specifications nếu chưa có
      if (!formData.specifications) {
        handleInputChange({
          target: {
            name: 'specifications',
            value: editingProduct.specifications || {}
          }
        });
      }
    }
  }, [editingProduct]);
  return (
    <div>
      <div className="header d-flex justify-content-between align-items-center">
        <h4>Quản lý Sản phẩm</h4>
        <div>
          <button className="btn btn-primary me-2 btn-primary-2" onClick={(e)=>   setShowFeaturedModal(true)}>
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
            <div className="card-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span>Danh sách Sản phẩm</span>
                <div className="search-match">
                  <form action="/search" method="get" className="input-groups1">
                  <input className="input-group-field auto-search search-auto form-control" placeholder="Bạn cần tìm gì..." autoComplete="off" type="text" name="query"/>
                  <input type="hidden" value="product" name="type"/>
                  <button type="submit" className="btn icon-fallback-text" title="Search"><i className="fa-solid fa-magnifying-glass"></i></button>
                  </form>
                </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
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
                  <tbody className='table table-responsive'>
                    {filteredProducts.map(product => (
                      <ItemProducts product={product} 
                      handleDelete={handleDelete} handleEdit={handleEdit}
                      getCategoryName={getCategoryName}
                      isFeatured={featuredProducts.includes(product.id)}
                      onToggleFeatured={toggleFeaturedProduct}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
       {/* Modal Thêm/Sửa sản phẩm */}
      {showModal && (
        <EditProductModal
          showModal={showModal}
          setShowModal={setShowModal}
          editingProduct={editingProduct}
          handleSubmit={handleSubmit}
          formData={formData}
          handleInputChange={handleInputChange}
          setFormData={setFormData}
        />
      )}
        // Modal quản lý sản phẩm nổi bật
{showFeaturedModal && (
  <div className="modal fade show" style={{display: 'block'}}>
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Quản lý Sản phẩm Nổi bật</h5>
          <button type="button" className="btn-close" onClick={() => setShowFeaturedModal(false)}></button>
        </div>
        <div className="modal-body">
          <p><strong>Sản phẩm đang được đánh dấu nổi bật: {featuredProducts.length}</strong></p>
          
          <div className="row">
            {getFeaturedProducts.map(product => (
              <div key={product.id} className="col-md-6 mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <img 
                        src={product.imgSrc} 
                        alt={product.name} 
                        style={{width: '50px', height: '50px', objectFit: 'cover'}}
                        className="me-3"
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{product.name}</h6>
                        <p className="text-muted mb-0">{product.price.toLocaleString()}đ</p>
                      </div>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => toggleFeaturedProduct(product.id)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {getFeaturedProducts.length === 0 && (
            <div className="text-center text-muted py-4">
              <i className="fas fa-star fa-2x mb-2"></i>
              <p>Chưa có sản phẩm nổi bật</p>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={() => setShowFeaturedModal(false)}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default ProductsSection;