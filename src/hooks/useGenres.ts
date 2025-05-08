import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { useEffect, useState } from "react";

export interface Genre {
    id: number,
    name: string,
}

interface FetchGamesGenresResponse {
    genres: Genre[];
}   


const useGenres = () => {

    const [genres, setGenres] = useState<Genre[]>([]);
    const [error, setError] = useState('');

    useEffect( () => {

        const controller = new AbortController();
        
        apiClient.get<FetchGamesGenresResponse>('3/genre/movie/list', {signal: controller.signal})
            .then(res => setGenres(res.data.genres))
            .catch(err => {
                if (err instanceof CanceledError) return;
                setError(err.message);
            });
        
        return () => controller.abort(); 

    }, []);

    return { genres, error };

}
 
export default useGenres;

export const getGenresName = (elems: number[], genres: Genre[]) => {
    return elems
        .map((elem) => genres.find((genre) => genre.id === elem)?.name)
        .filter(Boolean);
};
