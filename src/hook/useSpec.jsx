import { useEffect, useState, useCallback } from "react";
import { apiClient } from "../service/getAPI";
import { parseSpecValue } from "../Util/SpecUtil"; // ✅ import thêm
export const useSpecifications = (categoryId, handleInputChange, formData,setFormData,units) => {
  const [specs, setSpecs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // ✅ Lấy danh sách thông số theo category
  useEffect(() => {
    if (!categoryId) {
      setSpecs([]);
      return;
    }

    setLoading(true);
    apiClient
      .get(`specification/category/${categoryId}`)
      .then((res) => setSpecs(res.data.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [categoryId]);
  console.log(units);
  // ✅ Hàm cập nhật/thêm mới specification
const updateSpecification = useCallback(
  (nameSpec, value, type) => {
    const parsedValue = parseSpecValue(value, type);

    setFormData((prevFormData) => {
      const specsitem = Array.isArray(prevFormData?.specifications)
        ? [...prevFormData.specifications]
        : [];

      const index = specsitem.findIndex((s) => s.value === nameSpec);

      // ✅ Lấy đơn vị mặc định theo spec name
      let defaultUnit = null;
      const defaultSpec = specs.find((s) => s.name === nameSpec);
      if (defaultSpec && Array.isArray(units)) {
        const unitObj = units.find((u) => u.id === defaultSpec.unit);
        defaultUnit = unitObj ? unitObj.value : null;
      }

      if (type === "unit") {
        if (index !== -1) {
          specsitem[index] = {
            ...specsitem[index],
            unitName: value || defaultUnit,
          };
        } else {
          specsitem.push({
            id: null,
            productId: prevFormData?.id || null,
            specId: null,
            value: nameSpec,
            label: "",
            unitName: value || defaultUnit,
          });
        }
      } else {
        if (index !== -1) {
          specsitem[index] = {
            ...specsitem[index],
            label: parsedValue,
            unitName: specsitem[index].unitName || defaultUnit,
          };
        } else {
          console.log(specs);
          specsitem.push({
            id: null,
            productId: prevFormData?.id || null,
            specId: null,
            value: nameSpec,
            label: parsedValue,
            unitName: defaultUnit,
          });
        }
      }

      return { ...prevFormData, specifications: specsitem };
    });
  },
  [setFormData, specs, units]
);


  return { specs, loading, error, updateSpecification };
};
