import { useEffect, useState } from "react";
import React from "react";
import { IoArrowBackCircle } from "react-icons/io5";

const Detail = () => {
  const castUrl = "https://api.tvmaze.com/shows/1/cast"; 
  const showUrl = "https://api.tvmaze.com/shows/1";

  const [cast, setCast] = useState([]); 
  const [showDetails, setShowDetails] = useState({});

  useEffect(() => {
   
    const fetchCast = async () => {
      try {
        const response = await fetch(castUrl);
        const data = await response.json();
        setCast(data); 
      } catch (error) {
        console.error("Error fetching the cast:", error);
      }
    };

    const fetchShowDetails = async () => {
      try {
        const response = await fetch(showUrl);
        const data = await response.json();
        setShowDetails(data); 
      } catch (error) {
        console.error("Error fetching the show details:", error);
      }
    };

    fetchCast();
    fetchShowDetails();
  }, []);

  return (
    <>
      <div className="bg-black text-white px-8 py-8 lg:px-20 lg:py-20 text-lg">
        <h1 className="mb-11 text-5xl font-bold flex gap-6">
          <IoArrowBackCircle />
          FAMFLIX
        </h1>

        <div className="mb-10">
          <h2 className="text-4xl font-semibold">{showDetails.name}</h2>
          <p className="mt-4">{showDetails.summary?.replace(/<[^>]*>/g, "")}</p>

          <div className="grid lg:grid-cols-2 gap-4 mt-8">
            <div className="flex gap-4">
              <h5>Status:</h5>
              <p>{showDetails.status || "Not Available"}</p>
            </div>

            <div className="flex gap-4">
              <h5>Genres:</h5>
              <p>{showDetails.genres?.join(", ") || "Not Available"}</p>
            </div>

            <div className="flex gap-4">
              <h5>Schedule:</h5>
              <p>
                {showDetails.schedule?.days?.join(", ")} at{" "}
                {showDetails.schedule?.time}
              </p>
            </div>

            <div className="flex gap-4">
              <h5>Network:</h5>
              <p>{showDetails.network?.name || "Not Available"}</p>
            </div>
          </div>
        </div>

        <h3 className="text-3xl font-bold mt-12 mb-6">Cast</h3>

        {cast.map((castMember) => (
          <div
            key={castMember.person.id}
            className="lg:flex lg:gap-9 px-5 py-3 lg:px-20 lg:py-8"
          >
            <img
              className="rounded"
              src={castMember.person.image?.medium || "default-image-url.jpg"}
              alt={castMember.person.name}
            />
            <div className="text-white lg:py-8 lg:px-8">
              <h4 className="text-4xl font-semibold mb-8">
                {castMember.person.name}
              </h4>

              <h5 className="text-xl font-bold">Character:</h5>
              <p>{castMember.character.name}</p>

              <h5 className="text-xl font-bold mt-6">Additional Information:</h5>
              <div className="grid lg:grid-cols-2 gap-4 mt-4">
                <div className="flex gap-4">
                  <h5>Birthday:</h5>
                  <p>{castMember.person.birthday || "Not Available"}</p>
                </div>

                <div className="flex gap-4">
                  <h5>Country:</h5>
                  <p>{castMember.person.country?.name || "Not Available"}</p>
                </div>

                <div className="flex gap-4">
                  <h5>Gender:</h5>
                  <p>{castMember.person.gender || "Not Available"}</p>
                </div>

                <div className="flex gap-4">
                  <h5>URL:</h5>
                  <a
                    href={castMember.person.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-100 underline"
                  >
                    Visit Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Detail;
