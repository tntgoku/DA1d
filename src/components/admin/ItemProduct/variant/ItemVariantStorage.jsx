// src/components/Variant/ItemVariantStorage.jsx
import { useState } from "react";
import { formatPrice } from "../../../../entity/Entity";
export const ItemVariantStorage = ({idcolor,key, variant, handleRemoveVariantstorage,updateVariantField }) => {
const [color,setcolor]=useState(variant.storage);

  return (
    <div
      className="col-md-12 d-flex flex-row variant-product justify-content-start align-items-start border-top py-2"
      style={{ gap: "8px" }}
    >
      {/* Tên */}
      <div className="flex-fill">
        <label htmlFor="" keyid={key}>Tên</label>
        <input type="text" name="idvariant" hidden defaultValue={variant.variantId} />
        <input
          type="text"
          name="storage"
          className="form-control"
          placeholder="VD: Dung lượng 256GB"
          defaultValue={color}
          onChange={(e)=>{
            console.log("Here",e.target.value);
            setcolor(e.target.value);
            updateVariantField(idcolor,"storage",e.target.value,variant.variantId)}}
        />
      </div>

      {/* Giá */}
      <div className="flex-fill">
        <label htmlFor="">Giá (VNĐ)</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={variant.list_price|| 0}
          onChange={(e)=>{updateVariantField(idcolor,"list_price",e.target.value,variant.variantId)}}
        />
      </div>

      {/* Giá gốc */}
      <div className="flex-fill">
        <label htmlFor="">Giá gốc (VNĐ)</label>
        <input
          type="number"
          name="cost_price"
          className="form-control"
          value={variant.price}
          onChange={(e)=>{
            console.log(e.target.value);
            updateVariantField(idcolor,"price",e.target.value,variant.variantId)}}
        />
      </div>

      {/* Tồn kho */}
      <div className="flex-fill">
        <label htmlFor="">Tồn kho</label>
        <div className="input-group mb-3">
          <input
            type="number"
            className="form-control"
            name="inventory"
            placeholder="Số lượng tồn kho"
            value={variant.stock || 0}
            onChange={(e)=>{updateVariantField(idcolor,"stock",e.target.value,variant.variantId)}}
          />
          <button
            className="btn btn-outline-danger"
            type="button"
            onClick={() => handleRemoveVariantstorage(idcolor,variant.variantId)}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
