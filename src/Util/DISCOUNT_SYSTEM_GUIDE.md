# 📘 Hướng dẫn sử dụng Hệ thống Giảm giá Nâng cao

## 🎯 Tổng quan

Hệ thống giảm giá nâng cao hỗ trợ nhiều loại khuyến mãi phức tạp:

1. **Giảm theo bậc thang** - Giảm giá theo giá trị đơn hàng
2. **Mua X Tặng Y** - Khuyến mãi mua nhiều tặng thêm
3. **Giảm giá Bundle** - Combo sản phẩm
4. **Quà tặng** - Tặng quà khi đạt điều kiện
5. **Miễn phí vận chuyển** - Free ship theo điều kiện
6. **Giảm giá theo số lượng SP khác nhau** - Khuyến khích mua đa dạng

## 📂 Cấu trúc Files

```
src/
├── Util/
│   ├── advancedDiscountEngine.js      # Logic tính toán giảm giá
│   └── discountEngine.js              # Engine cơ bản (legacy)
├── components/admin/
│   ├── DiscountSection.jsx            # Giao diện quản lý
│   └── modals/
│       ├── AdvancedRulesModal.jsx     # Modal cấu hình rules
│       └── AppliedProductsModal.jsx   # Modal quản lý sản phẩm
└── hook/
    ├── useDiscountManagement.jsx      # Hook quản lý discount logic
    └── useAppliedProducts.jsx         # Hook quản lý sản phẩm áp dụng
```

## 🚀 Cách sử dụng trong Admin

### 1. Tạo Đợt Giảm Giá (Discount Period)

1. Vào **Dashboard > Khuyến mãi**
2. Click **"Đợt giảm giá"**
3. Điền thông tin cơ bản:
   - Mã đợt (unique)
   - Tên đợt
   - Thời gian bắt đầu/kết thúc
   - Trạng thái

### 2. Cấu hình Quy tắc Nâng cao

Trong danh sách đợt giảm giá, click nút **"⚙️ Quy tắc nâng cao"** (màu xanh lá)

#### A. Giảm theo bậc thang (Tiered Discount)

**Ví dụ:** 
- Đơn từ 500k giảm 50k
- Đơn từ 1tr giảm 150k
- Đơn từ 2tr giảm 10%

**Cách cấu hình:**

| Giá trị đơn tối thiểu | Loại giảm | Giá trị | Giảm tối đa |
|----------------------|-----------|---------|-------------|
| 500,000đ | Tiền mặt | 50,000 | - |
| 1,000,000đ | Tiền mặt | 150,000 | - |
| 2,000,000đ | Phần trăm | 10 | 500,000 |

**Kết quả:**
- Đơn 600k: giảm 50k → Thanh toán 550k
- Đơn 1.5tr: giảm 150k → Thanh toán 1.35tr
- Đơn 3tr: giảm 10% (300k) → Thanh toán 2.7tr

#### B. Mua X Tặng Y (Buy X Get Y)

**Ví dụ:** Mua 2 iPhone tặng 1 ốp lưng (giảm 100%)

**Cách cấu hình:**
- **Mua sản phẩm (ID):** 1,2,3 (ID các iPhone)
- **Số lượng mua:** 2
- **Tặng sản phẩm (ID):** 10,11,12 (ID các ốp lưng)
- **Số lượng tặng:** 1
- **Giảm (%):** 100 (miễn phí)
- **Số lần áp dụng tối đa:** 1

**Biến thể:**
- Mua 3 tặng 1 cùng loại: Đặt buy_product_ids = get_product_ids
- Giảm giá thay vì tặng: Đặt giảm 50% thay vì 100%

#### C. Giảm giá khi mua nhiều SP khác nhau

**Ví dụ:** Mua từ 3 sản phẩm khác nhau giảm 15%

**Cách cấu hình:**
- **Số SP khác nhau tối thiểu:** 3
- **Loại giảm:** Phần trăm
- **Giá trị giảm:** 15
- **Giảm tối đa:** 300,000đ

**Kết quả:**
- Khách mua 3 sản phẩm khác nhau trị giá 2tr → Giảm 15% (300k)
- Khách mua 2 sản phẩm → Không được giảm

#### D. Quà tặng (Gift Rewards)

**Ví dụ:** Đơn từ 2tr tặng tai nghe Bluetooth

**Cách cấu hình:**
- **Giá trị đơn tối thiểu:** 2,000,000đ
- **Số lượng SP tối thiểu:** 0 (không giới hạn)
- **Danh sách quà:**
  - Mô tả: "Tai nghe Bluetooth AirPods"
  - Giá trị ước tính: 1,500,000đ

**Kết quả:** Hiển thị thông báo "Bạn được tặng: Tai nghe Bluetooth AirPods"

#### E. Miễn phí vận chuyển

**Ví dụ:** Đơn từ 500k free ship (tối đa 30k)

**Cấu hình:**
- **Giá trị đơn tối thiểu:** 500,000đ
- **Giảm tối đa phí ship:** 30,000đ

**Kết quả:**
- Đơn 600k, ship 25k → Miễn phí ship
- Đơn 600k, ship 50k → Giảm 30k, còn 20k

### 3. Áp dụng cho Sản phẩm

Click nút **"📦 Quản lý sản phẩm"** để:
- Chọn sản phẩm áp dụng
- Đặt % giảm giá riêng cho từng sản phẩm
- Bật/tắt áp dụng cho từng sản phẩm

### 4. Tạo Mã giảm giá (Voucher Code)

Mã giảm giá áp dụng sau tất cả các rule trên:

**Cấu hình:**
- **Mã:** SUMMER2024
- **Loại:** Phần trăm / Tiền mặt
- **Giá trị:** 10% hoặc 100,000đ
- **Điều kiện:** Đơn tối thiểu 500k
- **Số lượng:** 100 mã
- **Thời gian:** 01/06/2024 - 30/06/2024

## 💻 Sử dụng trong Code

### Import Engine

```javascript
import { calculateAdvancedCartTotal } from '@/Util/advancedDiscountEngine';
```

### Ví dụ tính toán

```javascript
const items = [
  { productId: '1', price: 10000000, quantity: 1 }, // iPhone 15
  { productId: '2', price: 8000000, quantity: 1 },  // Samsung S24
  { productId: '10', price: 200000, quantity: 1 }   // Ốp lưng
];

const productDiscounts = [
  { product_id: '1', percentage_value: 5 }, // iPhone giảm 5%
];

const voucher = {
  type: 'percent',
  value: 10,
  max_value: 500000,
  discount_condition: 1000000
};

const periodRules = {
  // Giảm theo bậc
  tiered_rules: [
    { min_amount: 5000000, discount_type: 'fixed', discount_value: 500000 }
  ],
  
  // Mua 2 tặng 1
  buy_x_get_y_rules: [{
    buy_product_ids: ['1', '2'],
    buy_quantity: 2,
    get_product_ids: ['10'],
    get_quantity: 1,
    get_discount_percent: 100
  }],
  
  // Mua 2 SP khác nhau giảm 5%
  unique_product_rule: {
    min_unique_products: 2,
    discount_type: 'percent',
    discount_value: 5,
    max_discount: 300000
  },
  
  // Tặng quà
  gift_rules: [{
    min_amount: 10000000,
    gifts: [{ description: 'Tai nghe AirPods', estimated_value: 1500000 }]
  }],
  
  // Free ship
  free_shipping_rule: {
    min_amount: 500000,
    max_shipping_discount: 30000
  }
};

const result = calculateAdvancedCartTotal(
  items, 
  productDiscounts, 
  voucher, 
  periodRules
);

console.log(result);
// {
//   subtotal: 18200000,
//   productDiscount: 500000,  // iPhone giảm 5%
//   periodDiscount: 700000,    // Tổng các rule period
//   voucherDiscount: 500000,   // Voucher giảm 10% (max 500k)
//   shippingDiscount: 30000,
//   totalDiscount: 1730000,
//   grandTotal: 16470000,
//   appliedRules: [...],       // Chi tiết các rule đã áp dụng
//   gifts: [...],              // Danh sách quà tặng
//   freeShipping: true
// }
```

## 🔄 Thứ tự áp dụng giảm giá

1. **Giảm giá theo sản phẩm** (Product Discount)
   - Áp dụng % giảm cho từng sản phẩm
   
2. **Giảm giá theo Period Rules** (theo thứ tự):
   - Tiered Discount (giảm theo bậc)
   - Buy X Get Y (mua X tặng Y)
   - Bundle Discount (combo)
   - Unique Products Discount (mua nhiều SP khác nhau)
   
3. **Voucher Code** (Mã giảm giá)
   - Áp dụng sau tất cả các giảm giá trên
   
4. **Free Shipping** (Miễn phí vận chuyển)
   - Kiểm tra điều kiện cuối cùng

## 📊 Ví dụ thực tế

### Case Study: Khuyến mãi Tết 2024

**Mục tiêu:** Tăng doanh số, khuyến khích mua nhiều sản phẩm

**Cấu hình:**

1. **Giảm theo bậc:**
   - Từ 1tr: giảm 100k
   - Từ 3tr: giảm 400k
   - Từ 5tr: giảm 800k

2. **Mua 2 tặng 1:**
   - Mua 2 điện thoại bất kỳ → Tặng 1 ốp lưng

3. **Mua 3 SP khác nhau:**
   - Giảm thêm 10% (tối đa 500k)

4. **Quà tặng:**
   - Đơn từ 5tr: Tặng tai nghe Bluetooth
   - Đơn từ 10tr: Tặng Apple Watch SE

5. **Free ship:**
   - Đơn từ 500k: Miễn phí ship toàn quốc

6. **Voucher TET2024:**
   - Giảm 15% (tối đa 1tr)
   - Áp dụng đơn từ 2tr

**Kết quả:**
- Khách mua 3 iPhone (mỗi cái 20tr) = 60tr
- Giảm sản phẩm: 3tr (5% mỗi sản phẩm)
- Giảm bậc: 800k (đơn trên 5tr)
- Giảm mua 3 SP khác nhau: 500k (max)
- Tặng 1 ốp lưng: 200k
- Voucher TET2024: 1tr (max)
- Tặng Apple Watch SE (quà cho đơn 10tr+)
- Free ship

→ **Tổng tiết kiệm: 5.5tr + quà tặng trị giá 8tr**

## ⚠️ Lưu ý

1. **Không stack cùng loại rule:**
   - Chỉ áp dụng 1 tiered rule (tier cao nhất)
   - Có thể áp dụng nhiều buy X get Y khác nhau

2. **Priority:**
   - Period rules trước voucher
   - Voucher code luôn áp dụng cuối

3. **Backend API:**
   - Cần endpoint: `PUT /api/discount-periods/{id}/rules`
   - Lưu trữ rules dạng JSON trong DB

4. **Performance:**
   - Cache period rules để tránh query nhiều lần
   - Index trên discount_period_id

## 🔧 API Backend cần implement

```java
// DiscountPeriodController.java
@PutMapping("/{id}/rules")
public ResponseEntity<?> updatePeriodRules(
    @PathVariable Long id,
    @RequestBody PeriodRulesDTO rules
) {
    // Lưu rules vào DB
    // Có thể lưu dạng JSONB (PostgreSQL) hoặc TEXT
    discountPeriodService.updateRules(id, rules);
    return ResponseEntity.ok().build();
}

@GetMapping("/{id}/rules")
public ResponseEntity<PeriodRulesDTO> getPeriodRules(@PathVariable Long id) {
    return ResponseEntity.ok(discountPeriodService.getRules(id));
}
```

```sql
-- Migration: Thêm column rules
ALTER TABLE discount_period 
ADD COLUMN tiered_rules JSONB,
ADD COLUMN buy_x_get_y_rules JSONB,
ADD COLUMN bundle_rules JSONB,
ADD COLUMN unique_product_rule JSONB,
ADD COLUMN gift_rules JSONB,
ADD COLUMN free_shipping_rule JSONB;
```

## 📞 Support

Nếu có vấn đề, liên hệ team dev hoặc tạo issue trên repository.

---

**Version:** 1.0.0  
**Last Updated:** 14/10/2025  
**Author:** Development Team

