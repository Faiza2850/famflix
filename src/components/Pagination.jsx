import React from 'react';

const Pagination = ({ showsPerPage, totalShows, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalShows / showsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-10">
      <ul className="flex space-x-2">
        {pageNumbers.map(number => (
          <li key={number} className={`px-4 py-2 rounded cursor-pointer ${currentPage === number ? 'bg-gray-700 text-white' : 'bg-gray-200'}`} onClick={() => paginate(number)}>
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
