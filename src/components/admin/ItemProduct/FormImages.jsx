

export const FormImages=({activeTab,images,featuredImageIndex,setFeaturedImage,handleRemoveImage,handleImageUpload})=>{
    return(
                        <div className={`tab-pane fade ${activeTab === 'images' ? 'show active' : ''}`}>
                  <div className="row">
                    <div className="col-md-12">
                      <h6>Quản lý ảnh sản phẩm</h6>
                      <p className="text-muted">Kéo thả để sắp xếp thứ tự ảnh. Ảnh đầu tiên sẽ hiển thị trên trang chủ.</p>
                      
                      <div className="mb-3">
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                        />
                      </div>
        <div className="image-gallery">
            {(images?.length ?? 0) === 0 ? (
                <div className="text-center text-muted py-4">
                <i className="fas fa-images fa-2x mb-2"></i>
                <p>Chưa có ảnh nào được tải lên</p>
                </div>
            ) : (
                <div className="row">
                {images.map((image, index) => (
                    <div key={index} className="col-md-3 mb-3">
                    <div className={`card ${index === (featuredImageIndex  ?? 0) ? 'border-primary' : ''}`}>
                        <img 
                        src={image.imgSrc} 
                        className="card-img-top" 
                        alt={`Ảnh ${index + 1}`}
                        style={{height: '120px', objectFit: 'contain'}}
                        />
                        <div className="card-body p-2">
                        <div className="d-flex justify-content-between">
                            <small>Ảnh {index +1 }</small>
                            {index === (featuredImageIndex ?? 0) && (
                            <span className="badge bg-primary">Ảnh chính</span>
                            )}
                        </div>
                        <div className="btn-group w-100 mt-1" role="group">
                            <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => setFeaturedImage(index)}
                            disabled={index === (featuredImageIndex ?? 0)}
                            >
                            <i className="fas fa-star"></i>
                            </button>
                            <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleRemoveImage(index)}
                            >
                            <i className="fas fa-trash"></i>
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            )}
            </div>
                                </div>
                  </div>
                </div>
    )
}