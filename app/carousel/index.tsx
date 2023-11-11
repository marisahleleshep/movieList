'use client'
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { IMAGE_BASE_URL } from "@/app/config";


interface Movie {
  id: number;
  title: string;
  genre_ids: number[];
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

const Carousels = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/discover/movie?api_key=8644a1c8f15817cdc93d07d6ccdc34fb")
      .then(res => res.json())
      .then(data => setPopularMovies(data.results))
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="text-white py-4 mt-[-4%] ">
      <div className="w-full">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          interval={3000}
          infiniteLoop={true}
          showStatus={false}
          className="carousel"
          emulateTouch={true}
          renderIndicator={(clickHandler, isSelected, index, label) => {
            if (isSelected) {
              return (
                <li
                  className="inline-block mx-1 mb-5 w-6 h-6 rounded-full bg-white opacity-75 cursor-pointer"
                  onClick={clickHandler}
                  title={label}
                />
              );
            }
            return (
              <li
                className="inline-block mx-1 mb-5 w-6 h-6 rounded-full bg-white opacity-25 cursor-pointer"
                onClick={clickHandler}
                title={label}
              />
            );
          }}
        >
          {popularMovies.map(movie => (
            <div className="carousel-item" key={movie.id}>
              <div className="relative h-screen">
                <img
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full"
                />
                <div className="carousel-overlay absolute left-0 right-0 bottom-0 top-0 flex flex-col justify-end px-4 py-6 bg-black bg-opacity-60">
                  <h2 className="text-2xl font-semibold text-white mb-5">{movie.title}</h2>
                  <p className="text-gray-400 mb-5">{movie.release_date}</p>
                  <p className="mt-2 text-white-200 mb-20">{movie.overview}</p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Carousels;


// import React, { useEffect, useState } from "react";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';
// import { IMAGE_BASE_URL } from "@/app/config";


// interface Movie {
//   id: number;
//   title: string;
//   genre_ids: number[];
//   poster_path: string;
//   overview: string;
//   release_date: string;
//   vote_average: number;
// }

// const Carousels = () => {
//   const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

//   useEffect(() => {
//     fetch("https://api.themoviedb.org/3/discover/movie?api_key=8644a1c8f15817cdc93d07d6ccdc34fb")
//       .then(res => res.json())
//       .then(data => setPopularMovies(data.results))
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   return (
//     <div className="text-white py-4 mt-[-4%] ">
//       <div className="ml-[2%] w-[100%] max-h-screen overflow-y-scroll">
//         <Carousel
//           showThumbs={false}
//           autoPlay={true}
//           interval={3000}
//           infiniteLoop={true}
//           showStatus={false}
//           className="carousel"
//           emulateTouch={true}
//           renderIndicator={(clickHandler, isSelected, index, label) => {
//             const indicatorClasses = isSelected ? "inline-block mx-1 mb-5 w-6 h-6 rounded-full bg-white opacity-75 cursor-pointer" : "inline-block mx-1 mb-5 w-6 h-6 rounded-full bg-white opacity-25 cursor-pointer";
            
//             return (
//               <li
//                 className={indicatorClasses}
//                 onClick={clickHandler}
//                 title={label}
//               />
//             );
//           }}
//         >
//           {popularMovies.map(movie => (
//             <div className="carousel-item" key={movie.id}>
//               <div className="relative">
//                 <img
//                   src={`${IMAGE_BASE_URL}${movie.poster_path}`}
//                   alt={movie.title}
//                   className="w-full"
//                 />
//                 <div className="carousel-overlay absolute left-0 right-0 bottom-0 top-0 flex flex-col justify-end px-4 py-6 bg-black bg-opacity-60">
//                   <h2 className="text-2xl font-semibold text-white mb-5">{movie.title}</h2>
//                   <p className="text-gray-400 mb-5">{movie.release_date}</p>
//                   <p className="mt-2 text-gray-200 mb-20">{movie.overview}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Carousel>
//       </div>
//     </div>
//   );
// };

// export default Carousels;