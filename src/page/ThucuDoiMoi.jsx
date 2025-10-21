import React, { useState, useEffect } from 'react';
import Header from '../components/client/Header';
import Footer from '../components/client/Footer';
import '../css/client/thucu-doi-moi.css';

const ThucuDoiMoi = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: '📋' },
    { id: 'process', label: 'Quy trình', icon: '⚙️' },
    { id: 'pricing', label: 'Bảng giá', icon: '💰' },
    { id: 'conditions', label: 'Điều kiện', icon: '📝' },
    { id: 'faq', label: 'Câu hỏi thường gặp', icon: '❓' }
  ];

  const pricingData = [
    {
      category: 'iPhone',
      models: [
        { name: 'iPhone 15 Pro Max', price: '18.000.000 - 25.000.000', condition: 'Mới 100%' },
        { name: 'iPhone 15 Pro', price: '16.000.000 - 22.000.000', condition: 'Mới 100%' },
        { name: 'iPhone 15', price: '14.000.000 - 18.000.000', condition: 'Mới 100%' },
        { name: 'iPhone 14 Pro Max', price: '15.000.000 - 20.000.000', condition: 'Mới 100%' },
        { name: 'iPhone 14 Pro', price: '13.000.000 - 17.000.000', condition: 'Mới 100%' },
        { name: 'iPhone 13 Pro Max', price: '12.000.000 - 16.000.000', condition: 'Mới 100%' }
      ]
    },
    {
      category: 'Samsung Galaxy',
      models: [
        { name: 'Galaxy S24 Ultra', price: '20.000.000 - 28.000.000', condition: 'Mới 100%' },
        { name: 'Galaxy S24+', price: '18.000.000 - 24.000.000', condition: 'Mới 100%' },
        { name: 'Galaxy S24', price: '16.000.000 - 20.000.000', condition: 'Mới 100%' },
        { name: 'Galaxy S23 Ultra', price: '15.000.000 - 22.000.000', condition: 'Mới 100%' },
        { name: 'Galaxy S23+', price: '13.000.000 - 18.000.000', condition: 'Mới 100%' }
      ]
    },
    {
      category: 'MacBook',
      models: [
        { name: 'MacBook Pro M3 Max', price: '45.000.000 - 65.000.000', condition: 'Mới 100%' },
        { name: 'MacBook Pro M3 Pro', price: '35.000.000 - 50.000.000', condition: 'Mới 100%' },
        { name: 'MacBook Pro M3', price: '28.000.000 - 40.000.000', condition: 'Mới 100%' },
        { name: 'MacBook Air M3', price: '22.000.000 - 32.000.000', condition: 'Mới 100%' },
        { name: 'MacBook Air M2', price: '18.000.000 - 28.000.000', condition: 'Mới 100%' }
      ]
    }
  ];

  const faqData = [
    {
      question: 'Thủ cự đổi mới là gì?',
      answer: 'Thủ cự đổi mới là dịch vụ mua lại điện thoại, laptop cũ của khách hàng với giá cao nhất thị trường. Chúng tôi chuyên thu mua các sản phẩm Apple, Samsung, MacBook với điều kiện tốt nhất.'
    },
    {
      question: 'Quy trình thủ cự đổi mới như thế nào?',
      answer: 'Quy trình gồm 4 bước: 1) Liên hệ tư vấn, 2) Đánh giá sản phẩm, 3) Thỏa thuận giá, 4) Thanh toán và giao nhận. Toàn bộ quá trình diễn ra nhanh chóng và minh bạch.'
    },
    {
      question: 'Giá thu mua được tính như thế nào?',
      answer: 'Giá thu mua được tính dựa trên: tình trạng sản phẩm, thời gian sử dụng, phiên bản, dung lượng, màu sắc, và tình trạng thị trường hiện tại. Chúng tôi cam kết đưa ra mức giá cạnh tranh nhất.'
    },
    {
      question: 'Có cần hóa đơn mua hàng không?',
      answer: 'Không bắt buộc, nhưng nếu có hóa đơn mua hàng chính hãng sẽ giúp tăng giá trị sản phẩm. Chúng tôi vẫn thu mua các sản phẩm không có hóa đơn với mức giá phù hợp.'
    },
    {
      question: 'Thanh toán bằng hình thức nào?',
      answer: 'Chúng tôi hỗ trợ thanh toán bằng tiền mặt, chuyển khoản ngân hàng, hoặc trừ vào sản phẩm mới nếu khách hàng có nhu cầu đổi máy. Thanh toán ngay sau khi thỏa thuận.'
    },
    {
      question: 'Có thu mua sản phẩm bị lỗi không?',
      answer: 'Có, chúng tôi thu mua cả sản phẩm bị lỗi với mức giá phù hợp. Tuy nhiên, giá sẽ thấp hơn so với sản phẩm hoạt động bình thường tùy theo mức độ lỗi.'
    }
  ];

  const renderOverview = () => (
    <div className="tab-content d-block" >
      <div className="overview-section">
        <h2>🎯 Dịch vụ Thủ cự đổi mới</h2>
        <p className="lead">
          Chuyên thu mua điện thoại, laptop cũ với giá cao nhất thị trường. 
          Cam kết đánh giá chính xác, thanh toán nhanh chóng, dịch vụ chuyên nghiệp.
        </p>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Giá cao nhất</h3>
            <p>Cam kết đưa ra mức giá thu mua cao nhất thị trường</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Nhanh chóng</h3>
            <p>Đánh giá và thanh toán trong vòng 30 phút</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>An toàn</h3>
            <p>Quy trình minh bạch, bảo mật thông tin khách hàng</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Đa dạng</h3>
            <p>Thu mua tất cả dòng iPhone, Samsung, MacBook</p>
          </div>
        </div>

        <div className="why-choose-us">
          <h3>Tại sao chọn chúng tôi?</h3>
          <ul className="benefits-list">
            <li>✅ <strong>5 năm kinh nghiệm</strong> trong lĩnh vực thu mua thiết bị công nghệ</li>
            <li>✅ <strong>Đội ngũ chuyên gia</strong> đánh giá chính xác tình trạng sản phẩm</li>
            <li>✅ <strong>Quy trình chuẩn</strong> đảm bảo minh bạch và công bằng</li>
            <li>✅ <strong>Hỗ trợ 24/7</strong> tư vấn và giải đáp mọi thắc mắc</li>
            <li>✅ <strong>Thanh toán ngay</strong> không cần chờ đợi</li>
            <li>✅ <strong>Bảo mật tuyệt đối</strong> thông tin cá nhân khách hàng</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderProcess = () => (
    <div className="tab-content  d-block">
      <div className="process-section">
        <h2>⚙️ Quy trình thủ cự đổi mới</h2>
        
        <div className="process-steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Liên hệ tư vấn</h3>
              <p>Gọi hotline hoặc chat trực tiếp để được tư vấn về sản phẩm của bạn</p>
              <div className="contact-info">
                <span>📞 Hotline: 0123.456.789</span>
                <span>💬 Zalo: 0123.456.789</span>
                <span>📧 Email: thucu@truonglcd.com</span>
              </div>
            </div>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Đánh giá sản phẩm</h3>
              <p>Chuyên gia kiểm tra chi tiết tình trạng sản phẩm</p>
              <ul>
                <li>Kiểm tra ngoại hình, màn hình</li>
                <li>Test chức năng, hiệu năng</li>
                <li>Xác minh IMEI, serial number</li>
                <li>Đánh giá phụ kiện đi kèm</li>
              </ul>
            </div>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Thỏa thuận giá</h3>
              <p>Đưa ra mức giá thu mua dựa trên tình trạng thực tế</p>
              <ul>
                <li>Giá tham khảo thị trường</li>
                <li>Điều chỉnh theo tình trạng sản phẩm</li>
                <li>Thương lượng công bằng</li>
                <li>Cam kết giá không thay đổi</li>
              </ul>
            </div>
          </div>

          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Thanh toán & Giao nhận</h3>
              <p>Hoàn tất giao dịch và thanh toán ngay lập tức</p>
              <ul>
                <li>Ký hợp đồng thu mua</li>
                <li>Thanh toán theo phương thức đã thỏa thuận</li>
                <li>Xóa dữ liệu cá nhân (nếu yêu cầu)</li>
                <li>Bàn giao sản phẩm</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="process-note">
          <h4>📝 Lưu ý quan trọng:</h4>
          <ul>
            <li>Vui lòng sao lưu dữ liệu trước khi mang sản phẩm đến</li>
            <li>Mang theo hóa đơn mua hàng (nếu có) để được giá tốt hơn</li>
            <li>Đảm bảo sản phẩm đã được sạc pin để test</li>
            <li>Thời gian đánh giá: 15-30 phút tùy loại sản phẩm</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderPricing = () => (
    <div className="tab-content  d-block">
      <div className="pricing-section">
        <h2>💰 Bảng giá thu mua</h2>
        <p className="pricing-note">
          <strong>Lưu ý:</strong> Giá có thể thay đổi tùy theo tình trạng thực tế của sản phẩm. 
          Liên hệ trực tiếp để được báo giá chính xác nhất.
        </p>

        {pricingData.map((category, index) => (
          <div key={index} className="pricing-category">
            <h3>{category.category}</h3>
            <div className="pricing-table">
              <div className="table-header">
                <div className="col-model">Sản phẩm</div>
                <div className="col-price">Giá thu mua</div>
                <div className="col-condition">Điều kiện</div>
              </div>
              {category.models.map((model, modelIndex) => (
                <div key={modelIndex} className="table-row">
                  <div className="col-model">{model.name}</div>
                  <div className="col-price">{model.price}đ</div>
                  <div className="col-condition">{model.condition}</div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="pricing-factors">
          <h3>📊 Các yếu tố ảnh hưởng đến giá:</h3>
          <div className="factors-grid">
            <div className="factor-item positive">
              <h4>✅ Tăng giá</h4>
              <ul>
                <li>Có hóa đơn mua hàng chính hãng</li>
                <li>Phụ kiện đầy đủ (sạc, tai nghe, hộp)</li>
                <li>Màu sắc hiếm, dung lượng cao</li>
                <li>Thời gian sử dụng ngắn</li>
              </ul>
            </div>
            <div className="factor-item negative">
              <h4>❌ Giảm giá</h4>
              <ul>
                <li>Màn hình bị nứt, vỡ</li>
                <li>Lỗi phần cứng, phần mềm</li>
                <li>Mất phụ kiện</li>
                <li>Thời gian sử dụng lâu</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConditions = () => (
    <div className="tab-content  d-block">
      <div className="conditions-section">
        <h2>📝 Điều kiện thu mua</h2>
        
        <div className="conditions-grid">
          <div className="condition-card">
            <h3>📱 Điện thoại</h3>
            <ul>
              <li>iPhone từ iPhone 8 trở lên</li>
              <li>Samsung Galaxy từ S9 trở lên</li>
              <li>Màn hình không bị vỡ hoàn toàn</li>
              <li>Không bị khóa iCloud/Google</li>
              <li>IMEI không bị báo mất cắp</li>
            </ul>
          </div>

          <div className="condition-card">
            <h3>💻 Laptop</h3>
            <ul>
              <li>MacBook từ 2018 trở lên</li>
              <li>Laptop Windows từ 2020 trở lên</li>
              <li>Màn hình không bị vỡ</li>
              <li>Bàn phím hoạt động bình thường</li>
              <li>Không bị khóa firmware</li>
            </ul>
          </div>

          <div className="condition-card">
            <h3>📋 Giấy tờ cần thiết</h3>
            <ul>
              <li>CMND/CCCD người bán</li>
              <li>Hóa đơn mua hàng (nếu có)</li>
              <li>Hộp sản phẩm (nếu có)</li>
              <li>Phụ kiện đi kèm</li>
            </ul>
          </div>

          <div className="condition-card">
            <h3>🚫 Không thu mua</h3>
            <ul>
              <li>Sản phẩm bị khóa bảo mật</li>
              <li>IMEI bị báo mất cắp</li>
              <li>Sản phẩm giả, nhái</li>
              <li>Bị hỏng hoàn toàn</li>
              <li>Không xác định được nguồn gốc</li>
            </ul>
          </div>
        </div>

        <div className="important-notes">
          <h3>⚠️ Lưu ý quan trọng:</h3>
          <div className="notes-grid">
            <div className="note-item">
              <h4>🔒 Bảo mật thông tin</h4>
              <p>Chúng tôi cam kết bảo mật tuyệt đối thông tin cá nhân và không sử dụng vào mục đích khác.</p>
            </div>
            <div className="note-item">
              <h4>💰 Giá cả minh bạch</h4>
              <p>Giá thu mua được tính dựa trên tình trạng thực tế và thị trường, không có phí ẩn.</p>
            </div>
            <div className="note-item">
              <h4>⚡ Thanh toán nhanh</h4>
              <p>Thanh toán ngay sau khi thỏa thuận, không cần chờ đợi hay thủ tục phức tạp.</p>
            </div>
            <div className="note-item">
              <h4>🔄 Đổi trả</h4>
              <p>Khách hàng có thể hủy giao dịch trong vòng 24h nếu chưa hài lòng.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFAQ = () => (
    <div className="tab-content  d-block">
      <div className="faq-section">
        <h2>❓ Câu hỏi thường gặp</h2>
        
        <div className="faq-list">
          {faqData.map((faq, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question">
                <h4>{faq.question}</h4>
                <span className="faq-icon">+</span>
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="contact-section">
          <h3>📞 Liên hệ tư vấn</h3>
          <p>Vẫn còn thắc mắc? Hãy liên hệ với chúng tôi để được tư vấn chi tiết:</p>
          
          <div className="contact-methods">
            <div className="contact-method">
              <div className="contact-icon">📞</div>
              <div className="contact-info">
                <h4>Hotline</h4>
                <p>0123.456.789</p>
                <span>8:00 - 22:00 hàng ngày</span>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="contact-icon">💬</div>
              <div className="contact-info">
                <h4>Zalo</h4>
                <p>0123.456.789</p>
                <span>Hỗ trợ 24/7</span>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="contact-icon">📧</div>
              <div className="contact-info">
                <h4>Email</h4>
                <p>thucu@truonglcd.com</p>
                <span>Phản hồi trong 2h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'process':
        return renderProcess();
      case 'pricing':
        return renderPricing();
      case 'conditions':
        return renderConditions();
      case 'faq':
        return renderFAQ();
      default:
        return renderOverview();
    }
  };

  return (
    <>
      <Header />
      <div className="body-wrap">
        <div className="thucu-doi-moi-page">
          <div className="container">
            <div className="page-header">
              <h1>🔄 Thủ cự đổi mới</h1>
              <p className="page-subtitle">
                Thu mua điện thoại, laptop cũ với giá cao nhất thị trường
              </p>
            </div>

            <div className="tabs-container">
              <div className="tabs-nav">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="tab-icon">{tab.icon}</span>
                    <span className="tab-label">{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="tabs-content">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ThucuDoiMoi;
