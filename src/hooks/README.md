# Order Management Hooks

Bộ custom hooks được tách ra từ `OrdersSection.jsx` và `OrderModal.jsx` để quản lý logic phức tạp một cách tách biệt và có thể tái sử dụng.

## 📁 Cấu trúc Hooks

### 1. `useOrderForm.jsx`
**Mục đích**: Quản lý state và logic của form đơn hàng

**Chức năng**:
- Quản lý `formData` state
- Reset form khi đóng modal
- Load data khi edit order
- Handle input changes

**Sử dụng**:
```javascript
const { formData, setFormData, handleInputChange, resetForm } = useOrderForm(showModal, editingOrder);
```

### 2. `useOrderActions.jsx`
**Mục đích**: Quản lý các thao tác CRUD với đơn hàng

**Chức năng**:
- Create new order
- Update existing order
- Delete order
- Update order status
- Loading state management

**Sử dụng**:
```javascript
const { handleSubmit, handleStatusChange, handleDelete, loading } = useOrderActions(orders, setOrders);
```

### 3. `useCustomerSelection.jsx`
**Mục đích**: Quản lý việc chọn và tìm kiếm customer

**Chức năng**:
- Load danh sách customers từ API
- Filter customers theo search term
- Auto-fill customer info
- Clear customer info

**Sử dụng**:
```javascript
const { 
  listCustomer, 
  filteredCustomers, 
  fillCustomerInfo, 
  clearCustomerInfo 
} = useCustomerSelection();
```

### 4. `useVariantManagement.jsx`
**Mục đích**: Quản lý variants và items trong đơn hàng

**Chức năng**:
- Lấy tất cả variants từ products
- Handle item changes (variant selection, price, quantity)
- Add/remove items
- Calculate totals

**Sử dụng**:
```javascript
const { 
  allVariants, 
  getVariantById, 
  handleItemChange, 
  addItem, 
  removeItem, 
  calculateItemTotal, 
  calculateOrderTotal 
} = useVariantManagement(products);
```

### 5. `useOrderFilters.jsx`
**Mục đích**: Quản lý filter và search cho danh sách đơn hàng

**Chức năng**:
- Search orders by customer name or order code
- Filter by order status
- Clear filters
- Get filter summary

**Sử dụng**:
```javascript
const { 
  searchTerm, 
  setSearchTerm, 
  statusFilter, 
  setStatusFilter, 
  filteredOrders, 
  clearFilters, 
  getFilterSummary 
} = useOrderFilters(orders);
```

## 🔄 Cách sử dụng trong Components

### OrdersSection.jsx
```javascript
import { 
  useOrderForm, 
  useOrderActions, 
  useCustomerSelection, 
  useOrderFilters 
} from '../../../hooks';

const OrdersSection = ({ orders: initialOrders, products }) => {
  // State
  const [orders, setOrders] = useState(initialOrders);
  const [showModal, setShowModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  // Hooks
  const { formData, handleInputChange, resetForm } = useOrderForm(showModal, editingOrder);
  const { handleSubmit, handleStatusChange, handleDelete, loading } = useOrderActions(orders, setOrders);
  const { listCustomer } = useCustomerSelection();
  const { searchTerm, setSearchTerm, statusFilter, setStatusFilter, filteredOrders } = useOrderFilters(orders);

  // Component logic...
};
```

### OrderModal.jsx
```javascript
import { useVariantManagement, useCustomerSelection } from '../../../hooks';

export const OrderModal = ({ showModal, formData, handleInputChange, products, ...props }) => {
  // Hooks
  const { 
    allVariants, 
    getVariantById, 
    handleItemChange, 
    addItem, 
    removeItem, 
    calculateItemTotal, 
    calculateOrderTotal 
  } = useVariantManagement(products);

  const { fillCustomerInfo, clearCustomerInfo } = useCustomerSelection();

  // Component logic...
};
```

## 🎯 Lợi ích

### ✅ **Tách biệt logic**
- Mỗi hook có trách nhiệm riêng biệt
- Dễ test và debug
- Code dễ đọc và maintain

### ✅ **Tái sử dụng**
- Có thể sử dụng hooks ở nhiều component khác
- Logic được centralize

### ✅ **Performance**
- Sử dụng `useMemo` và `useCallback` để optimize
- Tránh re-render không cần thiết

### ✅ **Type Safety**
- Có thể dễ dàng thêm TypeScript
- Interface rõ ràng cho mỗi hook

## 🚀 Mở rộng

### Thêm hooks mới:
1. Tạo file hook mới trong thư mục `hooks/`
2. Export từ `hooks/index.js`
3. Import và sử dụng trong component

### Ví dụ thêm `useOrderValidation.jsx`:
```javascript
export const useOrderValidation = (formData) => {
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.customerName) {
      newErrors.customerName = 'Tên khách hàng là bắt buộc';
    }
    
    if (!formData.customerPhone) {
      newErrors.customerPhone = 'Số điện thoại là bắt buộc';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  return { errors, validateForm };
};
```

## 📝 Ghi chú

- Tất cả hooks đều follow React Hooks rules
- Sử dụng `useEffect` để handle side effects
- Sử dụng `useMemo` và `useCallback` để optimize performance
- Error handling được implement trong mỗi hook
- Loading states được quản lý riêng biệt
