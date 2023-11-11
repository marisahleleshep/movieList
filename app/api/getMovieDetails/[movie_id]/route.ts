// 'use client'
import { BASE_URL, ACCESS_TOKEN} from "@/app/config";
export const apiKey = '8644a1c8f15817cdc93d07d6ccdc34fb';
export const imageBaseURL = 'https://image.tmdb.org/t/p/w300';
export const movieSearchEndpoint = (searchQuery: string) =>
  `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchQuery}&page=1`;

export async function GET(_request:Request,{params}:{params:{movie_id:number}}){
    const movie_id=params.movie_id
    try{
        if (!BASE_URL) {
            return new Response('Movie base url not found',{
                status:404,
                statusText:"failed",
            })
        }
        if(!ACCESS_TOKEN){
            return new Response('Movie access token not found',{
                status:404,
                statusText:'failed'
            })
        }
        const response=await fetch(`${BASE_URL}/3/movie/${movie_id}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${ACCESS_TOKEN}`
            }
        })
        const result=await response.json()
        return new Response(JSON.stringify(result),{
            status:200,
            statusText:"success"
        })
    }
    catch(error:any){
        return new Response(error,{
            status:500,
            statusText:'failed'
        })
    }
}