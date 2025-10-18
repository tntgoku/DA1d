# OrderHistory Test Data

## Tổng quan
Dữ liệu test cho component `OrderHistory.jsx` với đầy đủ các trường hợp sử dụng.

## Cấu trúc dữ liệu

### Order Object
```javascript
{
  id: String,           // Mã đơn hàng (VD: "ORD001")
  date: String,         // Ngày đặt hàng (VD: "2024-01-15")
  status: String,       // Trạng thái đơn hàng
  total: Number,        // Tổng tiền
  items: Array          // Danh sách sản phẩm
}
```

### Item Object
```javascript
{
  productName: String,  // Tên sản phẩm
  quantity: Number,     // Số lượng
  price: Number         // Giá sản phẩm
}
```

## Các trạng thái đơn hàng
- `"Chờ xác nhận"` - Đơn hàng mới, chờ xác nhận
- `"Đã xác nhận"` - Đơn hàng đã được xác nhận
- `"Đang giao"` - Đơn hàng đang được vận chuyển
- `"Đã giao"` - Đơn hàng đã giao thành công
- `"Đã hủy"` - Đơn hàng đã bị hủy

## Datasets có sẵn

### 1. `orderHistoryTestData` (10 đơn hàng)
- Dữ liệu cơ bản với các trạng thái khác nhau
- Đơn hàng đơn sản phẩm và đa sản phẩm
- Giá từ 650,000đ đến 8,900,000đ

### 2. `orderStatusTestData` (5 đơn hàng)
- Test đầy đủ các trạng thái
- Mỗi trạng thái 1 đơn hàng
- Dùng để test hiển thị trạng thái

### 3. `multiItemOrderTestData` (2 đơn hàng)
- Đơn hàng có nhiều sản phẩm (4 sản phẩm/đơn)
- Test hiển thị danh sách sản phẩm dài
- Test tính tổng tiền đa sản phẩm

### 4. `largeQuantityOrderTestData` (2 đơn hàng)
- Đơn hàng có số lượng sản phẩm lớn
- Test hiển thị quantity x price
- Test tính tổng với số lượng lớn

## Cách sử dụng

### Import dữ liệu
```javascript
import { 
  orderHistoryTestData,
  orderStatusTestData,
  multiItemOrderTestData,
  largeQuantityOrderTestData,
  getAllOrderHistoryTestData,
  getOrderHistoryByStatus,
  getOrderHistoryById,
  getOrderHistoryByDateRange 
} from '../data/orderHistoryTestData';
```

### Sử dụng với OrderHistory component
```javascript
import OrderHistory from './OrderHistory';
import { orderHistoryTestData } from '../data/orderHistoryTestData';

function MyComponent() {
  return <OrderHistory orders={orderHistoryTestData} />;
}
```

### Sử dụng với OrderHistoryDemo component
```javascript
import OrderHistoryDemo from './OrderHistoryDemo';

function TestPage() {
  return <OrderHistoryDemo />;
}
```

## Các hàm utility

### `getAllOrderHistoryTestData()`
Trả về tất cả dữ liệu test (19 đơn hàng)

### `getOrderHistoryByStatus(status)`
Lọc đơn hàng theo trạng thái
```javascript
const deliveredOrders = getOrderHistoryByStatus('Đã giao');
```

### `getOrderHistoryById(id)`
Tìm đơn hàng theo ID
```javascript
const order = getOrderHistoryById('ORD001');
```

### `getOrderHistoryByDateRange(startDate, endDate)`
Lọc đơn hàng theo khoảng thời gian
```javascript
const recentOrders = getOrderHistoryByDateRange('2024-01-01', '2024-01-31');
```

## Test và Demo

### Chạy test
```javascript
import { runAllOrderHistoryTests } from '../test/orderHistoryTest';

// Chạy tất cả test
runAllOrderHistoryTests();
```

### Sử dụng demo component
```javascript
import OrderHistoryDemo from './OrderHistoryDemo';

// Component demo với controls để chọn dataset
<OrderHistoryDemo />
```

## Ví dụ dữ liệu

### Đơn hàng đơn sản phẩm
```javascript
{
  id: "ORD001",
  date: "2024-01-15",
  status: "Đã giao",
  total: 2500000,
  items: [
    {
      productName: "iPhone 15 Pro 128GB Titanium Blue",
      quantity: 1,
      price: 2500000
    }
  ]
}
```

### Đơn hàng đa sản phẩm
```javascript
{
  id: "ORD004",
  date: "2024-01-05",
  status: "Chờ xác nhận",
  total: 4500000,
  items: [
    {
      productName: "iPad Pro 12.9-inch M2 256GB WiFi Space Gray",
      quantity: 1,
      price: 2800000
    },
    {
      productName: "Apple Pencil (2nd generation)",
      quantity: 1,
      price: 1700000
    }
  ]
}
```

### Đơn hàng số lượng lớn
```javascript
{
  id: "LARGE001",
  date: "2024-01-07",
  status: "Đã giao",
  total: 5000000,
  items: [
    {
      productName: "AirPods (3rd generation)",
      quantity: 10,
      price: 500000
    }
  ]
}
```

## Lưu ý

1. **Format ngày**: Sử dụng format "YYYY-MM-DD"
2. **Format tiền**: Số nguyên (VND)
3. **Trạng thái**: Phải khớp với `getStatusColor` function trong OrderHistory
4. **ID**: Phải unique trong mỗi dataset
5. **Items**: Luôn là array, không được null hoặc undefined

## Mở rộng

Để thêm dữ liệu test mới:

1. Thêm vào file `orderHistoryTestData.js`
2. Cập nhật các hàm utility nếu cần
3. Thêm test case vào `orderHistoryTest.js`
4. Cập nhật demo component nếu cần
