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
    const [isLoading, setLoading] = useState(false);

    useEffect( () => {

        const controller = new AbortController();

        setLoading(true);
        
        apiClient.get<FetchGamesGenresResponse>('3/genre/movie/list', {signal: controller.signal})
            .then(res => {
                setGenres(res.data.genres);
                setLoading(false);
            })
            .catch(err => {
                if (err instanceof CanceledError) return;
                setError(err.message);
                setLoading(false);
            });
        
        return () => controller.abort(); 

    }, []);

    return { genres, error, isLoading };

}
 
export default useGenres;

export const getGenresName = (elems: number[] = [], genres: Genre[] = []) => {
    return elems
        .map((elem) => genres.find((genre) => genre.id === elem)?.name)
        .filter(Boolean);
};
