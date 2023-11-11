import { SetStateAction, useEffect, useState } from 'react';
import { getmovies } from '../utilities/utils';
import { movieSearchEndpoint } from '../api/getMovieDetails/[movie_id]/route';


interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

const useGetMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchQuery) {
          const response = await fetch(movieSearchEndpoint(searchQuery));
          const data = await response.json();
          setMovies(data.results);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [searchQuery]);

  const handleSearchChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchQuery(event.target.value)
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie((prevSelectedMovie) => (prevSelectedMovie === movie ? null : movie));
  };

  return { movies, selectedMovie, handleSearchChange, handleMovieClick };
};

export default useGetMovies;


