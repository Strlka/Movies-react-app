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
    popularity: number,
    vote_count: number,
    
}

interface FetchMoviesResponse {
    page: number;
    results: Movie[];
}    


const searchMovies = (searchText: string) => {

    const [foudMovies, setFoundMovies] = useState<Movie[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);

    const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


    useEffect(() => {

        const controller = new AbortController();

        setLoading(true);
        setFoundMovies([]);

        pages.forEach(page => {
        
        apiClient.get<FetchMoviesResponse>('/3/search/movie', {signal: controller.signal, params: {page: page, query: searchText}})
            .then(res => {
                setFoundMovies(prevMovies => {
                    const newMovies = [...prevMovies, ...res.data.results];
                    const unique = Array.from(new Map(newMovies.map(m => [m.id, m])).values());
                    const sortedByVoteCount = unique.sort((a, b) => b.vote_count - a.vote_count);
                    return sortedByVoteCount;
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
    }, [searchText]);

    return { foudMovies, error, isLoading };

}

export default searchMovies