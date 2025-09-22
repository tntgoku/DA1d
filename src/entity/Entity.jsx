import React from 'react';
// Dữ liệu mẫu
import anh1 from '../assets/iphone-17-pro-max_1.webp'
const users = [
  { id: 1, name: 'Nguyễn Văn A', email: 'a.nguyen@example.com', phone: '0912345678', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Trần Thị B', email: 'b.tran@example.com', phone: '0923456789', role: 'Nhân viên', status: 'Active' },
  { id: 3, name: 'Lê Văn C', email: 'c.le@example.com', phone: '0934567890', role: 'Khách hàng', status: 'Inactive' }
];
const testOrders = [
  {
    id: 1,
    customer: 'Nguyễn Văn A',
    phone: '0905123456',
    email: 'nguyenvana@example.com',
    address: '123 Lê Lợi, Quận 1, TP.HCM',
    date: new Date().toISOString().slice(0, 16),
    payment: 'COD',
    status: 'Chờ xác nhận',
    notes: 'Giao giờ hành chính',
    items: [
      { productId: 101, productName: 'iPhone 13 128GB', price: 19990000, quantity: 1 },
      { productId: 202, productName: 'Ốp lưng iPhone 13', price: 250000, quantity: 2 }
    ],
    shippingFee: 30000,
    discount: 0,
    total:20520000,
    paid:false
  },
  {
    id: 2,
    customer: 'Trần Thị B',
    phone: '0912345678',
    email: 'tranb@example.com',
    address: '456 Hai Bà Trưng, Quận 3, TP.HCM',
    date: new Date().toISOString().slice(0, 16),
    payment: 'Chuyển khoản',
    status: 'Đang giao',
    notes: '',
    items: [
      { productId: 103, productName: 'iPhone 14 Pro 256GB', price: 30990000, quantity: 1 }
    ],
    shippingFee: 50000,
    discount: 1000000,
    total: 30040000,
    paid:true
  },
  {
    id: 3,
    customer: 'Lê Văn C',
    phone: '0987654321',
    email: 'levanc@example.com',
    address: '789 Nguyễn Huệ, Quận 1, TP.HCM',
    date: new Date().toISOString().slice(0, 16),
    payment: 'COD',
    status: 'Hoàn tất',
    notes: 'Khách kiểm  trả tiền trước rồi nhận',
    items: [
      { productId: 301, productName: 'AirPods Pro 2', price: 5990000, quantity: 1 },
      { productId: 401, productName: 'Cáp sạc Lightning chính hãng', price: 390000, quantity: 1 }
    ],
    shippingFee: 20000,
    discount: 500000,
    total: 5900000,
    paid:true
  }
  ,
  {
    id: 4,
    customer: 'Lê Văn C123',
    phone: '0987654321',
    email: 'levanc@example.com',
    address: '789 Nguyễn Huệ, Quận 1, TP.HCM',
    date: new Date().toISOString().slice(0, 16),
    payment: 'COD',
    status: 'Hoàn tất',
    notes: 'Khách kiểm tra trước khi nhận',
    items: [
      { productId: 301, productName: 'AirPods Pro 2', price: 5990000, quantity: 1 },
      { productId: 401, productName: 'Cáp sạc Lightning chính hãng', price: 390000, quantity: 1 }
    ],
    shippingFee: 20000,
    discount: 500000,
    total: 5900000,
    paid:false
  }
];

const productsvariant = [
  { product_id:1, id: 101, name: 'iPhone 14 Pro Max', category: 1, price: '28.990.000', discount: '10', stock: 15, status: 'Còn hàng', description: 'iPhone 14 Pro Max 128GB Chính Hãng VN/A - Mới 100', warranty: '12 tháng', isNew: true, imgSrc: anh1, imgAlt: 'iPhone 14 Pro Max', href:'iphone-14-pro-max-128gb-chinh-hang-vn-a-1'},
  { product_id:1, id: 102, name: 'iPhone 14 Pro Max 1TB 99', category: 1, price: '24.990.000', discount: '5', stock: 8, status: 'Còn hàng', description: 'iPhone 14 Pro Max 1TB Chính Hãng VN/A - Mới 100', warranty: '12 tháng', isNew: true, imgSrc: anh1, imgAlt: 'iPhone 14 Pro Max 1TB', href: 'iphone-14-pro-max-1tb-chinh-hang-vn-a-1'},
  { product_id:1, id: 103, name: 'iPhone 14 Pro Max 512GB 99', category: 1, price: '20.990.000', discount: '5', stock: 8, status: 'Còn hàng', description: 'iPhone 14 Pro Max 1TB Chính Hãng VN/A - Mới 100', warranty: '12 tháng', isNew: false, imgSrc: anh1, imgAlt: 'iPhone 14 Pro Max 1TB', href: 'iphone-14-pro-max-cu'},
  { product_id:2, id: 201, name: 'Ốp lưng iPhone 14 Pro', category: 3, price: '450.000', discount: null, stock: 32, status: 'Còn hàng', description: 'Ốp lưng iPhone 14 Pro Chính Hãng Apple Silicone Case with MagSafe', warranty: '6 tháng', isNew: false, imgSrc: anh1, imgAlt: 'Ốp lưng iPhone 14 Pro', href: '/op-lung-iphone-14-pro-chinh-hang-apple-silicone-case-with-magsafe-1'},
  { product_id:2, id: 202, name: 'Cáp sạc iPhone', category: 3, price: '290.000', discount: null, stock: 50, status: 'Còn hàng', description: 'Cáp sạc iPhone Chính Hãng Apple Lightning to USB-C (1m)', warranty: '6 tháng', isNew: false, imgSrc: anh1, imgAlt: 'Cáp sạc iPhone', href: '/cap-sac-iphone-chinh-hang-apple-lightning-to-usb-c-1m-1'},
];
const productsvariant1 = [
  {product_id:1, id: 101, name: 'iPhone 14 Pro Max 128GB'    , category: 2, price: '28.990.000', discount: '10', storage:"128",color :"Trắng" ,stock: 15, status: 'Còn hàng', description: 'iPhone 14 Pro Max 128GB Chính Hãng VN/A - Mới 100', warranty: '12 tháng', isNew: true, imgSrc: anh1, imgAlt: 'iPhone 14 Pro Max', href: 'iphone-14-pro-max-128gb-chinh-hang-vn-a-1'},
  {product_id:1, id: 102, name: 'iPhone 14 Pro Max 256GB 99', category: 1, price: '19.990.000', discount: '10', storage:"256",color :"Xanh" ,stock: 8, status: 'Còn hàng', description: 'iPhone 14 Pro Max 256GB Chính Hãng VN/A - Mới 100', warranty: '6 tháng', isNew: false, imgSrc: anh1, imgAlt: 'iPhone 14 Pro Max 256GB', href: 'iphone-14-pro-max-256gb-chinh-hang-vn-a-1'},
  {product_id:1, id: 103, name: 'iPhone 14 Pro Max 1T 99', category: 1, price: '20.990.000', discount: '8' , storage:"1024",color :"Đen" ,stock: 8, status: 'Còn hàng', description: 'iPhone 14 Pro Max 1TB Chính Hãng VN/A - Mới 100', warranty: '6 tháng', isNew: false, imgSrc: anh1, imgAlt: 'iPhone 14 Pro Max 1TB', href: 'iphone-14-pro-max-cu-99-1t'},
  {product_id:1, id: 104, name: 'iPhone 14 Pro Max 512GB 99', category: 1, price: '19.990.000', discount: '10', storage:"512",color :"Tím" ,stock: 8, status: 'Còn hàng', description: 'iPhone 14 Pro Max 256GB Chính Hãng VN/A - Mới 100', warranty: '6 tháng', isNew: false, imgSrc: anh1, imgAlt: 'iPhone 14 Pro Max 256GB', href: 'iphone-14-pro-max-256gb-chinh-hang-vn-a-1'},
  {product_id:1, id: 105, name: 'iPhone 14 Pro Max 256GB 99', category: 1, price: '19.990.000', discount: '10', storage:"256",color :"Vàng" ,stock: 8, status: 'Còn hàng', description: 'iPhone 14 Pro Max 256GB Chính Hãng VN/A - Mới 100', warranty: '6 tháng', isNew: false, imgSrc: anh1, imgAlt: 'iPhone 14 Pro Max 256GB', href: 'iphone-14-pro-max-256gb-chinh-hang-vn-a-1'},
  {product_id:1, id: 106, name: 'iPhone 14 Pro Max 128GB 99', category: 1, price: null, discount: '10', storage:"128",color :"Vàng-gold" ,stock: 8, status: 'Còn hàng', description: 'iPhone 14 Pro Max 128GB Chính Hãng VN/A - Mới 100', warranty: '6 tháng', isNew: false, imgSrc: anh1, imgAlt: 'iPhone 14 Pro Max 256GB', href: 'iphone-14-pro-max-128gb-99-vn-a-1'},
  {product_id:2, id: 201, name: 'Ốp lưng iPhone 14 Pro', category: 3, price: '450.000', discount: null, stock: 32, status: 'Còn hàng', description: 'Ốp lưng iPhone 14 Pro Chính Hãng Apple Silicone Case with MagSafe', warranty: '6 tháng', isNew: false, imgSrc: anh1, imgAlt: 'Ốp lưng iPhone 14 Pro', href: 'op-lung-iphone-14-pro-chinh-hang-apple-silicone-case-with-magsafe-1'},
  {product_id:2, id: 202, name: 'Cáp sạc iPhone', category: 3, price: '290.000', discount: null, stock: 50, status: 'Còn hàng', description: 'Cáp sạc iPhone Chính Hãng Apple Lightning to USB-C (1m)', warranty: '6 tháng', isNew: false, imgSrc: anh1, imgAlt: 'Cáp sạc iPhone', href: 'cap-sac-iphone-chinh-hang-apple-lightning-to-usb-c-1m-1'},
];
const orders = [
  { id: 'ORD-001', customer: 'Nguyễn Văn A', date: '20/11/2023', total: '12.450.000', payment: 'COD', status: 'Đã giao' },
  { id: 'ORD-002', customer: 'Trần Thị B', date: '21/11/2023', total: '28.990.000', payment: 'Chuyển khoản', status: 'Đang giao' },
  { id: 'ORD-003', customer: 'Lê Văn C', date: '22/11/2023', total: '3.450.000', payment: 'COD', status: 'Chờ xác nhận' }
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
const categories=[
  {id:1,name:"iPhone Cu"},
  {id:2,name:"IPhone Mới"},
  {id:3,name:"Phụ kiện Iphone"},
  {id:4,name:"Dịch vụ sửa chữa"},
]

export { users, productsvariant,productsvariant1, categories,orders,testOrders, repairs, reviews };
