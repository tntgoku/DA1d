/**
 * Advanced Discount Engine - Hệ thống giảm giá nâng cao
 * Hỗ trợ nhiều loại khuyến mãi phức tạp
 */

/**
 * Loại khuyến mãi:
 * - TIERED: Giảm theo bậc (tiền/số lượng)
 * - BUY_X_GET_Y: Mua X tặng Y
 * - BUNDLE: Mua combo sản phẩm
 * - GIFT: Tặng quà
 * - FREE_SHIPPING: Miễn phí vận chuyển
 * - PERCENT_OFF: Giảm phần trăm
 * - FIXED_AMOUNT: Giảm số tiền cố định
 */

/**
 * Tính toán giảm giá theo bậc thang
 * @param {number} total - Tổng giá trị đơn hàng
 * @param {Array} tiers - Danh sách các bậc giảm giá
 * @returns {Object} Kết quả giảm giá
 */
export const calculateTieredDiscount = (total, tiers) => {
    if (!Array.isArray(tiers) || tiers.length === 0) {
        return {
            discount: 0,
            tier: null,
            description: ''
        };
    }

    // Sắp xếp tiers theo min_amount giảm dần
    const sortedTiers = [...tiers].sort((a, b) => b.min_amount - a.min_amount);

    // Tìm tier phù hợp
    const matchedTier = sortedTiers.find(tier => total >= tier.min_amount);

    if (!matchedTier) {
        return {
            discount: 0,
            tier: null,
            description: ''
        };
    }

    let discount = 0;
    let description = '';

    if (matchedTier.discount_type === 'percent') {
        discount = Math.round(total * (matchedTier.discount_value / 100));
        if (matchedTier.max_discount) {
            discount = Math.min(discount, matchedTier.max_discount);
        }
        description = `Giảm ${matchedTier.discount_value}% cho đơn từ ${matchedTier.min_amount.toLocaleString('vi-VN')}đ`;
    } else if (matchedTier.discount_type === 'fixed') {
        discount = matchedTier.discount_value;
        description = `Giảm ${matchedTier.discount_value.toLocaleString('vi-VN')}đ cho đơn từ ${matchedTier.min_amount.toLocaleString('vi-VN')}đ`;
    }

    return {
        discount,
        tier: matchedTier,
        description
    };
};

/**
 * Tính toán khuyến mãi mua X tặng Y
 * @param {Array} items - Danh sách sản phẩm trong giỏ
 * @param {Object} rule - Quy tắc mua X tặng Y
 * @returns {Object} Kết quả khuyến mãi
 */
export const calculateBuyXGetY = (items, rule) => {
    const {
        buy_product_ids,
        buy_quantity,
        get_product_ids,
        get_quantity,
        get_discount_percent = 100, // Mặc định tặng 100% (miễn phí)
        max_applications = 1
    } = rule;

    // Đếm số lượng sản phẩm mua
    const buyItems = items.filter(item =>
        buy_product_ids.includes(item.productId)
    );

    const totalBuyQty = buyItems.reduce((sum, item) => sum + item.quantity, 0);

    // Tính số lần áp dụng
    const applications = Math.min(
        Math.floor(totalBuyQty / buy_quantity),
        max_applications
    );

    if (applications === 0) {
        return {
            discount: 0,
            freeItems: [],
            description: `Mua ${buy_quantity} sản phẩm để được tặng`,
            qualified: false
        };
    }

    // Tính giảm giá cho sản phẩm tặng
    const getItems = items.filter(item =>
        get_product_ids.includes(item.productId)
    );

    let discount = 0;
    const freeItems = [];

    for (const item of getItems) {
        const freeQty = Math.min(item.quantity, get_quantity * applications);
        const itemDiscount = Math.round(item.price * freeQty * (get_discount_percent / 100));
        discount += itemDiscount;

        if (freeQty > 0) {
            freeItems.push({
                productId: item.productId,
                quantity: freeQty,
                discount: itemDiscount
            });
        }
    }

    return {
        discount,
        freeItems,
        description: `Mua ${buy_quantity} tặng ${get_quantity}`,
        qualified: true,
        applications
    };
};

/**
 * Tính toán khuyến mãi combo/bundle
 * @param {Array} items - Danh sách sản phẩm trong giỏ
 * @param {Object} rule - Quy tắc combo
 * @returns {Object} Kết quả khuyến mãi
 */
export const calculateBundleDiscount = (items, rule) => {
    const {
        required_products, // [{ product_id, min_quantity }]
        discount_type,
        discount_value,
        max_discount
    } = rule;

    // Kiểm tra xem có đủ sản phẩm trong combo không
    const hasAllProducts = required_products.every(req => {
        const item = items.find(i => i.productId === req.product_id);
        return item && item.quantity >= req.min_quantity;
    });

    if (!hasAllProducts) {
        const missing = required_products.filter(req => {
            const item = items.find(i => i.productId === req.product_id);
            return !item || item.quantity < req.min_quantity;
        });

        return {
            discount: 0,
            description: `Cần thêm ${missing.length} sản phẩm để hoàn thành combo`,
            qualified: false
        };
    }

    // Tính tổng giá trị combo
    const bundleTotal = required_products.reduce((sum, req) => {
        const item = items.find(i => i.productId === req.product_id);
        return sum + (item ? item.price * req.min_quantity : 0);
    }, 0);

    let discount = 0;

    if (discount_type === 'percent') {
        discount = Math.round(bundleTotal * (discount_value / 100));
        if (max_discount) {
            discount = Math.min(discount, max_discount);
        }
    } else if (discount_type === 'fixed') {
        discount = discount_value;
    }

    return {
        discount,
        bundleTotal,
        description: `Giảm giá combo sản phẩm`,
        qualified: true
    };
};

/**
 * Tính toán quà tặng khi mua đủ điều kiện
 * @param {number} total - Tổng giá trị đơn hàng
 * @param {number} itemCount - Số lượng sản phẩm
 * @param {Object} rule - Quy tắc quà tặng
 * @returns {Object} Kết quả quà tặng
 */
export const calculateGiftReward = (total, itemCount, rule) => {
    const {
        min_amount,
        min_items,
        min_unique_products, // Số sản phẩm khác nhau tối thiểu
        gifts // [{ description, estimated_value }]
    } = rule;

    const qualified =
        (!min_amount || total >= min_amount) &&
        (!min_items || itemCount >= min_items);

    if (!qualified) {
        const conditions = [];
        if (min_amount && total < min_amount) {
            conditions.push(`Mua thêm ${(min_amount - total).toLocaleString('vi-VN')}đ`);
        }
        if (min_items && itemCount < min_items) {
            conditions.push(`Mua thêm ${min_items - itemCount} sản phẩm`);
        }

        return {
            qualified: false,
            gifts: [],
            description: `${conditions.join(' và ')} để nhận quà`
        };
    }

    return {
        qualified: true,
        gifts: gifts || [],
        description: gifts && gifts.length > 0 ?
            `Tặng: ${gifts.map(g => g.description).join(', ')}` :
            'Có quà tặng kèm'
    };
};

/**
 * Kiểm tra điều kiện miễn phí vận chuyển
 * @param {number} total - Tổng giá trị đơn hàng
 * @param {Object} rule - Quy tắc miễn phí ship
 * @returns {Object} Kết quả
 */
export const calculateFreeShipping = (total, rule) => {
    const {
        min_amount,
        max_shipping_discount
    } = rule;

    if (total >= min_amount) {
        return {
            qualified: true,
            shippingDiscount: max_shipping_discount || 0,
            description: `Miễn phí vận chuyển cho đơn từ ${min_amount.toLocaleString('vi-VN')}đ`
        };
    }

    return {
        qualified: false,
        shippingDiscount: 0,
        description: `Mua thêm ${(min_amount - total).toLocaleString('vi-VN')}đ để được miễn phí ship`
    };
};

/**
 * Tính toán giảm giá theo số lượng sản phẩm khác nhau
 * @param {Array} items - Danh sách sản phẩm
 * @param {Object} rule - Quy tắc
 * @returns {Object} Kết quả
 */
export const calculateUniqueProductDiscount = (items, rule) => {
    const {
        min_unique_products,
        discount_type,
        discount_value,
        max_discount
    } = rule;

    const uniqueProducts = new Set(items.map(item => item.productId)).size;

    if (uniqueProducts < min_unique_products) {
        return {
            discount: 0,
            qualified: false,
            description: `Mua thêm ${min_unique_products - uniqueProducts} sản phẩm khác nhau để được giảm giá`
        };
    }

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;

    if (discount_type === 'percent') {
        discount = Math.round(total * (discount_value / 100));
        if (max_discount) {
            discount = Math.min(discount, max_discount);
        }
    } else if (discount_type === 'fixed') {
        discount = discount_value;
    }

    return {
        discount,
        qualified: true,
        uniqueProducts,
        description: `Giảm giá khi mua ${uniqueProducts} sản phẩm khác nhau`
    };
};

/**
 * Áp dụng tất cả các quy tắc giảm giá cho đơn hàng
 * @param {Array} items - Danh sách sản phẩm [{ productId, price, quantity }]
 * @param {Array} productDiscounts - Giảm giá theo sản phẩm
 * @param {Object} voucher - Mã giảm giá
 * @param {Object} periodRules - Các quy tắc từ đợt giảm giá
 * @returns {Object} Kết quả chi tiết
 */
export const calculateAdvancedCartTotal = (
    items = [],
    productDiscounts = [],
    voucher = null,
    periodRules = null
) => {
    // Bước 1: Tính subtotal
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Bước 2: Áp dụng giảm giá theo sản phẩm
    let productDiscountAmount = 0;
    const itemsWithDiscount = items.map(item => {
        const discount = productDiscounts.find(d => d.product_id === item.productId);
        const percentage = discount ? discount.percentage_value : 0;
        const itemTotal = item.price * item.quantity;
        const itemDiscount = Math.round(itemTotal * (percentage / 100));
        productDiscountAmount += itemDiscount;

        return {
            ...item,
            percentage,
            discount: itemDiscount,
            total: itemTotal - itemDiscount
        };
    });

    let totalAfterProductDiscount = subtotal - productDiscountAmount;

    // Bước 3: Áp dụng các rule từ period
    const appliedRules = [];
    let periodDiscountAmount = 0;
    let gifts = [];
    let freeShipping = false;
    let shippingDiscount = 0;

    if (periodRules) {
        // Rule: Tiered discount (giảm theo bậc)
        if (periodRules.tiered_rules && periodRules.tiered_rules.length > 0) {
            const tieredResult = calculateTieredDiscount(totalAfterProductDiscount, periodRules.tiered_rules);
            if (tieredResult.discount > 0) {
                periodDiscountAmount += tieredResult.discount;
                appliedRules.push({
                    type: 'TIERED',
                    ...tieredResult
                });
            }
        }

        // Rule: Buy X Get Y
        if (periodRules.buy_x_get_y_rules && periodRules.buy_x_get_y_rules.length > 0) {
            for (const rule of periodRules.buy_x_get_y_rules) {
                const result = calculateBuyXGetY(items, rule);
                if (result.qualified) {
                    periodDiscountAmount += result.discount;
                    appliedRules.push({
                        type: 'BUY_X_GET_Y',
                        ...result
                    });
                }
            }
        }

        // Rule: Bundle discount
        if (periodRules.bundle_rules && periodRules.bundle_rules.length > 0) {
            for (const rule of periodRules.bundle_rules) {
                const result = calculateBundleDiscount(items, rule);
                if (result.qualified) {
                    periodDiscountAmount += result.discount;
                    appliedRules.push({
                        type: 'BUNDLE',
                        ...result
                    });
                }
            }
        }

        // Rule: Unique product discount
        if (periodRules.unique_product_rule) {
            const result = calculateUniqueProductDiscount(items, periodRules.unique_product_rule);
            if (result.qualified) {
                periodDiscountAmount += result.discount;
                appliedRules.push({
                    type: 'UNIQUE_PRODUCTS',
                    ...result
                });
            }
        }

        // Rule: Gift reward
        if (periodRules.gift_rules && periodRules.gift_rules.length > 0) {
            const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
            for (const rule of periodRules.gift_rules) {
                const result = calculateGiftReward(totalAfterProductDiscount, totalItems, rule);
                if (result.qualified) {
                    gifts.push(...result.gifts);
                    appliedRules.push({
                        type: 'GIFT',
                        ...result
                    });
                }
            }
        }

        // Rule: Free shipping
        if (periodRules.free_shipping_rule) {
            const result = calculateFreeShipping(totalAfterProductDiscount, periodRules.free_shipping_rule);
            if (result.qualified) {
                freeShipping = true;
                shippingDiscount = result.shippingDiscount;
                appliedRules.push({
                    type: 'FREE_SHIPPING',
                    ...result
                });
            }
        }
    }

    const totalAfterPeriodDiscount = Math.max(0, totalAfterProductDiscount - periodDiscountAmount);

    // Bước 4: Áp dụng voucher
    let voucherDiscount = 0;
    let voucherApplied = false;
    let voucherMessage = '';

    if (voucher) {
        const minOrder = voucher.discount_condition || 0;

        if (totalAfterPeriodDiscount >= minOrder) {
            if (voucher.type === 'percent') {
                voucherDiscount = Math.round(totalAfterPeriodDiscount * (voucher.value / 100));
                if (voucher.max_value) {
                    voucherDiscount = Math.min(voucherDiscount, voucher.max_value);
                }
            } else if (voucher.type === 'fixed') {
                voucherDiscount = voucher.value;
            }
            voucherApplied = true;
        } else {
            voucherMessage = `Cần thêm ${(minOrder - totalAfterPeriodDiscount).toLocaleString('vi-VN')}đ để áp dụng voucher`;
        }
    }

    const grandTotal = Math.max(0, totalAfterPeriodDiscount - voucherDiscount);

    return {
        subtotal,
        productDiscount: productDiscountAmount,
        periodDiscount: periodDiscountAmount,
        voucherDiscount,
        shippingDiscount,
        totalDiscount: productDiscountAmount + periodDiscountAmount + voucherDiscount + shippingDiscount,
        grandTotal,
        items: itemsWithDiscount,
        appliedRules,
        gifts,
        freeShipping,
        voucherApplied,
        voucherMessage,
        summary: {
            original: subtotal,
            afterProductDiscount: totalAfterProductDiscount,
            afterPeriodDiscount: totalAfterPeriodDiscount,
            final: grandTotal,
            saved: subtotal - grandTotal
        }
    };
};

export default {
    calculateTieredDiscount,
    calculateBuyXGetY,
    calculateBundleDiscount,
    calculateGiftReward,
    calculateFreeShipping,
    calculateUniqueProductDiscount,
    calculateAdvancedCartTotal
};