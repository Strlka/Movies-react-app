import { CanceledError } from "axios";
import apiClient from "../services/api-client";
import { useEffect, useState } from "react";


export interface Provider {
    logo_path: string;
    provider_id: number;
    provider_name: string
    display_priority: number;
}

interface FetchProvidersResponse {
    results: Provider[]
}    


const useAllProviders = () => {

    const [providersList, setProvidersList] = useState<Provider[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);

    useEffect( () => {

        const controller = new AbortController();

        setLoading(true);
        
        apiClient.get<FetchProvidersResponse>(`/3/watch/providers/movie`, {signal: controller.signal, params: {language: 'en-US', watch_region: 'US'}})
            .then(res => {
                setProvidersList(res.data.results);
                setLoading(false);
            })
            .catch(err => {
                if (err instanceof CanceledError) return;
                setError(err.message);
                setLoading(false);
            });
        
        return () => controller.abort(); 

    }, []);

    return { providersList, error, isLoading };

}

export default useAllProviders


export const getProvidersWithId = (elems: string[], providers: Provider[]) => {
    return elems
        .map((elem) => providers.find((p) => p.provider_name === elem))
        .filter(Boolean);
};