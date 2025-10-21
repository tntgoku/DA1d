import React from 'react';
import { formatDate, formatCurrency, getRoleBadgeClass, getStatusBadgeClass, getRoleName } from '../../../utils/userUtils';

export const ItemUser = ({ 
  user, 
  handleDelete, 
  handleEdit, 
  handleToggleStatus,
  handleMakeAdmin,
  handleMakeUser
}) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>
        <div className="d-flex align-items-center">
          <div className="avatar-sm bg-primary rounded-circle d-flex align-items-center justify-content-center me-2">
            <i className="fas fa-user text-white"></i>
          </div>
          <div>
            <div className="fw-bold">{user.name}</div>
            <small className="text-muted">{user.username}</small>
          </div>
        </div>
      </td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>
        <span className={`badge bg-${getRoleBadgeClass(user.role)}`}>
          {user.roleId ? getRoleName(user.roleId) : user.role}
        </span>
      </td>
      {/* <td>
        <span className={`badge bg-${getStatusBadgeClass(user.status)}`}>
          {user.status}
        </span>
      </td> */}
      <td>{user.totalOrders}</td>
      <td>{formatCurrency(user.totalSpent)}</td>
      <td>{formatDate(user.createdAt)}</td>
      <td>
        <div className="btn-group" role="group" style={{display: 'flex', gap: '10px',justifyContent: 'space-between'}}>
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => handleEdit(user)}
            title="Chỉnh sửa"
          >
            <i className="fas fa-edit"></i>
          </button>
          
          {/* Role management buttons */}
          {/* {user.role !== 'Admin' && (
            <button
              className="btn btn-sm btn-outline-success"
              onClick={() => handleMakeAdmin(user.email)}
              title="Cấp quyền Admin"
            >
              <i className="fas fa-user-shield"></i>
            </button>
          )}
          
          {user.role === 'Admin' && (
            <button
              className="btn btn-sm btn-outline-warning"
              onClick={() => handleMakeUser(user.email)}
              title="Hạ quyền User"
            >
              <i className="fas fa-user"></i>
            </button>
          )} */}
          
          {/* <button
            className={`btn btn-sm btn-outline-${user.status === 'Active' ? 'warning' : 'success'}`}
            onClick={() => handleToggleStatus(user.id, user.status)}
            title={`${user.status === 'Active' ? 'Vô hiệu hóa' : 'Kích hoạt'}`}
          >
            <i className={`fas fa-${user.status === 'Active' ? 'ban' : 'check'}`}></i>
          </button> */}
          
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => handleDelete(user.id)}
            title="Xóa"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};
