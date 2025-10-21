// ItemOrder.jsx

import React from 'react';

export const ItemOrder = ({
  item,
  index,
  allVariants,
  selectedVariant,
  handleVariantItemChange,
  handleInputChange,
  getVariantById,
  calculateItemTotal,
  formData,
  removeVariantItem,
  isRemovable,
}) => {

  const storageDisplay = selectedVariant?.storage 
    && selectedVariant.storage !== 'undefined' 
    && selectedVariant.storage !== null 
    ? `| Dung lượng: ${selectedVariant.storage}` 
    : '';
  console.log("Item:", item); // Commented out to reduce renders
  return (
    <tr key={index}>
      <td>
        <select
          className="form-select"
          value={item?.object?.variantId || ''}
          onChange={(e) => {
            const variantId = e.target.value;
            handleVariantItemChange(index, 'variantId', variantId, formData, handleInputChange);
          }}
          required
        >
          <option value="">Chọn biến thể sản phẩm</option>
          {allVariants.map(variant => (
            <option key={variant.variantId} value={variant.variantId}>
              {variant.nameVariants}
            </option>
          ))}
        </select>
        {item?.object && (
          <div className="form-text">
            <small className="text-muted">
              Sản phẩm: {item?.object?.nameVariants || item?.object?.sku || 'N/A'} 
              | Màu: {item?.object?.variantStorage?.color || item?.object?.color || 'N/A'} 
              {item.object.variantStorage?.storage && ` | Dung lượng: ${item.object.variantStorage.storage}`}
              <br/>
              SKU: {item.object.variantStorage?.sku || item.object.sku || 'N/A'}
            </small>
          </div>
        )}
      </td>
      <td>
        <div className="form-control-plaintext">
          {item?.object?.list_price ? 
            new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item?.object?.list_price*(1-item?.object?.discount/100)) :
            'Chưa chọn sản phẩm'
          }
        </div>
        {selectedVariant && (
          <div className="form-text">
            <small className="text-muted">
              Giá gốc: {selectedVariant.list_price?.toLocaleString('vi-VN')}đ
              {`${(selectedVariant.list_price ?? null) === null ? 
    '' : 
               `${(selectedVariant.list_price === undefined)}`? ``:`| Giá sale: ${selectedVariant.sale_price?.toLocaleString('vi-VN')}đ`}`}
              <br/> {`${(selectedVariant.stock ?? null) === null ? 
    '' : 
    `Tồn kho: ${selectedVariant.stock}`}`}
            </small>
          </div>
        )}
      </td>
      <td>
        <input
          type="number"
          className="form-control"
          value={item?.quantity}
          onChange={(e) => handleVariantItemChange(index, 'quantity', e.target.value, formData, handleInputChange)}
          required
          min="1"
          max={selectedVariant?.stock || 99}
        />
        {selectedVariant && (
          <div className="form-text">
            <small className="text-muted">
              Tối đa: {selectedVariant?.stock} sản phẩm
            </small>
          </div>
        )}
      </td>
      <td className="align-middle">
        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
          (item?.object?.list_price*(1-item?.object?.discount/100) || 0) * (item?.quantity || 1)
        )}
      </td>
      <td className="align-middle">
        <button
          type="button"
          className="btn btn-sm btn-outline-danger"
          onClick={() => removeVariantItem(index, formData, handleInputChange)}
          disabled={!isRemovable}
        >
          <i className="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  );
};

export default ItemOrder;