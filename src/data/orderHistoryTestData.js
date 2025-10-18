// Test data cho OrderHistory component
export const orderHistoryTestData = [{
        id: "ORD001",
        date: "2024-01-15",
        status: "Đã giao",
        total: 2500000,
        items: [{
            productName: "iPhone 15 Pro 128GB Titanium Blue",
            quantity: 1,
            price: 2500000
        }]
    },
    {
        id: "ORD002",
        date: "2024-01-10",
        status: "Đang giao",
        total: 1800000,
        items: [{
            productName: "Samsung Galaxy S24 Ultra 256GB Titanium Black",
            quantity: 1,
            price: 1800000
        }]
    },
    {
        id: "ORD003",
        date: "2024-01-08",
        status: "Đã xác nhận",
        total: 3200000,
        items: [{
            productName: "MacBook Pro 14-inch M3 512GB Space Gray",
            quantity: 1,
            price: 3200000
        }]
    },
    {
        id: "ORD004",
        date: "2024-01-05",
        status: "Chờ xác nhận",
        total: 4500000,
        items: [{
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
    },
    {
        id: "ORD005",
        date: "2024-01-03",
        status: "Đã hủy",
        total: 1200000,
        items: [{
            productName: "AirPods Pro (2nd generation)",
            quantity: 1,
            price: 1200000
        }]
    },
    {
        id: "ORD006",
        date: "2023-12-28",
        status: "Đã giao",
        total: 8900000,
        items: [{
                productName: "iPhone 15 Pro Max 256GB Natural Titanium",
                quantity: 1,
                price: 3500000
            },
            {
                productName: "Apple Watch Series 9 GPS 45mm Pink",
                quantity: 1,
                price: 1200000
            },
            {
                productName: "MacBook Air 13-inch M2 256GB Midnight",
                quantity: 1,
                price: 3200000
            },
            {
                productName: "Magic Mouse",
                quantity: 1,
                price: 1000000
            }
        ]
    },
    {
        id: "ORD007",
        date: "2023-12-25",
        status: "Đã giao",
        total: 650000,
        items: [{
            productName: "AirPods (3rd generation)",
            quantity: 2,
            price: 325000
        }]
    },
    {
        id: "ORD008",
        date: "2023-12-20",
        status: "Đang giao",
        total: 2100000,
        items: [{
                productName: "Samsung Galaxy Watch6 Classic 47mm Black",
                quantity: 1,
                price: 800000
            },
            {
                productName: "Samsung Galaxy Buds2 Pro",
                quantity: 1,
                price: 650000
            },
            {
                productName: "Samsung Galaxy Tab S9 128GB WiFi Graphite",
                quantity: 1,
                price: 650000
            }
        ]
    },
    {
        id: "ORD009",
        date: "2023-12-18",
        status: "Đã xác nhận",
        total: 1500000,
        items: [{
            productName: "Sony WH-1000XM5 Wireless Headphones",
            quantity: 1,
            price: 1500000
        }]
    },
    {
        id: "ORD010",
        date: "2023-12-15",
        status: "Chờ xác nhận",
        total: 2800000,
        items: [{
            productName: "Dell XPS 13 9320 512GB FHD+ Touch",
            quantity: 1,
            price: 2800000
        }]
    }
];

// Dữ liệu test cho các trạng thái khác nhau
export const orderStatusTestData = [{
        id: "STATUS001",
        date: "2024-01-20",
        status: "Chờ xác nhận",
        total: 500000,
        items: [{
            productName: "Test Product - Chờ xác nhận",
            quantity: 1,
            price: 500000
        }]
    },
    {
        id: "STATUS002",
        date: "2024-01-19",
        status: "Đã xác nhận",
        total: 750000,
        items: [{
            productName: "Test Product - Đã xác nhận",
            quantity: 1,
            price: 750000
        }]
    },
    {
        id: "STATUS003",
        date: "2024-01-18",
        status: "Đang giao",
        total: 1000000,
        items: [{
            productName: "Test Product - Đang giao",
            quantity: 1,
            price: 1000000
        }]
    },
    {
        id: "STATUS004",
        date: "2024-01-17",
        status: "Đã giao",
        total: 1250000,
        items: [{
            productName: "Test Product - Đã giao",
            quantity: 1,
            price: 1250000
        }]
    },
    {
        id: "STATUS005",
        date: "2024-01-16",
        status: "Đã hủy",
        total: 300000,
        items: [{
            productName: "Test Product - Đã hủy",
            quantity: 1,
            price: 300000
        }]
    }
];

// Dữ liệu test cho đơn hàng có nhiều sản phẩm
export const multiItemOrderTestData = [{
        id: "MULTI001",
        date: "2024-01-12",
        status: "Đã giao",
        total: 5500000,
        items: [{
                productName: "iPhone 15 Pro 256GB Natural Titanium",
                quantity: 1,
                price: 2800000
            },
            {
                productName: "Apple Watch Series 9 GPS 41mm Pink",
                quantity: 1,
                price: 1000000
            },
            {
                productName: "AirPods Pro (2nd generation)",
                quantity: 1,
                price: 1200000
            },
            {
                productName: "MagSafe Charger",
                quantity: 2,
                price: 250000
            }
        ]
    },
    {
        id: "MULTI002",
        date: "2024-01-09",
        status: "Đang giao",
        total: 4200000,
        items: [{
                productName: "Samsung Galaxy S24+ 256GB Cobalt Violet",
                quantity: 1,
                price: 2200000
            },
            {
                productName: "Samsung Galaxy Buds2 Pro",
                quantity: 1,
                price: 650000
            },
            {
                productName: "Samsung 25W Super Fast Charger",
                quantity: 1,
                price: 350000
            },
            {
                productName: "Samsung Galaxy Watch6 44mm Graphite",
                quantity: 1,
                price: 1000000
            }
        ]
    }
];

// Dữ liệu test cho đơn hàng có số lượng lớn
export const largeQuantityOrderTestData = [{
        id: "LARGE001",
        date: "2024-01-07",
        status: "Đã giao",
        total: 5000000,
        items: [{
            productName: "AirPods (3rd generation)",
            quantity: 10,
            price: 500000
        }]
    },
    {
        id: "LARGE002",
        date: "2024-01-06",
        status: "Đã xác nhận",
        total: 15000000,
        items: [{
            productName: "iPhone 15 128GB Blue",
            quantity: 5,
            price: 3000000
        }]
    }
];

// Hàm để lấy tất cả dữ liệu test
export const getAllOrderHistoryTestData = () => {
    return [
        ...orderHistoryTestData,
        ...orderStatusTestData,
        ...multiItemOrderTestData,
        ...largeQuantityOrderTestData
    ];
};

// Hàm để lấy dữ liệu test theo trạng thái
export const getOrderHistoryByStatus = (status) => {
    const allData = getAllOrderHistoryTestData();
    return allData.filter(order => order.status === status);
};

// Hàm để lấy dữ liệu test theo ID
export const getOrderHistoryById = (id) => {
    const allData = getAllOrderHistoryTestData();
    return allData.find(order => order.id === id);
};

// Hàm để lấy dữ liệu test theo khoảng thời gian
export const getOrderHistoryByDateRange = (startDate, endDate) => {
    const allData = getAllOrderHistoryTestData();
    return allData.filter(order => {
        const orderDate = new Date(order.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return orderDate >= start && orderDate <= end;
    });
};

// Export default
export default orderHistoryTestData;