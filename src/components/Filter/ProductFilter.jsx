export const ProductFilter = ({ products,filters, onFilterChange }) => {
  const handleFilterChange = (name, value) => {
    onFilterChange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="row g-2 mb-3">
            {/* Ô tìm kiếm */}
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm sản phẩm..."
          value={filters.searchTerm}
          onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
        />
      </div>
      {/* Lọc theo tồn kho */}
      <div className="col-md-3">
        <select
          className="form-select"
          value={filters.stockFilter}
          onChange={(e) => handleFilterChange("stockFilter", e.target.value)}
        >
          <option value="">Tất cả tồn kho</option>
          <option value="instock">Còn hàng</option>
          <option value="outofstock">Hết hàng</option>
        </select>
      </div>

      {/* Lọc theo giá */}
      <div className="col-md-3">
        <select
          className="form-select"
          value={filters.priceFilter}
          onChange={(e) => handleFilterChange("priceFilter", e.target.value)}
        >
          <option value="">Tất cả mức giá</option>
          <option value="low">Dưới 5 triệu</option>
          <option value="medium">5 - 15 triệu</option>
          <option value="high">Trên 15 triệu</option>
        </select>
      </div>
    </div>
  );
};
