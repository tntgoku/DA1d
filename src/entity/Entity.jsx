import React from 'react';
// Dữ liệu mẫu
const users = [
  { id: 1, name: 'Nguyễn Văn A', email: 'a.nguyen@example.com', phone: '0912345678', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Trần Thị B', email: 'b.tran@example.com', phone: '0923456789', role: 'Nhân viên', status: 'Active' },
  { id: 3, name: 'Lê Văn C', email: 'c.le@example.com', phone: '0934567890', role: 'Khách hàng', status: 'Inactive' }
];

const products = [
  { id: 101, name: 'iPhone 14 Pro Max', category: 'Điện thoại', price: '28.990.000₫', stock: 15, status: 'Còn hàng' },
  { id: 102, name: 'iPhone 14 Pro Max 1TB 99%', category: 'Điện thoại', price: '24.990.000₫', stock: 8, status: 'Còn hàng' },
  { id: 201, name: 'Ốp lưng iPhone 14 Pro', category: 'Phụ kiện', price: '450.000₫', stock: 32, status: 'Còn hàng' }
];

const orders = [
  { id: 'ORD-001', customer: 'Nguyễn Văn A', date: '20/11/2023', total: '12.450.000₫', payment: 'COD', status: 'Đã giao' },
  { id: 'ORD-002', customer: 'Trần Thị B', date: '21/11/2023', total: '28.990.000₫', payment: 'Chuyển khoản', status: 'Đang giao' },
  { id: 'ORD-003', customer: 'Lê Văn C', date: '22/11/2023', total: '3.450.000₫', payment: 'COD', status: 'Chờ xác nhận' }
];

const repairs = [
  { id: 'REP-001', customer: 'Nguyễn Văn A', device: 'iPhone 12 Pro', received: '18/11/2023', expected: '25/11/2023', status: 'Hoàn thành' },
  { id: 'REP-002', customer: 'Trần Thị B', device: 'Samsung S21 Ultra', received: '20/11/2023', expected: '27/11/2023', status: 'Đang sửa' },
  { id: 'REP-003', customer: 'Lê Văn C', device: 'Xiaomi Redmi Note 10', received: '22/11/2023', expected: '29/11/2023', status: 'Chờ đánh giá' }
];

const reviews = [
  { id: 5001, customer: 'Nguyễn Văn A', product: 'iPhone 14 Pro Max', rating: 5, comment: 'Sản phẩm tuyệt vời, giao hàng nhanh', date: '15/11/2023', status: 'Hiển thị' },
  { id: 5002, customer: 'Trần Thị B', product: 'Dịch vụ sửa chữa', rating: 4, comment: 'Thợ sửa chữa chuyên nghiệp, giá cả hợp lý', date: '18/11/2023', status: 'Hiển thị' },
  { id: 5003, customer: 'Lê Văn C', product: 'Ốp lưng iPhone', rating: 3, comment: 'Chất lượng ổn, giá hơi cao', date: '20/11/2023', status: 'Chờ duyệt' }
];

export { users, products, orders, repairs, reviews };
