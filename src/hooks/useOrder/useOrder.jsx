export const useOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({});
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [formData, setFormData] = useState({
        customer: null,
        phone: '',
        email: '',
        address: '',
        createdAt: new Date().toISOString().slice(0, 16),
        paymentMethod: '',
        orderStatus: '',
        paymentStatus: '',
        subtotalAmount: 0,
        discountAmount: 0,
        shippingFee: 0,
        taxAmount: 0,
        totalAmount: 0,
        amountPaid: 0,
        voucherId: null,
        voucherDiscount: 0,
        shippingAddress: '',
        shippingMethod: '',
        trackingNumber: '',
        notes: '',
        createdBy: null,
        items: [],
    });
    const [items, setItems] = useState([]);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showVoucherModal, setShowVoucherModal] = useState(false);
    const [showShippingModal, setShowShippingModal] = useState(false);
    const [showTrackingModal, setShowTrackingModal] = useState(false);
    const [showNotesModal, setShowNotesModal] = useState(false);
    const [showCreatedByModal, setShowCreatedByModal] = useState(false);
    const [showItemsModal, setShowItemsModal] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
    const [showMakeAdminModal, setShowMakeAdminModal] = useState(false);
    const [showMakeUserModal, setShowMakeUserModal] = useState(false);
    const [listCustomer, setListCustomer] = useState([]);

    const getOrders = async () => {
        try {
            const response = await apiClient.get('orders');
            setOrders(response.data);
        } catch (error) {
            setError(error);
        }
    }
    const createOrder = async (order) => {
        try {
            const response = await apiClient.post('orders', order);
            setOrders([...orders, response.data]);
        } catch (error) {
            setError(error);
        }
    }
    const updateOrder = async (order) => {
        try {
            const response = await apiClient.put('orders', order);
            setOrders(response.data);
        } catch (error) {
            setError(error);
        }
    }
    const deleteOrder = async (id) => {
        try {
            const response = await apiClient.delete(`orders/${id}`);
            setOrders(orders.filter(order => order.id !== id));
        } catch (error) {
            setError(error);
        }
    }
    const getOrderById = async (id) => {
        try {
            const response = await apiClient.get(`orders/${id}`);
            setSelectedOrder(response.data);
        } catch (error) {
            setError(error);
        }
    }
    const getOrderItems = async (id) => {
        try {
            const response = await apiClient.get(`orders/${id}/items`);
            setItems(response.data);
        } catch (error) {
            setError(error);
        }
    }
    const updateOrderStatus = async (id, status) => {
        try {
            const response = await apiClient.put(`orders/${id}/status`, { status });
            setOrders(response.data);
        } catch (error) {
            setError(error);
        }
    }
    const updateOrderPaymentStatus = async (id, status) => {
        try {
            const response = await apiClient.put(`orders/${id}/payment-status`, { status });
            setOrders(response.data);
        } catch (error) {
            setError(error);
        }
    }
    return {
        orders,
        loading,
        error,
    }
}