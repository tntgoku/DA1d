// src/hook/useProductDetail.js
import { useState, useEffect, useCallback } from "react";
import { productService } from "../services/productService";
import anh1 from '../assets/iphone-17-pro-max_1.webp';
import { useCategories } from "./useCategori";
import { useCart } from "./useCart";
export const useProductDetail = (id, categories) => {
    console.log("Categories",categories);
    const {findCategoryById}=useCategories();
    const [productvariant, setProductvariant] = useState(null);
    const [finalPrice, setFinalPrice] = useState("Liên hệ");
    const [activeIndex, setActiveIndex] = useState(0); 
    const [listimg, setListimg] = useState([]);
    const [selectedStorage, setSelectedStorage] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [slidesData, setSlidesData] = useState([]);
    const [listStoraget, setListStoraget] = useState({});
    const[listColor,setListColor]=useState({});
    const [currentVariantInStorageList, setCurrentVariantInStorageList] = useState(null);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [lastAddedProduct, setLastAddedProduct] = useState(null);
    const calculatePrice = useCallback((priceInput, discountInput) => {
        if (priceInput === null || priceInput === undefined || priceInput === "liên hệ" || priceInput === "Liên hệ") {
            return "Liên hệ";
        }
        let price = typeof priceInput === "string" ? parseFloat(priceInput.replace(/\./g, "").replace(",", ".")) : priceInput;
        if (isNaN(price) || price <= 0) return "Liên hệ";
        let discount = discountInput ? Number(discountInput) : 0;
        if (!isNaN(discount) && discount > 0) {
            price = price - price * (discount / 100);
        }
        return price.toLocaleString("vi-VN") + "đ";
    }, []); 
    const {addToCart,updateQuantity,totalItems}=useCart();
    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            setIsLoading(true);
            setError(null);
            try {
                const variant = await productService.getDetailProductVariantById(id);
                if (!variant) throw new Error("Không tìm thấy biến thể này");
                console.log("variant:",variant);
                setProductvariant(variant);
                setSelectedStorage(variant.storage);
                setSelectedRegion(variant.regionCode);

                const prod = await productService.getProductById(variant.productId);
                if (!prod) throw new Error("Không tìm thấy sản phẩm này ");
                
                setProduct(prod);
                setListimg(prod.images);

                setFinalPrice(calculatePrice(variant.list_price, variant.discount));

                const initialSlidesData = [
                    {
                        id: 1,
                        href: "/iphone-17-pro-max-256gb-ll-a-1",
                        title: "iPhone 17 Pro Max 256GB",
                        imgSrc: anh1,
                        imgAlt: "iPhone 17 Pro Max 256GB",
                        price: "Liên hệ",
                        promo: "Bảo hành 12 tháng chính hãng Apple",
                        discount: "Giảm 14%",
                    },
                    {
                        id: 2,
                        href: "/iphone-17-pro-max-512gb-ll-a-1",
                        title: "iPhone 17 Pro Max 512GB",
                        imgSrc: anh1,
                        imgAlt: "iPhone 17 Pro Max 512GB",
                        price: "Liên hệ",
                        promo: "Bảo hành 12 tháng chính hãng Apple",
                        discount: "Giảm 14%",
                    },
                ];
                setSlidesData(initialSlidesData);
            } catch (err) {
                console.error("Error fetching product variant or product details:", err);
                setError(err.message || "Có lỗi sảy rara");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);
    useEffect(() => {
        if (product?.variants) {
            const storageMap = product.variants.reduce((acc, variant) => {
                const regionKey = variant.regionCode || "NotSpecified"; 
                if (!acc[variant.storage]) {
                    acc[variant.storage] = {};
                }
                if (!acc[variant.storage][regionKey]) {
                    acc[variant.storage][regionKey] = variant; 
                }
                return acc;
            }, {});
            const ColorMap = product?.variants?.reduce((acc, variant) => {
                if (!acc[variant.color]) {
                    acc[variant.color] = {}; 
                }
                acc[variant.color][variant.storage] = variant; 
            
                return acc;
            }, {}) || {};
            console.log("Colormap",ColorMap)
            setListStoraget(storageMap);
            setListColor(ColorMap);
        }
    }, [product]);
    useEffect(() => {
        if (selectedStorage && listStoraget[selectedStorage]) {
            const regionKeyToAccess = selectedRegion || "NotSpecified";
            const variant = listStoraget[selectedStorage]?.[regionKeyToAccess];
            setCurrentVariantInStorageList(variant);
        } else {
            setCurrentVariantInStorageList(null);
        }
    }, [selectedStorage, selectedRegion, listStoraget]);

    const handleSelectColor = (colorKey) => {
        console.log("handleSelectColor called with:", colorKey);
        console.log("listColor:", listColor);
        console.log("selectedStorage:", selectedStorage);
        
        if (listColor[colorKey] && listColor[colorKey][selectedStorage]) {
            const selectedVariant = listColor[colorKey][selectedStorage];
            console.log("Selected variant:", selectedVariant);
            
            setProductvariant(selectedVariant);
            setSelectedRegion(selectedVariant.regionCode);
            setFinalPrice(calculatePrice(selectedVariant.list_price, selectedVariant.discount));
            
            // Cập nhật activeIndex dựa trên màu được chọn
            const colorIndex = Object.keys(listColor).indexOf(colorKey);
            setActiveIndex(colorIndex);
        } else {
            console.log("No variant found for color:", colorKey, "and storage:", selectedStorage);
        }
    };
    const targetCategoryId = product?.category; 
    const foundCategory = findCategoryById(categories, targetCategoryId);
    const namecate = foundCategory?.name || 'Sản phẩm';
    const handleAddToCart = (variant) => {
        console.log("handleAddToCart called with:", variant);
        
        if (variant) {
            addToCart(variant); // Gọi hàm thêm vào giỏ hàng
            
            // Cập nhật state để hiển thị popup
            setLastAddedProduct({
                ...variant,
                productName: product?.name,
                productImage: listimg[0]?.imgSrc
            });
            setIsPopupOpen(true);
        } else {
            console.log("No variant to add to cart");
        }
    };
    const closePopup = () => {
        setIsPopupOpen(false);
    };
    const logdata = useCallback(() => {
        console.log("Variant được tìm thấy trong ListStoraget:", currentVariantInStorageList);
        console.log("Product:", product);
        console.log("ProductListStorage:", listStoraget);
        console.log("Product Variant:", productvariant);
        console.log("Selected Storage:", selectedStorage);
        console.log("Selected Region:", selectedRegion);
        console.log("Final Price:", finalPrice);
    }, [currentVariantInStorageList, product, listStoraget, productvariant, selectedStorage, selectedRegion, finalPrice]);
    useEffect(() => {
        if (product && productvariant) {
            logdata();
        }
    }, [product, productvariant, logdata]);
    return {
        isPopupOpen,
        lastAddedProduct,
        product,
        productvariant,
        finalPrice,
        activeIndex,
        listimg,
        selectedStorage,
        selectedRegion,
        namecate,
        isLoading,
        error,
        slidesData,
        listStoraget,
        listColor,
        currentVariantInStorageList,
        handleSelectColor,
        setSelectedStorage,
        setSelectedRegion,
        logdata,
        closePopup,
        handleAddToCart,
        totalItems,
        calculatePrice,
    };
};