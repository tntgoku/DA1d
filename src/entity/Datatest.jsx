// =================================================================
// DỮ LIỆU MẪU (TEST DATA) ĐƯỢC CHÈN TRỰC TIẾP
// =================================================================

// 1. Users (Người dùng: Admin, Staff, Customer)
const users = [
    { id: 1, full_name: 'Nguyễn Văn A (Admin)', phone: '0901111111', email: 'admin@shop.com', role: 'Admin', total_orders: 10 },
    { id: 2, full_name: 'Trần Thị B (Staff)', phone: '0902222222', email: 'staff@shop.com', role: 'Staff', total_orders: 0 },
    { id: 3, full_name: 'Lê Văn C (Khách hàng)', phone: '0903333333', email: 'customer1@mail.com', role: 'Customer', total_orders: 3 },
    { id: 4, full_name: 'Phạm Thị D (Vãng lai)', phone: '0904444444', email: 'guest@mail.com', role: 'Customer', total_orders: 2 },
];

// 2. Products (Sản phẩm: itemtest)
const itemtest = [
    { 
        id: 1, 
        name: 'iPhone 15 Pro (Mới)', 
        brand: 'Apple', 
        category: 'Điện thoại', 
        stock: 5, 
        is_used: false,
        variants: [
            { id: 101, color: 'Titan Đen', storage: '256GB', price: 27990000, condition: 'New Sealed' }
        ]
    },
    { 
        id: 2, 
        name: 'Samsung Galaxy S22 Ultra (Cũ)', 
        brand: 'Samsung', 
        category: 'Điện thoại', 
        stock: 2, 
        is_used: true, 
        variants: [
            { id: 201, color: 'Xanh lá', storage: '512GB', price: 14900000, condition: 'Likenew 99%' }
        ]
    },
    { 
        id: 3, 
        name: 'Ốp lưng Silicone iPhone 15PM (Phụ kiện)', 
        brand: 'Apple', 
        category: 'Phụ kiện', 
        stock: 50, 
        is_used: false,
        variants: [
            { id: 301, color: 'Đỏ', storage: 'N/A', price: 290000, condition: 'New Sealed' }
        ]
    },
];

// 3. Orders (Đơn hàng: testOrders)
const testOrders = [
    { 
        id: 1001, 
        order_code: 'S-000001', 
        customer_name: 'Lê Văn C', 
        total_amount: 22491000, 
        order_status: 'delivered', 
        payment_status: 'paid', 
        items: [
            { product_name: 'iPhone 15 Pro', quantity: 1, unit_sale_price: 24990000 }
        ]
    },
    { 
        id: 1002, 
        order_code: 'S-000002', 
        customer_name: 'Phạm Thị D', 
        total_amount: 17280000, 
        order_status: 'pending', 
        payment_status: 'unpaid', 
        items: [
            { product_name: 'Samsung Galaxy S22 Ultra', quantity: 1, unit_sale_price: 15990000 },
            { product_name: 'Ốp lưng Silicone', quantity: 1, unit_sale_price: 1290000 }
        ]
    },
];

// 4. Repairs (Sửa chữa: repairs)
const repairs = [
    { 
        id: 2001, 
        repair_code: 'R-000001', 
        customer_name: 'Lê Văn C', 
        device_model: 'iPhone 12 Pro', 
        repair_status: 'delivered', 
        final_cost: 4300000, 
        services: ['Thay màn hình', 'Thay pin'] 
    },
    { 
        id: 2002, 
        repair_code: 'R-000002', 
        customer_name: 'Phạm Thị D', 
        device_model: 'Macbook Air 2022', 
        repair_status: 'processing', 
        final_cost: 0, 
        services: ['Chẩn đoán/Sửa chữa main'] 
    },
];

// 5. Discounts (Khuyến mãi)
const testDiscountPeriods = [
    { id: 1, name: 'Chiến dịch Mùa hè', start_date: '2025-06-01', end_date: '2025-08-31', is_active: true },
    { id: 2, name: 'Black Friday', start_date: '2025-11-20', end_date: '2025-11-30', is_active: false },
];

const testDiscounts = [
    { id: 1, code: 'SUMMER10', type: 'percentage', value: 10, max_discount: 500000, target_type: 'all', campaign_id: 1 },
    { id: 2, code: 'IP15PRO3M', type: 'fixed_amount', value: 3000000, target_type: 'product', target_id: 1, campaign_id: null },
];