import { apiClient } from "./getAPI";

export const OrderService={
  async  getall (){
  try {
      const response = await apiClient.get("order");
      if (response.data && response.data.status === 200) {
        console.log(response.data);
        return response.data.data;
      } else {
        return [];
      }
    } catch (error) {
      console.log('Error fetching products:', error);
      throw error;
    }
},
async PostOrder  (formData){
try {
    const response = await apiClient.post("checkout",
        formData
    );
    if (response.data.status === 200) {
      if (formData.paymentMethod === "vnpay") {
          // Điều hướng đến URL thanh toán mà backend trả về
          const url= response.data.data.paymentUrl;
          console.log("VNPay URL:", url);
          // Return the response data for handling in usePayment
          return response.data;
      } else {
          // Xử lý COD hoặc phương thức khác
          console.log(response.data);
          console.log("Thanh toán COD thành công!");
          return response.data;
      }
    }else if(response.data.status === 400){
      console.error("Bad request:", response.data.message);
      throw new Error(response.data.message);
    }else if(response.data.status === 500){
      console.error("Server error:", response.data.message);
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.error(`Error submitting order:`, error);
    throw error;
  }
},
async CreateNewOrder(order) {
  try {
  //   {
  //     "id": null,
  //     "orderCode": "",
  //     "customer": 5,
  //     "customerName": "Nguyen Van A",
  //     "customerPhone": "0969502941",
  //     "customerEmail": "trunghieuhsdd1@gmail.com",
  //     "customerAddress": "",
  //     "shippingAddress": "Triều khúc thanh xuân hà nội",
  //     "createdAt": "2025-10-18T12:51",
  //     "paymentMethod": "momo",
  //     "paymentStatus": "partial",
  //     "orderStatus": "pending",
  //     "notes": "testso1",
  //     "items": [
  //         {
  //             "id": 3,
  //             "object": {
  //                 "variantId": 3,
  //                 "productId": 2,
  //                 "nameVariants": "Samsung Galaxy S22 Ultra  - Đen  ",
  //                 "sku": "SKU-SA22-E4A4F245",
  //                 "color": "Đen",
  //                 "colorCode": null,
  //                 "storage": null,
  //                 "ram": null,
  //                 "regionCode": null,
  //                 "isActive": true,
  //                 "createdAt": "2025-10-11T16:28:35.7108372",
  //                 "updatedAt": "2025-10-11T16:28:35.7108372",
  //                 "price": 140000,
  //                 "sale_price": 0,
  //                 "list_price": 150000,
  //                 "discount": 5,
  //                 "warrantly": null,
  //                 "stock": 10,
  //                 "status": "sold"
  //             },
  //             "quantity": 10
  //         }
  //     ],
  //     "shippingFee": "33333",
  //     "discount": 0,
  //     "subtotalAmount": 0,
  //     "discountAmount": 123,
  //     "taxAmount": 0,
  //     "totalAmount": 1425000,
  //     "amountPaid": 0,
  //     "voucherId": null,
  //     "voucherDiscount": 0,
  //     "shippingMethod": "",
  //     "trackingNumber": "",
  //     "createdBy": null
  // }
  console.log(order);
    const formData={
      email:   order.customerEmail,
      fullname: order.customerName,
      customer: order.customer,
      phone: order.customerPhone,
      province:   order.province,
      district: order.district,
      address:   order.address,
      shippingAddress: order.shippingAddress,
      note: order.note,
      paymentMethod: order.paymentMethod,
      voucher: order.voucher||'',
      totalPrice: Number(order.totalAmount || 0),
      orderCode: order.orderCode,
      orderStatus: order.orderStatus,
      paymentStatus: order.paymentStatus,
      notes:order.notes,
      createdBy: order.createdBy,
      createdAt: order.createdAt,
      shippingFee: Number(order.shippingFee || 0),
      taxAmount: order.taxAmount,
      discountAmount: Number(order.discountAmount || 0),
      voucherDiscount: Number(order.voucherDiscount || 0),
      items: order.items
    }
    console.log("Here is Order Post Create New Order  ",order);
    const response = await apiClient.post("order", formData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
},

// Update order status
async updateOrderStatus(orderId, status) {
  try {
    const response = await apiClient.put(`order/${orderId}/status`, {
      status: status
    });
    console.log(response.data.data)
    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
},
async updateOrderPaymentStatus(orderId, paymentStatus) {
  try {
    const response = await apiClient.put(`order/${orderId}/payment-status`, {
      paymentStatus: paymentStatus
    });
    return response.data;
  } catch (error) {
    console.error('Error updating order payment status:', error);
    throw error;
  }
},
async updateOrder(orderId, orderData) {
  try {
    console.log("Here is Order ID: ", orderId, "Order Data: ", orderData);
    const response = await apiClient.put(`order/${orderId}`, orderData);
    console.log("Here is Response ", response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
},

// Delete order
async deleteOrder(orderId) {
  try {
    const response = await apiClient.delete(`order/${orderId}`);
    console.log("reponse",response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
}
}