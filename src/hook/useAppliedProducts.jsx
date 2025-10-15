import { useState, useMemo, useEffect } from "react";
import { calculateCartTotal } from "../Util/discountEngine";

/**
 * Custom hook để quản lý logic của Applied Products Modal
 */
export const useAppliedProducts = (rows = []) => {
  const [voucherType, setVoucherType] = useState('percent');
  const [voucherValue, setVoucherValue] = useState(0);
  const [voucherMax, setVoucherMax] = useState(null);
  const [voucherMinOrder, setVoucherMinOrder] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all | applied | not_applied
  const [currentPageRows, setCurrentPageRows] = useState([]);

  // Helper functions to extract data from product rows
  const getVariantStorage = (r) => r?.variants?.[0]?.variantsStorage?.[0];
  
  const getProductId = (r) => String(r?.product_id ?? getVariantStorage(r)?.variantId ?? r?.id ?? '');
  
  const getProductName = (r) => r?.product_name ?? r?.name ?? getVariantStorage(r)?.nameVariants ?? '';
  
  const getSku = (r) => r?.sku ?? getVariantStorage(r)?.sku ?? '';
  
  const getPrice = (r) => {
    const vs = getVariantStorage(r);
    const v = r?.price ?? vs?.sale_price ?? vs?.list_price ?? vs?.price ?? 0;
    return Number(v) || 0;
  };
  
  const getQuantity = (r) => Number(r?.quantity ?? 1) || 1;
  
  const getPercentage = (r) => Number(r?.percentage_value ?? r?.discount ?? 0) || 0;

  // Calculate items for discount engine
  const items = useMemo(() => 
    rows
      .filter(r => r.included !== false)
      .map(r => ({ 
        productId: getProductId(r), 
        price: getPrice(r), 
        quantity: getQuantity(r) 
      })), 
    [rows]
  );

  // Calculate product discounts
  const productDiscounts = useMemo(() => 
    rows
      .filter(r => r.included !== false)
      .map(r => ({ 
        product_id: getProductId(r), 
        percentage_value: getPercentage(r) 
      })), 
    [rows]
  );

  // Build voucher object
  const voucher = useMemo(() => ({ 
    type: voucherType === 'percent' ? 'percent' : 'fixed', 
    value: Number(voucherValue) || 0,
    max_value: voucherMax ? Number(voucherMax) : undefined,
    discount_condition: voucherMinOrder ? Number(voucherMinOrder) : undefined 
  }), [voucherType, voucherValue, voucherMax, voucherMinOrder]);

  // Calculate preview
  const preview = useMemo(() => 
    calculateCartTotal(items, productDiscounts, voucher), 
    [items, productDiscounts, voucher]
  );

  // Filter by search text
  const textFiltered = useMemo(() => {
    if (!searchText) return rows;
    const q = searchText.toLowerCase();
    return rows.filter(r => 
      getProductId(r).toLowerCase().includes(q) || 
      getProductName(r).toLowerCase().includes(q) || 
      getSku(r).toLowerCase().includes(q)
    );
  }, [rows, searchText]);

  // Filter by status
  const filteredRows = useMemo(() => {
    const base = textFiltered;
    if (statusFilter === 'applied') return base.filter(r => r.included !== false);
    if (statusFilter === 'not_applied') return base.filter(r => r.included === false);
    return base;
  }, [textFiltered, statusFilter]);

  // Reset page when filters change
  useEffect(() => { 
    setCurrentPageRows([]); 
  }, [searchText, statusFilter, rows]);

  // Apply/unapply all products
  const applyAll = (included, onChangeRows) => {
    onChangeRows?.(list => list.map(r => ({ ...r, included })));
  };

  // Update product percentage
  const updateProductPercentage = (productId, value, onChangeRows) => {
    onChangeRows?.(list =>
      list.map(x => getProductId(x) === productId
        ? { ...x, percentage_value: value }
        : x
      )
    );
  };

  // Toggle product inclusion
  const toggleProductInclusion = (productId, checked, onChangeRows) => {
    onChangeRows?.(list =>
      list.map(x => getProductId(x) === productId
        ? { ...x, included: checked }
        : x
      )
    );
  };

  return {
    // State
    voucherType,
    voucherValue,
    voucherMax,
    voucherMinOrder,
    searchText,
    statusFilter,
    currentPageRows,
    filteredRows,
    preview,
    
    // Setters
    setVoucherType,
    setVoucherValue,
    setVoucherMax,
    setVoucherMinOrder,
    setSearchText,
    setStatusFilter,
    setCurrentPageRows,
    
    // Helpers
    getProductId,
    getProductName,
    getSku,
    getPrice,
    getQuantity,
    getPercentage,
    
    // Actions
    applyAll,
    updateProductPercentage,
    toggleProductInclusion,
  };
};

