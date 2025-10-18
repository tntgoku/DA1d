import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/client/Header";
import Footer from "../components/client/Footer";
import { MainListProduct } from "../components/MainListProduct";
import { categoryService } from "../services/CateService";

export const CategoryPage = () => {
  const { parentSlug, childSlug } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const slugToUse = childSlug || parentSlug;
  console.log("slug:",slugToUse)
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const data = await categoryService.getCateBySlug(slugToUse);
        setCategory(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [slugToUse]);

  if (loading) return <p>Loading...</p>;
  if (!category) return <p>Category không tồn tại</p>;

  return (
    <>
      <Header />
      <MainListProduct categoryid={category.id} category={category} />
      <Footer />
    </>
  );
};
