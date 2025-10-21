import { useState } from "react";
import { DiscountService } from "../../services/DiscountService";

export const useDiscounts = () => {
  const [productDiscounts, setProductDiscounts] = useState([]);
  const [discountCampaigns, setDiscountCampaigns] = useState([]);
  const [productDiscountFormData, setProductDiscountFormData] = useState({
    percentage_value: 0,
    product_id: '',
    discount_period_id: ''
  });

  const fetchProductDiscounts = async (productId) => {
    // const res = await discountService.getByProduct(productId);
    // setProductDiscounts(res);
  };

  const addProductDiscount = async () => {
    // await discountService.create(productDiscountFormData);
    // await fetchProductDiscounts(productDiscountFormData.product_id);
  };

  const removeProductDiscount = async (discountId) => {
    if (window.confirm("Bạn có chắc muốn xóa giảm giá này?")) {
      // await discountService.delete(discountId);
      // await fetchProductDiscounts(productDiscountFormData.product_id);
    }
  };
  const getAllDiscounts = async () => {
    const res = await DiscountService.getAllDiscountCampaigns();
    setDiscountCampaigns(res);
  };
  return {
    productDiscounts,
    discountCampaigns,
    productDiscountFormData,
    setProductDiscountFormData,
    fetchProductDiscounts,
    addProductDiscount,
    removeProductDiscount,
  };
};
