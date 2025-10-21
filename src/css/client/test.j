/* Category Menu Styles */

/* Main category menu */
.category-menu {
    display: flex;
    flex-direction: column;
}

.category-menu .nav-item {
    position: relative;
}

.category-menu .nav-item:hover .item_small {
    display: block;
}

/* Submenu styles */
.item_small {
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    min-width: 200px;
    z-index: 1000;
    display: none;
    padding: 8px 0;
}

.item_small li {
    list-style: none;
    margin: 0;
}

.item_small .caret-down {
    display: block;
    padding: 8px 16px;
    color: #333;
    text-decoration: none;
    transition: all 0.3s ease;
    border-bottom: 1px solid #f8f9fa;
}

.item_small .caret-down:hover {
    background-color: #f8f9fa;
    color: #007bff;
    text-decoration: none;
}

.item_small .caret-down:last-child {
    border-bottom: none;
}

/* Nested submenu */
.sub-menu {
    position: absolute;
    left: 100%;
    top: 0;
    background: white;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    min-width: 180px;
    z-index: 1001;
    display: none;
    padding: 8px 0;
}

.nav-item:hover .sub-menu {
    display: block;
}

/* Category dropdown for mobile */
.category-dropdown {
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    max-height: 400px;
    overflow-y: auto;
}

.category-header {
    padding: 16px;
    border-bottom: 1px solid #e9ecef;
    display: flex;
    align-items: center;
    gap: 12px;
}

.category-header h5 {
    margin: 0;
    color: #333;
    font-size: 16px;
    font-weight: 600;
}

.btn-back {
    background: none;
    border: none;
    color: #007bff;
    font-size: 16px;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.btn-back:hover {
    background-color: #f8f9fa;
}

.category-items {
    padding: 8px 0;
}

.category-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    color: #333;
    text-decoration: none;
    transition: all 0.3s ease;
    border-bottom: 1px solid #f8f9fa;
}

.category-item:hover {
    background-color: #f8f9fa;
    color: #007bff;
    text-decoration: none;
}

.category-item:last-child {
    border-bottom: none;
}

.category-item.parent-category {
    background-color: #e3f2fd;
    font-weight: 600;
}

.category-item.parent-category:hover {
    background-color: #bbdefb;
}

.category-name {
    flex: 1;
}

/* Loading states */
.dropdown-loading {
    padding: 20px;
    text-align: center;
    color: #6c757d;
}

.dropdown-loading i {
    margin-right: 8px;
}

/* Error states */
.text-danger {
    color: #dc3545 !important;
}

.text-muted {
    color: #6c757d !important;
}

/* Responsive design */
@media (max-width: 768px) {
    .item_small {
        position: static;
        display: block;
        box-shadow: none;
        border: none;
        background: #f8f9fa;
        margin-top: 8px;
        border-radius: 4px;
    }

    .sub-menu {
        position: static;
        display: block;
        box-shadow: none;
        border: none;
        background: #e9ecef;
        margin-top: 8px;
        border-radius: 4px;
    }

    .category-dropdown {
        max-height: 300px;
    }
}

/* Animation for smooth transitions */
.item_small {
    animation: fadeInDown 0.3s ease;
}

.sub-menu {
    animation: fadeInRight 0.3s ease;
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInRight {
    from {
        opacity: 0;
        transform: translateX(-10px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* Hover effects */
.nav-item:hover .a-img {
    color: #007bff;
}

.nav-item:hover .fa-caret-down {
    transform: rotate(180deg);
    transition: transform 0.3s ease;
}

/* Active states */
.nav-item.active .a-img {
    color: #007bff;
    font-weight: 600;
}

/* Icon styles */
.fa-caret-down,
.fa-caret-right {
    transition: all 0.3s ease;
    margin-left: 8px;
}

.fa-chevron-right {
    color: #6c757d;
    font-size: 12px;
}

/* Custom scrollbar for dropdown */
.category-dropdown::-webkit-scrollbar {
    width: 6px;
}

.category-dropdown::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

.category-dropdown::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
}

.category-dropdown::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}

/* Mobile Category Menu */
.mobile-category-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 60px;
}

.mobile-category-menu {
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    max-width: 90%;
    width: 400px;
    max-height: 80vh;
    overflow: hidden;
    animation: slideInDown 0.3s ease;
}

@keyframes slideInDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.mobile-category-list {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.mobile-category-list .category-header {
    padding: 16px 20px;
    border-bottom: 1px solid #e9ecef;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f8f9fa;
    flex-shrink: 0;
}

.mobile-category-list .category-header h5 {
    margin: 0;
    color: #333;
    font-size: 18px;
    font-weight: 600;
    flex: 1;
    text-align: center;
}

.btn-close {
    background: none;
    border: none;
    color: #6c757d;
    font-size: 18px;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.3s ease;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-close:hover {
    background-color: #e9ecef;
    color: #333;
}

.mobile-category-list .category-items {
    flex: 1;
    overflow-y: auto;
    padding: 8px 0;
}

.mobile-category-list .category-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    color: #333;
    text-decoration: none;
    transition: all 0.3s ease;
    border-bottom: 1px solid #f8f9fa;
    cursor: pointer;
}

.mobile-category-list .category-item:hover {
    background-color: #f8f9fa;
    color: #007bff;
}

.mobile-category-list .category-item:last-child {
    border-bottom: none;
}

.mobile-category-list .category-item.parent-category {
    background-color: #e3f2fd;
    font-weight: 600;
}

.mobile-category-list .category-item.parent-category:hover {
    background-color: #bbdefb;
}

.mobile-category-list .category-name {
    flex: 1;
    font-size: 16px;
}

.mobile-category-list .fa-chevron-right {
    color: #6c757d;
    font-size: 14px;
}

.category-link {
    color: #007bff;
    text-decoration: none;
    padding: 4px;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.category-link:hover {
    background-color: #e3f2fd;
    color: #0056b3;
}

.category-loading {
    padding: 40px 20px;
    text-align: center;
    color: #6c757d;
}

.category-loading i {
    font-size: 24px;
    margin-bottom: 12px;
    display: block;
}

.category-loading p {
    margin: 0;
    font-size: 16px;
}

/* Mobile responsive adjustments */
@media (max-width: 480px) {
    .mobile-category-overlay {
        padding-top: 40px;
    }

    .mobile-category-menu {
        max-width: 95%;
        width: 100%;
        margin: 0 10px;
    }

    .mobile-category-list .category-header {
        padding: 12px 16px;
    }

    .mobile-category-list .category-header h5 {
        font-size: 16px;
    }

    .mobile-category-list .category-item {
        padding: 14px 16px;
    }

    .mobile-category-list .category-name {
        font-size: 15px;
    }
}