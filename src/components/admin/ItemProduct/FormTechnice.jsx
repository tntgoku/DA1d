import React, { useState } from "react";
// Đảm bảo các hook và util này hoạt động như mong đợi
import { useUnits } from "../../../hooks/useUnit"; 
import { useSpecifications } from "../../../hooks/useSpec";
import {
  isTextSpec,
  mergeSpecsWithDefaults,
  mapSpecsToObject,
} from "../../../Util/SpecUtil"; // Đã bỏ parseSpecValue vì không dùng ở đây

export const FormTechnine = ({ handleInputChange, formData, setFormData }) => {
  // Lỗi 3 đã được loại bỏ: unitName không cần thiết.
  const { units } = useUnits(); 
  
  // dbSpecs chứa danh sách thông số kỹ thuật từ database (nếu có)
  const { dbSpecs, updateSpecification } = useSpecifications(
    formData.category,
    handleInputChange,
    formData,
    setFormData,
    units
  );

  // Default Specs: Đã chuẩn hóa lại tên trường 'units' và 'defaultUnit'
  const defaultSpecs = [
    { label: "RAM", name: "RAM", type: "number", units: ["MB", "GB", "TB"], defaultUnit: "GB" },
    { label: "Màn hình", name: "screen", type: "number", units: ["inch", "cm"], defaultUnit: "inch" },
    { label: "Tần số quét", name: "refreshRate", type: "number", units: ["Hz", "kHz"], defaultUnit: "Hz" },
    { label: "Camera trước", name: "camera", type: "number", units: ["MP"], defaultUnit: "MP" },
    { label: "Camera sau", name: "camerabehind", type: "number", units: ["MP"], defaultUnit: "MP" },
    { label: "Chip xử lý", name: "chip", type: "text" },
    { label: "Dung lượng pin", name: "battery", type: "number", units: ["mAh", "Wh"], defaultUnit: "mAh" },
    { label: "Trọng lượng", name: "weight", type: "number", units: ["g", "kg", "lbs"], defaultUnit: "g" },
    { label: "Hệ điều hành", name: "operation", type: "text" },
    { label: "Kết nối", name: "connectivity", type: "text" },
    { label: "Tính năng đặc biệt", name: "features", type: "text" },
  ];

  // Chuẩn hóa dữ liệu specs hiện tại trong form
  const normalizedSpecs = Array.isArray(formData.specifications)
    ? mapSpecsToObject(formData.specifications)
    : formData.specifications || {};

  // Gộp specs từ DB (nếu có) và specs mặc định
  // Giả định: mergeSpecsWithDefaults trả về danh sách cuối cùng cần render.
  const mergedSpecs = mergeSpecsWithDefaults(dbSpecs, defaultSpecs);

  const renderInput = (spec) => {
    const isText = normalizedSpecs.fillter;
    
    // Sửa Lỗi 4: Truy cập trực tiếp vào normalizedSpecs bằng spec.name
    const existingSpec = Object.values(normalizedSpecs).find(
            // Dùng spec.name từ defaultSpecs để so sánh với existing spec's value
            (s) => s?.value === spec.name
        );
    console.log("exitspec",existingSpec);
    // currentUnitName là đơn vị được chọn hoặc đơn vị mặc định của spec
    // existingSpec?.unitName: Đơn vị đã được lưu (từ DB hoặc form)
    // spec.defaultUnit: Đơn vị mặc định từ defaultSpecs
    const currentUnitName = existingSpec?.unitName || spec.defaultUnit || "";

    // currentValue là giá trị (label) đã được lưu hoặc chuỗi rỗng
    const currentValue = existingSpec?.label || "";

    // Lấy danh sách đơn vị hợp lệ từ defaultSpecs.units. Nếu không có (text spec), dùng mảng rỗng.
    const availableUnits = spec.units || [];

    return (
      <div className="mb-3" key={spec.name}>
        <label className="form-label fw-semibold">{spec.label}</label>
        <div className="d-flex gap-2">
          <input
            type={isText ? "text" : "number"}
            className="form-control"
            name={spec.name}
            value={currentValue}
            onChange={(e) =>
              updateSpecification(spec.name, e.target.value, isText ? "text" : "number")
            }
            placeholder={spec.placeholder || ""}
          />

           {!isText && (
            <select
              className="form-select"
              value={currentUnitName} 
              onChange={(e) =>
                updateSpecification(spec.name, e.target.value, "unit")
              }
              style={{ width: '120px' }} 
            >
              <option value="">--Đơn vị--</option>
              {
                availableUnits.map((unitName) => (
                  <option key={unitName} value={unitName}>
                    {unitName}
                  </option>
                ))
              }
            </select>
          )}

        </div>
      </div>
    );
  };

  return <div className="d-grid">{mergedSpecs.map(renderInput)}</div>;
};