import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


export const OrderReturn=()=>{
    
    const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const responseCode = query.get("vnp_ResponseCode");

    if (responseCode === "00") {
      alert("Thanh toán thành công 🎉");
      navigate("/success"); // hoặc hiển thị trang thành công
    } else if (responseCode === "24") {
      alert("Bạn đã hủy giao dịch ❌");
      navigate("/payment");
    } else {
      alert("Thanh toán thất bại ⚠️");
      navigate("/payment");
    }
  }, [location, navigate]);

        return <div>Đang xử lý kết quả thanh toán...</div>;
}