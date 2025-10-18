const RepairsSection = ({ repairs }) => {
  return (
    <div>
      <div className="header d-flex justify-content-between align-items-center">
        <h4>Quản lý Sửa chữa</h4>
        <button className="btn btn-primary">
          <i className="fas fa-plus"></i> Tạo đơn sửa chữa
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <span>Danh sách Đơn Sửa chữa</span>
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
                  <th>Mã đơn</th>
                  <th>Khách hàng</th>
                  <th>Thiết bị</th>
                  <th>Ngày nhận</th>
                  <th>Dự kiến hoàn thành</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {repairs.map(repair => (
                  <tr key={repair.id}>
                    <td>{repair.id}</td>
                    <td>{repair.customer}</td>
                    <td>{repair.device}</td>
                    <td>{repair.received}</td>
                    <td>{repair.expected}</td>
                    <td><span className={`badge bg-${repair.status === 'Hoàn thành' ? 'success' : repair.status === 'Đang sửa' ? 'info' : 'warning'}`}>{repair.status}</span></td>
                    <td className='handle-btn'>
                      <button className="btn btn-sm btn-outline-primary me-1"><i className="fas fa-eye"></i></button>
                      <button className="btn btn-sm btn-outline-secondary"><i className="fas fa-edit"></i></button>
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

export default RepairsSection;