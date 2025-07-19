import apiClient from "../services/api-client";
import { useInfiniteQuery } from "@tanstack/react-query";


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


const useRatedMovies = (accountId: number, sessionId?: string, isForceReload = false) => {

    return useInfiniteQuery({
    queryKey: ['ratedMovies', accountId, sessionId],
    queryFn: ({pageParam}) => {
        return apiClient
            .get<FetchMoviesResponse>(`/3/account/${accountId}/rated/movies`, {params: {page: pageParam, session_id: sessionId}})
            .then(res => res.data)
        },
    getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.total_pages) {
            return lastPage.page + 1;
        } 
        return undefined;
    },
    initialPageParam: 1,
    staleTime: 24 * 60 * 60 * 1000, //24h,
    refetchOnMount: isForceReload
})
}

export default useRatedMovies