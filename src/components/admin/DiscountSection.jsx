import { AppliedProductsModal } from "./modals/AppliedProductsModal";
import { AdvancedRulesModal } from "./modals/AdvancedRulesModal";
import { useDiscountManagement } from "../../hook/useDiscountManagement";
// import { PeroidModalEdit } from "./modals/PeriodModalEdit";
import { DiscountModalEdit } from "./modals/DiscountModalEdit";
import {  PeriodModalFrom } from "./modals/PeriodModal";
import { EmbeddedPeriodForm } from "./modals/EmbeddedPeriodForm";
export const DiscountsSection = ({ discounts, discountPeriods, products }) => {
  const {
    activeTab,
    showModal,
    showPeriodModal,
    showProductDiscountModal,
    showAdvancedRulesModal,
    embedPeriodView,
    embedAppliedView,
    appliedProducts,
    loadingApplied,
    errorApplied,
    editingDiscount,
    editingPeriod,
    selectedPeriod,
    rulesEditingPeriod,
    searchTerm,
    formData,
    periodFormData,
    filteredDiscounts,
    filteredPeriods,
    setActiveTab,
    setShowModal,
    setShowPeriodModal,
    setShowProductDiscountModal,
    setSearchTerm,
    handleOpenAddModal,
    handleEdit,
    handleDelete,
    handleSubmit,
    handleInputChange,
    handleOpenAddPeriodModal,
    handleEditPeriod,
    handleDeletePeriod,
    handleClosePeriodEmbedded,
    handlePeriodSubmit,
    handlePeriodInputChange,
    handleManageProductDiscount,
    handleChangeAppliedRows,
    handleSaveAppliedRows,
    handleCloseAppliedEmbedded,
    handleOpenAdvancedRules,
    handleSaveAdvancedRules,
    handleCloseAdvancedRules,
    getDiscountTypeText,
    getStatusBadge,
    isDiscountActive,
  } = useDiscountManagement(discounts, discountPeriods, products);

  // Render embedded view only (like ProductsSection toggles)
  if (embedAppliedView) {
    return (
      <div>
        <AppliedProductsModal 
          embedded
          period={selectedPeriod}
          rows={appliedProducts}
          loading={loadingApplied}
          error={errorApplied}
          onClose={handleCloseAppliedEmbedded}
          onChangeRows={handleChangeAppliedRows}
          onSave={handleSaveAppliedRows}
        />
      </div>
    );
  }

  // Show Embedded Period Form view (no popup)
  if (embedPeriodView) {
    return (
    <EmbeddedPeriodForm
      editingPeriod={editingPeriod}
      periodFormData={periodFormData}
      handlePeriodInputChange={handlePeriodInputChange}
      handlePeriodSubmit={handlePeriodSubmit}
      handleClosePeriodEmbedded={handleClosePeriodEmbedded}
    />
    );
  }

  return (
    <div>
      <div className="header d-flex justify-content-between align-items-center">
        <h4>Quản lý Khuyến mãi</h4>
        <div>
          <button className="btn btn-primary me-2 btn-primary-2" onClick={handleOpenAddPeriodModal}>
            <i className="fas fa-calendar-alt"></i> Đợt giảm giá
          </button>
          <button className="btn btn-primary-2 btn-success" onClick={handleOpenAddModal}>
            <i className="fas fa-plus"></i> Thêm mã giảm giá
          </button>
        </div>
        </div>

        <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header" style={{display: 'flex', gap: 25, alignItems: 'center'}}>
              <span>Danh sách Khuyến mãi</span>
              <div className="search-match">
                <form className="input-groups1">
                  <input 
                    className="input-group-field auto-search search-auto form-control" 
                    placeholder="Tìm kiếm mã hoặc tên khuyến mãi..." 
                    autoComplete="off" 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button type="button" className="btn icon-fallback-text" title="Search">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </form>
              </div>
            </div>
            <div className="card-body">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'discounts' ? 'active' : ''}`}
                    onClick={() => setActiveTab('discounts')}
                  >
                    Mã giảm giá
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'periods' ? 'active' : ''}`}
                    onClick={() => setActiveTab('periods')}
                  >
                    Đợt giảm giá
                  </button>
                </li>
              </ul>

              <div className="tab-content mt-3" style={{display:"block "}}>
                {/* Discounts Tab */}
                {activeTab === 'discounts' && (
                  <div className="tab-pane fade show active">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Mã</th>
                            <th>Tên</th>
                            <th>Loại</th>
                            <th>Giá trị</th>
                            <th>Số lượng</th>
                            <th>Thời gian</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                          </tr>
                        </thead>
                        <tbody className='table table-responsive  text-center align-middle'>
                          {filteredDiscounts.map(discount => (
                            <tr key={discount.id}>
                              <td>
                                <strong>{discount.discount_code}</strong>
                                {isDiscountActive(discount) && (
                                  <span className="badge bg-success ms-1">Đang chạy</span>
                                )}
                              </td>
                              <td>{discount.discount_name || '---'}</td>
                              <td>{getDiscountTypeText(discount.type, discount.category)}</td>
                              <td>
                                {discount.type === 0 ? 
                                  `${discount.value}%` : 
                                  `${discount.value.toLocaleString()}đ`
                                }
                                {discount.max_value && (
                                  <div>
                                    <small className="text-muted">
                                      Tối đa: {discount.max_value.toLocaleString()}đ
                                    </small>
                                  </div>
                                )}
                              </td>
                              <td>{discount.quantity}</td>
                              <td>
                                <small>
                                  <div>Từ: {new Date(discount.start_time).toLocaleString('vi-VN')}</div>
                                  <div>Đến: {new Date(discount.end_time).toLocaleString('vi-VN')}</div>
                                </small>
                              </td>
                              <td className=" handle-btn text-center align-middle">
                                {getStatusBadge(discount.status, discount.enable)}
                              </td>
                              <td className="handle-btn text-center align-middle">
                                 <div className="d-flex justify-content-center align-items-center gap-2" style={{color:'black'}}>
                                <button 
                                  className="btn btn-sm btn-outline-primary me-1"
                                  onClick={() => handleEdit(discount)}
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button 
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDelete(discount.id)}
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Discount Periods Tab */}
                {activeTab === 'periods' && (
                  <div className="tab-pane fade show active">
                    <div className="table-responsive">
                      <table className="table table-hover text-center align-middle ">
                        <thead>
                          <tr>
                            <th>Mã đợt</th>
                            <th>Tên đợt</th>
                            <th>Giá trị %</th>
                            <th>Thời gian</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                          </tr>
                        </thead>
                        <tbody className=''>
                          {filteredPeriods.map(period => (
                            <tr key={period.id}>
                              <td>
                                <strong>{period.discount_period_code}</strong>
                              </td>
                              <td>{period.discount_period_name}</td>
                              <td>
                                {period.min_percentage_value && period.max_percentage_value ? 
                                  `${period.min_percentage_value}% - ${period.max_percentage_value}%` :
                                  'Tùy chỉnh'
                                }
                              </td>
                              <td>
                                <small>
                                  <div>Từ: {new Date(period.start_time).toLocaleString('vi-VN')}</div>
                                  <div>Đến: {new Date(period.end_time).toLocaleString('vi-VN')}</div>
                                </small>
                              </td>
                              <td className=" handle-btn text-center align-middle">
                                {period.status === 1 ? 
                                  <span className="badge bg-success">Kích hoạt</span> : 
                                  <span className="badge bg-secondary">Vô hiệu</span>
                                }
                              </td>
                              <td className="handle-btn text-center align-middle">
                                  <div className="d-flex justify-content-center align-items-center gap-2" style={{color:'black'}}>
                                <button 
                                  className="btn btn-sm btn-outline-primary me-1"
                                  onClick={() => handleEditPeriod(period)}
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button 
                                  className="btn btn-sm btn-outline-info me-1"
                                  onClick={() => handleManageProductDiscount(period)}
                                  title="Quản lý sản phẩm"
                                >
                                  <i className="fas fa-box"></i>
                                </button>
                                {/* <button 
                                  className="btn btn-sm btn-outline-success me-1"
                                  onClick={() => handleOpenAdvancedRules(period)}
                                  title="Quy tắc nâng cao"
                                >
                                  <i className="fas fa-cogs"></i>
                                </button> */}
                                <button 
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDeletePeriod(period.id)}
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Thêm/Sửa mã giảm giá */}
      {showModal && (<DiscountModalEdit 
        editingDiscount={editingDiscount}
        formData={formData} handleInputChange={handleInputChange} 
        handleSubmit={handleSubmit}
        onClose={() => setShowModal(false)}
        />

      )}

      {/* // setShowPeriodModal={setShowPeriodModal}
      //  periodFormData={periodFormData} 
      // handlePeriodInputChange={handlePeriodInputChange}
      // editingPeriod={editingPeriod} */}
      {/* Modal Thêm/Sửa đợt giảm giá */}
      {showPeriodModal && ( <PeriodModalFrom
      periodFormData={periodFormData}
      
      editingPeriod={editingPeriod} onChange={handlePeriodInputChange}
      onClose={ () => setShowPeriodModal(false)} 
      onSubmit={handlePeriodSubmit}
      />

      )}

      {/* Modal Xem sản phẩm áp dụng đợt giảm giá */}
      {showProductDiscountModal && (
        <AppliedProductsModal 
          period={selectedPeriod}
          rows={appliedProducts}
          loading={loadingApplied}
          error={errorApplied}
          onClose={() => setShowProductDiscountModal(false)}
          onChangeRows={handleChangeAppliedRows}
          onSave={handleSaveAppliedRows}
        />
      )}

      {/* Modal Quy tắc nâng cao */}
      {/* {showAdvancedRulesModal && (
        <AdvancedRulesModal 
          period={rulesEditingPeriod}
          onClose={handleCloseAdvancedRules}
          onSave={handleSaveAdvancedRules}
        />
      )} */}

    </div>
  );
};