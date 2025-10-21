import { useState, useMemo } from 'react';

export const useVariantManagement = (products) => {
  const [selectedVariants, setSelectedVariants] = useState({});

  // Function để lấy tất cả variants từ products
  const getAllVariants = useMemo(() => {
    const allVariants = [];
    products.forEach(product => {
      if (product.variants && Array.isArray(product.variants)) {
        product.variants.forEach(variant => {
          if (variant.variantsStorage && Array.isArray(variant.variantsStorage)) {
            variant.variantsStorage.forEach(variantStorage => {
              const nameVariants = `${product.name} ${variantStorage.storage ? `- ${variantStorage.storage}` : ''} ${variantStorage.color ? `- ${variantStorage.color}` : ''} ${variantStorage.sku ? `- ${variantStorage.sku}` : ''} ${variantStorage.regionCode ? `- ${variantStorage.regionCode}` : ''}`;
              allVariants.push({
                ...variantStorage,
                nameVariants: nameVariants
              });
            });
          }
        });
      }
    });
    // console.log("allVariants:", allVariants);
    return allVariants;
  }, [products]);

  // Get variant by ID
  const getVariantById = (variantId) => {
    console.log("getAllVariants:", getAllVariants);
    console.log("variantId:", variantId);
    return getAllVariants.find(v => parseInt(v.variantId) === parseInt(variantId));
  };
  const findVariant = (products, value) => {
    // Chuyển đổi giá trị tìm kiếm thành số chỉ một lần
    const searchId = parseInt(value); 
    console.log("searchId:", searchId);
    console.log("products:", products);
    for (const product of products) {
        console.log("product:", product);
        for (const variant of product.variants) {
            for (const variantStorage of variant.variantsStorage) {
                if (parseInt(variantStorage.variantId) === searchId) {
                    // 1. Tạo tên biến thể
                    const nameVariants = `${product.name} ${variant.storage ? `- ${variant.storage}` : ''} ${variant.color ? `- ${variant.color}` : ''} ${variant.sku ? `- ${variant.sku}` : ''} ${variant.regionCode ? `- ${variant.regionCode}` : ''}`;
                    
                    // 2. Tạo đối tượng kết quả (thêm nameVariants vào variantStorage)
                    const foundVariant = { ...variantStorage, nameVariants: nameVariants };
                    
                    // 3. Trả về đối tượng và thoát khỏi hàm/vòng lặp ngay lập tức
                    return foundVariant; 
                }
            }
        }
    }
    // Trả về null hoặc undefined nếu không tìm thấy
    return null; 
};
// Giả định hàm findVariant đã được định nghĩa ở trên và hoạt động đúng.
// const findVariant = (products, value) => { ... };
// Ghi chú: Cần đảm bảo biến `products` được truyền vào scope của `handleItemChange`
const handleItemChange = (index, field, value, formData, handleInputChange) => {
  console.log("O day:", formData);
  // Để giữ mã sạch, tôi đổi tên hàm tìm kiếm thành findVariant (giống hàm bạn cung cấp)
  const currentItems = Array.isArray(formData.items) ? formData.items : [];
  const updatedItems = [...currentItems];
  if (field === 'variantId') {
      // 1. Tìm variant từ tất cả products
      const foundVariant = findVariant(products, value); // TRUYỀN THÊM 'products' VÀO
      
      console.log("Found variant:", foundVariant);

      if (foundVariant) {
          // Lấy ID của variant (đã được làm sạch trong foundVariant)
          const variantId = foundVariant.variantId; 
          
          // 2. Kiểm tra xem variant này đã có trong items chưa (tìm theo id, bỏ qua item hiện tại)
          const existingItemIndex = updatedItems.findIndex((item, i) => 
              i !== index && item.id && parseInt(item.id) === parseInt(variantId)
          );
          
          if (existingItemIndex !== -1) {
              // Trường hợp 1: Variant đã tồn tại ở item khác -> MERGE (Tăng quantity và xóa item hiện tại)
              console.log("🔄 Variant already exists, merging items.");
              updatedItems[existingItemIndex] = {
                  ...updatedItems[existingItemIndex],
                  quantity: (updatedItems[existingItemIndex].quantity || 1) + (updatedItems[index].quantity || 1) // Cộng dồn số lượng
              };
              // Xóa item hiện tại (vì đã merge)
              updatedItems.splice(index, 1);
              
              console.log("✅ Merged items, new quantity:", updatedItems[existingItemIndex].quantity);
          } else {
              // Trường hợp 2: Variant chưa tồn tại -> CẬP NHẬT item hiện tại
              console.log("✅ Updating current item with new variant data.");
              
              // SỬA LỖI CÚ PHÁP: Dùng updatedItems[index] thay vì updatedItems.at(index)
              updatedItems[index] = {
                  id: variantId, 
                  object: foundVariant, // Đối tượng variant đã được thêm nameVariants
                  quantity: updatedItems[index]?.quantity || 1 // Giữ quantity nếu có, nếu không mặc định là 1
              };
              
              console.log("✅ Added new variant to items with id:", variantId);
          }
          
      } else {
          // Trường hợp 3: Không tìm thấy variant -> Reset item hiện tại
          console.log("❌ Variant not found, resetting item.");
          updatedItems[index] = {
              id: null,
              object: null,
              quantity: updatedItems[index]?.quantity || 1
          };
      }
  } 
  // Logic cập nhật các trường khác (quantity, price, v.v.)
  else {
      // SỬA LỖI CÚ PHÁP: Dùng updatedItems[index] thay vì updatedItems.at(index)
      updatedItems[index] = {
          ...updatedItems[index],
          [field]: field === 'quantity' ? parseInt(value) || 0 : value
      };
  }
  
  // Loạt console.log về `itemnull` và `foundVariantResult` ban đầu đã bị xóa 
  // vì logic đã được hợp nhất vào khối `if (field === 'variantId')`.

  console.log("Updated items:", updatedItems);
    formData.items = updatedItems;
  // Cuối cùng, cập nhật state của form
  handleInputChange({ target: { name: "items", value: JSON.stringify(updatedItems) } });
};

  // Add new item
  const addItem = (formData, handleInputChange) => {
    const currentItems = Array.isArray(formData.items) ? formData.items : [];
    const newItems = [...currentItems, { 
      id: null,
      object: null, 
      quantity: 1 
    }];
    handleInputChange({ target: { name: "items", value: JSON.stringify(newItems) } });
  };

  // Add variant directly to items (with merge logic)
  // const addVariantToItems = (variantId, formData, handleInputChange) => {
  //   console.log("🔄 Adding variant to items:", variantId);
  //   const foundVariant = getVariantById(variantId);
  //   if (!foundVariant) {
  //     console.log("❌ Variant not found:", variantId);
  //     return false;
  //   }

  //   const currentItems = Array.isArray(formData.items) ? formData.items : [];
  //   const updatedItems = [...currentItems];
    
  //   // Kiểm tra xem variant này đã có trong items chưa (tìm theo id)
  //   const existingItemIndex = updatedItems.findIndex(item => 
  //     item.id && parseInt(item.id) === parseInt(variantId)
  //   );
    
  //   if (existingItemIndex !== -1) {
  //     // Variant đã tồn tại, tăng quantity
  //     console.log("🔄 Variant already exists, increasing quantity");
  //     updatedItems[existingItemIndex] = {
  //       ...updatedItems[existingItemIndex],
  //       quantity: (updatedItems[existingItemIndex].quantity || 1) + 1
  //     };
      
  //     console.log("✅ Increased quantity to:", updatedItems[existingItemIndex].quantity);
  //   } else {
  //     // Variant chưa tồn tại, thêm mới với cấu trúc {id, object, quantity}
  //     console.log("✅ Adding new variant to items");
  //     const newItem = {
  //       id: variantId, // id = variantId
  //       object: foundVariant, // object là variant object
  //       quantity: 1
  //     };
      
  //     updatedItems.push(newItem);
  //     console.log("✅ Added new item:", newItem);
  //   }
    
  //   // Update form data
  //   handleInputChange({ target: { name: "items", value: JSON.stringify(updatedItems) } });
    
  //   return true;
  // };

  // Remove item
  const removeItem = (index, formData, handleInputChange) => {
    const currentItems = Array.isArray(formData.items) ? formData.items : [];
    if (currentItems.length > 1) {
      const updatedItems = currentItems.filter((_, i) => i !== index);
      handleInputChange({ target: { name: "items", value: JSON.stringify(updatedItems) } });
    }
  };

  // Calculate item total
  const calculateItemTotal = (price, quantity) => {
    const parsePrice = (value) => {
      if (typeof value === "number") return value;
      if (!value) return 0;
      const cleaned = value.toString().replace(/[.,\s]/g, "");
      return parseInt(cleaned) || 0;
    };
    return parsePrice(price) * (parseInt(quantity) || 0);
  };

  // Calculate order total
  const calculateOrderTotal = (items) => {
    const itemsArray = Array.isArray(items) ? items : [];
    if(items.length === 0){
      return 0;
    }
    
    return itemsArray.reduce((total, item) => {
      // Tính từ object.price * quantity
      let price = item?.object?.list_price || 0;
      if(item?.object?.discount !== null && item?.object?.discount !== undefined  && item?.object?.discount >0){
        price = price * (1 - item?.object?.discount / 100);
      }
      return total + (price * (item?.quantity || 1));
    }, 0);
  };

  return {
    allVariants: getAllVariants,
    getVariantById,
    handleItemChange,
    addItem,
    // addVariantToItems,
    removeItem,
    calculateItemTotal,
    calculateOrderTotal,
    selectedVariants,
    setSelectedVariants
  };
};
