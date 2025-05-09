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

    const [movies, setGames] = useState<Movie[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);

    useEffect( () => {

        const controller = new AbortController();

        setLoading(true);
        
        apiClient.get<FetchMoviesResponse>('/3/movie/now_playing', {signal: controller.signal})
            .then(res => {
                setGames(res.data.results);
                setLoading(false);
            })
            .catch(err => {
                if (err instanceof CanceledError) return;
                setError(err.message);
                setLoading(false);
            });
        
        return () => controller.abort(); 

    }, []);

    return { movies, error, isLoading };

}

export default useMovies