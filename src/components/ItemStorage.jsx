import { Link } from "react-router-dom";
import { useEffect } from "react";
export const ItemStorage = ({ storage, variantsByRegion, selectedStorage, selectedRegion }) => {
  const regions = Object.keys(variantsByRegion);
  if (regions.length === 0) return null;
  return (
    <>
      {regions.map(region => {
        const variants = variantsByRegion[region];
        if (!variants || variants.length === 0) return null;

        // Lấy variant đầu tiên để hiển thị
        const variant = variants[0];
        const isActive = variant.storage === selectedStorage && variant.region === selectedRegion;

        return (
          <div key={`${storage}-${region}`} className="col-lg-4 col-md-3 col-4" style={{ marginBottom: '5px' }}>
            <Link
              to={`/detail/${variant.variantId}`}
              className={`option-item ${isActive ? "active" : ""}`}
            >
              <span className="title">{storage} - {region}</span>
              <span className="price">{variant.price.toLocaleString("vi-VN")} <span> đ</span></span>
              {/* hoặc hiển thị giá min-max: {minPrice === maxPrice ? `${minPrice}đ` : `${minPrice}đ - ${maxPrice}đ`} */}
            </Link>
          </div>
        );
      })}
    </>
  );
};
