// Simple discount engine utilities

/**
 * Apply per-product percentage discount list to an array of cart items
 * @param {Array<{productId:string|number, price:number, quantity:number}>} items
 * @param {Array<{product_id:string|number, percentage_value:number}>} productDiscounts
 * @returns {{items:Array, subtotal:number, discount:number, total:number}}
 */
export function applyProductDiscounts(items, productDiscounts) {
  const byId = new Map(productDiscounts.map(d => [String(d.product_id), Number(d.percentage_value) || 0]));
  let subtotal = 0;
  let discount = 0;
  const discountedItems = items.map(it => {
    const key = String(it.productId);
    const pct = byId.get(key) || 0;
    const lineSubtotal = Number(it.price) * Number(it.quantity);
    const lineDiscount = pct > 0 ? Math.round(lineSubtotal * (pct / 100)) : 0;
    subtotal += lineSubtotal;
    discount += lineDiscount;
    return {
      ...it,
      discountPct: pct,
      lineSubtotal,
      lineDiscount,
      lineTotal: lineSubtotal - lineDiscount,
    };
  });
  return {
    items: discountedItems,
    subtotal,
    discount,
    total: subtotal - discount,
  };
}

/**
 * Apply invoice voucher (percentage or fixed) with optional caps/conditions
 * @param {{type:'percent'|'fixed', value:number, max_value?:number, discount_condition?:number}} voucher
 * @param {number} baseAmount amount to apply voucher on
 * @returns {{voucherDiscount:number, payable:number}}
 */
export function applyInvoiceVoucher(voucher, baseAmount) {
  if (!voucher || !baseAmount || baseAmount <= 0) {
    return { voucherDiscount: 0, payable: baseAmount || 0 };
  }
  if (voucher.discount_condition && baseAmount < voucher.discount_condition) {
    return { voucherDiscount: 0, payable: baseAmount };
  }
  let voucherDiscount = 0;
  if (voucher.type === 'percent') {
    voucherDiscount = Math.round(baseAmount * ((Number(voucher.value) || 0) / 100));
  } else if (voucher.type === 'fixed') {
    voucherDiscount = Math.round(Number(voucher.value) || 0);
  }
  if (voucher.max_value && voucherDiscount > voucher.max_value) {
    voucherDiscount = voucher.max_value;
  }
  if (voucherDiscount < 0) voucherDiscount = 0;
  const payable = Math.max(0, baseAmount - voucherDiscount);
  return { voucherDiscount, payable };
}

/**
 * Compose product discounts then voucher on top
 * @param {Array} items
 * @param {Array} productDiscounts
 * @param {{type:'percent'|'fixed', value:number, max_value?:number, discount_condition?:number}} voucher
 */
export function calculateCartTotal(items, productDiscounts, voucher) {
  const productStage = applyProductDiscounts(items, productDiscounts);
  const { voucherDiscount, payable } = applyInvoiceVoucher(voucher, productStage.total);
  return {
    ...productStage,
    voucherDiscount,
    grandTotal: payable,
  };
}


