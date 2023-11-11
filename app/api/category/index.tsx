'use client';
import { IMAGE_BASE_URL } from '@/app/config';
import Link from 'next/link';
import React, { useState, useEffect, Fragment } from 'react';

type Genre = {
  id: number;
  name: string;
};

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
};

const Genres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [displayedMovie, setDisplayedMovie] = useState<Movie | null>(null); 
  
  useEffect(() => {
    fetchGenres();
  }, []);  
  
  const fetchGenres = async () => {
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/genre/movie/list?api_key=8644a1c8f15817cdc93d07d6ccdc34fb'
      );
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error(error);
    }
  };  const fetchMoviesByGenre = async (genreId: number) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=8644a1c8f15817cdc93d07d6ccdc34fb&with_genres=${genreId}`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };  const handleMovieClick = (movie: Movie) => {
    setDisplayedMovie(movie);
  };  return (
    <div className="p-4 text-white">
      <div className="flex flex-wrap gap-4 mb-4 ml-4">
        {genres.map((genre) => (
          <button
            key={genre.id}
            className="bg-gray-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-full"
            onClick={() => {
              setSelectedGenre(genre.id);
              fetchMoviesByGenre(genre.id);
            }}
          >
            {genre.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <Fragment key={movie.id}>
            <div
              className="relative group cursor-pointer"
              onClick={() => handleMovieClick(movie)}
            >
              <Link href={`/movie/${movie.id}`} key={movie.id}>
                <div>
                  <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
                </div>
              </Link>            </div>
          </Fragment>
        ))}{displayedMovie && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex">
        <div className="w-1/3">
          <img
            src={`${IMAGE_BASE_URL}${displayedMovie.poster_path}`}
            alt={`${displayedMovie.title} Poster`}
            className="max-w-full h-auto mb-2 rounded-lg"
          />
        </div>
        <div className="w-2/3 pl-4">
          <h2 className="text-2xl font-semibold mb-2">{displayedMovie.title}</h2>
          <h1 className="text-lg font-semibold mb-2 text-black">Overview:</h1>
          <p className="text-sm max-h-28 overflow-y-auto text-black">{displayedMovie.overview}</p>
          <h1 className="text-lg font-semibold mb-2 mt-4 text-black">Release Date:</h1>
          <p className="text-sm text-black">{displayedMovie.release_date}</p>
        </div>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
};export default Genres;



// 'use client';
// import { IMAGE_BASE_URL } from '@/app/config';
// import Link from 'next/link';
// import React, { useState, useEffect, Fragment } from 'react';
// import useGetCategory from '@/app/hooks/useGetCategory';

// type Genre = {
//   id: number;
//   name: string;
// };

// type Movie = {
//   id: number;
//   title: string;
//   poster_path: string; 
//   overview: string;
//   release_date: string;
// };

// const Genres = () => {
//   const [genres, setGenres] = useState<Genre[]>([]);
//   const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [displayedMovie, setDisplayedMovie] = useState<Movie | null>(null);

//   useEffect(() => {
//     fetchGenres();
//   }, []);

//   const fetchGenres = async () => {
//     try {
//       const response = await fetch(
//         'https://api.themoviedb.org/3/genre/movie/list?api_key=8644a1c8f15817cdc93d07d6ccdc34fb'
//       );
//       const data = await response.json();
//       setGenres(data.genres);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchMoviesByGenre = async (genreId: number) => {
//     try {
//       const response = await fetch(
//         `https://api.themoviedb.org/3/discover/movie?api_key=8644a1c8f15817cdc93d07d6ccdc34fb&with_genres=${genreId}`
//       );
//       const data = await response.json();
//       setMovies(data.results);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleMovieClick = (movie: Movie) => {
//     setDisplayedMovie(movie);
//   };

//   return (
//     <div className="p-4 text-white">
//       <div className="flex flex-wrap gap-4 mb-4 ml-4">
//         {genres.map((genre) => (
//           <button
//             key={genre.id}
//             className="bg-gray-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-full"
//             onClick={() => {
//               setSelectedGenre(genre.id);
//               fetchMoviesByGenre(genre.id);
//             }}
//           >
//             {genre.name}
//           </button>
//         ))}
//       </div>
//       <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {movies.map((movie) => (
//           <Fragment key={movie.id}>
//             <div
//               className="relative group cursor-pointer"
//               onClick={() => handleMovieClick(movie)}
//             >
//               <Link href={`/movie/${movie.id}`} key={movie.id}>
//                 <div>
//                   <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
//                 </div>
//               </Link>
             
//             </div>
//           </Fragment>
//         ))}


// {displayedMovie && (
//   <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
//     <div className="bg-white p-4 rounded-lg shadow-lg">
//       <div className="flex">
//         <div className="w-1/3">
//           <img
//             src={`${IMAGE_BASE_URL}${displayedMovie.poster_path}`}
//             alt={`${displayedMovie.title} Poster`}
//             className="max-w-full h-auto mb-2 rounded-lg"
//           />
//         </div>
//         <div className="w-2/3 pl-4">
//           <h2 className="text-2xl font-semibold mb-2">{displayedMovie.title}</h2>
//           <h1 className="text-lg font-semibold mb-2 text-black">Overview:</h1>
//           <p className="text-sm max-h-28 overflow-y-auto text-black">{displayedMovie.overview}</p>
//           <h1 className="text-lg font-semibold mb-2 mt-4 text-black">Release Date:</h1>
//           <p className="text-sm text-black">{displayedMovie.release_date}</p>
//         </div>
//       </div>
//     </div>
//   </div>
// )}
//       </div>
//     </div>
//   );
// };

// export default Genres;


// 'use client';
// import { IMAGE_BASE_URL } from '@/app/config';
// import Link from 'next/link';
// import React, { useState, useEffect, Fragment } from 'react';
// import useGetCategory from '@/app/hooks/useGetCategory';




// const Genres = () => {
//   const [genres, setGenres] = useState();
//   const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
//   const [movies, setMovies] = useState(); // Initialize the movies array
//   const [displayedMovie, setDisplayedMovie] = useState< | null>(); // Initialize displayedMovie if used



//   return (
//     <div className="p-4 text-white">
//       <div className="flex flex-wrap gap-4 mb-4 ml-4">
//         {genres.map((genre) => (
//           <button
//             key={genre.id}
//             className="bg-gray-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-full"
//             onClick={() => {
//               setSelectedGenre(genre.id);
//               fetchMoviesByGenre(genre.id);
//             }}
//           >
//             {genre.name}
//           </button>
//         ))}
//       </div>
//       <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {movies.map((movie) => (
//           <Fragment key={movie.id}>
//             <div
//               className="relative group cursor-pointer"
//               onClick={() => handleMovieClick(movie)}
//             >
//               <Link href={`/movie/${movie.id}`} key={movie.id}>
//                 <div>
//                   <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
//                 </div>
//               </Link>
             
//             </div>
//           </Fragment>
//         ))}


// {displayedMovie && (
//   <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
//     <div className="bg-white p-4 rounded-lg shadow-lg">
//       <div className="flex">
//         <div className="w-1/3">
//           <img
//             src={`${IMAGE_BASE_URL}${displayedMovie.poster_path}`}
//             alt={`${displayedMovie.title} Poster`}
//             className="max-w-full h-auto mb-2 rounded-lg"
//           />
//         </div>
//         <div className="w-2/3 pl-4">
//           <h2 className="text-2xl font-semibold mb-2">{displayedMovie.title}</h2>
//           <h1 className="text-lg font-semibold mb-2 text-black">Overview:</h1>
//           <p className="text-sm max-h-28 overflow-y-auto text-black">{displayedMovie.overview}</p>
//           <h1 className="text-lg font-semibold mb-2 mt-4 text-black">Release Date:</h1>
//           <p className="text-sm text-black">{displayedMovie.release_date}</p>
//         </div>
//       </div>
//     </div>
//   </div>
// )}
//       </div>
//     </div>
//   );
// };

// export default Genres;









// 'use client';
// import React, { Fragment } from 'react';
// import Link from 'next/link';
// import { IMAGE_BASE_URL } from '@/app/config';
// import useGetCategory from '@/app/hooks/useGetCategory';



// const Genres = () => {
//   const {
//     genres,
//     setSelectedGenre,
//     movies,
//     displayedMovie,
//     handleMovieClick,
//     fetchMoviesByGenre,
//   } = useGetCategory(); 

//   return (
//     <div className="p-4 text-white">
//       <div className="flex flex-wrap gap-4 mb-4 ml-4">
//         {genres.map((genre) => (
//           <button
//             key={genre.id}
//             className="bg-gray-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-full"
//             onClick={() => {
//               setSelectedGenre(genre.id);
//               fetchMoviesByGenre(genre.id);
//             }}
//           >
//             {genre.name}
//           </button>
//         ))}
//       </div>
//       <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {movies.map((movie) => (
//           <Fragment key={movie.id}>
//             <div
//               className="relative group cursor-pointer"
//               onClick={() => handleMovieClick(movie)}
//             >
//               <Link href={`/movie/${movie.id}`} key={movie.id}>
//                 <div>
//                   <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
//                 </div>
//               </Link>
//             </div>
//           </Fragment>
//         ))}

//         {displayedMovie && (
//           <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
//             <div className="bg-white p-4 rounded-lg shadow-lg">
//               <div className="flex">
//                 <div className="w-1/3">
//                   <img
//                     src={`${IMAGE_BASE_URL}${displayedMovie.poster_path}`}
//                     alt={`${displayedMovie.title} Poster`}
//                     className="max-w-full h-auto mb-2 rounded-lg"
//                   />
//                 </div>
//                 <div className="w-2/3 pl-4">
//                   <h2 className="text-2xl font-semibold mb-2">{displayedMovie.title}</h2>
//                   <h1 className="text-lg font-semibold mb-2 text-black">Overview:</h1>
//                   <p className="text-sm max-h-28 overflow-y-auto text-black">{displayedMovie.overview}</p>
//                   <h1 className="text-lg font-semibold mb-2 mt-4 text-black">Release Date:</h1>
//                   <p className="text-sm text-black">{displayedMovie.release_date}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Genres;




// 'use client';
// import React, { useState, useEffect, ReactNode } from 'react';

// import { IMAGE_BASE_URL } from '@/app/config';
// import Link from 'next/link';
// import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
// import 'react-multi-carousel/lib/styles.css';
// import { getMovies } from '@/app/utilities/utils';
// import Carousel from 'react-multi-carousel';
// import MovieDetail from '@/app/movie/[movieId]/page';


// export interface MovieProps {
//   runtime: ReactNode;
//   genres: any;
//   vote_average: ReactNode;
//   id: number;
//   title: string;
//   genre_ids: number[];
//   poster_path: string;
//   backdrop_path: string;
//   overview: string;
// }
// export interface Genre {
//   id: number;
//   name: string;
// }

// function movieDetail() {
//   const [movies, setMovies] = useState<MovieProps[]>([]);
//   const [genres, setGenres] = useState<Genre[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedGenre, setSelectedGenre] = useState<number | null>(null);  
  
//   useEffect(() => {
//     fetchGenres();
//   }, []);  
  
//   const fetchGenres = async () => {
//     try {
//       const response = await fetch(
//         'https://api.themoviedb.org/3/genre/movie/list?api_key=8644a1c8f15817cdc93d07d6ccdc34fb'
//       );
//       const data = await response.json();
//       if (data.genres) {
//         setGenres(data.genres);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };  useEffect(() => {
//     (async () => {
//       const movies = await getMovies();
//       setMovies(movies);
//     })();
//   }, []); 
//    const handleGenreClick = (genreId: number) => {
//     fetchMoviesByGenre(genreId)
//     setSelectedGenre(genreId);
//   }; 
//    const handleNextClick = () => {
//     setCurrentIndex((prevIndex) => prevIndex + 1);
//     setSelectedGenre(null);
//   }; 
//    const handleAllClick = () => {
//     setSelectedGenre(null);
//   }; 
//    const handlePrevClick = () => {
//     setCurrentIndex((prevIndex) => prevIndex - 1);
//     setSelectedGenre(null);
//   };  
//   const filteredMovies = selectedGenre
//     ? movies.filter((movie) => movie.genre_ids.includes(selectedGenre))
//     : movies;  return (
//     <main>
//       <div className="bg-black">
//         <Carousel responsive={{}} keyBoardControl={true} infinite={true}>
          
//           {movies.map((movie) => (
//             <div key={movie.id}>
//               <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
//             </div>
//           ))}
//         </Carousel>
//         <div className="flex space-x-8 py-5 px-24 ml-28">
//           <div
//             onClick={handleAllClick}
//             className={`cursor-pointer ${selectedGenre === null ? 'bg-yellow-500 text-white' : 'bg-slate-800 text-white'
//               } rounded-3xl py-2 whitespace-nowrap px-12 font-semibold`}
//           >
//             All
//           </div>
//           {genres && genres.slice(currentIndex, currentIndex + 6).map((gen) => (
//             <div
//               key={gen.id}
//               onClick={() => handleGenreClick(gen.id)}
//               className={`cursor-pointer ${selectedGenre === gen.id ? 'bg-yellow-500 text-white' : 'bg-slate-800 text-white'
//                 } rounded-3xl py-2 whitespace-nowrap px-12 font-semibold`}
//             >
//               {gen.name}
//             </div>
//           ))}
//           <div className="flex-shrink-0 mt-3">
//             {currentIndex > 0 && (
//               <IoIosArrowBack
//                 size={24}
//                 className="text-white cursor-pointer absolute left-16 -mt-1 ml-7"
//                 onClick={handlePrevClick}
//               />
//             )}
//             {genres && currentIndex + 5 < genres.length && (
//               <IoIosArrowForward
//                 size={24}
//                 className="text-white cursor-pointer -mt-1"
//                 onClick={handleNextClick}
//               />
//             )}
//           </div>
//         </div>
//         <div className="grid grid-cols-4 gap-4">
//           {filteredMovies.length > 0 ? (
//             filteredMovies.map((item) => (
//               <Link href={`/movie/${item.id}`} key={item.id}>
//                 <div className="overflow-hidden  ">
//                   <img src={`${IMAGE_BASE_URL}${item.poster_path}`} alt={item.title} />
//                 </div>
//               </Link>
//             ))
//           ) : (
//             <p className="text-white"></p>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }

// export default MovieDetail;
// function fetchMoviesByGenre(genreId: number) {
//   throw new Error('Function not implemented.');
// }


// import React, { useState, useEffect, ReactNode } from 'react';
// import { IMAGE_BASE_URL } from '@/app/config';
// import Link from 'next/link';
// import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
// import 'react-multi-carousel/lib/styles.css';
// import { getMovies } from '@/app/utilities/utils';
// import Carousel from 'react-multi-carousel';
// import useGetCategory from '@/app/hooks/useGetCategory';

// export interface MovieProps {
//   runtime: ReactNode;
//   genres: any;
//   vote_average: ReactNode;
//   id: number;
//   title: string;
//   genre_ids: number[];
//   poster_path: string;
//   backdrop_path: string;
//   overview: string;
// }
// export interface Genre {
//   id: number;
//   name: string;
// }

// export default function MovieList() {
//   const [movies, setMovies] = useState<MovieProps[]>([]);
//   const [genres, setGenres] = useState<Genre[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  
//   useEffect(() => {
//     fetchGenres();
//     fetchData();
//   }, []);

//   const fetchGenres = async () => {
//     try {
//       const response = await fetch(
//         'https://api.themoviedb.org/3/genre/movie/list?api_key=8644a1c8f15817cdc93d07d6ccdc34fb'
//       );
//       const data = await response.json();
//       if (data.genres) {
//         setGenres(data.genres);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchMoviesByGenre = async (genreId: number) => {
//     try {
//       const response = await fetch(
//         `https://api.themoviedb.org/3/discover/movie?api_key=8644a1c8f15817cdc93d07d6ccdc34fb&with_genres=${genreId}`
//       );
//       const data = await response.json();
//       setMovies(data.results);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchData = async () => {
//     try {
//       const movies = await getMovies(); 
//       setMovies(movies);
//     }
//      catch (error) {
//       console.error(error);
//     }
//   };

//   const handleGenreClick = (genreId: number) => {
//     fetchMoviesByGenre(genreId)
//     setSelectedGenre(genreId);
//   };

//   const handleNextClick = () => {
//     setCurrentIndex((prevIndex) => prevIndex + 1);
//     setSelectedGenre(null);
//   };

//   const handleAllClick = () => {
//     setSelectedGenre(null);
//   };

//   const handlePrevClick = () => {
//     setCurrentIndex((prevIndex) => prevIndex - 1);
//     setSelectedGenre(null);
//   };

//   const filteredMovies = selectedGenre
//     ? movies.filter((movie) => movie.genre_ids.includes(selectedGenre))
//     : movies;

//   return (
//     <main>
//       <div className="bg-black">
//         <Carousel responsive={{}} keyBoardControl={true} infinite={true}>
//           {movies.length > 0 ? (
//             movies.map((movie) => (
//               <div key={movie.id}>
//                 <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
//               </div>
//             ))
//           ) : (
//             <p className="text-white">Loading...</p>
//           )}
//         </Carousel>
//         <div className="flex space-x-8 py-5 px-24 ml-28">
//           <div
//             onClick={handleAllClick}
//             className={`cursor-pointer ${selectedGenre === null ? 'bg-yellow-500 text-white' : 'bg-slate-800 text-white'
//               } rounded-3xl py-2 whitespace-nowrap px-12 font-semibold`}
//           >
//             All
//           </div>
//           {genres && genres.slice(currentIndex, currentIndex + 6).map((gen) => (
//             <div
//               key={gen.id}
//               onClick={() => handleGenreClick(gen.id)}
//               className={`cursor-pointer ${selectedGenre === gen.id ? 'bg-yellow-500 text-white' : 'bg-slate-800 text-white'
//                 } rounded-3xl py-2 whitespace-nowrap px-12 font-semibold`}
//             >
//               {gen.name}
//             </div>
//           ))}
//           <div className="flex-shrink-0 mt-3">
//             {currentIndex > 0 && (
//               <IoIosArrowBack
//                 size={24}
//                 className="text-white cursor-pointer absolute left-16 -mt-1 ml-7"
//                 onClick={handlePrevClick}
//               />
//             )}
//             {genres && currentIndex + 5 < genres.length && (
//               <IoIosArrowForward
//                 size={24}
//                 className="text-white cursor-pointer -mt-1"
//                 onClick={handleNextClick}
//               />
//             )}
//           </div>
//         </div>
//         <div className="grid grid-cols-4 gap-4">
//           {filteredMovies.length > 0 ? (
//             filteredMovies.map((item) => (
//               <Link href={`/movie/${item.id}`} key={item.id}>
//                 <div className="overflow-hidden  ">
//                   <img src={`${IMAGE_BASE_URL}${item.poster_path}`} alt={item.title} />
//                 </div>
//               </Link>
//             ))
//           ) : (
//             <p className="text-white"></p>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }
