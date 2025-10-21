import { Link } from "react-router-dom";

export const ItemStorage = ({ storage, variantsByRegion, selectedStorage, selectedRegion }) => {
  const regions = Object.keys(variantsByRegion);
  
  if (regions.length === 0) return null;
  if (!storage || typeof storage !== 'string' || storage.trim() === '') {
    return null; // Không render nếu storage không hợp lệ
}
  return (
    <>
      {regions.map(region => {
        // variantsByRegion[region] là một object variant, không phải array
        const variant = variantsByRegion[region];
        if (!variant) return null;

        // Kiểm tra active state - so sánh với regionCode hoặc region
        const isActive = variant.storage === selectedStorage && 
                        (variant.regionCode === selectedRegion || variant.regionCode === selectedRegion);

        // Tính giá hiển thị - sử dụng list_price thay vì price
        const displayPrice = variant.list_price ? 
          variant.list_price.toLocaleString("vi-VN") + "đ" : 
          "Liên hệ";

        return (
          <div key={`${storage}/${region}`} className="col-lg-4 col-md-3 col-4" style={{ marginBottom: '5px' }}>
            <Link
              to={`/detail/${variant.variantId}`}
              className={`option-item ${isActive ? "active" : ""}`}
            >
              <span className="title">{storage} {`- ${region}`}</span>
              <span className="price">{displayPrice}</span>
            </Link>
          </div>
        );
      })}
    </>
  );
};
