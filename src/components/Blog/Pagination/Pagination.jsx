import React from "react";

const Pagination = ({ postsPerPage, currentPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination justify-content-center margin-top-70">
        <li className="page-item">
          <button className="page-link" onClick={() => paginate(1)}>
            «
          </button>
        </li>
        {pageNumbers.map(number => {

          if(number === currentPage){
            return <li key={number} className="page-item active">
            <button className="page-link" onClick={() => paginate(number)}>
              {number}
            </button>
          </li>
          }
          else{
            return <li key={number} className="page-item">
            <button className="page-link" onClick={() => paginate(number)}>
              {number}
            </button>
          </li>
          }
          
})}
      
        <li className="page-item">
        <button className="page-link" onClick={() => paginate(pageNumbers[pageNumbers.length-1])}>
            »
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
