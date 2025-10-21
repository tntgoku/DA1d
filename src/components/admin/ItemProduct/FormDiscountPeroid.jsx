import { useState, useEffect } from "react";

export const DiscountPeriods = ({
  setShowProductDiscountModal,
  handleAddProductDiscount,
  showProductDiscountModal,
  productDiscountFormData,
  handleProductDiscountInputChange,
  productDiscounts,
  handleRemoveProductDiscount,
  selectedProductForDiscount
}) => {
  const [discountPeriods, setDiscountPeriods] = useState([]);
const imageSrc = selectedProductForDiscount?.images &&
                 selectedProductForDiscount.images.length > 0 &&
                 selectedProductForDiscount.featuredImageIndex > 0 &&
                 selectedProductForDiscount.images[selectedProductForDiscount.featuredImageIndex - 1]
                 ? selectedProductForDiscount.images[selectedProductForDiscount.featuredImageIndex - 1].imgSrc
                 : ""; // ảnh mặc định nếu null


  const fetchActiveDiscountPeriods = async () => {
    try {
      // Dummy data để test - xóa sau khi có API thật
      const dummyData = [
        {
          id: 1,
          discount_period_name: 'Đợt giảm giá mùa hè',
          start_time: '2024-06-01T00:00:00',
          end_time: '2024-08-31T23:59:59',
          status: 1
        },
        {
          id: 2,
          discount_period_name: 'Đợt giảm giá Back to School',
          start_time: '2024-08-15T00:00:00',
          end_time: '2024-09-15T23:59:59',
          status: 1
        }
      ];
      setDiscountPeriods(dummyData);
    } catch (error) {
      console.error('Error fetching discount periods:', error);
    }
  };

  // Fetch data khi component mount
  useEffect(() => {
    if (showProductDiscountModal) {
      fetchActiveDiscountPeriods();
    }
  }, [showProductDiscountModal]);

  // Kiểm tra điều kiện hiển thị
  if (!showProductDiscountModal || !selectedProductForDiscount) {
    return null;
  }

  return (
    <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Quản lý giảm giá - {selectedProductForDiscount.name}
            </h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setShowProductDiscountModal()}
            ></button>
          </div>
          
          <div className="modal-body">
            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h6>Thêm giảm giá mới</h6>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleAddProductDiscount}>
                      <div className="mb-3">
                        <label className="form-label">Đợt giảm giá *</label>
                        <select
                          className="form-select"
                          name="discount_period_id"
                          value={productDiscountFormData.discount_period_id}
                          onChange={handleProductDiscountInputChange}
                          required
                        >
                          <option value="">Chọn đợt giảm giá</option>
                          {discountPeriods.map(period => (
                            <option key={period.id} value={period.id}>
                              {period.discount_period_name} 
                              ({new Date(period.start_time).toLocaleDateString()} - {new Date(period.end_time).toLocaleDateString()})
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="mb-3">
                        <label className="form-label">Giá trị giảm % *</label>
                        <input
                          type="number"
                          className="form-control"
                          name="percentage_value"
                          value={productDiscountFormData.percentage_value}
                          onChange={handleProductDiscountInputChange}
                          min="0"
                          max="100"
                          step="1"
                          required
                        />
                      </div>
                      
                      <button type="submit" className="btn btn-primary w-100">
                        Thêm giảm giá
                      </button>
                    </form>
                  </div>
                </div>
                
                {/* Thông tin sản phẩm */}
                <div className="card mt-3">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <img 
                        src={imageSrc} 
                        alt={selectedProductForDiscount.name}
                        style={{width: '60px', height: '60px', objectFit: 'cover'}}
                        className="me-3"
                      />
                      <div>
                        <h6 className="mb-1">{selectedProductForDiscount.name}</h6>
                        <p className="text-muted mb-0">
                          Giá gốc: <strong>{selectedProductForDiscount.price?.toLocaleString()}đ</strong>
                        </p>
                        <p className="text-muted mb-0">
                          Tồn kho: {selectedProductForDiscount.stock}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">Danh sách giảm giá đang áp dụng</h6>
                  </div>
                  <div className="card-body">
                    {productDiscounts && productDiscounts.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table table-sm">
                          <thead>
                            <tr>
                              <th>Đợt giảm giá</th>
                              <th>Thời gian</th>
                              <th>Giá trị giảm</th>
                              <th>Giá sau giảm</th>
                              <th>Trạng thái</th>
                              <th>Thao tác</th>
                            </tr>
                          </thead>
                          <tbody>
                            {productDiscounts.map(item => {
                              const period = discountPeriods.find(p => p.id === item.discount_period_id);
                              const discountedPrice = selectedProductForDiscount.price * (1 - (item.percentage_value || 0) / 100);
                              const isActive = period && new Date() >= new Date(period.start_time) && new Date() <= new Date(period.end_time);
                              
                              return (
                                <tr key={item.id}>
                                  <td>
                                    <strong>{period?.discount_period_name || 'Unknown'}</strong>
                                  </td>
                                  <td>
                                    <small>
                                      {period ? (
                                        <>
                                          <div>Từ: {new Date(period.start_time).toLocaleString('vi-VN')}</div>
                                          <div>Đến: {new Date(period.end_time).toLocaleString('vi-VN')}</div>
                                        </>
                                      ) : '---'}
                                    </small>
                                  </td>
                                  <td>
                                    <span className="badge bg-danger">
                                      {item.percentage_value}%
                                    </span>
                                  </td>
                                  <td>
                                    <strong className="text-success">
                                      {discountedPrice.toLocaleString()}đ
                                    </strong>
                                    <div>
                                      <small className="text-muted">
                                        Tiết kiệm: {(selectedProductForDiscount.price - discountedPrice).toLocaleString()}đ
                                      </small>
                                    </div>
                                  </td>
                                  <td>
                                    {isActive ? (
                                      <span className="badge bg-success">Đang chạy</span>
                                    ) : (
                                      <span className="badge bg-secondary">Chưa/kết thúc</span>
                                    )}
                                  </td>
                                  <td>
                                    <button 
                                      className="btn btn-sm btn-outline-danger"
                                      onClick={() => handleRemoveProductDiscount(item.id)}
                                    >
                                      <i className="fas fa-trash"></i>
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center text-muted py-4">
                        <i className="fas fa-tag fa-2x mb-2"></i>
                        <p>Chưa có giảm giá nào cho sản phẩm này</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Thống kê nhanh */}
                <div className="card mt-3">
                  <div className="card-body">
                    <h6>Thống kê giảm giá</h6>
                    <div className="row text-center">
                      <div className="col-md-4">
                        <div className="border rounded p-2">
                          <div className="text-primary fw-bold">
                            {productDiscounts ? productDiscounts.length : 0}
                          </div>
                          <small className="text-muted">Tổng số giảm giá</small>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="border rounded p-2">
                          <div className="text-success fw-bold">
                            {productDiscounts ? productDiscounts.filter(item => {
                              const period = discountPeriods.find(p => p.id === item.discount_period_id);
                              return period && new Date() >= new Date(period.start_time) && new Date() <= new Date(period.end_time);
                            }).length : 0}
                          </div>
                          <small className="text-muted">Đang hoạt động</small>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="border rounded p-2">
                          <div className="text-warning fw-bold">
                            {productDiscounts && productDiscounts.length > 0 ? 
                              Math.max(...productDiscounts.map(item => item.percentage_value)) : 0}%
                          </div>
                          <small className="text-muted">Giảm giá cao nhất</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => setShowProductDiscountModal(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};