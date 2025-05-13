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
    id: number;
    results: {
        US: {
            link: string;
            rent: Provider[];
        }
    };
}    


const useMovies = (movie_id: number) => {

    const [providers, setProviders] = useState<Provider[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);

    useEffect( () => {

        const controller = new AbortController();

        setLoading(true);
        
        apiClient.get<FetchProvidersResponse>(`/3/movie/${movie_id}/watch/providers`, {signal: controller.signal})
            .then(res => {
                setProviders(res.data.results.US.rent);
                setLoading(false);
            })
            .catch(err => {
                if (err instanceof CanceledError) return;
                setError(err.message);
                setLoading(false);
            });
        
        return () => controller.abort(); 

    }, []);

    return { providers, error, isLoading };

}

export default useMovies