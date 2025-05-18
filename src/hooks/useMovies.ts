import { CanceledError } from "axios";
import apiClient from "../services/api-client";
import { useEffect, useState } from "react";


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


const useMovies = (genre?: string, watchProviders?: string) => {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);

    const pages = [1, 2, 3, 4, 5];


    useEffect(() => {

        const controller = new AbortController();

        setLoading(true);
        setMovies([]);

        const params: any = {};
        if (genre) params.with_genres = genre;
        if (watchProviders) {
            params.with_watch_providers = watchProviders;
            params.watch_region = 'US';
        }

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
    }, [genre, watchProviders]);

    return { movies, error, isLoading };

}

export default useMovies