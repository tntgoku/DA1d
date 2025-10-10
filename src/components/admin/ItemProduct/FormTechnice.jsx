export const FormTechnine = ({ handleInputChange, formData }) => {
  const specs = [
    { label: "Tính năng đặc biệt", name: "features", placeholder: "Ví dụ: Chống nước", type: "text" },
    { label: "RAM", name: "ram", placeholder: "Ví dụ: 8GB", type: "number" },
    { label: "Màn hình", name: "screen", placeholder: "Ví dụ: 6.7 inch", type: "number" },
    { label: "Dung lượng pin", name: "battery", placeholder: "Ví dụ: 4323 mAh", type: "number" },
    { label: "Chip xử lý", name: "chip", placeholder: "Ví dụ: Apple A16 Bionic", type: "text" },
    { label: "Camera Trước", name: "camera", placeholder: "Ví dụ: 48MP", type: "number" },
    { label: "Camera Sau", name: "camerabehind", placeholder: "Ví dụ: 48MP", type: "number" },
    { label: "Trọng lượng", name: "weight", placeholder: "Ví dụ: 240g", type: "number" },
    { label: "Kết nối", name: "connectivity", placeholder: "Ví dụ: Bluetooth 5.3", type: "text" }
  ];

  const handleSpecChange = (name, value, type) => {
    const parsedValue = type === "number" ? (value === "" ? "" : Number(value)) : value;

    const updatedSpecs = {
      ...(formData.specifications || {}),
      [name]: parsedValue
    };

    handleInputChange({
      target: {
        name: "specifications",
        value: updatedSpecs
      }
    });
  };

  return (
    <div className="d-grid">
      {specs.map((spec) => (
        <div className="mb-3" key={spec.name}>
          <div className="col-md-6">
            <label className="form-label">{spec.label}</label>
            <input
              type={spec.type}
              className="form-control"
              name={spec.name}
              value={formData.specifications?.[spec.name] ?? ""}
              onChange={(e) => handleSpecChange(spec.name, e.target.value, spec.type)}
              placeholder={spec.placeholder}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
