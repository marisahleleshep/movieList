const BASE_URL = process.env.REACT_APP_BASE_URL;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;


export const getMovies =async() =>{
    try{
    const response = await fetch (`/api/get-movies`,{
        method:'GET',
    })
    const result = await response.json();
    return result;
    }
    catch(error){
        return error;
    }
    }
export const getGenres = async() =>{
    try{
        const response = await fetch (`/api/get-genres`,{
            method:'GET',
        })
        const result = await response.json();
        return result.genres;
    }
    catch(error){
        return error;
    }
}

 

export async function getMovieDetails(movieId:number) {
    const url=`/api/getMovieDetails/${movieId}`
    try{
        const response=await fetch(url)
        if(!response.ok){
            return `movie with id ${movieId} not found`
        }
        const result=await response.json()
        return result;
    }
    catch(error){
        return error
    }
}

export const getmovies = async () => {
    try {
      const response = await fetch("movie/get-movies"); 
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Failed to fetch movies");
    }
  };



export const now_playing = async () => {
  try {
    const response = await fetch(`${BASE_URL}/3/movie/now_playing`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const nowPlaying = async () => {
    try {
      const response = await fetch(`${BASE_URL}/3/movie/now_playing`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return error;
    }
  };







