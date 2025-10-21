import React, { useState, useMemo,useEffect ,useCallback} from 'react';

export const useCart=()=>{
  const CART_STORAGE_KEY = 'shopping_cart_data';

  const [cartItems, setCartItems] = useState(() => {
    try {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
        console.error("Could not load cart from localStorage", error);
        return [];
    }

  });
  // useEffect(() => {
  //   try {
  //     // Lưu dữ liệu giỏ hàng mới nhất vào localStorage
  //     localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  //   } catch (error) {
  //     console.error("Could not save cart to localStorage", error);
  //   }
  // }, [cartItems]); 
  // Thêm sản phẩm vào giỏ hàng
  const addToCart = useCallback((product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.variantId);
      if (existingItem) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng lên 1
        return prevItems.map(item =>
                  item.id === product.variantId 
                  ? { ...item, quantity: item.quantity + 1 } 
                  : item
                );
              } else {
                // Nếu sản phẩm chưa có, thêm sản phẩm mới vào giỏ với quantity là 1
                return [...prevItems, { id:product.variantId,object:product, quantity: 1 }];
              }
      });
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
      console.log(getlistCart());
  }, [cartItems]); 

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  // Cập nhật số lượng sản phẩm trong giỏ
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item =>
      item.id === productId 
        ? { ...item, quantity: newQuantity } 
        : item
    ));
  };
  const totalItems=()=>{
    const listcartJSON=JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
    if (listcartJSON === null) {
      return 0;
    }
    const totalitems=listcartJSON.reduce((accumulator, currentItem) => {
      const quantity = currentItem.quantity ? parseInt(currentItem.quantity, 10) : 0;
      return accumulator + quantity;
  }, 0);
   return totalitems;
  }
  const getlistCart = () => {
    try {
      const rawData = localStorage.getItem(CART_STORAGE_KEY);
      if(rawData===null){
        return [];
      }
      // Nếu chưa có dữ liệu trong localStorage
  
      // Parse JSON an toàn
      const listitema = rawData ? JSON.parse(rawData) : [];
  
      // Nếu dữ liệu không phải là mảng
      if (!Array.isArray(listitema) || listitema.length === 0) {
        console.log("⚠️ Dữ liệu localStorage không hợp lệ hoặc rỗng:", listitema);
        return [];
      }
  
      // // Bắt đầu xử lý nhóm theo productId
      // const groupedByProduct = {};
  
      // listitema.forEach(item => {
      //   const productId = item.object?.productId || item.object?.id;
      //   if (!productId) return; // Bỏ qua nếu không có productId
  
      //   if (!groupedByProduct[productId]) {
      //     groupedByProduct[productId] = {
      //       productId: productId,
      //       nameVariants: item.object?.nameVariants || item.object?.name || "Unknown Product",
      //       images: item.object?.images || [],
      //       variants: []
      //     };
      //   }
  
      //   // Thêm variant
      //   groupedByProduct[productId].variants.push({
      //     variantId: item.id,
      //     price: item.object?.price || item.object?.salePrice || 0,
      //     quantity_cart: item.quantity,
      //     ...item.object
      //   });
      // });
  
      // const result = Object.values(groupedByProduct);
      console.log("✅ Processed cart data:", listitema);
      return   listitema ; 
  
    } catch (error) {
      console.error("❌ Lỗi khi đọc giỏ hàng từ localStorage:", error);
      return [];
    }
  };
  // tion to update cart in localStorage
  const updateCartInStorage = (newCartData) => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCartData));
      console.log("Cart updated in localStorage:", newCartData);
    } catch (error) {
      console.error("Could not update cart in localStorage", error);
    }
  };

  return {addToCart,updateQuantity,removeFromCart,totalItems,getlistCart,updateCartInStorage};
}