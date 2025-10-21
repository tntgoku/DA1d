import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/client/Header';
import Footer from '../components/client/Footer';
import '../css/client/policy.css';

const PurchasePolicy = () => {
  return (
    <>
      <Header />
      <div className="policy-page">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="policy-header">
                <h1>Chính sách mua hàng</h1>
                <p className="policy-subtitle">Quy định và điều khoản mua sắm tại Trường LCD</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="policy-content">
                
                {/* Quy trình đặt hàng */}
                <section className="policy-section">
                  <h2><i className="fas fa-shopping-cart"></i> Quy trình đặt hàng</h2>
                  <div className="process-steps">
                    <div className="step">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>Chọn sản phẩm</h4>
                        <p>Khách hàng lựa chọn sản phẩm phù hợp với nhu cầu và ngân sách</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>Thêm vào giỏ hàng</h4>
                        <p>Thêm sản phẩm vào giỏ hàng và kiểm tra thông tin chi tiết</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>Thanh toán</h4>
                        <p>Chọn phương thức thanh toán và hoàn tất đơn hàng</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">4</div>
                      <div className="step-content">
                        <h4>Xác nhận đơn hàng</h4>
                        <p>Nhận xác nhận đơn hàng qua email/SMS và theo dõi trạng thái</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Phương thức thanh toán */}
                <section className="policy-section">
                  <h2><i className="fas fa-credit-card"></i> Phương thức thanh toán</h2>
                  <div className="payment-methods">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="payment-card">
                          <h4><i className="fas fa-money-bill-wave"></i> Thanh toán khi nhận hàng (COD)</h4>
                          <p>Khách hàng thanh toán bằng tiền mặt khi nhận được sản phẩm</p>
                          <ul>
                            <li>Không cần thanh toán trước</li>
                            <li>Kiểm tra sản phẩm trước khi thanh toán</li>
                            <li>Phí giao hàng: 30.000 VNĐ</li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="payment-card">
                          <h4><i className="fas fa-mobile-alt"></i> Ví điện tử MoMo</h4>
                          <p>Thanh toán nhanh chóng và an toàn qua ví điện tử MoMo</p>
                          <ul>
                            <li>Thanh toán tức thì</li>
                            <li>Bảo mật cao</li>
                            <li>Miễn phí giao hàng</li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="payment-card">
                          <h4><i className="fas fa-university"></i> VNPay</h4>
                          <p>Thanh toán qua cổng thanh toán VNPay</p>
                          <ul>
                            <li>Hỗ trợ nhiều ngân hàng</li>
                            <li>Thanh toán an toàn</li>
                            <li>Miễn phí giao hàng</li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="payment-card">
                          <h4><i className="fas fa-credit-card"></i> Thẻ tín dụng/ghi nợ</h4>
                          <p>Thanh toán bằng thẻ Visa, Mastercard</p>
                          <ul>
                            <li>Thanh toán quốc tế</li>
                            <li>Bảo mật cao</li>
                            <li>Miễn phí giao hàng</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Chính sách giao hàng */}
                <section className="policy-section">
                  <h2><i className="fas fa-shipping-fast"></i> Chính sách giao hàng</h2>
                  <div className="policy-card">
                    <h3>1. Phạm vi giao hàng</h3>
                    <ul>
                      <li>Giao hàng toàn quốc</li>
                      <li>Ưu tiên giao hàng tại TP. Hồ Chí Minh và các tỉnh lân cận</li>
                      <li>Giao hàng miễn phí cho đơn hàng từ 2.000.000 VNĐ</li>
                    </ul>
                  </div>

                  <div className="policy-card">
                    <h3>2. Thời gian giao hàng</h3>
                    <div className="delivery-table">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Khu vực</th>
                            <th>Thời gian giao hàng</th>
                            <th>Phí giao hàng</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>TP. Hồ Chí Minh</td>
                            <td>1-2 ngày làm việc</td>
                            <td>30.000 VNĐ</td>
                          </tr>
                          <tr>
                            <td>Các tỉnh miền Nam</td>
                            <td>2-3 ngày làm việc</td>
                            <td>50.000 VNĐ</td>
                          </tr>
                          <tr>
                            <td>Các tỉnh miền Trung</td>
                            <td>3-4 ngày làm việc</td>
                            <td>70.000 VNĐ</td>
                          </tr>
                          <tr>
                            <td>Các tỉnh miền Bắc</td>
                            <td>4-5 ngày làm việc</td>
                            <td>80.000 VNĐ</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="policy-card">
                    <h3>3. Quy trình giao hàng</h3>
                    <ul>
                      <li>Xác nhận đơn hàng trong vòng 2 giờ làm việc</li>
                      <li>Đóng gói và chuẩn bị giao hàng</li>
                      <li>Thông báo mã vận đơn cho khách hàng</li>
                      <li>Giao hàng và xác nhận nhận hàng</li>
                    </ul>
                  </div>
                </section>

                {/* Chính sách đổi trả */}
                <section className="policy-section">
                  <h2><i className="fas fa-exchange-alt"></i> Chính sách đổi trả</h2>
                  <div className="policy-card">
                    <h3>1. Điều kiện đổi trả</h3>
                    <ul>
                      <li>Sản phẩm còn nguyên vẹn, không bị trầy xước</li>
                      <li>Còn đầy đủ phụ kiện, hộp, tem bảo hành</li>
                      <li>Trong vòng 7 ngày kể từ ngày nhận hàng</li>
                      <li>Có hóa đơn mua hàng hợp lệ</li>
                    </ul>
                  </div>

                  <div className="policy-card">
                    <h3>2. Trường hợp được đổi trả</h3>
                    <ul>
                      <li>Sản phẩm bị lỗi từ nhà sản xuất</li>
                      <li>Giao sai sản phẩm, sai màu sắc, dung lượng</li>
                      <li>Sản phẩm không đúng với mô tả</li>
                      <li>Khách hàng không hài lòng với sản phẩm</li>
                    </ul>
                  </div>

                  <div className="policy-card warning">
                    <h3>3. Trường hợp không được đổi trả</h3>
                    <ul>
                      <li>Sản phẩm đã sử dụng, có dấu hiệu hao mòn</li>
                      <li>Mất hộp, phụ kiện hoặc tem bảo hành</li>
                      <li>Quá thời hạn 7 ngày</li>
                      <li>Sản phẩm bị hỏng do sử dụng không đúng cách</li>
                    </ul>
                  </div>
                </section>

                {/* Chính sách giá cả */}
                <section className="policy-section">
                  <h2><i className="fas fa-tags"></i> Chính sách giá cả</h2>
                  <div className="policy-card">
                    <h3>1. Giá sản phẩm</h3>
                    <ul>
                      <li>Giá sản phẩm được niêm yết rõ ràng trên website</li>
                      <li>Giá có thể thay đổi theo thị trường và chính sách của nhà sản xuất</li>
                      <li>Giá đã bao gồm thuế VAT</li>
                      <li>Khách hàng sẽ được thông báo trước khi giá thay đổi</li>
                    </ul>
                  </div>

                  <div className="policy-card">
                    <h3>2. Chương trình khuyến mãi</h3>
                    <ul>
                      <li>Giảm giá cho khách hàng mua lần đầu</li>
                      <li>Ưu đãi đặc biệt trong các dịp lễ, tết</li>
                      <li>Chương trình tích điểm đổi quà</li>
                      <li>Giảm giá khi mua combo sản phẩm</li>
                    </ul>
                  </div>
                </section>

                {/* Bảo mật thông tin */}
                <section className="policy-section">
                  <h2><i className="fas fa-shield-alt"></i> Bảo mật thông tin</h2>
                  <div className="policy-card">
                    <h3>1. Thông tin cá nhân</h3>
                    <ul>
                      <li>Trường LCD cam kết bảo mật thông tin cá nhân của khách hàng</li>
                      <li>Không chia sẻ thông tin với bên thứ ba</li>
                      <li>Sử dụng công nghệ mã hóa SSL để bảo vệ dữ liệu</li>
                      <li>Khách hàng có quyền yêu cầu xóa thông tin cá nhân</li>
                    </ul>
                  </div>

                  <div className="policy-card">
                    <h3>2. Thanh toán</h3>
                    <ul>
                      <li>Tất cả giao dịch thanh toán được mã hóa</li>
                      <li>Không lưu trữ thông tin thẻ tín dụng</li>
                      <li>Sử dụng cổng thanh toán uy tín</li>
                      <li>Tuân thủ các tiêu chuẩn bảo mật quốc tế</li>
                    </ul>
                  </div>
                </section>

                {/* Liên hệ hỗ trợ */}
                <section className="policy-section">
                  <h2><i className="fas fa-headset"></i> Hỗ trợ khách hàng</h2>
                  <div className="contact-info">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="contact-card">
                          <h4><i className="fas fa-phone"></i> Hotline</h4>
                          <p><strong>Tư vấn mua hàng:</strong> <a href="tel:0932004455">0932004455</a></p>
                          <p><strong>Hỗ trợ kỹ thuật:</strong> <a href="tel:0973805900">0973805900</a></p>
                          <p><strong>Giờ làm việc:</strong> 8:00 - 21:00 (Tất cả các ngày)</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="contact-card">
                          <h4><i className="fas fa-envelope"></i> Email</h4>
                          <p><strong>Hỗ trợ:</strong> <a href="mailto:support@truonglcd.vn">support@truonglcd.vn</a></p>
                          <p><strong>Khiếu nại:</strong> <a href="mailto:feedback@truonglcd.vn">feedback@truonglcd.vn</a></p>
                          <p><strong>Đối tác:</strong> <a href="mailto:partner@truonglcd.vn">partner@truonglcd.vn</a></p>
                        </div>
                      </div>
                    </div>
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

export default PurchasePolicy;
