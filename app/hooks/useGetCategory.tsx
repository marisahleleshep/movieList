import { SetStateAction, useEffect, useState } from 'react';
import { getMovies } from '../utilities/utils';
import { movieSearchEndpoint } from '../api/getMovieDetails/[movie_id]/route';




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

const useGetCategory = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [displayedMovie, setDisplayedMovie] = useState<Movie | null>();

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
  };

  const fetchMoviesByGenre = async (genreId: number) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=8644a1c8f15817cdc93d07d6ccdc34fb&with_genres=${genreId}`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMovieClick = (movie: Movie) => {
    setDisplayedMovie(movie);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return { genres, selectedGenre, setSelectedGenre, movies, displayedMovie, handleMovieClick, fetchMoviesByGenre };
};

export default useGetCategory


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

// const useGetCategory = () => {
//   const [genres, setGenres] = useState<Genre[]>([]);
//   const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [displayedMovie, setDisplayedMovie] = useState<Movie | null>();

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

//   useEffect(() => {
//     fetchGenres();
//   }, []);

//   return { genres, selectedGenre, movies, displayedMovie, handleMovieClick, fetchMoviesByGenre };
// };
// export default useGetCategory;
