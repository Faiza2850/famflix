import React, { useEffect, useState } from 'react';

const Content = () => {
  const [shows, setShows] = useState([]);

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

  return (
    <>
    <div> <h5 className="py-10 text-3xl font-bold lg:hidden text-center ">
            LATEST ADDED SHOWS
        </h5></div>
    <div className='grid lg:grid-cols-5 gap-x-10 -ml-7 mr-0  px-20  lg:-mt-20'>
      
      {shows.map(show => (
        <div key={show.id} className='flex gap-7 py-6 flex-col rounded'>
          <img
            className=' transition-transform duration-300 transform hover:scale-110 rounded'
            src={show.image?.medium || 'default-image-url.jpg'} 
            alt={show.name}
          />
          <h3 className='text-xl font-bold text-center'>{show.name}</h3>
          <p>
  {show.summary 
    ? show.summary.replace(/<[^>]+>/g, '').split(" ").slice(0, 20).join(" ") + 
      (show.summary.split(" ").length > 20 ? "..." : "") 
    : 'No description available.'
  }
</p>
        </div>
      ))}
    </div>
    </>
  );
};

export default Content;
