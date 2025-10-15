import React from "react";
import { Pagination } from "../Panigation";
import { useAppliedProducts } from "../../../hook/useAppliedProducts";

export const AppliedProductsModal = ({ period, rows, loading, error, onClose, onChangeRows, onSave, embedded }) => {
  const {
    voucherType,
    voucherValue,
    voucherMax,
    voucherMinOrder,
    searchText,
    statusFilter,
    currentPageRows,
    filteredRows,
    preview,
    setVoucherType,
    setVoucherValue,
    setVoucherMax,
    setVoucherMinOrder,
    setSearchText,
    setStatusFilter,
    setCurrentPageRows,
    getProductId,
    getProductName,
    getSku,
    getPrice,
    getQuantity,
    getPercentage,
    applyAll,
    updateProductPercentage,
    toggleProductInclusion,
  } = useAppliedProducts(rows);
  const Header = (
    <div className="d-flex justify-content-between align-items-center">
      <h5 className="modal-title">
        Sản phẩm áp dụng - {period?.discount_period_name || period?.discount_period_code}
      </h5>
      <div className="d-flex gap-2">
        <button type="button" className="btn btn-outline-primary" onClick={()=>onSave?.()}>Lưu cấu hình tạm</button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>{embedded ? 'Quay lại' : 'Đóng'}</button>
      </div>
    </div>
  );

  const Body = (
    <>
            {error && (

              <div className="alert alert-danger" role="alert">{error}</div>
            )}
            {loading ? (
              <div className="text-center py-4">Đang tải...</div>
            ) : (
              <div className="table-responsive">
                <div className="d-flex gap-2 mb-2 align-items-end">
                  <div className="flex-grow-1">
                    <label className="form-label">Tìm sản phẩm</label>
                    <input className="form-control" placeholder="Tìm theo mã, tên, SKU" value={searchText} onChange={(e)=>setSearchText(e.target.value)} />
                  </div>
                  <div>
                    <label className="form-label">Trạng thái</label>
                    <select className="form-select" value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value)}>
                      <option value="all">Tất cả</option>
                      <option value="applied">Đã áp dụng</option>
                      <option value="not_applied">Chưa áp dụng</option>
                    </select>
                  </div>
                  <div className="d-flex gap-2">
                    <button type="button" className="btn btn-sm btn-outline-success" onClick={()=>applyAll(true, onChangeRows)}>Áp dụng tất cả</button>
                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={()=>applyAll(false, onChangeRows)}>Bỏ áp dụng tất cả</button>
                  </div>
                </div>
                 <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>Mã SP</th>
                      <th>Tên sản phẩm</th>
                      <th>SKU</th>
                      <th>Giá</th>
                      <th>Số lượng</th>
                      <th>Giá trị (%)</th>
                      <th>Giảm (đ)</th>
                      <th>Thành tiền</th>
                       <th>Áp dụng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="text-center text-muted">Không có sản phẩm</td>
                      </tr>
                    ) : (
                      (currentPageRows.length ? currentPageRows : filteredRows.slice(0,10)).map((r, idx) => {
                        const qty = getQuantity(r);
                        const price = getPrice(r);
                        const pct = getPercentage(r);
                        const subtotal = price * qty;
                        const lineDiscount = r.included===false ? 0 : Math.round(subtotal * (pct/100));
                        const lineTotal = subtotal - lineDiscount;
                        return (
                          <tr key={`${getProductId(r)}-${idx}`}>
                            <td>{getProductId(r)}</td>
                            <td>{getProductName(r)}</td>
                            <td>{getSku(r)}</td>
                            <td>{price.toLocaleString('vi-VN')}đ</td>
                            <td>{qty}</td>
                            <td>
                              <input type="number" className="form-control form-control-sm" value={pct} onChange={(e)=>{
                                const val = Number(e.target.value)||0;
                                updateProductPercentage(getProductId(r), val, onChangeRows);
                              }} />
                            </td>
                            <td>{lineDiscount.toLocaleString('vi-VN')}đ</td>
                            <td>{lineTotal.toLocaleString('vi-VN')}đ</td>
                            <td>
                              <input type="checkbox" className="form-check-input" checked={r.included!==false} 
                              onChange={(e)=>{
                                const checked = e.target.checked;
                                toggleProductInclusion(getProductId(r), checked, onChangeRows);
                              }} />
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
                <Pagination filteredProducts={filteredRows} onPageChange={setCurrentPageRows} />
                <div className="row g-2 mt-3">
                  <div className="col-md-3">
                    <label className="form-label">Loại voucher</label>
                    <select className="form-select" value={voucherType} onChange={(e)=>setVoucherType(e.target.value)}>
                      <option value="percent">Phần trăm</option>
                      <option value="fixed">Tiền mặt</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Giá trị</label>
                    <input type="number" className="form-control" value={voucherValue} onChange={(e)=>setVoucherValue(e.target.value)} />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Tối đa (đ)</label>
                    <input type="number" className="form-control" value={voucherMax ?? ''} onChange={(e)=>setVoucherMax(e.target.value||null)} />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">ĐK tối thiểu (đ)</label>
                    <input type="number" className="form-control" value={voucherMinOrder ?? ''} onChange={(e)=>setVoucherMinOrder(e.target.value||null)} />
                  </div>
                </div>
                <div className="mt-3">
                  <div>Tạm tính: <strong>{preview.subtotal.toLocaleString('vi-VN')}đ</strong></div>
                  <div>Giảm theo SP: <strong>-{preview.discount.toLocaleString('vi-VN')}đ</strong></div>
                  <div>Giảm voucher: <strong>-{preview.voucherDiscount.toLocaleString('vi-VN')}đ</strong></div>
                  <div>Thanh toán: <strong>{preview.grandTotal.toLocaleString('vi-VN')}đ</strong></div>
                </div>
              </div>
            )}
    </>
  );

  if (embedded) {
    return (
      <div className="card">
        <div className="card-header">
          {Header}
        </div>
        <div className="card-body">
          {Body}
        </div>
      </div>
    );
  }

  return (
    <div className="modal fade show" style={{display: 'block'}}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <div className="d-flex">
              <aaaa>ddddddddddd</aaaa>
            </div>
            {Header}
          </div>
          <div className="modal-body">
            {Body}
          </div>
        </div>
      </div>
    </div>
  );
};


