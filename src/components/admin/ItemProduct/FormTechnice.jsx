import React, { useState } from "react";
import { useUnits } from "../../../hook/useUnit";
import { useSpecifications } from "../../../hook/useSpec";
import {
  parseSpecValue,
  isTextSpec,
  mergeSpecsWithDefaults,
  mapSpecsToObject,
} from "../../../Util/SpecUtil";

export const FormTechnine = ({ handleInputChange, formData,setFormData }) => {
  const { units } = useUnits();
  const {unitName,setUnitName}=useState();
  const { specs: dbSpecs,updateSpecification } = useSpecifications(formData.category,handleInputChange,formData,setFormData,units);
  const defaultSpecs = [
    { label: "RAM", name: "RAM", type: "number", unit: "GB" },
    { label: "Màn hình", name: "screen", type: "number", unit: "inch" },
    { label: "Tần số quét", name: "refreshRate", type: "number", unit: "Hz" },
    { label: "Camera trước", name: "camera", type: "number", unit: "MP" },
    { label: "Camera sau", name: "camerabehind", type: "number", unit: "MP" },
    { label: "Chip xử lý", name: "chip", type: "text" },
    { label: "Dung lượng pin", name: "battery", type: "number", unit: "mAh" },
    { label: "Trọng lượng", name: "weight", type: "number", unit: "g" },
    { label: "Hệ điều hành", name: "operation", type: "text" },
    { label: "Kết nối", name: "connectivity", type: "text" },
    { label: "Tính năng đặc biệt", name: "features", type: "text" },
  ];

// const handleSpecChange = (name, value, type) => {
//   const parsedValue = parseSpecValue(value, type);
//   console.log(formData.id);
//   // Đảm bảo specifications luôn là array
//   const specs = Array.isArray(formData.specifications)
//     ? [...formData.specifications]
//     : [];

//   // Kiểm tra xem spec này đã tồn tại trong mảng chưa
//   const index = specs.findIndex((s) => s.value === name);

//   if (index !== -1) {
//     // Cập nhật spec đã có
//     specs[index] = {
//       ...specs[index],
//       label: parsedValue,
//     };
//   } else {
//     // Thêm mới spec
//     specs.push({
//       id: null,
//       productId: formData.id || null,
//       specId: null,
//       value: name,
//       label: parsedValue,
//       unitName: null,
//     });
//   }

//   // Cập nhật formData.specifications trong FormDetailProduct
//   handleInputChange({
//     target: {
//       name: "specifications",
//       value: specs,
//     },
//   });
// };


  const renderInput = (spec) => {
    const isText = isTextSpec(spec);
    const existingSpec = Object.values(normalizedSpecs).find(
      (s) => s?.value === spec.name
    );
    const currentValue = existingSpec?.label || "";

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
              value={existingSpec?.unitName || spec.unit || ""}
              onChange={(e) =>
                updateSpecification(spec.name, e.target.value, "unit")
              }
            >
              <option value="">--Chọn đơn vị--</option>
              {units.map((u) => (
                <option key={u.key} value={u.value}>
                  {u.value}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    );
  };
  const normalizedSpecs = Array.isArray(formData.specifications)
    ? mapSpecsToObject(formData.specifications)
    : formData.specifications || {};
      const mergedSpecs = mergeSpecsWithDefaults(dbSpecs, defaultSpecs);

  return <div className="d-grid">{mergedSpecs.map(renderInput)}</div>;
};
