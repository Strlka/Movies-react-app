import apiClient from "../services/api-client";
import { useQuery } from "@tanstack/react-query";


export interface Video {
    name: string;
    key: string;
    site: string;
    id: string;
}

interface FetchVideosResponse {
    id: number;
    results: Video[];
}    


const useVideos = (movie_id?: string) => useQuery({

    queryKey: ['providers', movie_id],
    queryFn: () => apiClient
        .get<FetchVideosResponse>(`/3/movie/${movie_id}/videos`)
        .then(res => res.data.results),

    staleTime: 24 * 60 * 60 * 1000, //24h,
         
});


export default useVideos
