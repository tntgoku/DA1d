import { useState } from "react";
import { discountService } from "../service/discountService";

export const useDiscounts = () => {
  const [productDiscounts, setProductDiscounts] = useState([]);
  const [productDiscountFormData, setProductDiscountFormData] = useState({
    percentage_value: 0,
    product_id: '',
    discount_period_id: ''
  });

  const fetchProductDiscounts = async (productId) => {
    const res = await discountService.getByProduct(productId);
    setProductDiscounts(res);
  };

  const addProductDiscount = async () => {
    await discountService.create(productDiscountFormData);
    await fetchProductDiscounts(productDiscountFormData.product_id);
  };

  const removeProductDiscount = async (discountId) => {
    if (window.confirm("Bạn có chắc muốn xóa giảm giá này?")) {
      await discountService.delete(discountId);
      await fetchProductDiscounts(productDiscountFormData.product_id);
    }
  };

  return {
    productDiscounts,
    productDiscountFormData,
    setProductDiscountFormData,
    fetchProductDiscounts,
    addProductDiscount,
    removeProductDiscount,
  };
};
