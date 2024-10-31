import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Pagination from './Pagination'

const Content = () => {
  const [shows, setShows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const showsPerPage = 10;

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch('https://api.tvmaze.com/shows');
        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.error('Error fetching the shows:', error);
      }
    };

    fetchShows();
  }, []);

  // Get current shows
  const indexOfLastShow = currentPage * showsPerPage;
  const indexOfFirstShow = indexOfLastShow - showsPerPage;
  const currentShows = shows.slice(indexOfFirstShow, indexOfLastShow);
  const totalPages = Math.ceil(shows.length / showsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className='grid lg:grid-cols-5 gap-x-10 -ml-7 mr-0 px-20 lg:-mt-20'>
        {currentShows.map(show => (
          <div key={show.id} className='flex gap-7 py-6 flex-col rounded'>
            //
            <Link to={`/show/${show.id}`}>
              <img
                className='transition-transform duration-300 transform hover:scale-110 rounded'
                src={show.image?.medium || 'default-image-url.jpg'}
                alt={show.name}
              />
            </Link>
            <h3 className='text-xl font-bold text-center'>{show.name}</h3>
            <p>
              {show.summary
                ? show.summary.replace(/<[^>]+>/g, '').split(" ").slice(0, 20).join(" ") + "..."
                : 'No description available.'
              }
            </p>
          </div>
        ))}
      </div>
      <Pagination
        showsPerPage={showsPerPage}
        totalShows={shows.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Content;
