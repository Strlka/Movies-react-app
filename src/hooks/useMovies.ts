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
    
}

interface FetchMoviesResponse {
    page: number;
    results: Movie[];
}    


const useMovies = () => {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);

    const pages = [1, 2, 3, 4, 5];


    useEffect(() => {

        const controller = new AbortController();

        setLoading(true);

        pages.forEach(page => {
        
        apiClient.get<FetchMoviesResponse>('/3/discover/movie', {signal: controller.signal, params: {page: page}})
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
    }, []);

    return { movies, error, isLoading };

}

export default useMovies