import { React,useState } from "react";

const ServiceHistory = ({ services }) => {
const [showDetailModal, setShowDetailModal] = useState(false);
const handleOpenService = (order) => {
    setShowDetailModal(true);
    console.log(order);
  };
  return (
    <div className="service-history">
      <h3>Lịch sử dịch vụ sửa chữa</h3>
      {services.map(service => (
        <div key={service.id} className="service-card">
          <div className="service-header">
            <div>
              <strong>Mã dịch vụ: {service.id}</strong>
              <span className="service-date">Ngày: {service.date}</span>
            </div>
            <div className={`status ${service.status.toLowerCase().replace(' ', '-')}`}>
              {service.status}
            </div>
          </div>
          <div className="service-details">
            <div className="detail-row">
              <span>Thiết bị:</span>
              <span>{service.device}</span>
            </div>
            <div className="detail-row">
              <span>Vấn đề:</span>
              <span>{service.issue}</span>
            </div>
            <div className="detail-row">
              <span>Chi phí:</span>
              <span className="service-cost">{service.cost}</span>
            </div>
          </div>
          <div className="service-actions">
            <button className="btn-outline" onClick={(e)=>handleOpenService(services)}>Xem chi tiết</button>
            <button className="btn-primary">Đặt lại</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceHistory;
