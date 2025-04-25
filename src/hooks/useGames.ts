import { CanceledError } from "axios";
import apiClient from "../services/api-client";
import { useEffect, useState } from "react";


export interface Movie {
    id: number,
    title: string,
    vote_average: number,
    backdrop_path: string,
}

interface FetchGamesResponse {
    count: number;
    results: Movie[];
}    


const useGames = () => {

    const [games, setGames] = useState<Movie[]>([]);
    const [error, setError] = useState('');

    useEffect( () => {

        const controller = new AbortController();
        
        apiClient.get<FetchGamesResponse>('/3/movie/top_rated', {signal: controller.signal})
            .then(res => setGames(res.data.results))
            .catch(err => {
                if (err instanceof CanceledError) return;
                setError(err.message);
            });
        
        return () => controller.abort(); 

    }, []);

    return { games, error };

}

export default useGames