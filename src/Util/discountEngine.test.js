import { applyProductDiscounts, applyInvoiceVoucher, calculateCartTotal } from './discountEngine.js';

function pretty(obj) {
  return JSON.stringify(obj, null, 2);
}

// Sample data
const items = [
  { productId: 101, price: 1000000, quantity: 1 },
  { productId: 102, price: 500000, quantity: 2 },
  { productId: 103, price: 250000, quantity: 4 },
];

const productDiscounts = [
  { product_id: 101, percentage_value: 10 }, // 10% for product 101
  { product_id: 103, percentage_value: 20 }, // 20% for product 103
];

const voucherPercent = { type: 'percent', value: 10, max_value: 300000, discount_condition: 500000 };
const voucherFixed = { type: 'fixed', value: 150000, discount_condition: 300000 };

console.log('=== Product discount stage ===');
const productStage = applyProductDiscounts(items, productDiscounts);
console.log(pretty(productStage));

console.log('\n=== Apply percent voucher (with cap) on product total ===');
const percentVoucherStage = applyInvoiceVoucher(voucherPercent, productStage.total);
console.log(pretty(percentVoucherStage));

console.log('\n=== Apply fixed voucher on product total ===');
const fixedVoucherStage = applyInvoiceVoucher(voucherFixed, productStage.total);
console.log(pretty(fixedVoucherStage));

console.log('\n=== Full pipeline (product discounts -> voucher) ===');
const pipeline = calculateCartTotal(items, productDiscounts, voucherPercent);
console.log(pretty(pipeline));


