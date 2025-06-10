import apiClient from "../services/api-client";
import { useQuery } from "@tanstack/react-query";



export interface Movie {
    id: number;
    title: string;
    vote_average: number;
    poster_path: string;
    genres: {id: number, name: string}[];
    backdrop_path: string;
    overview: string;
    release_date: string;
    original_language: string;
    popularity: number;
    vote_count: number;
    budget: number;
    revenue: number;
    homepage: string;
    tagline: string;
}


const useMovie = (slug?: string) => useQuery({
    queryKey: ['movie', slug],
    queryFn: ({queryKey}) => {
        const [, slug] = queryKey;
        return apiClient
        .get<Movie>(`/3/movie/${slug}`)
        .then(res => res.data)
    },
    enabled: !!slug,
    staleTime: 24 * 60 * 60 * 1000, //24h
})

export default useMovie