import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { categoryService } from '../services/CateService';
import { generateBreadcrumb } from '../utils/seoUtils';

const SeoBreadcrumb = () => {
  const { parentSlug, childSlug } = useParams();
  const location = useLocation();
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBreadcrumb = async () => {
      try {
        setLoading(true);
        
        // Nếu có slug, lấy breadcrumb từ API
        if (childSlug || parentSlug) {
          const slug = childSlug || parentSlug;
          const breadcrumbData = await categoryService.getBreadcrumbBySlug(slug);
          
          if (breadcrumbData && breadcrumbData.length > 0) {
            // Chuyển đổi thành format cần thiết
            const formattedBreadcrumb = breadcrumbData.map((item, index) => ({
              name: item.name,
              url: item.getSeoUrl ? item.getSeoUrl() : `/${item.slug}`,
              isActive: index === breadcrumbData.length - 1
            }));
            
            // Thêm trang chủ vào đầu
            formattedBreadcrumb.unshift({
              name: 'Trang chủ',
              url: '/',
              isActive: false
            });
            
            setBreadcrumb(formattedBreadcrumb);
          } else {
            // Fallback: tạo breadcrumb từ URL
            const fallbackBreadcrumb = generateBreadcrumb(location.pathname);
            setBreadcrumb(fallbackBreadcrumb);
          }
        } else {
          // Trang chủ
          setBreadcrumb([{
            name: 'Trang chủ',
            url: '/',
            isActive: true
          }]);
        }
      } catch (error) {
        console.error('Error fetching breadcrumb:', error);
        // Fallback: tạo breadcrumb từ URL
        const fallbackBreadcrumb = generateBreadcrumb(location.pathname);
        setBreadcrumb(fallbackBreadcrumb);
      } finally {
        setLoading(false);
      }
    };

    fetchBreadcrumb();
  }, [parentSlug, childSlug, location.pathname]);

  if (loading) {
    return (
      <nav aria-label="breadcrumb" className="bg-light py-2">
        <div className="container">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <div className="spinner-border spinner-border-sm text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </li>
          </ol>
        </div>
      </nav>
    );
  }

  if (breadcrumb.length === 0) {
    return null;
  }

  return (
    <nav aria-label="breadcrumb" className="bg-light py-2">
      <div className="container">
        <ol className="breadcrumb mb-0">
          {breadcrumb.map((item, index) => (
            <li key={index} className={`breadcrumb-item ${item.isActive ? 'active' : ''}`}>
              {item.isActive ? (
                <span>{item.name}</span>
              ) : (
                <a href={item.url} className="text-decoration-none text-primary">
                  {item.name}
                </a>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default SeoBreadcrumb;
