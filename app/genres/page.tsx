import { useState, useEffect } from 'react';
import { getMovies } from '../utilities/utils';
import { IMAGE_BASE_URL } from '@/app/config';
import Link from 'next/link';

interface MovieProps {
  id: number;
  title: string;
  genre_ids: number[];
  poster_path: string;
}

export default function MoviesComponent() {
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getMovies();
        const movies = response.results; 
        setMovies(movies);
        console.log('Fetched movies:', movies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    })();
  }, []);

  console.log('Movies state:', movies);

  return (
    <main className='p-2'>
      <h1>Popular movies</h1>
      <div className='grid grid-cols-4 gap-4'>
        {movies.map((item) => (
          <Link href={`/movie/${item.id}`} key={item.id}>
            <div>
              <img src={`${IMAGE_BASE_URL}${item.poster_path}`} alt={item.title} />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}


// import { useState, useEffect } from 'react';
// import { getGenres, getMovies } from '../utilities/utils';
// import { IMAGE_BASE_URL } from '@/app/config';
// import Link from 'next/link';

// interface Genre {
//   id: number;
//   name: string;
// }

// interface Movie {
//   id: number;
//   title: string;
//   genre_ids: number[];
//   poster_path: string;
// }

// export default function MoviesComponent() {
//   const [genres, setGenres] = useState<Genre[] | null>(null);
//   const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
//   const [movies, setMovies] = useState<Movie[]>([]);

//   useEffect(() => {
//     const fetchGenres = async () => {
//       try {
//         const genreData = await getGenres();
//         setGenres(genreData.genres);
//       } catch (error) {
//         console.error('Error fetching genres:', error);
//       }
//     };

//     const fetchMovies = async () => {
//       try {
//         const movieData = await getMovies();
//         setMovies(movieData.results);
//       } catch (error) {
//         console.error('Error fetching movies:', error);
//       }
//     };

//     fetchGenres();
//     fetchMovies();
//   }, []);

//   const handleGenreClick = (genreId: number) => {
//     setSelectedGenre(genreId);
//   };

//   const filteredMovies = selectedGenre
//     ? movies.filter((movie) => movie.genre_ids.includes(selectedGenre))
//     : movies;

//   return (
//     <main className='p-2'>
//       <h1>Popular movies</h1>

//       <div className='flex gap-2'>
//         {genres &&
//           genres.map((genre) => (
//             <button
//               key={genre.id}
//               className={`px-4 py-2 cursor-pointer rounded-full border ${
//                 selectedGenre === genre.id ? 'bg-primary text-white' : 'border-primary text-primary'
//               }`}
//               onClick={() => handleGenreClick(genre.id)}
//             >
//               {genre.name}
//             </button>
//           ))}
//       </div>

//       <div className='grid grid-cols-4 gap-4 mt-4'>
//         {filteredMovies.map((movie) => (
//           <Link href={`/movie/${movie.id}`} key={movie.id}>
//             <div>
//               <img
//                 src={`${IMAGE_BASE_URL}${movie.poster_path}`}
//                 alt={movie.title}
//               />
//             </div>
//           </Link>
//         ))}
//       </div>
//     </main>
//   );
// }