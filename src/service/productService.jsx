import axios from "axios";
import { apiClient } from "./getAPI";
import { Product } from "../entity/Object/Product";
import { Variant } from "../entity/Object/Variant";
export const productService = {
  async getAllProduct () { 
    try {
      const response = await apiClient.get("product");
      if (response.data && response.data.status === 200) {
        console.log(response.data);
        return response.data.data.map(p => new Product(p));
      } else {
        return [];
      }
    } catch (error) {
      console.log('Error fetching products:', error);
      throw error;
    }
  },
  async getProductFeatured() {
    try {
        const response = await apiClient.get("product/featured");
        if(response.status === 200){
          alert('Fetch featured products successful', response);
          return response.data.data.map(p => new Product(p));
        }else{
          return [];
        }
    }catch(error){
        console.log('Error fetching featured products:', error);
        throw error;
    }
  },
  async getProductById  (id)  {
    try {
      const response = await apiClient.get(`product/${id}`);
      alert(response.data.data);
      console.log("Fetched product by ID:", response.data.data);
      return  new Product( response.data.data);
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  },
  async getProductStorageList(id) {
    try {
      const response = await apiClient.get(`product/${id}`);
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
  },
  async getStorageColorPriceMap  (id) {
  try {
    const response = await apiClient.get(`product/${id}`);
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

  },

  async getAlllistimgbyID (id)  {
      try {
          const response = await apiClient.get(`product/images/${id}`);
          return response.data;
      } catch (error) {
          console.error("Error fetching product images:", error);
          throw error;
      }
  }, async getAllProductVariant ()  {
      try {
          const response = await apiClient.get("product/variant");
          return response.data;
      } catch (error) {
          console.error("Error fetching product variants:", error);
          throw error;
      }
  },
  async getDetailProductVariantById  (id)  {
    try {
      const response = await apiClient.get(`product/variant/${id}`);
      console.log("Data",response)
      return new Variant(response.data.data);
    } catch (error) {
      console.error(`Error fetching product variant with ID ${id}:`, error);
      throw error;
    }
  },
  async getListProductByVariantId  (id)  {
    try {
      const response = await apiClient.get(`product/listimg/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching products with variant ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new product
  async createProduct  (productData)  {
    try {
      console.log("Data khi push:",productData);
      const response = await apiClient.post('product', productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Update an existing product by ID
  async updateProduct  (id, productData)  {
    try {
      console.log("Update:",productData);
      const response = await apiClient.put(`product/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error(`Error updating product with ID ${id}:`, error);
      throw error;
    }
  },
  // Dlete a product by ID
  async deleteProduct  (id)  {
    try {
      const response = await apiClient.delete(`/product/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting product with ID ${id}:`, error);
      throw error;
    }
  }
}