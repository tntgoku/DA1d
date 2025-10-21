import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/client/Header";
import Footer from "../components/client/Footer";
import { MainListProduct } from "../components/MainListProduct";
import { categoryService } from "../services/CateService";
import { generateBreadcrumb, generateSeoTitle, generateSeoDescription } from "../utils/seoUtils";

export const CategoryPage = () => {
  const { parentSlug, childSlug } = useParams();
  const [category, setCategory] = useState(null);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let categoryData = null;
        
        // Nếu có cả parentSlug và childSlug, tìm child category
        if (parentSlug && childSlug) {
          categoryData = await categoryService.getCategoryBySeoUrl(parentSlug, childSlug);
        } 
        // Nếu chỉ có parentSlug, tìm parent category
        else if (parentSlug) {
          categoryData = await categoryService.getCategoryByParentSlug(parentSlug);
        }
        
        if (categoryData) {
          setCategory(categoryData);
          
          // Tạo breadcrumb
          const breadcrumbData = generateBreadcrumb(window.location.pathname, [categoryData]);
          setBreadcrumb(breadcrumbData);
          
          // Cập nhật meta tags cho SEO
          document.title = generateSeoTitle(categoryData.name);
          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.setAttribute('content', generateSeoDescription(categoryData.description));
          }
        } else {
          setError('Category không tồn tại');
        }
      } catch (err) {
        console.error('Error fetching category:', err);
        setError('Có lỗi xảy ra khi tải danh mục');
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [parentSlug, childSlug]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Đang tải danh mục...</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !category) {
    return (
      <>
        <Header />
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <div className="alert alert-danger" role="alert">
                <h4 className="alert-heading">Không tìm thấy danh mục</h4>
                <p>{error || 'Danh mục bạn tìm kiếm không tồn tại hoặc đã bị xóa.'}</p>
                <hr />
                <p className="mb-0">
                  <a href="/" className="btn btn-primary">Về trang chủ</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      {/* Breadcrumb */}
      {breadcrumb.length > 0 && (
        <nav aria-label="breadcrumb" className="bg-light py-2">
          <div className="container">
            <ol className="breadcrumb mb-0">
              {breadcrumb.map((item, index) => (
                <li key={index} className={`breadcrumb-item ${item.isActive ? 'active' : ''}`}>
                  {item.isActive ? (
                    item.name
                  ) : (
                    <a href={item.url} className="text-decoration-none">
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </nav>
      )}
      
      {/* Category Header */}
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <div className="category-header mb-4">
              <h1 className="category-title">{category.name}</h1>
              {category.description && (
                <p className="category-description text-muted">{category.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <MainListProduct categoryid={category.id} category={category} />
      <Footer />
    </>
  );
};
