import apiClient from "../services/api-client";
import { useQuery } from "@tanstack/react-query";
import providers from "../data/providers";


export interface Provider {
    logo_path: string;
    provider_id: number;
    provider_name: string
    display_priority: number;
}

interface FetchProvidersResponse {
    results: Provider[]
}    


const useAllProviders = () => useQuery({

    queryKey: ['providersList'],
    queryFn: () => apiClient
        .get<FetchProvidersResponse>(`/3/watch/providers/movie`)
        .then(res => res.data.results),
    initialData: providers,    
    staleTime: 24 * 60 * 60 * 1000, //24h,
});


export default useAllProviders


export const getProvidersWithId = (elems: string[], providers: Provider[]) => {
    return elems
        .map((elem) => providers.find((p) => p.provider_name === elem))
        .filter(Boolean);
};