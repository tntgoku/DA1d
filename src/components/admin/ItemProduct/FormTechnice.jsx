export const FormTechnine = ({ handleInputChange, formData }) => {
  const specs = [
    {label: "Tính năng đặc biệt", name: "features", placeholder: "Ví dụ: Chống nước" },
    { label: "Màu sắc", name: "color", placeholder: "Ví dụ: Đen, Trắng" },
    { label: "Bộ nhớ trong", name: "storage", placeholder: "Ví dụ: 128GB" },
    { label: "RAM", name: "ram", placeholder: "Ví dụ: 8GB" },
    { label: "Màn hình", name: "screen", placeholder: "Ví dụ: 6.7 inch" },
    { label: "Dung lượng pin", name: "battery", placeholder: "Ví dụ: 4323 mAh" },
    { label: "Chip xử lý", name: "chip", placeholder: "Ví dụ: Apple A16 Bionic" },
    { label: "Camera", name: "camera", placeholder: "Ví dụ: 48MP" },
    { label: "Trọng lượng", name: "weight", placeholder: "Ví dụ: 240g" },
    { label: "Kết nối", name: "connectivity", placeholder: "Ví dụ: Bluetooth 5.3" }
  ];

  return (
    <div>
      {specs.map((spec) => (
        <div className="mb-3 row" key={spec.name}>
          <div className="col-md-6">
            <label className="form-label">{spec.label}</label>
            <input
              type="text"
              className="form-control"
              name={`spec_${spec.name}`}
              value={formData.specifications?.[spec.name] || ""}
              onChange={handleInputChange}
              placeholder={spec.placeholder}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
