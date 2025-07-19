import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { useQuery, useQueryClient } from '@tanstack/react-query'


export interface Movie {
    id: number;
    title: string;
    vote_average: number;
    poster_path: string;
    genre_ids: number[];
    backdrop_path: string;
    overview: string;
    release_date: string;
    original_language: string;
    popularity: number;
    vote_count: number;
}

interface FetchMoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
}    


// const useAllFavoriteMovies = (movieID: number, accountId?: number, sessionId?: string) => {
//     const [movies, setMovies] = useState<Movie[]>([]);
//     const queryClient = useQueryClient();

//     useEffect(() => {
//         const getAllPages = async () => {
//             let totalPages = 1;
//             const movies: Movie[] = [];

//             for(let i = 1; i <= totalPages; i++) {
//                 const page = i;
                
//                 const result = await queryClient.fetchQuery({
//                     queryKey: ['favoriteMoviesPage', accountId, sessionId, page],
//                     queryFn: () => apiClient.get<FetchMoviesResponse>(
//                       `/3/account/${accountId}/favorite/movies`,
//                        {params: {page: page, session_id: sessionId}})
//                     })

//                   const isFirstPage = i === 1;
//                   if (isFirstPage) {
//                     totalPages = result.data.total_pages
//                   }

//                   movies.concat(...result.data.results);
//             }

//              setMovies(movies);
//     }

//     getAllPages();
//     }, []);



//     return {
//         isFavorite: movies.some(movie => movie.id === movieID),
//         movies,
//     }
// }


// export default useAllFavoriteMovies


const fetchAllFavoriteMovies = async (accountId: number, sessionId: string) => {
    
    const first = await apiClient
      .get<FetchMoviesResponse>(`/3/account/${accountId}/favorite/movies`, {
        params: { session_id: sessionId, page: 1 }
      }).then(res => res.data);
  
    let movies = [...first.results];
  
    const pagePromises = [];
    for (let page = 2; page <= first.total_pages; page++) {
      pagePromises.push(
        apiClient
          .get<FetchMoviesResponse>(`/3/account/${accountId}/favorite/movies`, {
            params: { session_id: sessionId, page }
          })
          .then(res => res.data.results)
      );
    }
    const restPages = await Promise.all(pagePromises);
    for (const pageMovies of restPages) {
      movies = movies.concat(pageMovies);
    }
  
    return movies;
  };
  
  const useAllFavoriteMovies = (movieID: number, accountId?: number, sessionId?: string) => {
    const { data: movies = [], ...query } = useQuery({
      queryKey: ['allFavoriteMovies', accountId, sessionId],
      queryFn: () => {
        if (!accountId || !sessionId) return Promise.resolve([]);
        return fetchAllFavoriteMovies(accountId, sessionId);
      },
      enabled: !!accountId && !!sessionId,
      staleTime: 24 * 60 * 60 * 1000, //24h,
    });
  
    return {
      isFavorite: movies.some(movie => movie.id === movieID),
      movies,
      ...query
    }
  }
  
  export default useAllFavoriteMovies;