import axios from "axios";
import { apiClient } from "./getAPI";
export const getAllProduct = async() => {
    try {
        const response = await apiClient.get("products");
        return response.data;
    }catch(error){
        console.log('Error fetching payment status:', error);
        throw error;
    }
}

export const getProductFeatured = async() => {
    try {
        const response = await apiClient.get("products/featured");
        if(response.status === 200){
          alert('Fetch featured products successful', response);
        }
        console.log('Fetched featuredsss products:', response.data.message);
        return response.data.data;
    }catch(error){
        console.log('Error fetching featured products:', error);
        throw error;
    }
}

// Fetch details of a single product by ID
export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(`products/${id}`);
    console.log("Fetched product by ID:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};
export const getProductStorageList = async (id) => {
  try {
    const response = await apiClient.get(`products/${id}`);
    const product = response.data;
    console.log("Fetched product:", product);
    const storageList = product.variants?.map(variant => variant.storage) || [];
    // Nếu muốn loại bỏ trùng lặp
    const uniqueStorageList = [...new Set(storageList)];
    console.log("Storage list:", uniqueStorageList);
    return uniqueStorageList;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};
export const getStorageColorPriceMap = async (id) => {
 try {
  const response = await apiClient.get(`products/${id}`);
  const product = response.data;
  const productId = product.productId;

  const storageMap = {}; // storage → region → array of variants
  const variants = Array.isArray(product.variants) ? product.variants : [];

  variants.forEach(variant => {
    const { storage, color, price, region, isActive, slug } = variant;
    const variantId = variant.variantId;
    const sku = variant.sku;
    const isactive = variant.isActive;
    const Slug= variant.slug;
    if (!storage || !region) return; // bỏ qua nếu thiếu storage hoặc region

    if (!storageMap[storage]) storageMap[storage] = {};
    if (!storageMap[storage][region]) storageMap[storage][region] = [];

    // tránh trùng color + price
    if (!storageMap[storage][region].some(v => v.color === color && v.price === price)) {
      storageMap[storage][region].push({ variantId, productId, sku, color,storage, price, region, isactive, slug });
    }
  });

  console.log("Storage-Region-Color-Price Map:", storageMap);


  return storageMap;

} catch (error) {
  console.error(`Error fetching product with ID ${id}:`, error);
  throw error;
}

};

export const getAlllistimgbyID = async (id) => {
    try {
        const response = await apiClient.get(`products/images/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product images:", error);
        throw error;
    }
};
export const getAllProductVariant = async () => {
    try {
        const response = await apiClient.get("products/variant");
        return response.data;
    } catch (error) {
        console.error("Error fetching product variants:", error);
        throw error;
    }
};

export const getDetailProductVariantById = async (id) => {
  try {
    const response = await apiClient.get(`products/variant/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product variant with ID ${id}:`, error);
    throw error;
  }
};
export const getListProductByVariantId = async (id) => {
  try {
    const response = await apiClient.get(`products/listimg/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products with variant ID ${id}:`, error);
    throw error;
  }
};

// Create a new product
export const createProduct = async (productData) => {
  try {
    const response = await apiClient.post('/products', productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Update an existing product by ID
export const updateProduct = async (productId, productData) => {
  try {
    const response = await apiClient.put(`/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error(`Error updating product with ID ${productId}:`, error);
    throw error;
  }
};

// Delete a product by ID
export const deleteProduct = async (productId) => {
  try {
    const response = await apiClient.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product with ID ${productId}:`, error);
    throw error;
  }
};