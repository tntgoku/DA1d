
export const FormTechnine=( {activeTab,handleInputChange,formData,haveCamera })=>{
    return(
                        <div className={`tab-pane fade ${activeTab === 'specs' ? 'show active' : ''}`}>
                 <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Màu sắc</label>
                        <input
                          type="text"
                          className="form-control"
                          name="color"
                          value={formData.specifications?.color || ''}
                          onChange={(e) => handleInputChange({
                            target: {
                              name: 'specifications',
                              value: {
                                ...formData.specifications,
                                color: e.target.value
                              }
                            }
                          })}
                          placeholder="Ví dụ: Đen, Trắng, Tím..."
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Bộ nhớ trong</label>
                        <input
                          type="text"
                          className="form-control"
                          name="storage"
                          value={formData.specifications?.storage || ''}
                          onChange={(e) => handleInputChange({
                            target: {
                              name: 'specifications',
                              value: {
                                ...formData.specifications,
                                storage: e.target.value
                              }
                            }
                          })}
                          placeholder="Ví dụ: 128GB, 256GB..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">RAM</label>
                        <input
                          type="text"
                          className="form-control"
                          name="ram"
                          value={formData.specifications?.ram || ''}
                          onChange={(e) => handleInputChange({
                            target: {
                              name: 'specifications',
                              value: {
                                ...formData.specifications,
                                ram: e.target.value
                              }
                            }
                          })}
                          placeholder="Ví dụ: 8GB, 16GB..."
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Màn hình</label>
                        <input
                          type="text"
                          className="form-control"
                          name="screen"
                          value={formData.specifications?.screen || ''}
                          onChange={(e) => handleInputChange({
                            target: {
                              name: 'specifications',
                              value: {
                                ...formData.specifications,
                                screen: e.target.value
                              }
                            }
                          })}
                          placeholder="Ví dụ: 6.7 inch, 14.2 inch..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Dung lượng pin</label>
                        <input
                          type="text"
                          className="form-control"
                          name="battery"
                          value={formData.specifications?.battery || ''}
                          onChange={(e) => handleInputChange({
                            target: {
                              name: 'specifications',
                              value: {
                                ...formData.specifications,
                                battery: e.target.value
                              }
                            }
                          })}
                          placeholder="Ví dụ: 4323 mAh, 70Wh..."
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Chip xử lý</label>
                        <input
                          type="text"
                          className="form-control"
                          name="chip"
                          value={formData.specifications?.chip || ''}
                          onChange={(e) => handleInputChange({
                            target: {
                              name: 'specifications',
                              value: {
                                ...formData.specifications,
                                chip: e.target.value
                              }
                            }
                          })}
                          placeholder="Ví dụ: Apple A16 Bionic, Snapdragon 8 Gen 2..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    {haveCamera && (
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Camera</label>
                          <input
                            type="text"
                            className="form-control"
                            name="camera"
                            value={formData.specifications?.camera || ''}
                            onChange={(e) => handleInputChange({
                              target: {
                                name: 'specifications',
                                value: {
                                  ...formData.specifications,
                                  camera: e.target.value
                                }
                              }
                            })}
                            placeholder="Ví dụ: 48MP, 12MP..."
                          />
                        </div>
                      </div>
                    )}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Trọng lượng</label>
                        <input
                          type="text"
                          className="form-control"
                          name="weight"
                          value={formData.specifications?.weight || ''}
                          onChange={(e) => handleInputChange({
                            target: {
                              name: 'specifications',
                              value: {
                                ...formData.specifications,
                                weight: e.target.value
                              }
                            }
                          })}
                          placeholder="Ví dụ: 240g, 1.6kg..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Kết nối</label>
                        <input
                          type="text"
                          className="form-control"
                          name="connectivity"
                          value={formData.specifications?.connectivity || ''}
                          onChange={(e) => handleInputChange({
                            target: {
                              name: 'specifications',
                              value: {
                                ...formData.specifications,
                                connectivity: e.target.value
                              }
                            }
                          })}
                          placeholder="Ví dụ: Bluetooth 5.3, Wi-Fi 6..."
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Tính năng đặc biệt</label>
                        <input
                          type="text"
                          className="form-control"
                          name="features"
                          value={formData.specifications?.features || ''}
                          onChange={(e) => handleInputChange({
                            target: {
                              name: 'specifications',
                              value: {
                                ...formData.specifications,
                                features: e.target.value
                              }
                            }
                          })}
                          placeholder="Ví dụ: Chống nước, Sạc nhanh..."
                        />
                      </div>
                    </div>
                  </div>

                </div>
    )
}