import { useState, useEffect, useMemo } from 'react';
import anh from '../../assets/anh1.webp';
import { productsvariant1, categories } from '../../entity/Entity'; // Import thêm categories
import {EditProductModal } from './ItemProduct/Editproduct';
import { ItemProducts} from './ItemProduct/Itemproduct';
const ProductsSection = () => {
  // Khởi tạo state với productsvariant1
  const [products, setProducts] = useState(productsvariant1);
  // Xóa dòng gán trực tiếp: products = productsvariant1;

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    status: 'Active',
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
          ? { ...formData, id: editingProduct.id, price: parseInt(formData.price), stock: parseInt(formData.stock) } 
          : product
      );
      setProducts(updatedProducts);
    } else {
      // Thêm sản phẩm mới
      const newProduct = {
        ...formData,
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        price: parseInt(formData.price),
        stock: parseInt(formData.stock)
      };
      setProducts([...products, newProduct]);
    }
    
    setShowModal(false);
  };

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
      imgSrc: product.imgSrc,
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

  return (
    <div>
      <div className="header d-flex justify-content-between align-items-center">
        <h4>Quản lý Sản phẩm</h4>
        <button className="btn btn-primary"  onClick={() => setShowModal(true)}>
          <i className="fas fa-plus"></i> Thêm sản phẩm
        </button>
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
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map(product => (
                      <ItemProducts product={product} 
                      handleDelete={handleDelete} handleEdit={handleEdit}
                      getCategoryName={getCategoryName}
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
        />
      )}
      
    </div>
  );
}

export default ProductsSection;