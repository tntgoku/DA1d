import { useState, useEffect, useMemo } from "react";
export const useAppliedProducts = (rows = []) => {
  // State management
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPageRows, setCurrentPageRows] = useState([]);

  const getVariantStorage = (r) => {
    // Check if r itself is a variant storage
    if (r?.variantsStorage) return r.variantsStorage;
    if (r?.variants?.[0]?.variantsStorage?.[0]) return r.variants[0].variantsStorage[0];
    if (r?.variantsStorage?.[0]) return r.variantsStorage[0];
    if (r?.variantStorage) return r.variantStorage;
    if (r?.variants?.[0]) return r.variants[0];
    return null;
  };

  const getProductId = (r) => {
    if (r?.variantId) return r.variantId;
    if (r?.product_id) return r.product_id;
    if (r?.id) return r.id;
    const vs = getVariantStorage(r);
    return vs?.variantId || vs?.productId || vs?.id || '';
  };

  const getProductName = (r) => {
    if (r?.productName) return r.productName;
    if (r?.product_name) return r.product_name;
    if (r?.name) return r.name;
    if (r?.title) return r.title;
    if (r?.variants?.[0]?.nameVariants) return r.variants[0].nameVariants;
    if (r?.variants?.[0]?.name) return r.variants[0].name;
    const vs = getVariantStorage(r);
    return vs?.nameVariants || vs?.name || vs?.title || 'Unknown Product';
  };

  const getSku = (r) => {
    if (r?.sku) return r.sku;
    if (r?.product_sku) return r.product_sku;
    if (r?.code) return r.code;
    if (r?.variants?.[0]?.variantsStorage?.[0]?.sku) return r.variants[0].variantsStorage[0].sku;
    if (r?.variants?.[0]?.variantsStorage?.[0]?.code) return r.variants[0].variantsStorage[0].code;
    const vs = getVariantStorage(r);
    return vs?.sku || vs?.code || '';
  };

  const getTotalQuantityFromProduct = (r) => {
    if (r?.quantity) return r.quantity;
    if (r?.qty) return r.qty;
    if (r?.amount) return r.amount;
    if (r?.count) return r.count;
    
    if (r?.variants && Array.isArray(r.variants)) {
      let total = 0;
      r.variants.forEach(variant => {
        if (variant?.variantsStorage && Array.isArray(variant.variantsStorage)) {
          variant.variantsStorage.forEach(storage => {
            total += Number(storage.quantity || storage.stock || 0);
          });
        }
      });
      return total;
    }
    
    const vs = getVariantStorage(r);
    return vs?.quantity || vs?.qty || vs?.amount || vs?.count || 0;
  };

  const getMinPriceFromProduct = (r) => {
    if (r?.price) return r.price;
    if (r?.totalPrice) return r.totalPrice;
    if (r?.sale_price) return r.sale_price;
    if (r?.list_price) return r.list_price;
    
    if (r?.variants && Array.isArray(r.variants)) {
      let minPrice = Infinity;
      r.variants.forEach(variant => {
        if (variant?.variantsStorage && Array.isArray(variant.variantsStorage)) {
          variant.variantsStorage.forEach(storage => {
            const price = Number(storage.sale_price || storage.list_price || storage.price || 0);
            if (price > 0 && price < minPrice) {
              minPrice = price;
            }
          });
        }
      });
      return minPrice === Infinity ? 0 : minPrice;
    }
    
    const vs = getVariantStorage(r);
    return vs?.price || vs?.sale_price || vs?.list_price || 0;
  };

  const getAveragePriceFromProduct = (r) => {
    if (r?.variants && Array.isArray(r.variants)) {
      let totalPrice = 0;
      let count = 0;
      r.variants.forEach(variant => {
        if (variant?.variantsStorage && Array.isArray(variant.variantsStorage)) {
          variant.variantsStorage.forEach(storage => {
            const price = Number(storage.sale_price || storage.list_price || storage.price || 0);
            if (price > 0) {
              totalPrice += price;
              count++;
            }
          });
        }
      });
      return count > 0 ? totalPrice / count : 0;
    }
    return getMinPriceFromProduct(r);
  };

  const getPrice = (r) => {
    // Check direct price properties first
    if (r?.price) return r.price;
    if (r?.totalPrice) return r.totalPrice;
    if (r?.sale_price) return r.sale_price;
    if (r?.list_price) return r.list_price;
    
    // If r has variants, get min price from all variants
    if (r?.variants && Array.isArray(r.variants)) {
      return getMinPriceFromProduct(r);
    }
    
    // Fallback to variant storage
    const vs = getVariantStorage(r);
    return vs?.price || vs?.sale_price || vs?.list_price || 0;
  };

  const getQuantity = (r) => {
    // Check direct quantity properties first
    if (r?.quantity) return r.quantity;
    if (r?.qty) return r.qty;
    if (r?.amount) return r.amount;
    if (r?.count) return r.count;
    
    // If r has variants, get total quantity from all variants
    if (r?.variants && Array.isArray(r.variants)) {
      return getTotalQuantityFromProduct(r);
    }
    
    // Fallback to variant storage
    const vs = getVariantStorage(r);
    return vs?.quantity || vs?.qty || vs?.amount || vs?.count || 0;
  };

  const getPercentage = (r) => {
    return r?.percentage_value || 0;
  };

  // Group products by productId
  const groupedProducts = useMemo(() => {
    console.log("useAppliedProducts - Grouped products input rows:", rows);
    
    const productMap = new Map();
    
    rows.forEach(r => {
      const productId = getProductId(r);
      const productName = getProductName(r);
      const sku = getSku(r);
      const price = getPrice(r);
      const quantity = getQuantity(r);
      
      if (productMap.has(productId)) {
        // Product already exists, sum quantities and recalculate total price
        const existing = productMap.get(productId);
        existing.quantity += quantity;
        existing.totalPrice = existing.price * existing.quantity;
      } else {
        // New product
        productMap.set(productId, {
          productId,
          productName,
          sku,
          price,
          quantity,
          totalPrice: price * quantity,
          originalData: r
        });
      }
    });
    
    const result = Array.from(productMap.values());
    console.log("useAppliedProducts - Grouped products result:", result);
    return result;
  }, [rows]);

  // Filtered rows based on search and status
  const filteredRows = useMemo(() => {
    let filtered = rows;
    
    if (searchText) {
      const q = searchText.toLowerCase();
      filtered = filtered.filter(r => 
        getProductId(r).toLowerCase().includes(q) || 
        getProductName(r).toLowerCase().includes(q) || 
        getSku(r).toLowerCase().includes(q)
      );
    }
    
    if (statusFilter === 'applied') {
      filtered = filtered.filter(r => r.included !== false);
    } else if (statusFilter === 'not_applied') {
      filtered = filtered.filter(r => r.included === false);
    }
    
    return filtered;
  }, [rows, searchText, statusFilter]);

  // Items for discount engine (using grouped products)
  const items = useMemo(() => {
    console.log("useAppliedProducts - Calculated items from groupedProducts:", groupedProducts);
    return groupedProducts.map(product => ({
      productId: product.productId,
      productName: product.productName,
      sku: product.sku,
      price: product.price,
      quantity: product.quantity,
      totalPrice: product.totalPrice,
      percentage: product.originalData?.percentage_value || 0,
      included: product.originalData?.included !== false
    }));
  }, [groupedProducts]);

  // Preview calculations
  const preview = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const discount = items.reduce((sum, item) => {
      if (item.included) {
        return sum + (item.totalPrice * (item.percentage / 100));
      }
      return sum;
    }, 0);
    const grandTotal = subtotal - discount;
    
    return {
      subtotal,
      discount,
      grandTotal
    };
  }, [items]);

  // Helper functions
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  const getItemTotal = (item) => {
    return item.price * item.quantity;
  };

  // Action functions
  const applyAll = (include, onChangeRows) => {
    if (!onChangeRows) return;
    
    onChangeRows(prev => prev.map(item => ({
      ...item,
      included: include
    })));
  };

  const updateProductPercentage = (productId, percentage, onChangeRows) => {
    if (!onChangeRows) return;
    
    onChangeRows(prev => prev.map(item => {
      if (getProductId(item) === productId) {
        return { ...item, percentage_value: percentage };
      }
      return item;
    }));
  };

  const toggleProductInclusion = (productId, included, onChangeRows) => {
    if (!onChangeRows) return;
    
    onChangeRows(prev => prev.map(item => {
      if (getProductId(item) === productId) {
        return { ...item, included };
      }
      return item;
    }));
  };

  return {
    // State
    searchText,
    statusFilter,
    currentPageRows,
    filteredRows,
    groupedProducts,
    preview,
    
    // Setters
    setSearchText,
    setStatusFilter,
    setCurrentPageRows,
    
    // Helper functions
    getProductId,
    getProductName,
    getSku,
    getPrice,
    getQuantity,
    getPercentage,
    formatPrice,
    getItemTotal,
    
    // Action functions
    applyAll,
    updateProductPercentage,
    toggleProductInclusion,
    
    // Additional helpers
    getTotalQuantityFromProduct,
    getMinPriceFromProduct,
    getAveragePriceFromProduct,
    groupedProducts
  };
};
