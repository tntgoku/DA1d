const SettingsSection = () => {
const handleClearDatabase = async () => {
  if (!window.confirm("Bạn có chắc muốn xóa toàn bộ dữ liệu?")) return;

  try {
    const response = await axios.delete("http://localhost:8080/api/clear-database");
    alert(response.data);
  } catch (error) {
    console.error("Error clearing database:", error);
    alert("Xảy ra lỗi khi xóa dữ liệu!");
  }
};
  return (
    <div>
      <div className="header">
        <h4>Cài đặt Hệ thống</h4>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <span>Cài đặt Chung</span>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Tên cửa hàng</label>
                  <input type="text" className="form-control" value="Boyco Store" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email liên hệ</label>
                  <input type="email" className="form-control" value="contact@boycostore.com" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Số điện thoại</label>
                  <input type="text" className="form-control" value="0909123456" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Địa chỉ</label>
                  <textarea className="form-control">123 Đường Nguyễn Văn Linh, Quận 7, TP. HCM</textarea>
                </div>
                <button type="submit" className="btn btn-primary">Lưu thay đổi</button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <span>Cài đặt Bảo mật</span>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Mật khẩu hiện tại</label>
                  <input type="password" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Mật khẩu mới</label>
                  <input type="password" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Xác nhận mật khẩu mới</label>
                  <input type="password" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Đổi mật khẩu</button>
              </form>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-header">
              <span>Sao lưu Dữ liệu</span>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary">
                  <i className="fas fa-download me-2"></i> Sao lưu dữ liệu
                </button>
                <button className="btn btn-outline-secondary">
                  <i className="fas fa-upload me-2"></i> Khôi phục dữ liệu
                </button>
                 <button className="btn btn-outline-secondary" onClick={handleClearDatabase}>
                  <i className="fas fa-upload me-2"></i>Xóa dữ liệu....
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsSection;
