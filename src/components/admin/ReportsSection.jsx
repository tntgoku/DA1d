import React, { useState, useEffect } from 'react';

const ReportsSection = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [hoveredData, setHoveredData] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Dữ liệu mẫu
  useEffect(() => {
    // Dữ liệu doanh thu theo ngày
    const dailyData = [
      { 
        day: '2023-10-01', 
        revenue: 8500000, 
        orders: 15,
        productsUpdated: 3,
        newProducts: 2,
        orderDetails: [
          { id: 'DH001', customer: 'Nguyễn Văn A', amount: 2500000 },
          { id: 'DH002', customer: 'Trần Thị B', amount: 1800000 },
          { id: 'DH003', customer: 'Lê Văn C', amount: 4200000 }
        ],
        productUpdates: [
          { name: 'iPhone 14 Pro', action: 'Cập nhật giá', oldPrice: 25000000, newPrice: 24900000 },
          { name: 'MacBook Air M2', action: 'Cập nhật tồn kho', oldStock: 5, newStock: 8 },
          { name: 'AirPods Pro 2', action: 'Thêm mới', price: 5990000, stock: 15 }
        ]
      },
      { 
        day: '2023-10-02', 
        revenue: 9200000, 
        orders: 18,
        productsUpdated: 2,
        newProducts: 1,
        orderDetails: [
          { id: 'DH004', customer: 'Phạm Thị D', amount: 3200000 },
          { id: 'DH005', customer: 'Hoàng Văn E', amount: 2800000 },
          { id: 'DH006', customer: 'Đỗ Thị F', amount: 3200000 }
        ],
        productUpdates: [
          { name: 'Samsung Galaxy S23', action: 'Cập nhật mô tả', changes: 'Thêm thông tin bảo hành' },
          { name: 'iPad 10th Gen', action: 'Thêm mới', price: 11900000, stock: 10 }
        ]
      },
      { 
        day: '2023-10-03', 
        revenue: 7800000, 
        orders: 12,
        productsUpdated: 4,
        newProducts: 0,
        orderDetails: [
          { id: 'DH007', customer: 'Nguyễn Văn G', amount: 2200000 },
          { id: 'DH008', customer: 'Trần Thị H', amount: 3600000 },
          { id: 'DH009', customer: 'Lê Văn I', amount: 2000000 }
        ],
        productUpdates: [
          { name: 'iPhone 13', action: 'Giảm giá', oldPrice: 18500000, newPrice: 17900000 },
          { name: 'MacBook Pro 14"', action: 'Cập nhật tồn kho', oldStock: 3, newStock: 2 },
          { name: 'Apple Watch S8', action: 'Cập nhật hình ảnh', changes: 'Thêm 3 hình mới' },
          { name: 'AirPods 3', action: 'Cập nhật mô tả', changes: 'Chỉnh sửa thông số kỹ thuật' }
        ]
      },
      { 
        day: '2023-10-04', 
        revenue: 10500000, 
        orders: 21,
        productsUpdated: 1,
        newProducts: 3,
        orderDetails: [
          { id: 'DH010', customer: 'Phạm Văn J', amount: 4500000 },
          { id: 'DH011', customer: 'Hoàng Thị K', amount: 2800000 },
          { id: 'DH012', customer: 'Đỗ Văn L', amount: 3200000 }
        ],
        productUpdates: [
          { name: 'Google Pixel 7', action: 'Thêm mới', price: 14900000, stock: 7 },
          { name: 'Samsung Tab S8', action: 'Thêm mới', price: 18900000, stock: 4 },
          { name: 'Sony WH-1000XM5', action: 'Thêm mới', price: 6990000, stock: 12 },
          { name: 'iPhone 14', action: 'Cập nhật khuyến mãi', changes: 'Tặng kèm ốp lưng' }
        ]
      },
      { 
        day: '2023-10-05', 
        revenue: 12000000, 
        orders: 24,
        productsUpdated: 2,
        newProducts: 1,
        orderDetails: [
          { id: 'DH013', customer: 'Nguyễn Thị M', amount: 5200000 },
          { id: 'DH014', customer: 'Trần Văn N', amount: 3800000 },
          { id: 'DH015', customer: 'Lê Thị O', amount: 3000000 }
        ],
        productUpdates: [
          { name: 'Dell XPS 13', action: 'Thêm mới', price: 32900000, stock: 3 },
          { name: 'Logitech MX Keys', action: 'Cập nhật giá', oldPrice: 2590000, newPrice: 2490000 },
          { name: 'Samsung S22 Ultra', action: 'Cập nhật trạng thái', oldStatus: 'Active', newStatus: 'Low Stock' }
        ]
      },
      { 
        day: '2023-10-06', 
        revenue: 9500000, 
        orders: 16,
        productsUpdated: 3,
        newProducts: 0,
        orderDetails: [
          { id: 'DH016', customer: 'Phạm Văn P', amount: 3500000 },
          { id: 'DH017', customer: 'Hoàng Thị Q', amount: 2800000 },
          { id: 'DH018', customer: 'Đỗ Văn R', amount: 3200000 }
        ],
        productUpdates: [
          { name: 'iPad Mini 6', action: 'Cập nhật tồn kho', oldStock: 8, newStock: 5 },
          { name: 'Mac Mini M2', action: 'Cập nhật mô tả', changes: 'Thêm thông tin RAM' },
          { name: 'Apple Pencil 2', action: 'Cập nhật hình ảnh', changes: 'Thêm hình màu trắng' }
        ]
      },
      { 
        day: '2023-10-07', 
        revenue: 11000000, 
        orders: 19,
        productsUpdated: 2,
        newProducts: 2,
        orderDetails: [
          { id: 'DH019', customer: 'Nguyễn Văn S', amount: 4200000 },
          { id: 'DH020', customer: 'Trần Thị T', amount: 3800000 },
          { id: 'DH021', customer: 'Lê Văn U', amount: 3000000 }
        ],
        productUpdates: [
          { name: 'Microsoft Surface Pro 9', action: 'Thêm mới', price: 28900000, stock: 2 },
          { name: 'JBL Flip 6', action: 'Thêm mới', price: 3290000, stock: 10 },
          { name: 'iPhone 14 Pro', action: 'Cập nhật giá', oldPrice: 28900000, newPrice: 28400000 }
        ]
      },
    ];
    
    // Dữ liệu doanh thu theo tháng
    const monthlyData = [
      { 
        month: '2023-05', 
        revenue: 285000000, 
        orders: 420,
        productsUpdated: 25,
        newProducts: 15
      },
      { 
        month: '2023-06', 
        revenue: 312000000, 
        orders: 480,
        productsUpdated: 18,
        newProducts: 12
      },
      { 
        month: '2023-07', 
        revenue: 298000000, 
        orders: 450,
        productsUpdated: 22,
        newProducts: 8
      },
      { 
        month: '2023-08', 
        revenue: 330000000, 
        orders: 510,
        productsUpdated: 30,
        newProducts: 20
      },
      { 
        month: '2023-09', 
        revenue: 345000000, 
        orders: 540,
        productsUpdated: 28,
        newProducts: 18
      },
      { 
        month: '2023-10', 
        revenue: 360000000, 
        orders: 570,
        productsUpdated: 35,
        newProducts: 22
      },
    ];
    
    setDailyRevenue(dailyData);
    setMonthlyRevenue(monthlyData);
  }, []);

  // Định dạng tiền Việt Nam
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  // Xử lý hover vào cột biểu đồ
  const handleBarHover = (event, data, isDaily = true) => {
    const rect = event.target.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
    setHoveredData({ ...data, isDaily });
  };

  // Xử lý rời khỏi cột biểu đồ
  const handleBarLeave = () => {
    setHoveredData(null);
  };

  // Tính tổng doanh thu tháng này
  const currentMonthRevenue = monthlyRevenue.length > 0 
    ? monthlyRevenue[monthlyRevenue.length - 1].revenue 
    : 0;
  
  // Tính tổng doanh thu tháng trước
  const previousMonthRevenue = monthlyRevenue.length > 1 
    ? monthlyRevenue[monthlyRevenue.length - 2].revenue 
    : 0;
  
  // Tính phần trăm tăng/giảm
  const revenueChange = previousMonthRevenue > 0 
    ? ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue * 100).toFixed(2)
    : 0;

  // Vẽ biểu đồ cột
  const renderBarChart = (data, isDaily = true) => {
    if (!data || data.length === 0) return null;
    
    const maxValue = Math.max(...data.map(item => item.revenue));
    const chartHeight = 200;
    
    return (
      <div className="chart-container" style={{ height: `${chartHeight}px`, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', marginTop: '20px', position: 'relative' }}>
        {data.map((item, index) => {
          const barHeight = (item.revenue / maxValue) * chartHeight;
          const label = isDaily 
            ? new Date(item.day).getDate() 
            : `T${new Date(item.month + '-01').getMonth() + 1}`;
          
          return (
            <div 
              key={index} 
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: `${80 / data.length}%` }}
              onMouseEnter={(e) => handleBarHover(e, item, isDaily)}
              onMouseLeave={handleBarLeave}
            >
              <div
                style={{
                  height: `${barHeight}px`,
                  width: '80%',
                  backgroundColor: '#4e73df',
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.3s ease',
                  cursor: 'pointer'
                }}
                className="chart-bar"
              ></div>
              <div style={{ marginTop: '8px', fontSize: '12px' }}>{label}</div>
            </div>
          );
        })}
      </div>
    );
  };

  // Hiển thị thông tin chi tiết khi hover
  const renderTooltip = () => {
    if (!hoveredData) return null;

    const { isDaily, revenue, orders, productsUpdated, newProducts, orderDetails, productUpdates, day, month } = hoveredData;
    const date = isDaily ? new Date(day).toLocaleDateString('vi-VN') : `Tháng ${new Date(month + '-01').getMonth() + 1}/2023`;

    return (
      <div 
        className="chart-tooltip" 
        style={{ 
          left: `${tooltipPosition.x}px`,
          top: `${tooltipPosition.y}px`,

        }}
      >
        <div className="card shadow-lg" style={{ width: '300px' }}>
          <div className="card-header py-2">
            <h6 className="m-0 font-weight-bold">{date}</h6>
          </div>
          <div className="card-body py-2">
            <p className="mb-1"><strong>Doanh thu:</strong> {formatCurrency(revenue)}</p>
            <p className="mb-1"><strong>Số đơn hàng:</strong> {orders}</p>
            <p className="mb-2"><strong>Sản phẩm cập nhật:</strong> {productsUpdated} ({newProducts} mới)</p>
            
            {isDaily && orderDetails && (
              <>
                <hr className="my-2" />
                <h6 className="mb-1">Đơn hàng gần nhất:</h6>
                {orderDetails.slice(0, 3).map((order, idx) => (
                  <div key={idx} className="d-flex justify-content-between small">
                    <span>{order.id} - {order.customer}</span>
                    <span>{formatCurrency(order.amount)}</span>
                  </div>
                ))}
              </>
            )}
            
            {isDaily && productUpdates && (
              <>
                <hr className="my-2" />
                <h6 className="mb-1">Cập nhật sản phẩm:</h6>
                {productUpdates.slice(0, 3).map((product, idx) => (
                  <div key={idx} className="small mb-1">
                    <div><strong>{product.name}</strong></div>
                    <div>{product.action}</div>
                    {product.oldPrice && product.newPrice && (
                      <div>Giá: {formatCurrency(product.oldPrice)} → {formatCurrency(product.newPrice)}</div>
                    )}
                    {product.oldStock && product.newStock && (
                      <div>Tồn kho: {product.oldStock} → {product.newStock}</div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="header d-flex justify-content-between align-items-center mb-4">
        <h4>Báo cáo Doanh thu</h4>
        <div className="btn-group" role="group">
          <button
            type="button"
            className={`btn ${selectedPeriod === 'day' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setSelectedPeriod('day')}
          >
            Theo ngày
          </button>
          <button
            type="button"
            className={`btn ${selectedPeriod === 'month' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setSelectedPeriod('month')}
          >
            Theo tháng
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span>Biểu đồ Doanh thu</span>
              <span className="badge bg-info">
                {selectedPeriod === 'day' ? '7 ngày gần nhất' : '6 tháng gần nhất'}
              </span>
            </div>
            <div className="card-body">
              {selectedPeriod === 'day' ? renderBarChart(dailyRevenue, true) : renderBarChart(monthlyRevenue, false)}
              {renderTooltip()}
              
              <div className="mt-4">
                <div className="row">
                  <div className="col-md-6">
                    <div className="card bg-primary text-white mb-4">
                      <div className="card-body">
                        <h6 className="card-title">Doanh thu trung bình</h6>
                        <h4 className="card-text">
                          {selectedPeriod === 'day' 
                            ? formatCurrency(dailyRevenue.reduce((sum, item) => sum + item.revenue, 0) / dailyRevenue.length)
                            : formatCurrency(monthlyRevenue.reduce((sum, item) => sum + item.revenue, 0) / monthlyRevenue.length)
                          }
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card bg-success text-white mb-4">
                      <div className="card-body">
                        <h6 className="card-title">Tổng doanh thu</h6>
                        <h4 className="card-text">
                          {selectedPeriod === 'day' 
                            ? formatCurrency(dailyRevenue.reduce((sum, item) => sum + item.revenue, 0))
                            : formatCurrency(monthlyRevenue.reduce((sum, item) => sum + item.revenue, 0))
                          }
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <span>Thống kê Doanh thu</span>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <h6>Doanh thu tháng này</h6>
                <h4 className="text-primary">{formatCurrency(currentMonthRevenue)}</h4>
              </div>
              
              <div className="mb-3">
                <h6>So với tháng trước</h6>
                <div className={`d-flex align-items-center ${revenueChange >= 0 ? 'text-success' : 'text-danger'}`}>
                  <i className={`fas ${revenueChange >= 0 ? 'fa-arrow-up' : 'fa-arrow-down'} me-2`}></i>
                  <span>{Math.abs(revenueChange)}%</span>
                </div>
              </div>
              
              <div className="mt-4">
                <h6>Mục tiêu tháng</h6>
                <div className="progress mb-2">
                  <div 
                    className="progress-bar bg-success" 
                    role="progressbar" 
                    style={{ width: `${Math.min(100, (currentMonthRevenue / 400000000) * 100)}%` }}
                    aria-valuenow={(currentMonthRevenue / 400000000) * 100}
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  >
                    {Math.round((currentMonthRevenue / 400000000) * 100)}%
                  </div>
                </div>
                <small>{formatCurrency(currentMonthRevenue)} / {formatCurrency(400000000)}</small>
              </div>
            </div>
          </div>
          
          <div className="card mt-4">
            <div className="card-header">
              <span>Sản phẩm Bán chạy</span>
            </div>
            <div className="card-body">
              <div className="list-group">
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-0">iPhone 14 Pro Max</h6>
                    <small className="text-muted">Điện thoại</small>
                  </div>
                  <span className="badge bg-primary rounded-pill">1,200,000 VNĐ</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-0">MacBook Pro 14 inch</h6>
                    <small className="text-muted">Laptop</small>
                  </div>
                  <span className="badge bg-primary rounded-pill">980,000 VNĐ</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-0">AirPods Pro 2</h6>
                    <small className="text-muted">Phụ kiện</small>
                  </div>
                  <span className="badge bg-primary rounded-pill">750,000 VNĐ</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-0">Apple Watch S8</h6>
                    <small className="text-muted">Đồng hồ</small>
                  </div>
                  <span className="badge bg-primary rounded-pill">620,000 VNĐ</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-0">iPad Air 5</h6>
                    <small className="text-muted">Tablet</small>
                  </div>
                  <span className="badge bg-primary rounded-pill">580,000 VNĐ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default ReportsSection;