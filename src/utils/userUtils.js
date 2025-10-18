/**
 * User utility functions for data transformation and validation
 */

/**
 * Map API response data to frontend format
 * @param {Array} apiUsers - Users from API response
 * @returns {Array} Mapped users for frontend
 */
export const mapApiUsersToFrontend = (apiUsers) => {
    if (!Array.isArray(apiUsers)) return [];

    return apiUsers.map(user => ({
        id: user.idUser,
        name: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.roleName || 'Người dùng',
        status: user.status ? 'Active' : 'Inactive',
        username: user.username,
        accountId: user.accountId,
        roleId: user.roleId,
        address: user.address,
        totalOrders: user.totalOrders,
        totalSpent: user.totalSpent,
        createdAt: user.createdAt
    }));
};

/**
 * Map frontend form data to API format
 * @param {Object} formData - Form data from frontend
 * @returns {Object} Formatted data for API
 */
export const mapFormDataToApi = (formData) => {
    return {
        ...formData,
        // Convert dateOfBirth from string to LocalDate format
        dateOfBirth: formData.dateOfBirth && formData.dateOfBirth !== '' ? formData.dateOfBirth : null,
        // Convert totalOrders from string to number
        totalOrders: formData.totalOrders ? parseInt(formData.totalOrders) : 0,
        // Convert totalSpent from number to BigDecimal format
        totalSpent: formData.totalSpent ? parseFloat(formData.totalOrders) : 0,
        // Remove createdAt and updatedAt as backend will set them
        createdAt: undefined,
        updatedAt: undefined
    };
};

/**
 * Validate user form data
 * @param {Object} formData - Form data to validate
 * @returns {Object} Validation result
 */
export const validateUserForm = (formData) => {
    const errors = {};

    // Required fields validation
    if (!formData.fullName || formData.fullName.trim() === '') {
        errors.fullName = 'Họ tên là bắt buộc';
    }

    if (!formData.email || formData.email.trim() === '') {
        errors.email = 'Email là bắt buộc';
    } else if (!isValidEmail(formData.email)) {
        errors.email = 'Email không hợp lệ';
    }

    if (!formData.phone || formData.phone.trim() === '') {
        errors.phone = 'Số điện thoại là bắt buộc';
    } else if (!isValidPhone(formData.phone)) {
        errors.phone = 'Số điện thoại không hợp lệ';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate phone format (Vietnamese phone numbers)
 * @param {string} phone - Phone to validate
 * @returns {boolean} Is valid phone
 */
export const isValidPhone = (phone) => {
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    return phoneRegex.test(phone);
};

/**
 * Get role badge class for styling
 * @param {string} role - User role
 * @returns {string} CSS class name
 */
export const getRoleBadgeClass = (role) => {
    // Handle both role names and role IDs
    if (role === 'Admin' || role === 1) {
        return 'primary';
    } else if (role === 'Nhân viên' || role === 'Staff' || role === 2) {
        return 'info';
    } else {
        return 'secondary';
    }
};

/**
 * Convert role ID to role name
 * @param {number} roleId - Role ID
 * @returns {string} Role name
 */
export const getRoleName = (roleId) => {
    switch (roleId) {
        case 1:
            return 'Admin';
        case 2:
            return 'Nhân viên';
        case 3:
            return 'Khách hàng';
        default:
            return 'Khách hàng';
    }
};

/**
 * Get status badge class for styling
 * @param {string} status - User status
 * @returns {string} CSS class name
 */
export const getStatusBadgeClass = (status) => {
    return status === 'Active' ? 'success' : 'warning';
};

/**
 * Filter users based on search term
 * @param {Array} users - Users array
 * @param {string} searchTerm - Search term
 * @returns {Array} Filtered users
 */
export const filterUsers = (users, searchTerm) => {
    if (!searchTerm) return users;

    const term = searchTerm.toLowerCase();
    return users.filter(user =>
        (user.name && user.name.toLowerCase().includes(term)) ||
        (user.email && user.email.toLowerCase().includes(term)) ||
        (user.phone && user.phone.includes(term)) ||
        (user.role && user.role.toLowerCase().includes(term))
    );
};

/**
 * Paginate users array
 * @param {Array} users - Users array
 * @param {number} currentPage - Current page number
 * @param {number} itemsPerPage - Items per page
 * @returns {Object} Pagination result
 */
export const paginateUsers = (users, currentPage, itemsPerPage) => {
    const totalPages = Math.ceil(users.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = users.slice(startIndex, endIndex);

    return {
        currentUsers,
        totalPages,
        startIndex,
        endIndex,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1
    };
};

/**
 * Format date for display
 * @param {string} dateString - Date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';

    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    } catch (error) {
        return 'N/A';
    }
};

/**
 * Format currency for display
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency
 */
export const formatCurrency = (amount) => {
    if (!amount) return '0 ₫';

    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
};

/**
 * Generate pagination page numbers
 * @param {number} currentPage - Current page
 * @param {number} totalPages - Total pages
 * @param {number} maxVisible - Maximum visible pages
 * @returns {Array} Page numbers array
 */
export const generatePageNumbers = (currentPage, totalPages, maxVisible = 5) => {
    const pages = [];
    const halfVisible = Math.floor(maxVisible / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    // Adjust if we're near the beginning or end
    if (endPage - startPage + 1 < maxVisible) {
        if (startPage === 1) {
            endPage = Math.min(totalPages, startPage + maxVisible - 1);
        } else {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return pages;
};