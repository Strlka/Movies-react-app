import apiClient from "../services/api-client";
import { useQuery } from "@tanstack/react-query";

export interface Poster {
    aspect_ratio: number;
    height: number;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
}

interface FetchImagesResponse {
    id: number;
    posters: Poster[];
}    


const useImages = (movie_id?: string) => useQuery({

    queryKey: ['images', movie_id],
    queryFn: () => apiClient
        .get<FetchImagesResponse>(`/3/movie/${movie_id}/images`, {params: {language: 'en'}})
        .then(res => res.data.posters),

    staleTime: 24 * 60 * 60 * 1000, //24h,
    enabled: !!movie_id,
});


export default useImages