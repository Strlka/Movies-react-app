import apiClient from "../services/api-client";
import { useQuery } from '@tanstack/react-query'


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

const fetchRecommendationsMovies = async (movieIds: number[]) => {
  
    let movies: Movie[] = [];
  
    const recommendedMoviesPromises = [];
    for (let id of movieIds) {
      recommendedMoviesPromises.push(
        apiClient
          .get<FetchMoviesResponse>(`/3/movie/${id}/recommendations`)
          .then(res => res.data.results)
      );
    }
    const allRecommendedMovies = await Promise.all(recommendedMoviesPromises);
    for (const recommendedMovies of allRecommendedMovies) {
      movies = movies.concat(recommendedMovies);
    }
  
    return movies;
  };
  
  const useRecommendationsMovies = (movieIds?: number[]) => {
    const { data: movies = [], ...query } = useQuery({
      queryKey: ['recommendationsMovies', movieIds],
      queryFn: () => {
        if (!movieIds) return Promise.resolve([]);
        return fetchRecommendationsMovies(movieIds);
      },
      enabled: !!movieIds,
      staleTime: 24 * 60 * 60 * 1000, //24h,
    });

    const filteredMovies = movieIds ? movies.filter(movie => !movieIds.includes(movie.id)) : movies;

    const uniqueMovies = Array.from(new Map(filteredMovies.map(movie => [movie.id, movie])).values());
  
    return {
      movies: uniqueMovies,
      ...query
    }
  }
  
  export default useRecommendationsMovies;