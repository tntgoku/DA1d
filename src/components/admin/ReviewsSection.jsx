const ReviewsSection = ({ reviews }) => {
  return (
    <div>
      <div className="header d-flex justify-content-between align-items-center">
        <h4>Quản lý Đánh giá</h4>
        <button className="btn btn-outline-secondary">
          <i className="fas fa-filter"></i> Lọc
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <span>Đánh giá từ Khách hàng</span>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Khách hàng</th>
                  <th>Sản phẩm/Dịch vụ</th>
                  <th>Đánh giá</th>
                  <th>Nội dung</th>
                  <th>Ngày đăng</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map(review => (
                  <tr key={review.id}>
                    <td>{review.id}</td>
                    <td>{review.customer}</td>
                    <td>{review.product}</td>
                    <td>
                      <div className="text-warning">
                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      </div>
                    </td>
                    <td>{review.comment}</td>
                    <td>{review.date}</td>
                    <td><span className={`badge bg-${review.status === 'Hiển thị' ? 'success' : 'secondary'}`}>{review.status}</span></td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-1"><i className="fas fa-check"></i></button>
                      <button className="btn btn-sm btn-outline-danger"><i className="fas fa-times"></i></button>
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

export default ReviewsSection;