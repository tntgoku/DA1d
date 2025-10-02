import { apiClient } from "./getAPI";

export const getall =async()=>{
  try{
 const response = await apiClient.get(`order`,
        formData
    );
    if (response.data.status === "200") {
        // Điều hướng đến URL thanh toán mà backend trả về
        const url= response.data.data;
        alert(url);
    } else {
        // Xử lý COD hoặc phương thức khác
        console.log("Thanh toán COD thành công!");
    }
    console.log(response.data)
    return response.data;
  }catch(error){
        console.error(`Error deleting product with ID $:`, error);
    throw error;
  }
}
export const PostOrder  = async(formData)=>{
try {
    const response = await apiClient.post(`order`,
        formData
    );
    if (response.data.status === "200") {
    if (formData.paymentMethod === "vnpay") {
        // Điều hướng đến URL thanh toán mà backend trả về
        const url= response.data.data.paymentUrl;
        alert(url);
        window.location.href = url;
    } else {
        // Xử lý COD hoặc phương thức khác
        console.log("Thanh toán COD thành công!");
    }
    }
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(`Error deleting product with ID $:`, error);
    throw error;
  }
}