import { useState, useEffect } from "react";
import { getProvinces, getDistricts } from "../service/getAPI";
import { itemtest } from "../entity/Entity";
import { OrderService } from "../service/OrderService";
import { useCart } from "./useCart";

export const usePayment = () => {
  const{getlistCart}=useCart();
  // Location states
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  // Cart and pricing states
  const [listCart, setListCart] = useState(getlistCart() ||[]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [pricediscount,setPricediscount]=useState(0);
  const shipfree=30000;
  // Voucher states
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [voucher, setVoucher] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [isInvalidVoucher, setIsInvalidVoucher] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    id: null ,
    email:   "",
    fullname: "",
    phone: "",
    province:   "",
    district: "",
    address:   "",
    note: "",
    paymentMethod: "cod",
    voucher: "",
    totalPrice: 0,
    items: listCart,
  });

  // Load provinces on mount
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data = await getProvinces();
        setProvinces(data.data);
      } catch (err) {
        console.error("Error fetching provinces:", err);
      }
    };
    fetchProvinces();
  }, []);

  // Load districts when province changes
  useEffect(() => {
    const fetchDistricts = async () => {
      if (!selectedProvince) return;
      try {
        const data = await getDistricts(selectedProvince);
        setDistricts(data.data);
        setSelectedDistrict("");
      } catch (err) {
        console.error("Error fetching districts:", err);
      }
    };
    fetchDistricts();
  }, [selectedProvince]);

  // Calculate total price when cart or voucher changes
  useEffect(() => {
    if (!listCart || listCart.length === 0) return;

    let total = 0;
    let totalQuantity = 0;

    listCart.forEach(product => {
        total += product.object.price * product.quantity;
        totalQuantity += product.quantity;
    });

    if (!voucherApplied) {
      setTotalPrice(total);
    }
    setTotalProduct(totalQuantity);
  }, [listCart, voucherApplied]);

  // Update form data when location changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      province: selectedProvince,
      district: selectedDistrict,
    }));
  }, [selectedProvince, selectedDistrict]);

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle voucher application
  const handleApplyVoucher = () => {
    if (voucherApplied) {
      alert("Mã giảm giá đã được áp dụng!");
      return;
    }

    if (voucherCode !== "SALE2025") {
      setIsInvalidVoucher(true);
    } else {
      setIsInvalidVoucher(false);
      setVoucherApplied(true);
      setVoucher(20);
      const discountedPrice = (totalPrice * 20)/100;
      setPricediscount(discountedPrice);
    }
  };

  // Calculate final total price with voucher
  const getFinalTotalPrice = () => {
    const finalprice= voucherApplied ? (totalPrice * 80)/100: totalPrice;
    const pricenew= finalprice+shipfree;
    return pricenew;
  };

  // Submit order 
  const submitOrder = async () => {
    const orderData = {
      ...formData,
      province: selectedProvince,
      district: selectedDistrict,
      voucher,
      totalPrice: getFinalTotalPrice(),
      items: listCart
    };
    console.log(orderData);
    try {
      await OrderService.PostOrder(orderData);
      console.log("Order submitted successfully");
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return {
    // Location data
    provinces,
    districts,
    selectedProvince,
    selectedDistrict,
    setSelectedProvince,
    setSelectedDistrict,

    // Cart and pricing
    listCart,
    totalPrice,
    pricediscount,
    totalProduct,
    setListCart,

    // Voucher
    voucherApplied,
    voucher,
    voucherCode,
    isInvalidVoucher,
    setVoucherCode,

    // Form data
    formData,

    // Actions
    handleFormChange,
    handleApplyVoucher,
    getFinalTotalPrice,
    submitOrder,
  };
};
