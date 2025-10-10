import { useState, useMemo } from "react";
import { normalizeText } from "../Util/FilterUtil";
import { totalStock, totalStockForProduct } from "../Util/ProductUtil";
export const useProductFilters = (products) => {
  const [filters, setFilters] = useState({
    priceFilter: '',
    stockFilter: '',
    searchTerm: ''
  });

  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    const { priceFilter, stockFilter, searchTerm } = filters;
    const term = normalizeText(searchTerm);

    return products.filter(product => {
      const name = normalizeText(product.name);
      const matchesSearch = term ? name.includes(term) : true;
      const price = Number(product.price) || 0;
      let matchesPrice = true;
      if (priceFilter === 'low') matchesPrice = price < 5000000;
      else if (priceFilter === 'medium') matchesPrice = price >= 5000000 && price <= 15000000;
      else if (priceFilter === 'high') matchesPrice = price > 15000000;
      const totalstock = totalStockForProduct(product);
      const matchesStock =
        stockFilter === ''
          ? true
          : stockFilter === 'instock'
          ? totalstock > 0
          : totalstock === 0;
      console.log(matchesStock);
      return matchesSearch && matchesPrice && matchesStock;
    });
  }, [products, filters]);

  return { filters, setFilters, filteredProducts };
};
