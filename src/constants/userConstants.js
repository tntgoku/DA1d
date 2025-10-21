/**
 * User management constants
 */

// Form field names
export const USER_FORM_FIELDS = {
    FULL_NAME: 'fullName',
    EMAIL: 'email',
    PHONE: 'phone',
    ADDRESS: 'address',
    GENDER: 'gender',
    DATE_OF_BIRTH: 'dateOfBirth',
    NOTES: 'notes',
    ACCOUNT: 'account',
    TOTAL_ORDERS: 'totalOrders',
    TOTAL_SPENT: 'totalSpent',
    EMAIL_VERIFIED: 'emailVerified',
    PHONE_VERIFIED: 'phoneVerified'
};

// User roles
export const USER_ROLES = {
    ADMIN: 'Admin',
    EMPLOYEE: 'Nhân viên',
    CUSTOMER: 'Người dùng'
};

// Role options for select
export const ROLE_OPTIONS = [{
        value: 1,
        label: 'Admin'
    },
    {
        value: 2,
        label: 'Nhân viên'
    },
    {
        value: 3,
        label: 'Khách hàng'
    }
];

// User status
export const USER_STATUS = {
    ACTIVE: 'Active',
    INACTIVE: 'Inactive'
};

// Gender options
export const GENDER_OPTIONS = [{
        value: 'Nam',
        label: 'Nam'
    },
    {
        value: 'Nữ',
        label: 'Nữ'
    },
    {
        value: 'Khác',
        label: 'Khác'
    }
];

// Pagination
export const PAGINATION = {
    DEFAULT_ITEMS_PER_PAGE: 10,
    MAX_VISIBLE_PAGES: 5
};

// API endpoints
export const API_ENDPOINTS = {
    USERS: 'user',
    USER_BY_ID: (id) => `user/${id}`,
    USER_SEARCH: 'user/search',
    USER_STATUS: (id) => `user/${id}/status`,
    USER_ROLE: (id) => `user/${id}/role`,
    USER_RESET_PASSWORD: (id) => `user/${id}/reset-password`,
    MAKE_ADMIN: 'user/make-admin',
    MAKE_USER: 'user/make-user'
};

// Form validation messages
export const VALIDATION_MESSAGES = {
    REQUIRED: 'Trường này là bắt buộc',
    INVALID_EMAIL: 'Email không hợp lệ',
    INVALID_PHONE: 'Số điện thoại không hợp lệ',
    PASSWORD_TOO_SHORT: 'Mật khẩu phải có ít nhất 6 ký tự',
    PASSWORDS_NOT_MATCH: 'Mật khẩu xác nhận không khớp'
};

// Success messages
export const SUCCESS_MESSAGES = {
    USER_CREATED: 'Thêm người dùng thành công!',
    USER_UPDATED: 'Cập nhật người dùng thành công!',
    USER_DELETED: 'Xóa người dùng thành công!',
    USER_STATUS_CHANGED: 'Thay đổi trạng thái thành công!',
    PASSWORD_RESET: 'Đặt lại mật khẩu thành công!'
};

// Error messages
export const ERROR_MESSAGES = {
    LOAD_USERS_FAILED: 'Không thể tải danh sách người dùng',
    CREATE_USER_FAILED: 'Không thể tạo người dùng',
    UPDATE_USER_FAILED: 'Không thể cập nhật người dùng',
    DELETE_USER_FAILED: 'Không thể xóa người dùng',
    SEARCH_USERS_FAILED: 'Không thể tìm kiếm người dùng',
    TOGGLE_STATUS_FAILED: 'Có lỗi xảy ra khi thay đổi trạng thái',
    RESET_PASSWORD_FAILED: 'Có lỗi xảy ra khi đặt lại mật khẩu',
    NETWORK_ERROR: 'Lỗi kết nối mạng',
    UNKNOWN_ERROR: 'Có lỗi không xác định xảy ra'
};

// Table columns configuration
export const TABLE_COLUMNS = [{
        key: 'name',
        label: 'Họ tên',
        sortable: true
    },
    {
        key: 'email',
        label: 'Email',
        sortable: true
    },
    {
        key: 'phone',
        label: 'Số điện thoại',
        sortable: false
    },
    {
        key: 'role',
        label: 'Vai trò',
        sortable: true
    },
    {
        key: 'status',
        label: 'Trạng thái',
        sortable: true
    },
    {
        key: 'totalOrders',
        label: 'Đơn hàng',
        sortable: true
    },
    {
        key: 'totalSpent',
        label: 'Tổng chi tiêu',
        sortable: true
    },
    {
        key: 'createdAt',
        label: 'Ngày tạo',
        sortable: true
    },
    {
        key: 'actions',
        label: 'Thao tác',
        sortable: false
    }
];

// Modal types
export const MODAL_TYPES = {
    CREATE: 'create',
    EDIT: 'edit',
    DELETE: 'delete',
    RESET_PASSWORD: 'reset_password'
};

// Loading states
export const LOADING_STATES = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error'
};