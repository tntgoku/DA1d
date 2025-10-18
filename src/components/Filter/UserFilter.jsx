import { USER_ROLES, USER_STATUS } from '../../constants/userConstants';

export const UserFilter = ({ users, filters, onFilterChange }) => {
  const handleFilterChange = (name, value) => {
    onFilterChange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="row g-2 mb-3">
      {/* Ô tìm kiếm */}
      <div className="col-md-4">
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm người dùng..."
          value={filters.searchTerm}
          onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
        />
      </div>
      
      {/* Lọc theo vai trò */}
      <div className="col-md-3">
        <select
          className="form-select"
          value={filters.roleFilter}
          onChange={(e) => handleFilterChange("roleFilter", e.target.value)}
        >
          <option value="">Tất cả vai trò</option>
          <option value={USER_ROLES.ADMIN}>Admin</option>
          <option value={USER_ROLES.EMPLOYEE}>Nhân viên</option>
          <option value={USER_ROLES.CUSTOMER}>Người dùng</option>
        </select>
      </div>

      {/* Lọc theo trạng thái */}
      <div className="col-md-3">
        <select
          className="form-select"
          value={filters.statusFilter}
          onChange={(e) => handleFilterChange("statusFilter", e.target.value)}
        >
          <option value="">Tất cả trạng thái</option>
          <option value={USER_STATUS.ACTIVE}>Hoạt động</option>
          <option value={USER_STATUS.INACTIVE}>Không hoạt động</option>
        </select>
      </div>

      {/* Lọc theo số đơn hàng */}
      <div className="col-md-2">
        <select
          className="form-select"
          value={filters.ordersFilter}
          onChange={(e) => handleFilterChange("ordersFilter", e.target.value)}
        >
          <option value="">Tất cả</option>
          <option value="0">Chưa có đơn</option>
          <option value="1-5">1-5 đơn</option>
          <option value="6-10">6-10 đơn</option>
          <option value="10+">Trên 10 đơn</option>
        </select>
      </div>
    </div>
  );
};
