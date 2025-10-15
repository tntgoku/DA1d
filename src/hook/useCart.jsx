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
  useEffect(() => {
    try {
      // Lưu dữ liệu giỏ hàng mới nhất vào localStorage
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Could not save cart to localStorage", error);
    }
  }, [cartItems]); 
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

  const getlistCart=()=>{
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY))
  }
  return {addToCart,updateQuantity,removeFromCart,totalItems,getlistCart};
}