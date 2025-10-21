import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/client/Header';
import Footer from '../components/client/Footer';
import '../css/client/policy.css';

const WarrantyPolicy = () => {
  return (
    <>
      <Header />
      <div className="policy-page">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="policy-header">
                <h1>Chính sách bảo hành</h1>
                <p className="policy-subtitle">Cam kết chất lượng và dịch vụ bảo hành tốt nhất</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="policy-content">
                
                {/* Điều kiện bảo hành */}
                <section className="policy-section">
                  <h2><i className="fas fa-shield-alt"></i> Điều kiện bảo hành</h2>
                  <div className="policy-card">
                    <h3>1. Sản phẩm được bảo hành</h3>
                    <ul>
                      <li>Tất cả sản phẩm điện thoại, máy tính bảng, laptop được bán tại Trường LCD</li>
                      <li>Sản phẩm phải còn trong thời hạn bảo hành theo quy định của nhà sản xuất</li>
                      <li>Sản phẩm phải có tem bảo hành và hóa đơn mua hàng hợp lệ</li>
                      <li>Sản phẩm không bị hỏng do tác động vật lý từ bên ngoài</li>
                    </ul>
                  </div>

                  <div className="policy-card">
                    <h3>2. Thời gian bảo hành</h3>
                    <div className="warranty-table">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Loại sản phẩm</th>
                            <th>Thời gian bảo hành</th>
                            <th>Ghi chú</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>iPhone</td>
                            <td>12 tháng</td>
                            <td>Bảo hành chính hãng Apple</td>
                          </tr>
                          <tr>
                            <td>Samsung Galaxy</td>
                            <td>12 tháng</td>
                            <td>Bảo hành chính hãng Samsung</td>
                          </tr>
                          <tr>
                            <td>iPad</td>
                            <td>12 tháng</td>
                            <td>Bảo hành chính hãng Apple</td>
                          </tr>
                          <tr>
                            <td>MacBook</td>
                            <td>12 tháng</td>
                            <td>Bảo hành chính hãng Apple</td>
                          </tr>
                          <tr>
                            <td>Phụ kiện</td>
                            <td>6 tháng</td>
                            <td>Bảo hành tại cửa hàng</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>

                {/* Quy trình bảo hành */}
                <section className="policy-section">
                  <h2><i className="fas fa-cogs"></i> Quy trình bảo hành</h2>
                  <div className="process-steps">
                    <div className="step">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>Tiếp nhận sản phẩm</h4>
                        <p>Khách hàng mang sản phẩm đến cửa hàng hoặc gửi qua dịch vụ giao hàng</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>Kiểm tra và đánh giá</h4>
                        <p>Kỹ thuật viên kiểm tra tình trạng sản phẩm và xác định nguyên nhân lỗi</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>Thực hiện bảo hành</h4>
                        <p>Sửa chữa hoặc thay thế linh kiện theo chính sách bảo hành</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">4</div>
                      <div className="step-content">
                        <h4>Giao trả sản phẩm</h4>
                        <p>Giao trả sản phẩm đã được bảo hành cho khách hàng</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Trường hợp không được bảo hành */}
                <section className="policy-section">
                  <h2><i className="fas fa-exclamation-triangle"></i> Trường hợp không được bảo hành</h2>
                  <div className="policy-card warning">
                    <ul>
                      <li>Sản phẩm bị hỏng do va đập, rơi rớt, ngấm nước</li>
                      <li>Sản phẩm bị can thiệp, sửa chữa bởi bên thứ ba</li>
                      <li>Sản phẩm bị mất tem bảo hành hoặc tem bị rách, mờ</li>
                      <li>Sản phẩm bị hỏng do sử dụng không đúng cách</li>
                      <li>Sản phẩm đã hết thời hạn bảo hành</li>
                      <li>Sản phẩm bị hỏng do thiên tai, hỏa hoạn</li>
                    </ul>
                  </div>
                </section>

                {/* Thông tin liên hệ bảo hành */}
                <section className="policy-section">
                  <h2><i className="fas fa-phone"></i> Thông tin liên hệ bảo hành</h2>
                  <div className="contact-info">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="contact-card">
                          <h4><i className="fas fa-store"></i> Cửa hàng chính</h4>
                          <p><strong>Địa chỉ:</strong> 118 Nam Kỳ Khởi Nghĩa, Phường Vũng Tàu, TP Hồ Chí Minh</p>
                          <p><strong>Điện thoại:</strong> <a href="tel:0932004455">0932004455</a></p>
                          <p><strong>Email:</strong> <a href="mailto:support@truonglcd.vn">support@truonglcd.vn</a></p>
                          <p><strong>Giờ làm việc:</strong> 8:00 - 21:00 (Tất cả các ngày trong tuần)</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="contact-card">
                          <h4><i className="fas fa-headset"></i> Hỗ trợ kỹ thuật</h4>
                          <p><strong>Hotline:</strong> <a href="tel:0973805900">0973805900</a></p>
                          <p><strong>Email:</strong> <a href="mailto:tech@truonglcd.vn">tech@truonglcd.vn</a></p>
                          <p><strong>Zalo:</strong> 0932004455</p>
                          <p><strong>Facebook:</strong> <a href="https://facebook.com/truonglcd" target="_blank" rel="noopener noreferrer">Trường LCD</a></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Lưu ý quan trọng */}
                <section className="policy-section">
                  <h2><i className="fas fa-info-circle"></i> Lưu ý quan trọng</h2>
                  <div className="policy-card info">
                    <ul>
                      <li>Khách hàng nên sao lưu dữ liệu trước khi gửi sản phẩm bảo hành</li>
                      <li>Thời gian bảo hành có thể kéo dài từ 7-15 ngày làm việc tùy theo tình trạng sản phẩm</li>
                      <li>Trường LCD không chịu trách nhiệm về dữ liệu bị mất trong quá trình bảo hành</li>
                      <li>Khách hàng cần giữ lại hóa đơn mua hàng để làm thủ tục bảo hành</li>
                      <li>Chính sách bảo hành có thể thay đổi theo quy định của nhà sản xuất</li>
                    </ul>
                  </div>
                </section>

              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WarrantyPolicy;
