import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";


export interface Genre {
    id: number;
    name: string;
}

interface FetchGamesGenresResponse {
    genres: Genre[];
}   


const useGenres = () => useQuery({

    queryKey: ['genres'],
    queryFn: () => 
        apiClient
            .get<FetchGamesGenresResponse>('3/genre/movie/list')
            .then(res => res.data.genres),
    staleTime: 24 * 60 * 60 * 1000, //24h

    });

 
export default useGenres;

export const getGenresName = (elems: number[] = [], genres: Genre[] = []) => {
    return elems
        .map((elem) => genres.find((genre) => genre.id === elem)?.name)
        .filter(Boolean);
};
