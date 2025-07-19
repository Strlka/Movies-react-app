import apiClient from "../services/api-client";
import { useQuery } from "@tanstack/react-query";


export interface Account {
    avatar: {
        gravatar: {};
        tmdb: {
            avatar_path: string;
        }
    }
    id: number;
    name: string;
    username: string;
}

const useAccount = (sessionID: string) => useQuery({
    queryKey: ['account', sessionID,],
    queryFn: () => apiClient
        .get<Account>(`/3/account?session_id=${sessionID}`)
        .then(res => res.data),
    enabled: !!sessionID,
    staleTime: 24 * 60 * 60 * 1000, //24h
})

export default useAccount