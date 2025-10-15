import React, { useState } from 'react';

/**
 * Modal quản lý các quy tắc giảm giá nâng cao
 */
export const AdvancedRulesModal = ({ period, onClose, onSave }) => {
  const [activeRuleTab, setActiveRuleTab] = useState('tiered');
  const [rules, setRules] = useState({
    tiered_rules: period?.tiered_rules || [],
    buy_x_get_y_rules: period?.buy_x_get_y_rules || [],
    bundle_rules: period?.bundle_rules || [],
    unique_product_rule: period?.unique_product_rule || null,
    gift_rules: period?.gift_rules || [],
    free_shipping_rule: period?.free_shipping_rule || null
  });

  // Tiered Rules (Giảm theo bậc thang)
  const [tieredForm, setTieredForm] = useState({
    min_amount: 0,
    discount_type: 'percent',
    discount_value: 0,
    max_discount: null
  });

  const handleAddTieredRule = () => {
    setRules(prev => ({
      ...prev,
      tiered_rules: [...prev.tiered_rules, { ...tieredForm, id: Date.now() }]
    }));
    setTieredForm({
      min_amount: 0,
      discount_type: 'percent',
      discount_value: 0,
      max_discount: null
    });
  };

  const handleRemoveTieredRule = (index) => {
    setRules(prev => ({
      ...prev,
      tiered_rules: prev.tiered_rules.filter((_, i) => i !== index)
    }));
  };

  // Buy X Get Y Rules
  const [buyXGetYForm, setBuyXGetYForm] = useState({
    buy_product_ids: [],
    buy_quantity: 1,
    get_product_ids: [],
    get_quantity: 1,
    get_discount_percent: 100,
    max_applications: 1
  });

  const handleAddBuyXGetYRule = () => {
    setRules(prev => ({
      ...prev,
      buy_x_get_y_rules: [...prev.buy_x_get_y_rules, { ...buyXGetYForm, id: Date.now() }]
    }));
    setBuyXGetYForm({
      buy_product_ids: [],
      buy_quantity: 1,
      get_product_ids: [],
      get_quantity: 1,
      get_discount_percent: 100,
      max_applications: 1
    });
  };

  // Bundle Rules
  const [bundleForm, setBundleForm] = useState({
    required_products: [],
    discount_type: 'percent',
    discount_value: 0,
    max_discount: null
  });

  // Unique Product Rule
  const [uniqueProductForm, setUniqueProductForm] = useState({
    min_unique_products: 2,
    discount_type: 'percent',
    discount_value: 0,
    max_discount: null
  });

  const handleSaveUniqueProductRule = () => {
    setRules(prev => ({
      ...prev,
      unique_product_rule: { ...uniqueProductForm }
    }));
  };

  // Gift Rules
  const [giftForm, setGiftForm] = useState({
    min_amount: 0,
    min_items: 0,
    gifts: [{ description: '', estimated_value: 0 }]
  });

  const handleAddGift = () => {
    setGiftForm(prev => ({
      ...prev,
      gifts: [...prev.gifts, { description: '', estimated_value: 0 }]
    }));
  };

  const handleRemoveGift = (index) => {
    setGiftForm(prev => ({
      ...prev,
      gifts: prev.gifts.filter((_, i) => i !== index)
    }));
  };

  const handleAddGiftRule = () => {
    setRules(prev => ({
      ...prev,
      gift_rules: [...prev.gift_rules, { ...giftForm, id: Date.now() }]
    }));
    setGiftForm({
      min_amount: 0,
      min_items: 0,
      gifts: [{ description: '', estimated_value: 0 }]
    });
  };

  // Free Shipping Rule
  const [freeShippingForm, setFreeShippingForm] = useState({
    min_amount: 0,
    max_shipping_discount: 0
  });

  const handleSaveFreeShippingRule = () => {
    setRules(prev => ({
      ...prev,
      free_shipping_rule: { ...freeShippingForm }
    }));
  };

  const handleSaveAll = () => {
    onSave(rules);
  };

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Cấu hình quy tắc nâng cao - {period?.discount_period_name}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          
          <div className="modal-body">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <button className={`nav-link ${activeRuleTab === 'tiered' ? 'active' : ''}`}
                  onClick={() => setActiveRuleTab('tiered')}>
                  Giảm theo bậc
                </button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${activeRuleTab === 'buyxgety' ? 'active' : ''}`}
                  onClick={() => setActiveRuleTab('buyxgety')}>
                  Mua X Tặng Y
                </button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${activeRuleTab === 'unique' ? 'active' : ''}`}
                  onClick={() => setActiveRuleTab('unique')}>
                  Mua nhiều SP khác nhau
                </button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${activeRuleTab === 'gift' ? 'active' : ''}`}
                  onClick={() => setActiveRuleTab('gift')}>
                  Quà tặng
                </button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${activeRuleTab === 'shipping' ? 'active' : ''}`}
                  onClick={() => setActiveRuleTab('shipping')}>
                  Miễn phí ship
                </button>
              </li>
            </ul>

            <div className="tab-content mt-3">
              {/* Tiered Discount Tab */}
              {activeRuleTab === 'tiered' && (
                <div>
                  <h6>Giảm giá theo bậc thang</h6>
                  <p className="text-muted">Ví dụ: Đơn từ 500k giảm 50k, từ 1tr giảm 150k...</p>
                  
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-3">
                          <label className="form-label">Giá trị đơn tối thiểu (đ)</label>
                          <input type="number" className="form-control" 
                            value={tieredForm.min_amount}
                            onChange={(e) => setTieredForm({...tieredForm, min_amount: Number(e.target.value)})} />
                        </div>
                        <div className="col-md-2">
                          <label className="form-label">Loại giảm</label>
                          <select className="form-select"
                            value={tieredForm.discount_type}
                            onChange={(e) => setTieredForm({...tieredForm, discount_type: e.target.value})}>
                            <option value="percent">Phần trăm</option>
                            <option value="fixed">Tiền mặt</option>
                          </select>
                        </div>
                        <div className="col-md-3">
                          <label className="form-label">Giá trị giảm</label>
                          <input type="number" className="form-control"
                            value={tieredForm.discount_value}
                            onChange={(e) => setTieredForm({...tieredForm, discount_value: Number(e.target.value)})} />
                        </div>
                        <div className="col-md-3">
                          <label className="form-label">Giảm tối đa (đ)</label>
                          <input type="number" className="form-control"
                            value={tieredForm.max_discount || ''}
                            onChange={(e) => setTieredForm({...tieredForm, max_discount: e.target.value ? Number(e.target.value) : null})} />
                        </div>
                        <div className="col-md-1 d-flex align-items-end">
                          <button type="button" className="btn btn-primary" onClick={handleAddTieredRule}>
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Đơn tối thiểu</th>
                          <th>Loại giảm</th>
                          <th>Giá trị</th>
                          <th>Giảm tối đa</th>
                          <th>Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rules.tiered_rules.map((rule, index) => (
                          <tr key={index}>
                            <td>{rule.min_amount.toLocaleString('vi-VN')}đ</td>
                            <td>{rule.discount_type === 'percent' ? 'Phần trăm' : 'Tiền mặt'}</td>
                            <td>{rule.discount_value}{rule.discount_type === 'percent' ? '%' : 'đ'}</td>
                            <td>{rule.max_discount ? `${rule.max_discount.toLocaleString('vi-VN')}đ` : 'Không giới hạn'}</td>
                            <td>
                              <button className="btn btn-sm btn-danger" onClick={() => handleRemoveTieredRule(index)}>
                                <i className="fas fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                        {rules.tiered_rules.length === 0 && (
                          <tr>
                            <td colSpan="5" className="text-center text-muted">Chưa có quy tắc nào</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Buy X Get Y Tab */}
              {activeRuleTab === 'buyxgety' && (
                <div>
                  <h6>Mua X Tặng Y</h6>
                  <p className="text-muted">Ví dụ: Mua 2 iPhone tặng 1 ốp lưng, mua 3 tặng 1...</p>
                  
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <label className="form-label">Mua sản phẩm (ID, cách nhau bởi dấu phẩy)</label>
                          <input type="text" className="form-control"
                            placeholder="1,2,3"
                            onChange={(e) => setBuyXGetYForm({
                              ...buyXGetYForm,
                              buy_product_ids: e.target.value.split(',').map(id => id.trim())
                            })} />
                        </div>
                        <div className="col-md-2">
                          <label className="form-label">Số lượng mua</label>
                          <input type="number" className="form-control"
                            value={buyXGetYForm.buy_quantity}
                            onChange={(e) => setBuyXGetYForm({...buyXGetYForm, buy_quantity: Number(e.target.value)})} />
                        </div>
                        <div className="col-md-2">
                          <label className="form-label">Số lượng tặng</label>
                          <input type="number" className="form-control"
                            value={buyXGetYForm.get_quantity}
                            onChange={(e) => setBuyXGetYForm({...buyXGetYForm, get_quantity: Number(e.target.value)})} />
                        </div>
                        <div className="col-md-2">
                          <label className="form-label">Giảm (%)</label>
                          <input type="number" className="form-control"
                            value={buyXGetYForm.get_discount_percent}
                            onChange={(e) => setBuyXGetYForm({...buyXGetYForm, get_discount_percent: Number(e.target.value)})} />
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-6">
                          <label className="form-label">Tặng sản phẩm (ID, cách nhau bởi dấu phẩy)</label>
                          <input type="text" className="form-control"
                            placeholder="4,5,6"
                            onChange={(e) => setBuyXGetYForm({
                              ...buyXGetYForm,
                              get_product_ids: e.target.value.split(',').map(id => id.trim())
                            })} />
                        </div>
                        <div className="col-md-3">
                          <label className="form-label">Số lần áp dụng tối đa</label>
                          <input type="number" className="form-control"
                            value={buyXGetYForm.max_applications}
                            onChange={(e) => setBuyXGetYForm({...buyXGetYForm, max_applications: Number(e.target.value)})} />
                        </div>
                        <div className="col-md-3 d-flex align-items-end">
                          <button type="button" className="btn btn-primary w-100" onClick={handleAddBuyXGetYRule}>
                            Thêm quy tắc
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="list-group">
                    {rules.buy_x_get_y_rules.map((rule, index) => (
                      <div key={index} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <strong>Mua {rule.buy_quantity} sản phẩm [{rule.buy_product_ids.join(', ')}]</strong>
                            <br />
                            <span className="text-muted">
                              Tặng {rule.get_quantity} sản phẩm [{rule.get_product_ids.join(', ')}] 
                              (Giảm {rule.get_discount_percent}%)
                              - Tối đa {rule.max_applications} lần
                            </span>
                          </div>
                          <button className="btn btn-sm btn-danger"
                            onClick={() => setRules(prev => ({
                              ...prev,
                              buy_x_get_y_rules: prev.buy_x_get_y_rules.filter((_, i) => i !== index)
                            }))}>
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                    {rules.buy_x_get_y_rules.length === 0 && (
                      <div className="list-group-item text-center text-muted">Chưa có quy tắc nào</div>
                    )}
                  </div>
                </div>
              )}

              {/* Unique Products Tab */}
              {activeRuleTab === 'unique' && (
                <div>
                  <h6>Giảm giá khi mua nhiều sản phẩm khác nhau</h6>
                  <p className="text-muted">Ví dụ: Mua từ 2 sản phẩm khác nhau giảm 10%</p>
                  
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-3">
                          <label className="form-label">Số SP khác nhau tối thiểu</label>
                          <input type="number" className="form-control"
                            value={uniqueProductForm.min_unique_products}
                            onChange={(e) => setUniqueProductForm({...uniqueProductForm, min_unique_products: Number(e.target.value)})} />
                        </div>
                        <div className="col-md-2">
                          <label className="form-label">Loại giảm</label>
                          <select className="form-select"
                            value={uniqueProductForm.discount_type}
                            onChange={(e) => setUniqueProductForm({...uniqueProductForm, discount_type: e.target.value})}>
                            <option value="percent">Phần trăm</option>
                            <option value="fixed">Tiền mặt</option>
                          </select>
                        </div>
                        <div className="col-md-3">
                          <label className="form-label">Giá trị giảm</label>
                          <input type="number" className="form-control"
                            value={uniqueProductForm.discount_value}
                            onChange={(e) => setUniqueProductForm({...uniqueProductForm, discount_value: Number(e.target.value)})} />
                        </div>
                        <div className="col-md-3">
                          <label className="form-label">Giảm tối đa (đ)</label>
                          <input type="number" className="form-control"
                            value={uniqueProductForm.max_discount || ''}
                            onChange={(e) => setUniqueProductForm({...uniqueProductForm, max_discount: e.target.value ? Number(e.target.value) : null})} />
                        </div>
                        <div className="col-md-1 d-flex align-items-end">
                          <button type="button" className="btn btn-primary" onClick={handleSaveUniqueProductRule}>
                            <i className="fas fa-save"></i>
                          </button>
                        </div>
                      </div>
                      
                      {rules.unique_product_rule && (
                        <div className="alert alert-info mt-3">
                          <strong>Quy tắc hiện tại:</strong> Mua từ {rules.unique_product_rule.min_unique_products} sản phẩm khác nhau 
                          giảm {rules.unique_product_rule.discount_value}{rules.unique_product_rule.discount_type === 'percent' ? '%' : 'đ'}
                          {rules.unique_product_rule.max_discount && ` (Tối đa ${rules.unique_product_rule.max_discount.toLocaleString('vi-VN')}đ)`}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Gift Rules Tab */}
              {activeRuleTab === 'gift' && (
                <div>
                  <h6>Quy tắc quà tặng</h6>
                  <p className="text-muted">Tặng quà khi đạt điều kiện</p>
                  
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <label className="form-label">Giá trị đơn tối thiểu (đ)</label>
                          <input type="number" className="form-control"
                            value={giftForm.min_amount}
                            onChange={(e) => setGiftForm({...giftForm, min_amount: Number(e.target.value)})} />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Số lượng SP tối thiểu</label>
                          <input type="number" className="form-control"
                            value={giftForm.min_items}
                            onChange={(e) => setGiftForm({...giftForm, min_items: Number(e.target.value)})} />
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <label className="form-label">Danh sách quà tặng</label>
                        {giftForm.gifts.map((gift, index) => (
                          <div key={index} className="row mb-2">
                            <div className="col-md-8">
                              <input type="text" className="form-control" placeholder="Mô tả quà tặng"
                                value={gift.description}
                                onChange={(e) => {
                                  const newGifts = [...giftForm.gifts];
                                  newGifts[index].description = e.target.value;
                                  setGiftForm({...giftForm, gifts: newGifts});
                                }} />
                            </div>
                            <div className="col-md-3">
                              <input type="number" className="form-control" placeholder="Giá trị ước tính"
                                value={gift.estimated_value}
                                onChange={(e) => {
                                  const newGifts = [...giftForm.gifts];
                                  newGifts[index].estimated_value = Number(e.target.value);
                                  setGiftForm({...giftForm, gifts: newGifts});
                                }} />
                            </div>
                            <div className="col-md-1">
                              <button className="btn btn-danger" onClick={() => handleRemoveGift(index)}>
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </div>
                        ))}
                        <button type="button" className="btn btn-sm btn-secondary" onClick={handleAddGift}>
                          + Thêm quà
                        </button>
                      </div>
                      
                      <div className="mt-3">
                        <button type="button" className="btn btn-primary" onClick={handleAddGiftRule}>
                          Thêm quy tắc quà tặng
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="list-group">
                    {rules.gift_rules.map((rule, index) => (
                      <div key={index} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <strong>Điều kiện:</strong> Đơn từ {rule.min_amount.toLocaleString('vi-VN')}đ, 
                            {rule.min_items} sản phẩm
                            <br />
                            <strong>Quà:</strong> {rule.gifts.map(g => g.description).join(', ')}
                          </div>
                          <button className="btn btn-sm btn-danger"
                            onClick={() => setRules(prev => ({
                              ...prev,
                              gift_rules: prev.gift_rules.filter((_, i) => i !== index)
                            }))}>
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                    {rules.gift_rules.length === 0 && (
                      <div className="list-group-item text-center text-muted">Chưa có quy tắc nào</div>
                    )}
                  </div>
                </div>
              )}

              {/* Free Shipping Tab */}
              {activeRuleTab === 'shipping' && (
                <div>
                  <h6>Miễn phí vận chuyển</h6>
                  <p className="text-muted">Miễn phí ship khi đạt điều kiện</p>
                  
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <label className="form-label">Giá trị đơn tối thiểu (đ)</label>
                          <input type="number" className="form-control"
                            value={freeShippingForm.min_amount}
                            onChange={(e) => setFreeShippingForm({...freeShippingForm, min_amount: Number(e.target.value)})} />
                        </div>
                        <div className="col-md-5">
                          <label className="form-label">Giảm tối đa phí ship (đ)</label>
                          <input type="number" className="form-control"
                            value={freeShippingForm.max_shipping_discount}
                            onChange={(e) => setFreeShippingForm({...freeShippingForm, max_shipping_discount: Number(e.target.value)})} />
                        </div>
                        <div className="col-md-1 d-flex align-items-end">
                          <button type="button" className="btn btn-primary" onClick={handleSaveFreeShippingRule}>
                            <i className="fas fa-save"></i>
                          </button>
                        </div>
                      </div>
                      
                      {rules.free_shipping_rule && (
                        <div className="alert alert-success mt-3">
                          <i className="fas fa-shipping-fast"></i> 
                          <strong> Miễn phí ship</strong> cho đơn từ {rules.free_shipping_rule.min_amount.toLocaleString('vi-VN')}đ 
                          (Giảm tối đa {rules.free_shipping_rule.max_shipping_discount.toLocaleString('vi-VN')}đ)
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Đóng</button>
            <button type="button" className="btn btn-primary" onClick={handleSaveAll}>
              <i className="fas fa-save"></i> Lưu tất cả quy tắc
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

