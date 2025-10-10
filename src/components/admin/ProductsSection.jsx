import { ItemProducts } from "./ItemProduct/Itemproduct";
import { Pagination } from "./Panigation";
import { DiscountPeriods } from "./ItemProduct/FormDiscountPeroid";
import FormDetailProduct from "./ItemProduct/Formdetailproduct";
import { useProductsSection } from "../../hook/useProduct";
import { getCategoryName } from "../../Util/ProductUtil";
import {ProductFilter} from "../Filter/ProductFilter";
import { useState } from "react";
import { Product } from "../../entity/Object/Product";
import { ProductVariantGroup } from "../../entity/Object/ProductVariantGroup";
const ProductsSection = ({ Listproducts }) => {
  const {
    products,
    categories,
    filters,
    filteredProducts,
    featuredProducts,
    showFormDetail,
    editingProduct,
    showProductDiscountModal,
    productDiscountFormData,
    productDiscounts,
    selectedProductForDiscount,
    setFilters,
    setShowFormDetail,
    setEditingProduct,
    handleFormSubmit,
    handleEditProduct,
    handleDelete,
    toggleFeaturedProduct,
    handleAddProductDiscount,
    handleRemoveProductDiscount,
    handleProductDiscountInputChange,
    handleOpenProductDiscountModal,
    handleCloseProductDiscountModal,
  } = useProductsSection(Listproducts);
  const [currentPageProducts, setCurrentPageProducts] = useState([]);
  return (
    <div>
      {showFormDetail ? (
        <FormDetailProduct
          product={editingProduct}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowFormDetail(false)}
          categories={categories}
        />
      ) : (
        <>
          <div className="header d-flex justify-content-between align-items-center">
            <h4>Quản lý Sản phẩm</h4>
            <button
              className="btn btn-success"
              onClick={() => {
                setEditingProduct(null);
                setShowFormDetail(true);
              }}
            >
              <i className="fas fa-plus"></i> Thêm sản phẩm
            </button>
          </div>

          <div className="card mt-3">
            <div className="card-body">
              <ProductFilter products={products} filters={filters} onFilterChange={setFilters}/>
              <table className="table table-hover text-center align-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Hình ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Danh mục</th>
                    <th>Giá</th>
                    <th>Tồn kho</th>
                    <th>Trạng thái</th>
                    <th>Nổi bật</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <ItemProducts
                        key={product.id}
                        product={product}
                        handleDelete={handleDelete}
                        handleEdit={handleEditProduct}
                        getCategoryName={(id) => getCategoryName(categories, id)}
                        isFeatured={featuredProducts.includes(product.id)}
                        onToggleFeatured={toggleFeaturedProduct}
                        onManageDiscount={() =>
                          handleOpenProductDiscountModal(product)
                        }
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9">
                        <h5 className="text-muted">Không có sản phẩm nào</h5>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <Pagination filteredProducts={products} onPageChange={setCurrentPageProducts} />
            </div>
          </div>
        </>
      )}

      <DiscountPeriods
        showProductDiscountModal={showProductDiscountModal}
        setShowProductDiscountModal={handleCloseProductDiscountModal}
        handleAddProductDiscount={handleAddProductDiscount}
        productDiscountFormData={productDiscountFormData}
        handleProductDiscountInputChange={handleProductDiscountInputChange}
        productDiscounts={productDiscounts}
        handleRemoveProductDiscount={handleRemoveProductDiscount}
        selectedProductForDiscount={selectedProductForDiscount}
      />
    </div>
  );
};

export default ProductsSection;
