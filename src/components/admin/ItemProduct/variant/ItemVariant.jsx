// src/components/Variant/ItemVariant.jsx
import { useState } from "react";
import { useVariantImage } from "../../../../hook/useVariantImage";
export const ItemVariant = ({ variant, onAddStorage, onRemoveVariant, updateVariantField }) => {
  const { ListImgVariant, handleImageUpload } = useVariantImage();
  return (
    <div className="mb-2">
      {/* Header */}
      <div className="input-group mb-3 header-variant d-flex justify-content-between align-items-center"
       id-keyvariant={variant?.idColor}>
       <div className="name-color d-flex d-flex justify-content-between align-items-center gap-2">
        <label className="form-label fw-bold  mb-3"> Màu: </label>
        <input
        type="text"
        name="color"
        placeholder="Nhập tên màu"
        className="form-control mb-3"
        value={variant.color || " "}
        // onChange={(e)=>{handleColorChange(variant.idColor,e.target.value)}}
        onChange={(e)=>{updateVariantField(variant.idColor,"color",e.target.value,null)}}
        />
        </div> 
        {/* //Remove Color */}
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => onRemoveVariant(variant.idColor)}
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>

      {/* Input tên màu */}


      {/* Thông tin ảnh */}
      <div className="col-md-12 mb-3">
        <div className="alert alert-info d-flex align-items-center">
          <i className="fas fa-info-circle me-2"></i>
          Ảnh chính hiển thị:
          {(!ListImgVariant || ListImgVariant.length === 0) && (
            <strong className="ms-2 text-danger">Chưa có ảnh</strong>
          )}
        </div>
      </div>

      {/* Ảnh xem trước */}
      <div className="col-md-12 mb-3">
        <label className="form-label">Ảnh xem trước</label>
        <div
          style={{
            minHeight: "100px",
            border: "1px dashed #ccc",
            padding: "10px",
            textAlign: "center",
          }}
        >
          {ListImgVariant && ListImgVariant.length > 0 ? (
            <img
              src={ListImgVariant?.[0]?.imgSrc || "/images/no-image.png"}
              alt={ListImgVariant?.[0]?.imgAlt || "Ảnh xem trước"}
              style={{
                maxWidth: "100%",
                maxHeight: "150px",
                objectFit: "contain",
              }}
            />
          ) : (
            <strong>Chưa có ảnh</strong>
          )}
        </div>
      </div>

      {/* Upload ảnh */}
      <div className="col-md-12 mb-4">
        <label className="form-label">Hình ảnh sản phẩm *</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
        />
        <small className="text-muted">Có thể chọn nhiều ảnh cùng lúc</small>
      </div>

      {/* Tùy chọn dung lượng */}
      <div className="d-flex justify-content-between align-items-center">
        <label className="form-label mb-0">Tùy chọn dung lượng</label>
        <button type="button" className="btn btn-primary" onClick={onAddStorage}>
          <i className="fas fa-plus"></i> Thêm dung lượng
        </button>
      </div>
    </div>
  );
};
