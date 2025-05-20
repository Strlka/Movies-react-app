import { CanceledError } from "axios";
import apiClient from "../services/api-client";
import { useEffect, useState } from "react";
import { MovieQuery } from "../App";


export interface Movie {
    id: number,
    title: string,
    vote_average: number,
    poster_path: string,
    genre_ids: number[],
    backdrop_path: string,
    overview: string,
    release_date: string,
    original_language: string,
    
}

interface FetchMoviesResponse {
    page: number;
    results: Movie[];
}    


const useMovies = (movieQuery: MovieQuery) => {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);

    const pages = [1, 2, 3, 4, 5];


    useEffect(() => {

        const controller = new AbortController();

        setLoading(true);
        setMovies([]);

        const params: any = {};
        if (movieQuery.genre) params.with_genres = String(movieQuery.genre.id);
        if (movieQuery.provider) {
            params.with_watch_providers = String(movieQuery.provider.provider_id);
            params.watch_region = 'US';
        }
        if (movieQuery.selector) params.sort_by = movieQuery.selector.param;

        pages.forEach(page => {
        
        apiClient.get<FetchMoviesResponse>('/3/discover/movie', {signal: controller.signal, params: {page: page, ...params}})
            .then(res => {
                setMovies(prevMovies => {
                    const newMovies = [...prevMovies, ...res.data.results];
                    const unique = Array.from(new Map(newMovies.map(m => [m.id, m])).values());
                    return unique;
            });
                setLoading(false);
            })
            .catch(err => {
                if (err instanceof CanceledError) return;
                setError(err.message);
                setLoading(false);
            });
        });    
        
        return () => controller.abort();
    }, [movieQuery]);

    return { movies, error, isLoading };

}

export default useMovies