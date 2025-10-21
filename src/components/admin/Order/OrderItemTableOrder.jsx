import { ItemOrder } from './ItemOrder';
import { useEffect } from 'react';
import { useState } from 'react';
export const OrderItemTableBody = ({
    formData,
    allVariants,
    handleVariantItemChange,
    handleInputChange,
    getVariantById,
    calculateItemTotal,
    removeVariantItem,
    items,
  }) => {
    // Kiểm tra formData.items có tồn tại và là array
    // console.log("O day ne",formData); // Commented out to reduce renders
    // console.log("itemsformData:", items); // Commented out to reduce renders
    console.log("items:", items); // Commented out to reduce renders
    console.log("All Variants:", allVariants);
    const isRemovable = items.length > 1;
    return (
      <tbody>
        {items.map((item, index) => {
          return (
                <ItemOrder
                  // SỬA: Key sử dụng kết hợp id và index để đảm bảo tính duy nhất và ổn định
                  key={`${item.id || 'item'}-${index}`}
                  item={item}
                  index={index}
                  allVariants={allVariants}
                  // SỬA LỖI QUAN TRỌNG: Loại bỏ từ khóa 'const' và gán trực tiếp kết quả của .find()
                  selectedVariant={allVariants.find(v => 
                    // Đảm bảo so sánh an toàn giữa các chuỗi/số
                    parseInt(v.variantId) === parseInt(item?.object?.variantId)
                  )}
                  formData={formData} // Đã thêm
                  handleVariantItemChange={handleVariantItemChange}
                  handleInputChange={handleInputChange}
                  getVariantById={getVariantById}
                  calculateItemTotal={calculateItemTotal}
                  removeVariantItem={removeVariantItem}
                  isRemovable={isRemovable}
                />
          );
        })}
      </tbody>
    );
  };
  