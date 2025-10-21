import { DiscountService } from "../../services/DiscountService";
import { useState, useEffect } from "react";
import { useDiscountCampaign } from "../../hooks/useDiscount/useDiscountCampaign";
import { CampaignEditModal } from "./CampaignEditModal";
import { DiscountModalEdit } from "./modals/DiscountModalEdit";
import { 
  getDiscountTypeText, 
  getStatusBadge, 
  formatValue, 
  formatDate, 
  filterCampaigns, 
  filterVouchers 
} from "../../utils/discountUtils";
import { useDiscountManagement } from "../../hooks/useDiscount/useDiscountManagement";

export const DiscountsSection = () => {
  const [activeTab, setActiveTab] = useState('discounts');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFormDetail, setShowFormDetail] = useState(false);
  
  // Use discount campaign hook
  const {
    editingCampaign,
    loading: modalLoading,
    error: modalError,
    products,
    categories,
    variants,
    selectedProducts,
    selectedCategories,
    selectedVariants,
    formData,
    handleEditCampaign,
    handleCloseModal,
    handleCloseFormDetail,
    handleSaveCampaign,
    handleInputChange,
    handleProductToggle,
    handleCategoryToggle,
    handleVariantToggle,
    handleSelectAllProducts,
    handleSelectAllCategories,
    handleSelectAllVariants,
    setError: setModalError
  } = useDiscountCampaign();

const {
  showEditModal,
  discounts,
  vouchers,
  loading,
  error,
  setDiscounts,
  setVouchers,
  setError,
  setLoading,
  handleEditVoucher,
  setShowEditModal,
  editingVoucher,
  formDataVoucher,
  defaultFormDataVoucher,
  setFormDataVoucher,
  handleInputChangeVoucher,
  handleSaveVoucherWithRefresh
} = useDiscountManagement();
  // Filter data based on search term using utils
  const filteredDiscounts = filterCampaigns(discounts, searchTerm);
  const filteredVouchers = filterVouchers(vouchers, searchTerm);

  // Enhanced save handler with refresh
  const handleSaveCampaignWithRefresh = async () => {
    const success = await handleSaveCampaign();
    if (success) {
      // Refresh data after successful save
      const [campaignsData, vouchersData] = await Promise.all([
        DiscountService.getAllDiscountCampaigns(),
        DiscountService.getAllVouchers()
      ]);
      setDiscounts(Array.isArray(campaignsData) ? campaignsData : []);
      setVouchers(Array.isArray(vouchersData) ? vouchersData : []);
      // Close form detail
      setShowFormDetail(false);
      handleCloseFormDetail();
    }
  };


  // Show loading state
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Đang tải dữ liệu khuyến mãi...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Lỗi tải dữ liệu!</h4>
        <p>{error}</p>
        <hr />
        <p className="mb-0">
          <button 
            className="btn btn-outline-danger" 
            onClick={() => window.location.reload()}
          >
            Thử lại
          </button>
        </p>
      </div>
    );
  }

  return (
    <div>
      {showFormDetail ? (
        <CampaignEditModal
          show={true}
          onClose={() => {
            setShowFormDetail(false);
            handleCloseFormDetail();
          }}
          onSave={handleSaveCampaignWithRefresh}
          campaign={editingCampaign}
          products={products}
          categories={categories}
          variants={variants}
          selectedProducts={selectedProducts}
          selectedCategories={selectedCategories}
          selectedVariants={selectedVariants}
          formData={formData}
          onInputChange={handleInputChange}
          onProductToggle={handleProductToggle}
          onCategoryToggle={handleCategoryToggle}
          onVariantToggle={handleVariantToggle}
          onSelectAllProducts={handleSelectAllProducts}
          onSelectAllCategories={handleSelectAllCategories}
          onSelectAllVariants={handleSelectAllVariants}
          loading={modalLoading}
          error={modalError}
        />
      ) : (
        <>
          <div className="header d-flex justify-content-between align-items-center">
            <h4>Quản lý Chiến dịch & Voucher</h4>
            <button
              className="btn btn-success"
              onClick={() => {
                handleEditCampaign(null);
                setShowFormDetail(true);
              }}
            >
              <i className="fas fa-plus"></i> Thêm chiến dịch
            </button>
          </div>

        <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header" style={{display: 'flex', gap: 25, alignItems: 'center', justifyContent: 'space-between'}}>
              <span>Danh sách Chiến dịch giảm giá & Voucher</span>
              <div className="search-match">
                <form className="input-groups1">
                  <input 
                    className="input-group-field auto-search search-auto form-control" 
                    placeholder="Tìm kiếm chiến dịch hoặc voucher..." 
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
            </div>
            <div className="card-body">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'discounts' ? 'active' : ''}`}
                    onClick={() => setActiveTab('discounts')}
                  >
                    Chiến dịch giảm giá
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'vouchers' ? 'active' : ''}`}
                    onClick={() => setActiveTab('vouchers')}
                  >
                    Voucher
                  </button>
                </li>
              </ul>

              <div className="tab-content mt-3" style={{display:"block "}}>
                {/* Campaigns Tab */}
                {activeTab === 'discounts' && (
                  <div className="tab-pane fade show active">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Tên chiến dịch</th>
                            <th>Loại</th>
                            <th>Giá trị</th>
                            <th>Target</th>
                            <th>Thời gian</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                          </tr>
                        </thead>
                        <tbody className='table table-responsive  text-center align-middle'>
                          {filteredDiscounts.map(campaign => (
                            <tr key={campaign.campaignId}>
                              <td>
                                <strong>{campaign.campaignId || '---'}</strong>
                              </td>
                              <td>{campaign.campaignName || '---'}</td>
                              <td>{campaign.campaignType || '---'}</td>
                              <td>
                                {campaign.value ? 
                                  (campaign.discountType === 'PERCENTAGE' || campaign.discountType === 'percentage' ? 
                                    `${campaign.value}%` : 
                                    `${campaign.value.toLocaleString()}đ`
                                  ) : '---'}
                                {campaign.maxDiscount && (
                                  <div>
                                    <small className="text-muted">
                                      Tối đa: {campaign.maxDiscount.toLocaleString()}đ
                                    </small>
                                  </div>
                                )}
                              </td>
                              <td>{campaign.targetType || '---'}</td>
                              <td>
                                <small>
                                  <div>Từ: {formatDate(campaign.startDate)}</div>
                                  <div>Đến: {formatDate(campaign.endDate)}</div>
                                </small>
                              </td>
                              <td className="handle-btn text-center align-middle">
                                {getStatusBadge(campaign.isActive, campaign.isActive)}
                              </td>
                              <td className="handle-btn text-center align-middle">
                                 <div className="d-flex justify-content-center align-items-center gap-2" style={{color:'black'}}>
                                <button 
                                  className="btn btn-sm btn-outline-primary me-1"
                                  onClick={() => {
                                    handleEditCampaign(campaign);
                                    setShowFormDetail(true);
                                  }}
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button 
                                  className="btn btn-sm btn-outline-danger"
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

                {/* Vouchers Tab */}
                {activeTab === 'vouchers' && (
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
                        <tbody className='table table-responsive text-center align-middle'>
                          {filteredVouchers.map(voucher => (
                            <tr key={voucher.id}>
                              <td>
                                <strong>{voucher.code || voucher.discount_code || '---'}</strong>
                              </td>
                              <td>{voucher.name || voucher.discount_name || '---'}</td>
                              <td>{getDiscountTypeText(voucher.type)}</td>
                              <td>
                                {voucher.value ? 
                                  (voucher.type === 0 || voucher.type === 'percentage' || voucher.discountType === 'PERCENTAGE' ? 
                                    `${voucher.value}%` : 
                                    `${voucher.value.toLocaleString()}đ`
                                  ) : '---'}
                                {voucher.maxDiscount && (
                                  <div>
                                    <small className="text-muted">
                                      Tối đa: {voucher.maxDiscount.toLocaleString()}đ
                                    </small>
                                  </div>
                                )}
                              </td>
                              <td>{voucher.quantity || 0}</td>
                              <td>
                                <small>
                                  <div>Từ: {formatDate(voucher.startDate || voucher.start_time)}</div>
                                  <div>Đến: {formatDate(voucher.endDate || voucher.end_time)}</div>
                                </small>
                              </td>
                              <td className="handle-btn text-center align-middle">
                                {getStatusBadge(voucher.status, voucher.isActive)}
                              </td>
                              <td className="handle-btn text-center align-middle">
                                 <div className="d-flex justify-content-center align-items-center gap-2" style={{color:'black'}}>
                                <button 
                                  className="btn btn-sm btn-outline-primary me-1"
                                  onClick={() => {
                                    handleEditVoucher(voucher.id);
                                    setShowEditModal(true);
                                  }}
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button 
                                  className="btn btn-sm btn-outline-danger"
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
        </>
        
      )}
      {showEditModal && (
        <DiscountModalEdit
          show={true}
          onClose={() => {
            setShowEditModal(false);
          }}
          formData={formDataVoucher}
          handleInputChange={handleInputChangeVoucher}
          editingDiscount={editingVoucher}
          handleSubmit={handleSaveVoucherWithRefresh}
          // onSave={handleSaveVoucherWithRefresh}
        />
      )}
    </div>
  );
};