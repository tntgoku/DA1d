import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoryService } from '../services/CateService';
import { generateCategoryUrl } from '../utils/seoUtils';
import '../css/client/category-menu.css';

const CategoryMenu = ({ className = "", showLoading = true }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const categoryData = await categoryService.getCategoryHierarchy();
        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Không thể tải danh mục');
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const renderCategoryItem = (category, level = 0) => {
    const hasChildren = category.children && category.children.length > 0;
    const isParent = level === 0;
    
    return (
      <li key={category.id} className="nav-item">
        <Link 
          to={generateCategoryUrl(category)} 
          className={isParent ? "a-img" : "caret-down"} 
          title={category.name}
        >
          {category.name}
        </Link>
        
        {hasChildren && (
          <>
            {isParent && <i className="fa fa-caret-down item-rote"></i>}
            {!isParent && <i className="fa fa-caret-right"></i>}
            
            <ul className={isParent ? "item_small" : "sub-menu"}>
              {category.children.map((child) => renderCategoryItem(child, level + 1))}
            </ul>
          </>
        )}
      </li>
    );
  };

  if (loading && showLoading) {
    return (
      <li className="nav-item">
        <span className="a-img">
          <i className="fa fa-spinner fa-spin"></i> Đang tải...
        </span>
      </li>
    );
  }

  if (error) {
    return (
      <li className="nav-item">
        <span className="a-img text-danger">
          <i className="fa fa-exclamation-triangle"></i> {error}
        </span>
      </li>
    );
  }

  if (categories.length === 0) {
    return (
      <li className="nav-item">
        <span className="a-img text-muted">Không có danh mục</span>
      </li>
    );
  }

  return (
    <>
      {categories.map((category) => renderCategoryItem(category))}
    </>
  );
};

// Component cho dropdown menu nhỏ (mobile)
export const CategoryDropdown = ({ className = "" }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

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

    fetchCategories();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  if (loading) {
    return (
      <div className={`category-dropdown ${className}`}>
        <div className="dropdown-loading">
          <i className="fa fa-spinner fa-spin"></i> Đang tải danh mục...
        </div>
      </div>
    );
  }

  return (
    <div className={`category-dropdown ${className}`}>
      {!selectedCategory ? (
        <div className="category-list">
          <div className="category-header">
            <h5>Danh mục sản phẩm</h5>
          </div>
          <div className="category-items">
            {categories.map((category) => (
              <div 
                key={category.id} 
                className="category-item"
                onClick={() => handleCategorySelect(category)}
              >
                <span className="category-name">{category.name}</span>
                {category.children && category.children.length > 0 && (
                  <i className="fa fa-chevron-right"></i>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="subcategory-list">
          <div className="category-header">
            <button className="btn-back" onClick={handleBack}>
              <i className="fa fa-arrow-left"></i>
            </button>
            <h5>{selectedCategory.name}</h5>
          </div>
          <div className="category-items">
            <Link 
              to={generateCategoryUrl(selectedCategory)} 
              className="category-item parent-category"
            >
              <span className="category-name">Tất cả {selectedCategory.name}</span>
            </Link>
            {selectedCategory.children && selectedCategory.children.map((child) => (
              <Link 
                key={child.id} 
                to={generateCategoryUrl(child, selectedCategory)} 
                className="category-item"
              >
                <span className="category-name">{child.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryMenu;
