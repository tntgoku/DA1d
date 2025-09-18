

const OrdersSection = ({ orders }) => {
return (
    <div>
      <div className="header d-flex justify-content-between align-items-center">
        <h4>Quản lý Đơn hàng</h4>
        <div>
          <button className="btn btn-outline-secondary me-2"><i className="fas fa-filter"></i> Lọc</button>
          <button className="btn btn-primary"><i className="fas fa-plus"></i> Tạo đơn mới</button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span>Danh sách Đơn hàng</span>
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
                  <th>Mã đơn</th>
                  <th>Khách hàng</th>
                  <th>Ngày đặt</th>
                  <th>Tổng tiền</th>
                  <th>Phương thức</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.date}</td>
                    <td>{order.total}</td>
                    <td>{order.payment}</td>
                    <td><span className={`badge bg-${order.status === 'Đã giao' ? 'success' : order.status === 'Đang giao' ? 'info' : 'warning'}`}>{order.status}</span></td>
                    <td className='handle-btn'>
                      <button className="btn btn-sm btn-outline-primary me-1"><i className="fas fa-eye"></i></button>
                      <button className="btn btn-sm btn-outline-secondary"><i className="fas fa-print"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OrdersSection;