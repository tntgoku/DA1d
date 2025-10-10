import React, { useState, useEffect } from "react";
import { useCategories } from "../../hook/useCategori";

export default function CategorySelectGroup({ isFormEmpty,formData, handleInputChange }) {
  const { categories, loading, error } = useCategories();
  const [parentId, setParentId] = useState("");
  const [childOptions, setChildOptions] = useState([]);
  const [isNewProduct, setIsNewProduct] = useState(true);

  useEffect(() => {
        setIsNewProduct(isFormEmpty(formData));
  }, [formData]);

  useEffect(() => {
    if (categories.length === 0) return;
    if (isNewProduct) {
      const selectedParent = categories.find(
        (cat) => cat.id === Number(parentId)
      );
      if (selectedParent) {
        setChildOptions(selectedParent.parents || []);
      } else {
        setChildOptions([]);
      }
      return;
    }

    // ✅ Nếu là sửa sản phẩm (đã có formData.category)
    if (!formData?.category) return;

    // Kiểm tra xem category này là cha hay con
    const foundParent = categories.find(
      (cat) => cat.id === Number(formData.category)
    );

    if (foundParent) {
      // Là danh mục cha
      setParentId(foundParent.id);
      setChildOptions(foundParent.parents || []);
    } else {
      // Là danh mục con → tìm cha chứa nó
      const parentCat = categories.find((cat) =>
        cat.parents?.some((child) => child.id === Number(formData.category))
      );
      if (parentCat) {
        setParentId(parentCat.id);
        setChildOptions(parentCat.parents || []);
      }
    }
  }, [categories, formData, parentId, isNewProduct]);

  if (loading) return <p>Đang tải danh mục...</p>;
  if (error) return <p>Lỗi khi tải danh mục!</p>;

  return (
    <>
      <div className="category-select d-flex align-items-center justify-content-between">
      {/* Select danh mục cha */}
      <div className="mb-3">
        <label className="form-label">Danh mục cha *</label>
        <select
          className="form-select long-text-select"
          value={parentId}
          onChange={(e) => {
              handleInputChange({
                target: { name: "category", value: e.target.value }
              });
            setParentId(e.target.value)}}
          required
        >
          <option value="">Chọn danh mục cha</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      {/* Select danh mục con */}
      {!isNewProduct || (isNewProduct && childOptions.length > 0) ? (
        <div className="mb-3">
          <label className="form-label">Danh mục con *</label>
          <select
            className="form-select"
            name="category"
            value={formData.category || ""}
            onChange={(e) => {
              handleInputChange({
                target: { name: "category", value: e.target.value }
              });
            }}
            disabled={!childOptions.length}
            required
          >
            <option value="">Chọn danh mục con</option>
            {childOptions.map((child) => (
              <option key={child.id} value={child.id}>
                {child.name}
              </option>
            ))}
          </select>
        </div>
      ) : null}
      </div>
    </>
  );
}
