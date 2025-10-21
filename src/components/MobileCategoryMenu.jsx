import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoryService } from '../services/CateService';
import { generateCategoryUrl } from '../utils/seoUtils';
import '../css/client/category-menu.css';

const MobileCategoryMenu = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [breadcrumb, setBreadcrumb] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const categoryData = await categoryService.getCategoryHierarchy();
        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setBreadcrumb(prev => [...prev, category]);
  };

  const handleBack = () => {
    if (breadcrumb.length > 0) {
      const newBreadcrumb = breadcrumb.slice(0, -1);
      setBreadcrumb(newBreadcrumb);
      setSelectedCategory(newBreadcrumb.length > 0 ? newBreadcrumb[newBreadcrumb.length - 1] : null);
    } else {
      setSelectedCategory(null);
    }
  };

  const handleClose = () => {
    setSelectedCategory(null);
    setBreadcrumb([]);
    onClose();
  };

  const renderCategoryList = (categoryList, isSubcategory = false) => {
    return (
      <div className="mobile-category-list">
        {!isSubcategory && (
          <div className="category-header">
            <h5>Danh mục sản phẩm</h5>
            <button className="btn-close" onClick={handleClose}>
              <i className="fa fa-times"></i>
            </button>
          </div>
        )}
        
        {isSubcategory && (
          <div className="category-header">
            <button className="btn-back" onClick={handleBack}>
              <i className="fa fa-arrow-left"></i>
            </button>
            <h5>{selectedCategory?.name}</h5>
            <button className="btn-close" onClick={handleClose}>
              <i className="fa fa-times"></i>
            </button>
          </div>
        )}

        <div className="category-items">
          {isSubcategory && selectedCategory && (
            <Link 
              to={generateCategoryUrl(selectedCategory)} 
              className="category-item parent-category"
              onClick={handleClose}
            >
              <span className="category-name">Tất cả {selectedCategory.name}</span>
            </Link>
          )}
          
          {categoryList.map((category) => (
            <div 
              key={category.id} 
              className="category-item"
              onClick={() => {
                if (category.children && category.children.length > 0) {
                  handleCategorySelect(category);
                } else {
                  handleClose();
                }
              }}
            >
              <span className="category-name">{category.name}</span>
              {category.children && category.children.length > 0 ? (
                <i className="fa fa-chevron-right"></i>
              ) : (
                <Link 
                  to={generateCategoryUrl(category)} 
                  className="category-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <i className="fa fa-external-link-alt"></i>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="mobile-category-overlay">
      <div className="mobile-category-menu">
        {loading ? (
          <div className="category-loading">
            <i className="fa fa-spinner fa-spin"></i>
            <p>Đang tải danh mục...</p>
          </div>
        ) : (
          <>
            {!selectedCategory ? (
              renderCategoryList(categories)
            ) : (
              renderCategoryList(selectedCategory.children || [], true)
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MobileCategoryMenu;
