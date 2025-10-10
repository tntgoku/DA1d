import { useCallback } from "react";
import { Variant } from "../entity/Object/Variant";
import { VariantColor } from "../entity/Object/VariantColor";
export const useVariants = (formData, setFormData,handleInputChange) => {
  const variants = formData.variants?.map(v => new VariantColor(v)) || [];

  // 👉 Thêm màu mới
  const addColor = useCallback((newColorInput) => {

    if(newColorInput ===null){
      alert("Bạn chưa nhập Màu vào");
      return ;
    }
   const newColor = new VariantColor({
      idColor: Math.floor(Math.random() * 1000000),
      color: newColorInput,
      variants: []
    });
 const currentVariants = formData.variants || [];
    setFormData(prev => ({
      ...prev,
      variants: [...(prev.variants || []), newColor],
    }));
    handleInputChange({
      target: { name: "variants", value: [...currentVariants, newColor] }
    });
  }, [setFormData,handleInputChange]);

  // 👉 Thêm storage mới
  const addStorage = useCallback((idColor,colorinput) => {
  const newVariant = new Variant({
      variantId: Math.floor(Math.random() * 1000000),
      color:colorinput,
      storage: "",
      price: 0,
      list_price:0,
      stock: 0,
      isActive: true,
    });
  const updatedVariants = (formData.variants || []).map(vColor => {
      if (vColor.idColor === idColor) {
        const updatedStorage = [...(vColor.variantsStorage || []), newVariant];
        return { ...vColor, variantsStorage: updatedStorage };
      }
      return vColor;
    });

    handleInputChange({
      target: { name: "variants", value: updatedVariants }
    });
  }, [setFormData,handleInputChange]);

  // 👉 Xóa variantColor theo ID
  const removeVariantColor = useCallback((idColor) => {
    const updatedVariants = (formData.variants || []).filter(
      vColor => vColor.idColor !== idColor
    );
    handleInputChange({
      target: { name: "variants", value: updatedVariants }
    });
  }, [formData,handleInputChange]);
    // 👉 Xóa variantStorage theo ID
  const removeStorage = useCallback((idColor, variantId) => {
    const updatedVariants = (formData.variants || []).map(vColor => {
      if (vColor.idColor === idColor) {
        const updatedStorage = (vColor.variantsStorage || []).filter(
          v => v.variantId !== variantId
        );
        return { ...vColor, variantsStorage: updatedStorage };
      }
      return vColor;
    });

    handleInputChange({
      target: { name: "variants", value: updatedVariants }
    });
  }, [formData, handleInputChange]);

  // 👉 Cập nhật variant (ví dụ: sửa giá, dung lượng, màu…)
  const updateVariantField = useCallback((idColor, fieldName, newValue, variantId = null) => {
    const updatedVariants = (formData.variants || []).map(vColor => {
      if (vColor.idColor === idColor) {
        if (variantId !== null) {
          const updatedStorage = (vColor.variantsStorage || []).map(v => {
            if (v.variantId === variantId) {
              const value = ['price', 'list_price', 'sale_price', 'discount', 'warrantly', 'stock']
                .includes(fieldName)
                ? Number(newValue)
                : newValue;
              return { ...v, [fieldName]: value };
            }
            return v;
          });
          return { ...vColor, variantsStorage: updatedStorage };
        } else {
          return { ...vColor, [fieldName]: newValue };
        }
      }
      return vColor;
    });

    handleInputChange({ target: { name: "variants", value: updatedVariants } });
  }, [formData, handleInputChange]);

  return {
    variants,
    addColor,
    addStorage,
    removeVariantColor,
    removeStorage,
    updateVariantField,
  };
};
