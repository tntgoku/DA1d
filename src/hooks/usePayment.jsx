import { useState, useEffect } from "react";
import { getProvinces, getDistricts } from "../services/getAPI";
import { itemtest } from "../entity/Entity";
import { OrderService } from "../services/OrderService";
import { useCart } from "./useCart";
import { VoucherService } from "../services/DiscountService";
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
    shippingFee: 0,
    taxAmount: 0,
    discountAmount: 0,
    voucherDiscount: 0,
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
        if(product.object.discount !== null && product.object.discount !== undefined || product.object.discount > 0){
          let discountPrice = product.object.list_price - (product.object.list_price*product.object.discount/100);
          total += discountPrice * product.quantity;
        } else {
          total += product.object.list_price * product.quantity;
        }
        totalQuantity += product.quantity;
    });
    // listCart.forEach(product => {
    //   console.log("Product: {}" , product);
    //   console.log("Product: {}" , product.object);
    //   console.log("Product: {}" , product.quantity);
    //   console.log("Product: {}" , product.object.list_price);
    //   console.log("Product: {}" , product.quantity);
    //     total += product.object.list_price * product.quantity;
    //     totalQuantity += product.quantity;
    // });

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
  const handleApplyVoucher = async () => {
    const vourcher= await VoucherService.getVoucherByCode(voucherCode);
    console.log(vourcher.data.code);
    const codeDB= vourcher.data.code;
    console.log(voucherCode);
    if (voucherApplied) {
      alert("Mã giảm giá đã được áp dụng!");
      return;
    }
    if (voucherCode !== codeDB) {
      setIsInvalidVoucher(true);
    } else {
      setIsInvalidVoucher(false);
      setVoucherApplied(true);
      setVoucher(vourcher.data);
      let discountedPrice;
      let totalprice;
      if(vourcher.data.discountType === "percentage"){
         discountedPrice = ((totalPrice+shipfree) * vourcher.data.value)/100;
         totalprice = (totalPrice+shipfree)- discountedPrice;
      } else {
        discountedPrice = vourcher.data.value;
        totalprice = (totalPrice+shipfree) - discountedPrice;
      }
      if(totalprice < 0){
        totalprice = 0;
      }
      setFormData(prev => ({
        ...prev,
        voucher: vourcher.data.id,
        discountAmount: discountedPrice,
        totalPrice: totalprice,
        shippingFee: shipfree,
        voucherDiscount: vourcher.data.id,
      }));
      setPricediscount(discountedPrice);
    }
  };

  // Calculate final total price with voucher
  const getFinalTotalPrice = () => {
    if( voucher.discountType === "percentage"){
      const priceafterdiscount= ((totalPrice+shipfree) * voucher.value)/100;
      let pricenew=  (totalPrice+shipfree) - priceafterdiscount;
      return pricenew;
    } else if (voucher.discountType === "fixed_amount"){
      let pricenew=  (totalPrice+shipfree) - voucher.value;
      return pricenew;
    } else {
      return totalPrice+shipfree;
    }
  };

  // Submit order 
  const submitOrder = async () => {
    // Validate required fields
    // if (!formData.email || !formData.fullname || !formData.phone || !selectedProvince || !formData.address) {
    //   alert("Vui lòng điền đầy đủ thông tin giao hàng!");
    //   return;
    // }

    if (!listCart || listCart.length === 0) {
      alert("Giỏ hàng trống! Vui lòng thêm sản phẩm vào giỏ hàng.");
      return;
    }
    console.log("Form data in submitOrder", formData);
    const orderData = {
      ...formData,
      province: selectedProvince,
      district: selectedDistrict || "", // Ensure district is not null
      voucher: voucher.id || null,
      totalPrice: getFinalTotalPrice(),
      shippingFee: shipfree,
      taxAmount: 0,
      discountAmount: pricediscount,
      voucherDiscount: voucher.value,
      items: listCart
    };
    
    // Remove any null/undefined fields that might cause issues
    Object.keys(orderData).forEach(key => {
      if (orderData[key] === null || orderData[key] === undefined) {
        delete orderData[key];
      }
    });
    
    // console.log("Submitting order:", orderData);
    
    try {
      const result = await OrderService.PostOrder(orderData);
      console.log("Order submitted successfully:", result);
      
      if (result && result.status === 200) {
        if (formData.paymentMethod === "vnpay") {
          alert("Đang chuyển hướng đến trang thanh toán...");
          setTimeout(() => {
            window.location.href = result.data.paymentUrl;
          }, 2000);
        } else {
          alert("Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.");
          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        }
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      const errorMessage = error.response?.data?.message || error.message || "Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.";
      alert(errorMessage);
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
