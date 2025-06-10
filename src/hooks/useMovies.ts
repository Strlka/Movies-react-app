import useMovieQueryStore from "../store";
import apiClient from "../services/api-client";
import { useInfiniteQuery } from "@tanstack/react-query";


export interface Movie {
    id: number;
    title: string;
    vote_average: number;
    poster_path: string;
    genre_ids: number[];
    backdrop_path: string;
    overview: string;
    release_date: string;
    original_language: string;
    popularity: number;
    vote_count: number;
}

interface FetchMoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
}    


const useMovies = () => {

    const movieQuery = useMovieQueryStore(s => s.movieQuery);

    return useInfiniteQuery({
    queryKey: ['movies', movieQuery],
    queryFn: ({pageParam}) => {
        const params: any = {};
        if (movieQuery.genreId) params.with_genres = String(movieQuery.genreId);
        if (movieQuery.providerId) {
            params.with_watch_providers = String(movieQuery.providerId);
            params.watch_region = 'US';
        }
        if (movieQuery.selectorParam) params.sort_by = movieQuery.selectorParam;
        return apiClient
            .get<FetchMoviesResponse>('/3/discover/movie', {params: {page: pageParam, ...params}})
            .then(res => res.data)
        },
    getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.total_pages) {
            return lastPage.page + 1;
        } 
        return undefined;
    },
    initialPageParam: 1,
    staleTime: 24 * 60 * 60 * 1000, //24h
})
}


//     const [movies, setMovies] = useState<Movie[]>([]);
//     const [error, setError] = useState('');
//     const [isLoading, setLoading] = useState(true);

//     const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


//     useEffect(() => {

//         const controller = new AbortController();

//         setLoading(true);
//         setMovies([]);

//         const params: any = {};
//         if (movieQuery.genre) params.with_genres = String(movieQuery.genre.id);
//         if (movieQuery.provider) {
//             params.with_watch_providers = String(movieQuery.provider.provider_id);
//             params.watch_region = 'US';
//         }
//         if (movieQuery.selector) params.sort_by = movieQuery.selector.param;
   


//         const pagesRequests = pages.map(page => {
//             return apiClient.get<FetchMoviesResponse>('/3/discover/movie', {signal: controller.signal, params: {page: page, ...params}})
//                 .catch(err => {
//                     if (err instanceof CanceledError) return;
//                     setError(err.message);
//                 });
//             });

//             Promise.all(pagesRequests).then((responces: Array<AxiosResponse<FetchMoviesResponse> | void>) => {
//                 if (typeof responces[0] === 'undefined') {
//                     return;
//                 }

//                 let allMovies: Movie[] = [];
//                 allMovies = allMovies.concat(...responces.map(res => res!.data.results));
//                 const unique: Movie[] = Array.from(new Map(allMovies.map(m => [m.id, m])).values());
//                 setMovies(unique);
//                 setLoading(false);
//             })
        
//         return () => controller.abort();
//     }, [movieQuery]);

//     return { movies, error, isLoading };

// }

export default useMovies