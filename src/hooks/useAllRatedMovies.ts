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
    rating: number;
}

interface FetchMoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
}   

const fetchAllRatedMovies = async (accountId: number, sessionId: string) => {
    
    const first = await apiClient
      .get<FetchMoviesResponse>(`/3/account/${accountId}/rated/movies`, {
        params: { session_id: sessionId, page: 1 }
      }).then(res => res.data);
  
    let movies = [...first.results];
  
    const pagePromises = [];
    for (let page = 2; page <= first.total_pages; page++) {
      pagePromises.push(
        apiClient
          .get<FetchMoviesResponse>(`/3/account/${accountId}/rated/movies`, {
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
  
  const useAllRatedMovies = (movieID: number, accountId?: number, sessionId?: string) => {
    const { data: movies = [], ...query } = useQuery({
      queryKey: ['allRatedMovies', accountId, sessionId],
      queryFn: () => {
        if (!accountId || !sessionId) return Promise.resolve([]);
        return fetchAllRatedMovies(accountId, sessionId);
      },
      enabled: !!accountId && !!sessionId,
      staleTime: 24 * 60 * 60 * 1000, //24h,
    });
  
    return {
      rating: movies.find(movie => movie.id === movieID)?.rating,
      movies,
      ...query
    }
  }
  
  export default useAllRatedMovies;