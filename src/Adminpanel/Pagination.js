import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Function to generate ellipsis (...) element
  const renderEllipsis = () => <li className="page-item disabled"><span className="page-link">...</span></li>;

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
          >
            &laquo;
          </button>
        </li>
        {pages.map((page) => {
          // Show first three pages, last three pages, and current page +/- 1
          if (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 2 && page <= currentPage + 2)
          ) {
            return (
              <li
                key={page}
                className={`page-item ${currentPage === page ? 'active' : ''}`}
              >
                <button className="page-link" onClick={() => onPageChange(page)}>
                  {page}
                </button>
              </li>
            );
          }
          // Show ellipsis for other pages
          else if (
            (page === 2 && currentPage > 4) ||
            (page === totalPages - 1 && currentPage < totalPages - 3)
          ) {
            return renderEllipsis();
          }
          return null;
        })}
        <li
          className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
