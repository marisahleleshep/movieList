// import { useState, useEffect } from "react";

// import { getMovieDetails } from "@/app/utilities/utils";
// import { MovieProps } from "../api/category";

// function UseMovieDetails( movieId :number){
//     const [movieDetail, setMovieDetail] = useState<MovieProps>();    
    
//     useEffect(() => {
//         const fetchMovieDetails = (async () => {
//             const movieDetails = await getMovieDetails(movieId );
//             console.log("movie details ",movieDetails);           
//              setMovieDetail(movieDetails)
//         });
//         fetchMovieDetails();
//     }, [movieId])
//     return movieDetail;
// };
// export default UseMovieDetails;