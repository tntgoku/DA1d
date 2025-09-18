 import { useState, useEffect } from 'react';
import anh from '../../assets/anh1.webp';
import EditProductModal from './Editproduct';

const ProductsSection = () => {
 const [products, setProducts] = useState([
    { 
      id: 1, 
      name: 'iPhone 14 Pro Max', 
      category: 'Iphone', 
      price: 28990000, 
      stock: 10, 
      status: 'Active',
      img: anh,
      specifications: {
        color: 'Tím',
        storage: '256GB',
        ram: '6GB',
        screen: '6.7 inch',
        battery: '4323 mAh',
        chip: 'Apple A16 Bionic',
        camera: '48MP'
      }
    },
    { 
      id: 2, 
      name: 'MacBook Pro 14 inch', 
      category: 'Laptop', 
      price: 45990000, 
      stock: 5, 
      status: 'Active',
      img: anh,
      specifications: {
        color: 'Bạc',
        storage: '512GB SSD',
        ram: '16GB',
        screen: '14.2 inch',
        battery: '70Wh',
        chip: 'Apple M2 Pro',
        weight: '1.6kg'
      }
    },
    { 
      id: 3, 
      name: 'AirPods Pro 2', 
      category: 'Phụ kiện', 
      price: 5990000, 
      stock: 20, 
      status: 'Active',
      img: anh,
      specifications: {
        color: 'Trắng',
        battery: '6h nghe nhạc',
        charging: 'MagSafe',
        connectivity: 'Bluetooth 5.3',
        features: 'Chống ồn chủ động'
      }
    },
  ]);

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

  // Định dạng tiền Việt Nam
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  // Tính tổng tiền trong giỏ hàng
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
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
          camera: '',
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
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      status: product.status,
      specifications: product.specifications || {
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
    setShowModal(true);
  };

  // Xóa sản phẩm
  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      setProducts(products.filter(product => product.id !== id));
      setCartItems(cartItems.filter(item => item.id !== id));
    }
  };

  // Lọc sản phẩm theo từ khóa tìm kiếm
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
                <div class="search-match">
                  <form action="/search" method="get" class="input-groups1">
                  <input class="input-group-field auto-search search-auto form-control" placeholder="Bạn cần tìm gì..." autocomplete="off" type="text" name="query"/>
                  <input type="hidden" value="product" name="type"/>
                  <button type="submit" class="btn icon-fallback-text" title="Search"><i class="fa-solid fa-magnifying-glass"></i></button>
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
                    {products.map(product => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td className="product-img"><img src={anh}  width="64" height="64" className="img-thumbnail" alt="Product" /></td>
                        <td className="product-name">{product.name}</td>
                        <td className="product-cate">{product.category}</td>
                        <td className="text-left product-price">{product.price}</td>
                        <td>{product.stock}</td>
                        <td><span className="badge bg-success">{product.status}</span></td>
                        <td className='handle-btn'>
                          <button className="btn btn-sm btn-outline-primary me-1" onClick={() => handleEdit(product)}><i className="fas fa-edit"></i></button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(product.id)}><i className="fas fa-trash"></i></button>
                        </td>
                      </tr>
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