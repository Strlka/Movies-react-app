import apiClient from "../services/api-client";
import { useQuery } from "@tanstack/react-query";


export interface Provider {
    logo_path: string;
    provider_id: number;
    provider_name: string
    display_priority: number;
}

interface FetchProvidersResponse {
    id: number;
    results: {
        US: {
            link: string;
            flatrate: Provider[];
            rent: Provider[];
        }
    };
}    


const useProviders = (movie_id: number) => useQuery({

    queryKey: ['providers', movie_id],
    queryFn: () => apiClient
        .get<FetchProvidersResponse>(`/3/movie/${movie_id}/watch/providers`)
        .then(res => {
                const allResults = res.data.results?.US;
                const combined = [
                    ...(allResults?.flatrate ?? []),
                    ...(allResults?.rent ?? []),
                ];
                return combined;
        }),
    staleTime: 24 * 60 * 60 * 1000, //24h,
         
});

export default useProviders