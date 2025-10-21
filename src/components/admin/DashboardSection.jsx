import React from 'react';
const DashboardSection = ({ users, products, orders, repairs, sidebarOpen }) => {
  return (
    <div className='dashboard-container'>
      <div className="header d-flex justify-content-between align-items-center">
        <h4>Dashboard - Tổng quan</h4>

        <div className={`btn-group btn-filter ${sidebarOpen ? 'active' : ''}`}>
          <button className="btn btn-outline-secondary me-2">
            <i className="fas fa-sync-alt"></i>
          </button>
          <button className="btn btn-primary">
            <i className="fas fa-plus"></i> Thêm mới
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-3">
          <div className="card stat-card">
            <div className="number">{users.length}</div>
            <div className="label">Người dùng</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card stat-card">
            <div className="number">{products.length}</div>
            <div className="label">Sản phẩm</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card stat-card">
            <div className="number">{orders.length}</div>
            <div className="label">Đơn hàng</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card stat-card">
            <div className="number">{repairs.length}</div>
            <div className="label">Sửa chữa</div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span>Danh sách Bảng Dữ liệu</span>
              <div className="btn-group">
                <button className="btn btn-sm btn-outline-secondary">Tất cả</button>
                <button className="btn btn-sm btn-outline-secondary">Quan trọng</button>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Tên Bảng</th>
                      <th>Số Bản ghi</th>
                      <th>Kích thước</th>
                      <th>Lần cập nhật</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><i className="fas fa-table me-2"></i> users</td>
                      <td>{users.length}</td>
                      <td>256 KB</td>
                      <td>10 phút trước</td>
                      <td><span className="badge bg-success">Active</span></td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary">Xem</button>
                        <button className="btn btn-sm btn-outline-secondary">Sửa</button>
                      </td>
                    </tr>
                    <tr>
                      <td><i className="fas fa-table me-2"></i> products</td>
                      <td>{products.length}</td>
                      <td>1.2 MB</td>
                      <td>5 phút trước</td>
                      <td><span className="badge bg-success">Active</span></td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary">Xem</button>
                        <button className="btn btn-sm btn-outline-secondary">Sửa</button>
                      </td>
                    </tr>
                    <tr>
                      <td><i className="fas fa-table me-2"></i> orders</td>
                      <td>{orders.length}</td>
                      <td>512 KB</td>
                      <td>2 phút trước</td>
                      <td><span className="badge bg-success">Active</span></td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary">Xem</button>
                        <button className="btn btn-sm btn-outline-secondary">Sửa</button>
                      </td>
                    </tr>
                    <tr>
                      <td><i className="fas fa-table me-2"></i> repair_orders</td>
                      <td>{repairs.length}</td>
                      <td>384 KB</td>
                      <td>15 phút trước</td>
                      <td><span className="badge bg-success">Active</span></td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary">Xem</button>
                        <button className="btn btn-sm btn-outline-secondary">Sửa</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <span>Quan hệ giữa các Bảng</span>
            </div>
            <div className="card-body">
              <img src="https://via.placeholder.com/500x300?text=ER+Diagram" className="img-fluid rounded" alt="ER Diagram" />
              <p className="mt-3 text-center">Sơ đồ quan hệ thực thể của cơ sở dữ liệu</p>
            </div>
          </div>
        </div> */}
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <span>Hoạt động Gần đây</span>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <i className="fas fa-plus-circle text-success me-2"></i>
                    <span>Thêm sản phẩm mới</span>
                  </div>
                  <small className="text-muted">2 phút trước</small>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <i className="fas fa-edit text-primary me-2"></i>
                    <span>Cập nhật thông tin người dùng</span>
                  </div>
                  <small className="text-muted">10 phút trước</small>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <i className="fas fa-shopping-cart text-info me-2"></i>
                    <span>Đơn hàng mới #ORD-1234</span>
                  </div>
                  <small className="text-muted">15 phút trước</small>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <i className="fas fa-tools text-warning me-2"></i>
                    <span>Đơn sửa chữa mới #REP-5678</span>
                  </div>
                  <small className="text-muted">30 phút trước</small>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
export default DashboardSection;