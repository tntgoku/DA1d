/**
 * SEO URL Utilities
 * Các utility functions để tạo và xử lý URL chuẩn SEO
 */

/**
 * Tạo slug từ text
 * @param {string} text - Text cần chuyển thành slug
 * @returns {string} - Slug đã được format
 */
export const createSlug = (text) => {
    if (!text) return '';

    return text
        .toLowerCase()
        .trim()
        // Loại bỏ dấu tiếng Việt
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        // Thay thế các ký tự đặc biệt
        .replace(/[^a-z0-9\s-]/g, '')
        // Thay thế khoảng trắng và dấu gạch ngang liên tiếp
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        // Loại bỏ dấu gạch ngang ở đầu và cuối
        .replace(/^-+|-+$/g, '');
};

/**
 * Tạo URL SEO cho category
 * @param {Object} category - Category object
 * @param {Object} parentCategory - Parent category object (optional)
 * @returns {string} - SEO URL
 */
export const generateCategoryUrl = (category, parentCategory = null) => {
    if (!category || !category.slug) return '/';

    if (parentCategory && parentCategory.slug) {
        return `/${parentCategory.slug}/${category.slug}`;
    }

    return `/${category.slug}`;
};

/**
 * Tạo URL SEO cho product
 * @param {Object} product - Product object
 * @param {Object} category - Category object
 * @param {Object} variant - Product variant object (optional)
 * @returns {string} - SEO URL
 */
export const generateProductUrl = (product, category, variant = null) => {
    if (!product || !product.slug) return '/';

    let url = '';

    // Thêm category path nếu có
    if (category && category.slug) {
        if (category.parentCategory && category.parentCategory.slug) {
            url += `/${category.parentCategory.slug}/${category.slug}`;
        } else {
            url += `/${category.slug}`;
        }
    }

    // Thêm product slug
    url += `/${product.slug}`;

    // Thêm variant ID nếu có
    if (variant && variant.id) {
        url += `/${variant.id}`;
    }

    return url;
};

/**
 * Parse URL SEO để lấy thông tin category và product
 * @param {string} pathname - URL path
 * @returns {Object} - Parsed URL info
 */
export const parseSeoUrl = (pathname) => {
    const segments = pathname.split('/').filter(segment => segment);

    if (segments.length === 0) {
        return {
            type: 'home'
        };
    }

    if (segments.length === 1) {
        return {
            type: 'category',
            parentSlug: segments[0]
        };
    }

    if (segments.length === 2) {
        return {
            type: 'category',
            parentSlug: segments[0],
            childSlug: segments[1]
        };
    }

    if (segments.length === 3) {
        return {
            type: 'product',
            parentSlug: segments[0],
            childSlug: segments[1],
            productSlug: segments[2]
        };
    }

    if (segments.length === 4) {
        return {
            type: 'product',
            parentSlug: segments[0],
            childSlug: segments[1],
            productSlug: segments[2],
            variantId: segments[3]
        };
    }

    return {
        type: 'unknown'
    };
};

/**
 * Tạo breadcrumb từ URL path
 * @param {string} pathname - URL path
 * @param {Array} categories - Danh sách categories
 * @returns {Array} - Breadcrumb items
 */
export const generateBreadcrumb = (pathname, categories = []) => {
    const breadcrumb = [{
        name: 'Trang chủ',
        url: '/',
        isActive: false
    }];

    const urlInfo = parseSeoUrl(pathname);

    if (urlInfo.type === 'category') {
        if (urlInfo.parentSlug) {
            const parentCategory = categories.find(cat => cat.slug === urlInfo.parentSlug);
            if (parentCategory) {
                breadcrumb.push({
                    name: parentCategory.name,
                    url: `/${parentCategory.slug}`,
                    isActive: !urlInfo.childSlug
                });
            }
        }

        if (urlInfo.childSlug) {
            const childCategory = categories.find(cat =>
                cat.slug === urlInfo.childSlug &&
                cat.parentCategory &&
                cat.parentCategory.slug === urlInfo.parentSlug
            );
            if (childCategory) {
                breadcrumb.push({
                    name: childCategory.name,
                    url: `/${urlInfo.parentSlug}/${urlInfo.childSlug}`,
                    isActive: true
                });
            }
        }
    }

    return breadcrumb;
};

/**
 * Tạo meta title cho SEO
 * @param {string} title - Base title
 * @param {string} siteName - Site name
 * @returns {string} - SEO title
 */
export const generateSeoTitle = (title, siteName = 'Trường LCD') => {
    if (!title) return siteName;
    return `${title} | ${siteName}`;
};

/**
 * Tạo meta description cho SEO
 * @param {string} description - Base description
 * @param {number} maxLength - Maximum length (default: 160)
 * @returns {string} - SEO description
 */
export const generateSeoDescription = (description, maxLength = 160) => {
    if (!description) return '';

    if (description.length <= maxLength) {
        return description;
    }

    return description.substring(0, maxLength - 3) + '...';
};

/**
 * Tạo canonical URL
 * @param {string} pathname - Current pathname
 * @param {string} baseUrl - Base URL
 * @returns {string} - Canonical URL
 */
export const generateCanonicalUrl = (pathname, baseUrl = 'https://truonglcd.vn') => {
    return `${baseUrl}${pathname}`;
};

/**
 * Tạo structured data cho category
 * @param {Object} category - Category object
 * @returns {Object} - Structured data
 */
export const generateCategoryStructuredData = (category) => {
    if (!category) return null;

    return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": category.name,
        "description": category.description || category.name,
        "url": generateCanonicalUrl(generateCategoryUrl(category, category.parentCategory)),
        "mainEntity": {
            "@type": "ItemList",
            "name": category.name
        }
    };
};

/**
 * Tạo structured data cho product
 * @param {Object} product - Product object
 * @param {Object} category - Category object
 * @returns {Object} - Structured data
 */
export const generateProductStructuredData = (product, category) => {
    if (!product) return null;

    return {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": product.description || product.name,
        "url": generateCanonicalUrl(generateProductUrl(product, category)),
        "category": category ? category.name : '',
        "brand": {
            "@type": "Brand",
            "name": product.brand || "Trường LCD"
        },
        "offers": {
            "@type": "Offer",
            "price": product.price || 0,
            "priceCurrency": "VND",
            "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
        }
    };
};

/**
 * Validate SEO URL format
 * @param {string} url - URL to validate
 * @returns {boolean} - Is valid SEO URL
 */
export const isValidSeoUrl = (url) => {
    if (!url || typeof url !== 'string') return false;

    // URL should start with /
    if (!url.startsWith('/')) return false;

    // URL should not contain special characters except - and /
    const validPattern = /^\/[a-z0-9-]*(\/[a-z0-9-]*)*$/;
    return validPattern.test(url);
};

/**
 * Clean URL for SEO
 * @param {string} url - URL to clean
 * @returns {string} - Cleaned URL
 */
export const cleanSeoUrl = (url) => {
    if (!url) return '/';

    return url
        .toLowerCase()
        .trim()
        .replace(/\/+/g, '/') // Remove multiple slashes
        .replace(/\/$/, '') // Remove trailing slash
        ||
        '/'; // Ensure at least root slash
};

export default {
    createSlug,
    generateCategoryUrl,
    generateProductUrl,
    parseSeoUrl,
    generateBreadcrumb,
    generateSeoTitle,
    generateSeoDescription,
    generateCanonicalUrl,
    generateCategoryStructuredData,
    generateProductStructuredData,
    isValidSeoUrl,
    cleanSeoUrl
};