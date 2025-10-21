import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/client/Header';
import Footer from '../components/client/Footer';
import '../css/client/policy.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 2000);
  };

  return (
    <>
      <Header />
      <div className="policy-page">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="policy-header">
                <h1>Liên hệ với chúng tôi</h1>
                <p className="policy-subtitle">Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn cho bạn</p>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Thông tin liên hệ */}
            <div className="col-lg-4">
              <div className="contact-info-section">
                <h2><i className="fas fa-info-circle"></i> Thông tin liên hệ</h2>
                
                <div className="contact-card">
                  <h4><i className="fas fa-store"></i> Cửa hàng chính</h4>
                  <div className="contact-detail">
                    <p><i className="fas fa-map-marker-alt"></i> <strong>Địa chỉ:</strong></p>
                    <p>118 Nam Kỳ Khởi Nghĩa, Phường Vũng Tàu, TP Hồ Chí Minh, Việt Nam</p>
                  </div>
                  <div className="contact-detail">
                    <p><i className="fas fa-phone"></i> <strong>Điện thoại:</strong></p>
                    <p><a href="tel:0932004455">0932004455</a></p>
                  </div>
                  <div className="contact-detail">
                    <p><i className="fas fa-envelope"></i> <strong>Email:</strong></p>
                    <p><a href="mailto:info@truonglcd.vn">info@truonglcd.vn</a></p>
                  </div>
                  <div className="contact-detail">
                    <p><i className="fas fa-clock"></i> <strong>Giờ làm việc:</strong></p>
                    <p>8:00 - 21:00 (Tất cả các ngày trong tuần)</p>
                  </div>
                </div>

                <div className="contact-card">
                  <h4><i className="fas fa-headset"></i> Hỗ trợ khách hàng</h4>
                  <div className="contact-detail">
                    <p><i className="fas fa-phone"></i> <strong>Tư vấn mua hàng:</strong></p>
                    <p><a href="tel:0932004455">0932004455</a></p>
                  </div>
                  <div className="contact-detail">
                    <p><i className="fas fa-tools"></i> <strong>Hỗ trợ kỹ thuật:</strong></p>
                    <p><a href="tel:0973805900">0973805900</a></p>
                  </div>
                  <div className="contact-detail">
                    <p><i className="fas fa-exclamation-triangle"></i> <strong>Khiếu nại:</strong></p>
                    <p><a href="tel:0973805900">0973805900</a></p>
                  </div>
                </div>

                <div className="contact-card">
                  <h4><i className="fas fa-share-alt"></i> Mạng xã hội</h4>
                  <div className="social-links">
                    <a href="https://facebook.com/truonglcd" target="_blank" rel="noopener noreferrer" className="social-link">
                      <i className="fab fa-facebook-f"></i> Facebook
                    </a>
                    <a href="https://zalo.me/0932004455" target="_blank" rel="noopener noreferrer" className="social-link">
                      <i className="fab fa-zalo"></i> Zalo
                    </a>
                    <a href="https://instagram.com/truonglcd" target="_blank" rel="noopener noreferrer" className="social-link">
                      <i className="fab fa-instagram"></i> Instagram
                    </a>
                    <a href="https://youtube.com/truonglcd" target="_blank" rel="noopener noreferrer" className="social-link">
                      <i className="fab fa-youtube"></i> YouTube
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Form liên hệ */}
            <div className="col-lg-8">
              <div className="contact-form-section">
                <h2><i className="fas fa-paper-plane"></i> Gửi tin nhắn cho chúng tôi</h2>
                
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="name">Họ và tên *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                          placeholder="Nhập họ và tên của bạn"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                          placeholder="Nhập email của bạn"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="phone">Số điện thoại</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="Nhập số điện thoại"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="subject">Chủ đề *</label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        >
                          <option value="">Chọn chủ đề</option>
                          <option value="tư-vấn">Tư vấn sản phẩm</option>
                          <option value="bảo-hành">Hỗ trợ bảo hành</option>
                          <option value="khiếu-nại">Khiếu nại dịch vụ</option>
                          <option value="hợp-tác">Hợp tác kinh doanh</option>
                          <option value="khác">Khác</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Nội dung tin nhắn *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="form-control"
                      rows="6"
                      required
                      placeholder="Nhập nội dung tin nhắn của bạn..."
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i> Đang gửi...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane"></i> Gửi tin nhắn
                        </>
                      )}
                    </button>
                  </div>

                  {submitStatus === 'success' && (
                    <div className="alert alert-success">
                      <i className="fas fa-check-circle"></i> Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Bản đồ */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="map-section">
                <h2><i className="fas fa-map"></i> Vị trí cửa hàng</h2>
                <div className="map-container">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3253156358!2d106.6641!3d10.7769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ed2392c44df%3A0xd2ecb62e0d050fe9!2sNam%20K%E1%BB%B3%20Kh%E1%BB%9Fi%20Ngh%C4%A9a%2C%20Ph%C6%B0%E1%BB%9Dng%20V%C5%A9ng%20T%C3%A0u%2C%20Qu%E1%BA%ADn%201%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Vị trí cửa hàng Trường LCD"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="faq-section">
                <h2><i className="fas fa-question-circle"></i> Câu hỏi thường gặp</h2>
                <div className="row">
                  <div className="col-md-6">
                    <div className="faq-item">
                      <h4>Làm thế nào để đặt hàng online?</h4>
                      <p>Bạn có thể đặt hàng trực tiếp trên website hoặc gọi hotline 0932004455 để được tư vấn.</p>
                    </div>
                    <div className="faq-item">
                      <h4>Thời gian giao hàng là bao lâu?</h4>
                      <p>Tại TP.HCM: 1-2 ngày, các tỉnh khác: 2-5 ngày tùy khu vực.</p>
                    </div>
                    <div className="faq-item">
                      <h4>Có được kiểm tra sản phẩm trước khi thanh toán không?</h4>
                      <p>Có, bạn có thể kiểm tra sản phẩm trước khi thanh toán khi chọn phương thức COD.</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="faq-item">
                      <h4>Chính sách đổi trả như thế nào?</h4>
                      <p>Đổi trả miễn phí trong 7 ngày nếu sản phẩm còn nguyên vẹn và có hóa đơn.</p>
                    </div>
                    <div className="faq-item">
                      <h4>Có hỗ trợ bảo hành không?</h4>
                      <p>Có, chúng tôi hỗ trợ bảo hành chính hãng cho tất cả sản phẩm.</p>
                    </div>
                    <div className="faq-item">
                      <h4>Làm sao để liên hệ khi cần hỗ trợ?</h4>
                      <p>Bạn có thể gọi hotline, gửi email hoặc đến trực tiếp cửa hàng.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
