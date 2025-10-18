# Order Management System

## Tổng quan
Hệ thống quản lý đơn hàng với giao diện React và API Spring Boot.

## Cấu trúc API

### Endpoints
- `GET /api/order` - Lấy danh sách tất cả đơn hàng
- `GET /api/order/{id}` - Lấy chi tiết đơn hàng theo ID
- `POST /api/order` - Tạo đơn hàng mới
- `PUT /api/order/{id}` - Cập nhật đơn hàng
- `PUT /api/order/{id}/status` - Cập nhật trạng thái đơn hàng
- `DELETE /api/order/{id}` - Xóa đơn hàng

### Cấu trúc dữ liệu OrderRequest

```javascript
{
  id: Integer,                    // ID đơn hàng (null khi tạo mới)
  orderCode: String,              // Mã đơn hàng
  customer: Integer,              // ID khách hàng
  customerName: String,           // Tên khách hàng
  customerPhone: String,          // Số điện thoại
  customerEmail: String,          // Email
  customerAddress: String,        // Địa chỉ khách hàng
  shippingAddress: String,        // Địa chỉ giao hàng
  paymentMethod: String,          // Phương thức thanh toán (cod, vnpay, momo, bank_transfer, credit_card)
  paymentStatus: String,          // Trạng thái thanh toán (unpaid, paid, partial, refunded)
  orderStatus: String,            // Trạng thái đơn hàng (pending, confirmed, processing, shipped, delivered, cancelled, returned)
  notes: String,                  // Ghi chú
  shippingFee: BigDecimal,        // Phí vận chuyển
  discount: BigDecimal,           // Giảm giá
  subtotalAmount: BigDecimal,     // Tổng tiền hàng
  discountAmount: BigDecimal,     // Số tiền giảm giá
  taxAmount: BigDecimal,          // Thuế
  totalAmount: BigDecimal,        // Tổng cộng
  amountPaid: BigDecimal,         // Số tiền đã thanh toán
  voucherId: Integer,             // ID voucher
  voucherDiscount: BigDecimal,    // Giảm giá từ voucher
  shippingMethod: String,         // Phương thức vận chuyển
  trackingNumber: String,         // Mã vận đơn
  createdBy: Integer,             // ID người tạo
  createdAt: LocalDateTime,       // Ngày tạo
  items: [OrderItemRequest]       // Danh sách sản phẩm
}
```

### Cấu trúc dữ liệu OrderItemRequest

```javascript
{
  id: Integer,                    // ID item (null khi tạo mới)
  orderId: Integer,               // ID đơn hàng
  inventoryId: Integer,           // ID kho
  variantId: Integer,             // ID biến thể sản phẩm
  productName: String,            // Tên sản phẩm
  variantAttributes: String,      // Thuộc tính biến thể
  sku: String,                    // Mã SKU
  unitSalePrice: BigDecimal,      // Giá bán
  unitCostPrice: BigDecimal,      // Giá vốn
  quantity: Integer,              // Số lượng
  totalPrice: BigDecimal,         // Thành tiền
  warrantyMonths: Integer         // Bảo hành (tháng)
}
```

## Components

### OrdersSection.jsx
- Hiển thị danh sách đơn hàng
- Tìm kiếm và lọc đơn hàng
- Quản lý trạng thái đơn hàng
- Thao tác CRUD đơn hàng

### OrderModal.jsx
- Form tạo/sửa đơn hàng
- Chọn khách hàng từ danh sách
- Quản lý sản phẩm trong đơn hàng
- Tính toán tổng tiền

### OrderDetailModal.jsx
- Hiển thị chi tiết đơn hàng
- In đơn hàng
- Xem lịch sử trạng thái

## Hooks

### useOrderForm.jsx
- Quản lý form data
- Reset form
- Load data khi edit

### useOrderActions.jsx
- Xử lý các hành động CRUD
- Gửi request đến API
- Xử lý lỗi

### useCustomerSelection.jsx
- Load danh sách khách hàng
- Tìm kiếm khách hàng
- Auto-fill thông tin khách hàng

### useVariantManagement.jsx
- Quản lý sản phẩm trong đơn hàng
- Tính toán tổng tiền
- Merge sản phẩm trùng lặp

### useOrderFilters.jsx
- Lọc đơn hàng theo trạng thái
- Tìm kiếm đơn hàng
- Thống kê bộ lọc

## Cách sử dụng

### 1. Tạo đơn hàng mới
1. Click "Tạo đơn mới"
2. Chọn khách hàng từ dropdown hoặc nhập thông tin thủ công
3. Thêm sản phẩm vào đơn hàng
4. Điền thông tin thanh toán và vận chuyển
5. Click "Tạo đơn hàng"

### 2. Sửa đơn hàng
1. Click icon "Edit" trên đơn hàng cần sửa
2. Thay đổi thông tin cần thiết
3. Click "Cập nhật"

### 3. Thay đổi trạng thái đơn hàng
1. Sử dụng dropdown trạng thái trong bảng danh sách
2. Hoặc sửa đơn hàng để thay đổi nhiều thông tin

### 4. Xem chi tiết đơn hàng
1. Click icon "View" trên đơn hàng
2. Xem thông tin chi tiết
3. In đơn hàng nếu cần

## Lưu ý

### Frontend
- Sử dụng `formData.items` thay vì `formData.listiem`
- Đảm bảo tất cả field được map đúng với OrderRequest
- Xử lý lỗi và loading state

### Backend
- OrderRequest có `@JsonIgnoreProperties(ignoreUnknown = true)`
- Xử lý CRUD order items tự động
- Validate dữ liệu đầu vào

### Database
- Order và OrderItem có quan hệ One-to-Many
- Sử dụng JPA để quản lý quan hệ
- Lưu trữ đầy đủ thông tin khách hàng

## Testing

Sử dụng file `orderApiTest.js` để test API:

```javascript
import { runAllOrderTests } from '../test/orderApiTest';

// Chạy tất cả test
runAllOrderTests();
```

## Troubleshooting

### Lỗi thường gặp
1. **400 Bad Request**: Kiểm tra cấu trúc dữ liệu gửi lên
2. **500 Internal Server Error**: Kiểm tra backend logs
3. **LazyInitializationException**: Đảm bảo fetch đầy đủ dữ liệu trong transaction

### Debug
- Sử dụng console.log để trace dữ liệu
- Kiểm tra Network tab trong DevTools
- Xem backend logs để debug server-side issues
