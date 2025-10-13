import { useEffect, useState } from "react";
import { categoryService } from "../service/CateService";
import { productService } from "../service/productService";
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
  return { categories, products, fetchProducts ,getCateById};
};
