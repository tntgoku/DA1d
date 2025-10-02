import { useState,useEffect } from "react";

export const DiscountsSection = ({ discounts, discountPeriods, products }) => {
  const [activeTab, setActiveTab] = useState('discounts');
  const [showModal, setShowModal] = useState(false);
  const [showPeriodModal, setShowPeriodModal] = useState(false);
  const [showProductDiscountModal, setShowProductDiscountModal] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(null);
  const [editingPeriod, setEditingPeriod] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form data for discount
  const [formData, setFormData] = useState({
    discount_code: '',
    discount_name: '',
    type: 0,
    category: 1,
    value: 0,
    max_value: null,
    discount_condition: null,
    quantity: 1,
    enable: true,
    start_time: '',
    end_time: '',
    status: 1
  });

  // Form data for discount period
  const [periodFormData, setPeriodFormData] = useState({
    discount_period_code: '',
    discount_period_name: '',
    min_percentage_value: null,
    max_percentage_value: null,
    start_time: '',
    end_time: '',
    status: 1
  });

  // Form data for product discount
  const [productDiscountFormData, setProductDiscountFormData] = useState({
    percentage_value: 0,
    product_id: '',
    discount_period_id: ''
  });

  // Reset form khi đóng modal
  useEffect(() => {
    if (!showModal) {
      setFormData({
        discount_code: '',
        discount_name: '',
        type: 0,
        category: 1,
        value: 0,
        max_value: null,
        discount_condition: null,
        quantity: 1,
        enable: true,
        start_time: '',
        end_time: '',
        status: 1
      });
      setEditingDiscount(null);
    }
  }, [showModal]);

  useEffect(() => {
    if (!showPeriodModal) {
      setPeriodFormData({
        discount_period_code: '',
        discount_period_name: '',
        min_percentage_value: null,
        max_percentage_value: null,
        start_time: '',
        end_time: '',
        status: 1
      });
      setEditingPeriod(null);
    }
  }, [showPeriodModal]);

  useEffect(() => {
    if (!showProductDiscountModal) {
      setProductDiscountFormData({
        percentage_value: 0,
        product_id: '',
        discount_period_id: ''
      });
      setSelectedPeriod(null);
    }
  }, [showProductDiscountModal]);

  // Filter data based on search
  const filteredDiscounts = discounts.filter(discount => 
    discount.discount_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discount.discount_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPeriods = discountPeriods.filter(period =>
    period.discount_period_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    period.discount_period_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Discount functions
  const handleOpenAddModal = () => {
    setEditingDiscount(null);
    setFormData({
      discount_code: '',
      discount_name: '',
      type: 0,
      category: 1,
      value: 0,
      max_value: null,
      discount_condition: null,
      quantity: 1,
      enable: true,
      start_time: '',
      end_time: '',
      status: 1
    });
    setShowModal(true);
  };

  const handleEdit = (discount) => {
    setEditingDiscount(discount);
    setFormData({
      ...discount,
      start_time: discount.start_time ? discount.start_time.slice(0, 16) : '',
      end_time: discount.end_time ? discount.end_time.slice(0, 16) : ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa mã giảm giá này?')) {
      try {
        const response = await fetch(`/api/discounts/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          window.location.reload();
        }
      } catch (error) {
        console.error('Error deleting discount:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingDiscount 
        ? `/api/discounts/${editingDiscount.id}`
        : '/api/discounts';
      
      const method = editingDiscount ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowModal(false);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error saving discount:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'number' ? parseFloat(value) : 
              type === 'select-one' ? parseInt(value) : value
    }));
  };

  // Discount Period functions
  const handleOpenAddPeriodModal = () => {
    setEditingPeriod(null);
    setPeriodFormData({
      discount_period_code: '',
      discount_period_name: '',
      min_percentage_value: null,
      max_percentage_value: null,
      start_time: '',
      end_time: '',
      status: 1
    });
    setShowPeriodModal(true);
  };

  const handleEditPeriod = (period) => {
    setEditingPeriod(period);
    setPeriodFormData({
      ...period,
      start_time: period.start_time ? period.start_time.slice(0, 16) : '',
      end_time: period.end_time ? period.end_time.slice(0, 16) : ''
    });
    setShowPeriodModal(true);
  };

  const handleDeletePeriod = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa đợt giảm giá này?')) {
      try {
        const response = await fetch(`/api/discount-periods/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          window.location.reload();
        }
      } catch (error) {
        console.error('Error deleting discount period:', error);
      }
    }
  };

  const handlePeriodSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingPeriod 
        ? `/api/discount-periods/${editingPeriod.id}`
        : '/api/discount-periods';
      
      const method = editingPeriod ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(periodFormData),
      });

      if (response.ok) {
        setShowPeriodModal(false);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error saving discount period:', error);
    }
  };

  const handlePeriodInputChange = (e) => {
    const { name, value, type } = e.target;
    setPeriodFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : 
              type === 'select-one' ? parseInt(value) : value
    }));
  };

  // Product Discount functions
  const handleManageProductDiscount = (period) => {
    setSelectedPeriod(period);
    setProductDiscountFormData({
      percentage_value: 0,
      product_id: '',
      discount_period_id: period.id
    });
    setShowProductDiscountModal(true);
  };

  const handleProductDiscountSubmit = async (e) => {
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
        setShowProductDiscountModal(false);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error saving product discount:', error);
    }
  };

  const handleProductDiscountInputChange = (e) => {
    const { name, value, type } = e.target;
    setProductDiscountFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  // Helper functions
  const getDiscountTypeText = (type, category) => {
    const typeText = type === 0 ? 'Phần trăm' : 'Tiền mặt';
    const categoryText = category === 1 ? 'Sản phẩm' : 'Vận chuyển';
    return `${typeText} (${categoryText})`;
  };

  const getStatusBadge = (status, enable) => {
    if (!enable) return <span className="badge bg-secondary">Vô hiệu</span>;
    return status === 1 ? 
      <span className="badge bg-success">Kích hoạt</span> : 
      <span className="badge bg-warning">Chờ kích hoạt</span>;
  };

  const isDiscountActive = (discount) => {
    const now = new Date();
    const start = new Date(discount.start_time);
    const end = new Date(discount.end_time);
    return discount.enable && discount.status === 1 && now >= start && now <= end;
  };

  const getProductDiscounts = (periodId) => {
    // Giả sử bạn có API để lấy danh sách product_discount_period
    return []; // Trả về danh sách product discount periods
  };

  return (
    <div>
      <div className="header d-flex justify-content-between align-items-center">
        <h4>Quản lý Khuyến mãi</h4>
        <div>
          <button className="btn btn-primary me-2 btn-primary-2" onClick={handleOpenAddPeriodModal}>
            <i className="fas fa-calendar-alt"></i> Đợt giảm giá
          </button>
          <button className="btn btn-primary-2 btn-success" onClick={handleOpenAddModal}>
            <i className="fas fa-plus"></i> Thêm mã giảm giá
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header" style={{display: 'flex', gap: 25, alignItems: 'center'}}>
              <span>Danh sách Khuyến mãi</span>
              <div className="search-match">
                <form className="input-groups1">
                  <input 
                    className="input-group-field auto-search search-auto form-control" 
                    placeholder="Tìm kiếm mã hoặc tên khuyến mãi..." 
                    autoComplete="off" 
                    type="text" 
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
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'discounts' ? 'active' : ''}`}
                    onClick={() => setActiveTab('discounts')}
                  >
                    Mã giảm giá
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'periods' ? 'active' : ''}`}
                    onClick={() => setActiveTab('periods')}
                  >
                    Đợt giảm giá
                  </button>
                </li>
              </ul>

              <div className="tab-content mt-3" style={{display:"block "}}>
                {/* Discounts Tab */}
                {activeTab === 'discounts' && (
                  <div className="tab-pane fade show active">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Mã</th>
                            <th>Tên</th>
                            <th>Loại</th>
                            <th>Giá trị</th>
                            <th>Số lượng</th>
                            <th>Thời gian</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                          </tr>
                        </thead>
                        <tbody className='table table-responsive  text-center align-middle'>
                          {filteredDiscounts.map(discount => (
                            <tr key={discount.id}>
                              <td>
                                <strong>{discount.discount_code}</strong>
                                {isDiscountActive(discount) && (
                                  <span className="badge bg-success ms-1">Đang chạy</span>
                                )}
                              </td>
                              <td>{discount.discount_name || '---'}</td>
                              <td>{getDiscountTypeText(discount.type, discount.category)}</td>
                              <td>
                                {discount.type === 0 ? 
                                  `${discount.value}%` : 
                                  `${discount.value.toLocaleString()}đ`
                                }
                                {discount.max_value && (
                                  <div>
                                    <small className="text-muted">
                                      Tối đa: {discount.max_value.toLocaleString()}đ
                                    </small>
                                  </div>
                                )}
                              </td>
                              <td>{discount.quantity}</td>
                              <td>
                                <small>
                                  <div>Từ: {new Date(discount.start_time).toLocaleString('vi-VN')}</div>
                                  <div>Đến: {new Date(discount.end_time).toLocaleString('vi-VN')}</div>
                                </small>
                              </td>
                              <td className=" handle-btn text-center align-middle">
                                {getStatusBadge(discount.status, discount.enable)}
                              </td>
                              <td className="handle-btn text-center align-middle">
                                 <div className="d-flex justify-content-center align-items-center gap-2" style={{color:'black'}}>
                                <button 
                                  className="btn btn-sm btn-outline-primary me-1"
                                  onClick={() => handleEdit(discount)}
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button 
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDelete(discount.id)}
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Discount Periods Tab */}
                {activeTab === 'periods' && (
                  <div className="tab-pane fade show active">
                    <div className="table-responsive">
                      <table className="table table-hover text-center align-middle ">
                        <thead>
                          <tr>
                            <th>Mã đợt</th>
                            <th>Tên đợt</th>
                            <th>Giá trị %</th>
                            <th>Thời gian</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                          </tr>
                        </thead>
                        <tbody className=''>
                          {filteredPeriods.map(period => (
                            <tr key={period.id}>
                              <td>
                                <strong>{period.discount_period_code}</strong>
                              </td>
                              <td>{period.discount_period_name}</td>
                              <td>
                                {period.min_percentage_value && period.max_percentage_value ? 
                                  `${period.min_percentage_value}% - ${period.max_percentage_value}%` :
                                  'Tùy chỉnh'
                                }
                              </td>
                              <td>
                                <small>
                                  <div>Từ: {new Date(period.start_time).toLocaleString('vi-VN')}</div>
                                  <div>Đến: {new Date(period.end_time).toLocaleString('vi-VN')}</div>
                                </small>
                              </td>
                              <td className=" handle-btn text-center align-middle">
                                {period.status === 1 ? 
                                  <span className="badge bg-success">Kích hoạt</span> : 
                                  <span className="badge bg-secondary">Vô hiệu</span>
                                }
                              </td>
                              <td className="handle-btn text-center align-middle">
                                  <div className="d-flex justify-content-center align-items-center gap-2" style={{color:'black'}}>
                                <button 
                                  className="btn btn-sm btn-outline-primary me-1"
                                  onClick={() => handleEditPeriod(period)}
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button 
                                  className="btn btn-sm btn-outline-info me-1"
                                  onClick={() => handleManageProductDiscount(period)}
                                  title="Quản lý sản phẩm"
                                >
                                  <i className="fas fa-box"></i>
                                </button>
                                <button 
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDeletePeriod(period.id)}
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Thêm/Sửa mã giảm giá */}
      {showModal && (
        <div className="modal fade show" style={{display: 'block'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingDiscount ? 'Sửa mã giảm giá' : 'Thêm mã giảm giá'}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Mã giảm giá *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="discount_code"
                          value={formData.discount_code}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Tên giảm giá</label>
                        <input
                          type="text"
                          className="form-control"
                          name="discount_name"
                          value={formData.discount_name}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Loại giảm giá *</label>
                        <select
                          className="form-select"
                          name="type"
                          value={formData.type}
                          onChange={handleInputChange}
                        >
                          <option value={0}>Phần trăm (%)</option>
                          <option value={1}>Tiền mặt (đ)</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Danh mục *</label>
                        <select
                          className="form-select"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                        >
                          <option value={1}>Sản phẩm</option>
                          <option value={2}>Vận chuyển</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Giá trị *</label>
                        <input
                          type="number"
                          className="form-control"
                          name="value"
                          value={formData.value}
                          onChange={handleInputChange}
                          step="0.01"
                          min="0"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Giá trị tối đa</label>
                        <input
                          type="number"
                          className="form-control"
                          name="max_value"
                          value={formData.max_value || ''}
                          onChange={handleInputChange}
                          step="0.01"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Điều kiện áp dụng</label>
                        <input
                          type="number"
                          className="form-control"
                          name="discount_condition"
                          placeholder="Đơn hàng tối thiểu"
                          value={formData.discount_condition || ''}
                          onChange={handleInputChange}
                          step="0.01"
                          min="0"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Số lượng *</label>
                        <input
                          type="number"
                          className="form-control"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleInputChange}
                          min="1"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Thời gian bắt đầu *</label>
                        <input
                          type="datetime-local"
                          className="form-control"
                          name="start_time"
                          value={formData.start_time}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Thời gian kết thúc *</label>
                        <input
                          type="datetime-local"
                          className="form-control"
                          name="end_time"
                          value={formData.end_time}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Trạng thái</label>
                        <select
                          className="form-select"
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                        >
                          <option value={1}>Kích hoạt</option>
                          <option value={0}>Vô hiệu</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 form-check" style={{ marginTop: '2rem' }}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="enable"
                          checked={formData.enable}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label">Có hiệu lực</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Hủy
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingDiscount ? 'Cập nhật' : 'Thêm'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Thêm/Sửa đợt giảm giá */}
      {showPeriodModal && (
        <div className="modal fade show" style={{display: 'block'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingPeriod ? 'Sửa đợt giảm giá' : 'Thêm đợt giảm giá'}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowPeriodModal(false)}></button>
              </div>
              <form onSubmit={handlePeriodSubmit}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Mã đợt giảm giá *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="discount_period_code"
                          value={periodFormData.discount_period_code}
                          onChange={handlePeriodInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Tên đợt giảm giá *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="discount_period_name"
                          value={periodFormData.discount_period_name}
                          onChange={handlePeriodInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Giá trị % tối thiểu</label>
                        <input
                          type="number"
                          className="form-control"
                          name="min_percentage_value"
                          value={periodFormData.min_percentage_value || ''}
                          onChange={handlePeriodInputChange}
                          min="0"
                          max="100"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Giá trị % tối đa</label>
                        <input
                          type="number"
                          className="form-control"
                          name="max_percentage_value"
                          value={periodFormData.max_percentage_value || ''}
                          onChange={handlePeriodInputChange}
                          min="0"
                          max="100"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Thời gian bắt đầu *</label>
                        <input
                          type="datetime-local"
                          className="form-control"
                          name="start_time"
                          value={periodFormData.start_time}
                          onChange={handlePeriodInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Thời gian kết thúc *</label>
                        <input
                          type="datetime-local"
                          className="form-control"
                          name="end_time"
                          value={periodFormData.end_time}
                          onChange={handlePeriodInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Trạng thái</label>
                        <select
                          className="form-select"
                          name="status"
                          value={periodFormData.status}
                          onChange={handlePeriodInputChange}
                        >
                          <option value={1}>Kích hoạt</option>
                          <option value={0}>Vô hiệu</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowPeriodModal(false)}>
                    Hủy
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingPeriod ? 'Cập nhật' : 'Thêm'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};