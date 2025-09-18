import React from 'react';

const UsersSection = ({ users }) => {
  return (
    <div>
      <div className="header d-flex justify-content-between align-items-center">
        <h4>Quản lý Người dùng</h4>
        <button className="btn btn-primary">
          <i className="fas fa-plus"></i> Thêm người dùng
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <span>Danh sách Người dùng</span>
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
                  <th>ID</th>
                  <th>Họ tên</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Vai trò</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td><span className={`badge bg-${user.role === 'Admin' ? 'primary' : user.role === 'Nhân viên' ? 'info' : 'secondary'}`}>{user.role}</span></td>
                    <td><span className={`badge bg-${user.status === 'Active' ? 'success' : 'warning'}`}>{user.status}</span></td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-1"><i className="fas fa-edit"></i></button>
                      <button className="btn btn-sm btn-outline-danger"><i className="fas fa-trash"></i></button>
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

export default UsersSection;