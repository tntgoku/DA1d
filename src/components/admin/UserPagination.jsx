import { useState, useEffect, useMemo } from "react";

// Component phân trang cho User
export const UserPagination = ({ filteredUsers, onPageChange }) => {
  // Thêm state phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // 10 users mỗi trang

  // Tính toán users cho trang hiện tại
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage, itemsPerPage]);

  // Tính tổng số trang
  const totalPages = useMemo(() => {
    return Math.ceil(filteredUsers.length / itemsPerPage);
  }, [filteredUsers.length, itemsPerPage]);

  // Reset về trang 1 khi bộ lọc thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredUsers]);

  useEffect(() => {
    onPageChange(paginatedUsers);
  }, [paginatedUsers, onPageChange]);

  // Hàm chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Hàm chuyển đến trang trước
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Hàm chuyển đến trang tiếp theo
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (totalPages <= 1) return null;

  const pageNumbers = [];
  const maxVisiblePages = 5; // Số trang hiển thị tối đa

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // Điều chỉnh nếu ở đầu hoặc cuối
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        {/* Nút trang trước */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button 
            className="page-link" 
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
        </li>

        {/* Trang đầu tiên */}
        {startPage > 1 && (
          <>
            <li className="page-item">
              <button 
                className="page-link" 
                onClick={() => handlePageChange(1)}
              >
                1
              </button>
            </li>
            {startPage > 2 && (
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            )}
          </>
        )}

        {/* Các trang số */}
        {pageNumbers.map(pageNumber => (
          <li 
            key={pageNumber} 
            className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
          >
            <button 
              className="page-link" 
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}

        {/* Trang cuối cùng */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            )}
            <li className="page-item">
              <button 
                className="page-link" 
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </button>
            </li>
          </>
        )}

        {/* Nút trang tiếp theo */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button 
            className="page-link" 
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};
