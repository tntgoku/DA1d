import React, { useState, useEffect} from 'react';
import { UserModal } from './UserModal';
// Component Modal cho thêm/sửa người dùng

const UsersSection = ({ users: initialUsers }) => {
  // State quản lý danh sách users
  const [users, setUsers] = useState(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Người dùng',
    status: 'Active',
    password: '',
      totalOrders: 0,
  totalSpent: 0,
  lastOrderDate: '',
  membershipLevel: 'Standard',
  loyaltyPoints: 0,
  discountRate: 0,
  purchaseNotes: '',
  defaultShippingAddress: '',
  createdAt: new Date().toISOString().split('T')[0] // Ngày tạo
  });

  // Cập nhật users khi initialUsers thay đổi
  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  // Reset form khi đóng modal
  useEffect(() => {
    if (!showModal) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'Người dùng',
        status: 'Active',
        password: '',  totalOrders: 0,
  totalSpent: 0,
  lastOrderDate: '',
  membershipLevel: 'Standard',
  loyaltyPoints: 0,
  discountRate: 0,
  purchaseNotes: '',
  defaultShippingAddress: '',
  createdAt: new Date().toISOString().split('T')[0] // Ngày tạo
      });
      setEditingUser(null);
    }
  }, [showModal]);

  // Xử lý thay đổi input trong form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingUser) {
      // Cập nhật người dùng
      const updatedUsers = users.map(user => 
        user.id === editingUser.id 
          ? { ...formData, id: editingUser.id }
          : user
      );
      setUsers(updatedUsers);
    } else {
      // Thêm người dùng mới
      const newUser = {
        ...formData,
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
      };
      setUsers([...users, newUser]);
    }
    
    setShowModal(false);
  };

  // Mở modal chỉnh sửa người dùng
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      role: user.role || 'Người dùng',
      status: user.status || 'Active',
      password: '' // Không hiển thị mật khẩu cũ
    });
    setShowModal(true);
  };

  // Xóa người dùng
  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  // Lọc users theo search term
  const filteredUsers = users.filter(user => {
    const term = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.phone.includes(term) ||
      user.role.toLowerCase().includes(term)
    );
  });

  // Hàm lấy class cho badge role
  const getRoleBadgeClass = (role) => {
    switch (role) {
      case 'Admin': return 'primary';
      case 'Nhân viên': return 'info';
      default: return 'secondary';
    }
  };

  // Hàm lấy class cho badge status
  const getStatusBadgeClass = (status) => {
    return status === 'Active' ? 'success' : 'warning';
  };

  return (
    <div>
      <div className="header d-flex justify-content-between align-items-center">
        <h4>Quản lý Người dùng</h4>
        <button 
          className="btn btn-primary" 
          onClick={() => setShowModal(true)}
        >
          <i className="fas fa-plus"></i> Thêm người dùng
        </button>
      </div>

      <div className="card">
        <div className="card-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <span>Danh sách Người dùng</span>
          <div className="search-match">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                // Search logic is handled by filteredUsers
              }} 
              className="input-groups1"
            >
              <input 
                className="input-group-field auto-search search-auto form-control" 
                placeholder="Bạn cần tìm gì..." 
                autoComplete="off" 
                type="text" 
                name="query"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="btn icon-fallback-text" title="Search">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Họ tên</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Vai trò</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody className=' table table-responsive'>
                {filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td className='text-center align-middle'>{user.id}</td>
                    <td className='text-center align-middle'>{user.name}</td>
                    <td className='text-center align-middle'>{user.email}</td>
                    <td className='text-center align-middle'>{user.phone}</td>
                    <td className='text-center align-middle'>
                      <span className={`badge bg-${getRoleBadgeClass(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className=' handle-btn text-center align-middle'>
                      <span className={`badge bg-${getStatusBadgeClass(user.status)}`} style={{width: '80%',height:"100%",fontSize:13}}>
                        {user.status}
                      </span>
                    </td>
                    <td className=' handle-btn text-center align-middle' >
                      <button 
                        className="btn btn-sm btn-outline-primary me-1"  
                        onClick={() => handleEdit(user)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger" 
                     
                        onClick={() => handleDelete(user.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredUsers.length === 0 && (
              <div className="text-center py-4">
                <p>Không tìm thấy người dùng nào</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Thêm/Sửa người dùng */}
      <UserModal
        showModal={showModal}
        setShowModal={setShowModal}
        editingUser={editingUser}
        handleSubmit={handleSubmit}
        formData={formData}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}

export default UsersSection;