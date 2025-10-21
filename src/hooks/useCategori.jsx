import { useEffect, useState } from "react";
import { categoryService } from "../services/CateService";
import { productService } from "../services/productService";
export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const[error,setError]=useState();
    useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await categoryService.getAllCate();
        setCategories(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const fetchProducts = async (id) => {
    if (!id) return [];
    try {
      const data = await productService.getProductsByCategory(id);
      setProducts(data);
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  };
  const getCateById  = async (id) => {  
    try {
        const data = await categoryService.getCateById(id);

        return data
    } catch (error) {
       console.error(err);
      return [];
    }

  }

  const findCategoryById = (categories, id) => {
    for (let cat of categories) {
      if (cat.id === id) {
        return cat
      }; // tìm category cha
      if (cat.parents && cat.parents.length > 0) {
        const found = findCategoryById(cat.parents, id); // tìm category con
        if (found) return found;
      }
    }
    return null;
  };
  return { categories, products, fetchProducts ,getCateById,findCategoryById};
};
