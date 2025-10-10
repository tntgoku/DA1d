import React from 'react';
// Dữ liệu mẫu
import anh1 from '../assets/iphone-17-pro-max_1.webp'
import anh2 from '../assets/17_mist_blue.webp'
import anh3 from '../assets/17_sage.webp'
import { ProductVariantGroup } from './Object/ProductVariantGroup';
function formatPrice(price) {
  if (typeof price === "number") {
    return price.toLocaleString("vi-VN") + " đ";
  }

  if (price === null || price === undefined) {
    return "Liên hệ";
  }

  // Chuyển chuỗi sang số, loại bỏ ký tự không phải số
  const numericPrice = Number(price.toString().replace(/\D/g, ""));
  return numericPrice > 0 ? numericPrice.toLocaleString("vi-VN") + " đ" : "Liên hệ";
}

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
      { variantId: 101, productName: 'iPhone 13 128GB', price: 190000, quantity: 1 },
      { variantId: 202, productName: 'Ốp lưng iPhone 13', price: 250000, quantity: 2 }
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
      { variantId: 103, productName: 'iPhone 14 Pro 256GB', price: 30990000, quantity: 1 }
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
      { variantId: 301, productName: 'AirPods Pro 2', price: 5990000, quantity: 1 },
      { variantId: 401, productName: 'Cáp sạc Lightning chính hãng', price: 390000, quantity: 1 }
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
      { variantId: 301, productName: 'AirPods Pro 2', price: 5990000, quantity: 1 },
      { variantId: 401, productName: 'Cáp sạc Lightning chính hãng', price: 390000, quantity: 1 }
    ],
    shippingFee: 20000,
    discount: 500000,
    total: 5900000,
    paid:false
  }
];
// Trong file test data hoặc Entity.js
 const testDiscounts = [
  {
    id: 1,
    discount_code: 'SUMMER2024',
    discount_name: 'Giảm giá mùa hè 2024',
    type: 0, // Phần trăm
    category: 1, // Sản phẩm
    value: 15.00,
    max_value: 500000,
    discount_condition: 1000000,
    quantity: 100,
    enable: true,
    start_time: '2024-06-01T00:00:00',
    end_time: '2024-08-31T23:59:59',
    status: 1,
    created_at: '2024-05-20T10:00:00',
    updated_at: '2024-05-20T10:00:00'
  },
  {
    id: 2,
    discount_code: 'FREESHIP50',
    discount_name: 'Miễn phí ship 50K',
    type: 1, // Tiền mặt
    category: 2, // Vận chuyển
    value: 50000,
    max_value: 50000,
    discount_condition: 500000,
    quantity: 200,
    enable: true,
    start_time: '2024-07-01T00:00:00',
    end_time: '2024-07-31T23:59:59',
    status: 1,
    created_at: '2024-06-25T14:30:00',
    updated_at: '2024-06-25T14:30:00'
  },
  {
    id: 3,
    discount_code: 'WELCOME10',
    discount_name: 'Chào mừng thành viên mới',
    type: 0, // Phần trăm
    category: 1, // Sản phẩm
    value: 10.00,
    max_value: 200000,
    discount_condition: null,
    quantity: 1000,
    enable: true,
    start_time: '2024-01-01T00:00:00',
    end_time: '2024-12-31T23:59:59',
    status: 1,
    created_at: '2024-01-01T00:00:00',
    updated_at: '2024-01-01T00:00:00'
  },
  {
    id: 4,
    discount_code: 'BLACKFRIDAY',
    discount_name: 'Giảm giá Black Friday',
    type: 0, // Phần trăm
    category: 1, // Sản phẩm
    value: 20.00,
    max_value: 1000000,
    discount_condition: 0,
    quantity: 500,
    enable: false,
    start_time: '2024-11-29T00:00:00',
    end_time: '2024-11-30T23:59:59',
    status: 0,
    created_at: '2024-10-15T09:00:00',
    updated_at: '2024-10-15T09:00:00'
  }
];

 const testDiscountPeriods = [
  {
    id: 1,
    discount_period_code: 'PERIOD_SUMMER24',
    discount_period_name: 'Đợt giảm giá mùa hè 2024',
    min_percentage_value: 10,
    max_percentage_value: 30,
    start_time: '2024-06-01T00:00:00',
    end_time: '2024-08-31T23:59:59',
    status: 1,
    created_at: '2024-05-15T08:00:00',
    updated_at: '2024-05-15T08:00:00'
  },
  {
    id: 2,
    discount_period_code: 'PERIOD_BACK2SCHOOL',
    discount_period_name: 'Đợt giảm giá Back to School',
    min_percentage_value: 5,
    max_percentage_value: 25,
    start_time: '2024-08-15T00:00:00',
    end_time: '2024-09-15T23:59:59',
    status: 1,
    created_at: '2024-07-20T10:30:00',
    updated_at: '2024-07-20T10:30:00'
  },
  {
    id: 3,
    discount_period_code: 'PERIOD_YE2024',
    discount_period_name: 'Đợt giảm giá cuối năm 2024',
    min_percentage_value: 15,
    max_percentage_value: 40,
    start_time: '2024-12-01T00:00:00',
    end_time: '2024-12-31T23:59:59',
    status: 0,
    created_at: '2024-11-01T14:00:00',
    updated_at: '2024-11-01T14:00:00'
  }
];

 const testProductDiscounts = [
  {
    id: 1,
    percentage_value: 15,
    product_id: 1,
    discount_period_id: 1,
    created_at: '2024-06-01T09:00:00',
    updated_at: '2024-06-01T09:00:00'
  },
  {
    id: 2,
    percentage_value: 20,
    product_id: 2,
    discount_period_id: 1,
    created_at: '2024-06-01T10:00:00',
    updated_at: '2024-06-01T10:00:00'
  },
  {
    id: 3,
    percentage_value: 10,
    product_id: 3,
    discount_period_id: 2,
    created_at: '2024-08-15T08:00:00',
    updated_at: '2024-08-15T08:00:00'
  }
];

 const testDiscountUsers = [
  {
    id: 1,
    is_used: false,
    status: 1,
    bill_id: null,
    user_id: 1,
    discount_id: 1,
    created_at: '2024-06-01T10:00:00',
    updated_at: '2024-06-01T10:00:00'
  },
  {
    id: 2,
    is_used: true,
    status: 1,
    bill_id: 1001,
    user_id: 2,
    discount_id: 1,
    created_at: '2024-06-02T14:30:00',
    updated_at: '2024-06-02T15:00:00'
  }
];
const productsvariant = [
  { product_id:1, id: 101, name: 'iPhone 14 Pro Max', category: 1, price: '28.990.000', discount: '10', stock: 15, status: 1, description: 'iPhone 14 Pro Max 128GB Chính Hãng VN/A - Mới 100', warranty: '12 tháng', isNew: true, imgSrc: anh1, imgAlt: 'iPhone 14 Pro Max', href:'iphone-14-pro-max-128gb-chinh-hang-vn-a-1'},
  { product_id:1, id: 102, name: 'iPhone 14 Pro Max 1TB 99', category: 1, price: '24.990.000', discount: '5', stock: 8, status: 1, description: 'iPhone 14 Pro Max 1TB Chính Hãng VN/A - Mới 100', warranty: '12 tháng', isNew: true, imgSrc: anh1, imgAlt: 'iPhone 14 Pro Max 1TB', href: 'iphone-14-pro-max-1tb-chinh-hang-vn-a-1'},
  { product_id:1, id: 103, name: 'iPhone 14 Pro Max 512GB 99', category: 1, price: '20.990.000', discount: '5', stock: 8, status: 1, description: 'iPhone 14 Pro Max 1TB Chính Hãng VN/A - Mới 100', warranty: '12 tháng', isNew: false, imgSrc: anh1, imgAlt: 'iPhone 14 Pro Max 1TB', href: 'iphone-14-pro-max-cu'},
  { product_id:2, id: 201, name: 'Ốp lưng iPhone 14 Pro', category: 3, price: '450.000', discount: null, stock: 32, status: 1, description: 'Ốp lưng iPhone 14 Pro Chính Hãng Apple Silicone Case with MagSafe', warranty: '6 tháng', isNew: false, imgSrc: anh1, imgAlt: 'Ốp lưng iPhone 14 Pro', href: '/op-lung-iphone-14-pro-chinh-hang-apple-silicone-case-with-magsafe-1'},
  { product_id:2, id: 202, name: 'Cáp sạc iPhone', category: 3, price: '290.000', discount: null, stock: 50, status: 1, description: 'Cáp sạc iPhone Chính Hãng Apple Lightning to USB-C (1m)', warranty: '6 tháng', isNew: false, imgSrc: anh1, imgAlt: 'Cáp sạc iPhone', href: '/cap-sac-iphone-chinh-hang-apple-lightning-to-usb-c-1m-1'},
];
const productsvariant1 = [
  {product_id:1, id: 101, name: 'iPhone 14 Pro Max 128GB'    , category: 2, price: '28.990.000', discount: '10', storage:128,color :"Trắng" ,stock: 15, status: 1,
     description: 'iPhone 14 Pro Max 128GB Chính Hãng VN/A - Mới 100', warranty: '12 tháng',
      isNew: true, images:[
        {imgSrc: anh1, imgAlt: 'iPhone 14 Pro Max 256GB',displayOrder:1,primary:true},
        {imgSrc: anh2, imgAlt: 'iPhone 14 Pro Max 256GB',displayOrder:2,primary:false},
        {imgSrc: anh3, imgAlt: 'iPhone 14 Pro Max 256GB',displayOrder:3,primary:false},
      ], featuredImageIndex: 3, href: 'iphone-14-pro-max-128gb-chinh-hang-vn-a-1'},
  {product_id:2, id: 201, name: 'Ốp lưng iPhone 14 Pro', category: 3, price: '450.000', discount: null, storage:512,stock: 32, status: 1, description: 'Ốp lưng iPhone 14 Pro Chính Hãng Apple Silicone Case with MagSafe', warranty: '6 tháng', isNew: false, images:[
        {imgSrc: anh1, imgAlt: 'iPhone 14 Pro Max 256GB',displayOrder:1,primary:true},
        {imgSrc: anh2, imgAlt: 'iPhone 14 Pro Max 256GB',displayOrder:2,primary:false},
        {imgSrc: anh3, imgAlt: 'iPhone 14 Pro Max 256GB',displayOrder:3,primary:false},
      ], featuredImageIndex: 1, href: 'op-lung-iphone-14-pro-chinh-hang-apple-silicone-case-with-magsafe-1'},
  {product_id:2, id: 202, name: 'Cáp sạc iPhone', category: 3, price: '290.000', discount: null, stock: 50, status: 1, 
    description: 'Cáp sạc iPhone Chính Hãng Apple Lightning to USB-C (1m)', warranty: '6 tháng', isNew: false, images:[
        {imgSrc: anh1, imgAlt: 'iPhone 14 Pro Max 256GB',displayOrder:1,primary:true},
        {imgSrc: anh2, imgAlt: 'iPhone 14 Pro Max 256GB',displayOrder:2,primary:false},
        {imgSrc: anh3, imgAlt: 'iPhone 14 Pro Max 256GB',displayOrder:3,primary:false},
      ], featuredImageIndex: 1, href: 'cap-sac-iphone-chinh-hang-apple-lightning-to-usb-c-1m-1'},
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
 const itemtest=
     [ {
      productId: 101,
      productName: "iPhone 13 Pro Max Cu",
      slug: "iphone-13-pro-max-cu",
      categoryId: 1,
      productType: "used",
      model: "iPhone13ProMax",
      description: "iPhone 13 Pro Max 128GB dã qua s? d?ng, còn m?i 95%",
      isActive: true,
      isFeatured: true,
      featuredImageIndex:1,
      variants:[ { 
        variantId : 4, 
        productId : 101, 
        sku : "IP13PM-128-SILVER", 
        price : 18500000, 
        stock : 5, 
        color : "B?c", 
        storage : "128GB", 
        costPrice : 16000000, 
        stockQuantity : 5, 
        lowStockThreshold : 3, 
        warrantyPeriod : 6, 
        isActive : true, 
        isFromTradeIn : false, 
        isFeatured : false, 
        originalOwnerId : 0, 
        quantity_cart:1, 
        region : "VN/A", 
        slug : "ip13pm-128"}
      ],
      images:[
              {
                imgSrc : "/src/assets/iphone-17-pro-max_1.webp",
                imgAlt : "iPhone 13 Pro Max B?c",
                displayOrder : "1",
                isPrimary : true
              }
      ]

  },
  {
      productId: 9,
      productName: "iPhone 13 Pro Max Cu",
      slug: "iphone-13-pro-max-cu",
      categoryId: 1,
      productType: "used",
      model: "iPhone13ProMax",
      description: "iPhone 13 Pro Max 128GB dã qua s? d?ng, còn m?i 95%",
      isActive: true,
      isFeatured: true,
      featuredImageIndex:1,
      variants:[ { 
        variantId : 5, 
        productId : 9, 
        sku : "IP13PM-128-SILVER", 
        price : 18500000, 
        stock : 5, 
        color : "B?c", 
        storage : "128GB", 
        costPrice : 16000000, 
        stockQuantity : 5, 
        lowStockThreshold : 3, 
        warrantyPeriod : 6, 
        isActive : true, 
        isFromTradeIn : false, 
        isFeatured : false, 
        originalOwnerId : 0, 
        quantity_cart:1, 
        region : "VN/A", 
        slug : "ip13pm-128"}
      ],
      images:[
              {
                imgSrc : "/src/assets/iphone-17-pro-max_1.webp",
                imgAlt : "iPhone 13 Pro Max B?c",
                displayOrder : "1",
                isPrimary : true
              }
      ]

  }
]
  const defaultFormData = new ProductVariantGroup({
  id: null,
  productType: "physical",
  category: null,
  name: "",
  slug: "",
  description: "",
  brand: "",
  model: "",
  specifications: null,
  isActive: true,
  isFeatured: false,
  isHot: false,
  createdAt: null,
  updatedAt: null,
  variants: [],    // Mảng VariantColor
  images: [],      // Mảng ImageProduct
  });

export { defaultFormData,users, 
  productsvariant,productsvariant1, categories,
  orders,
  testOrders,itemtest, repairs, reviews
  ,testDiscounts,
  testDiscountPeriods,testDiscountUsers,
  testProductDiscounts,formatPrice };
