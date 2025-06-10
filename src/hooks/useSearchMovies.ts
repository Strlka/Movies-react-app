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
    total_results: number;
}    


const useSearchMovies = (searchText?: string) => useInfiniteQuery({
    queryKey: ['foundMovies', searchText],
    queryFn: ({pageParam}) => {
        return apiClient
                    .get<FetchMoviesResponse>('/3/search/movie', {params: {page: pageParam, query: searchText}})
                    .then(res => res.data)},
    getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.total_pages) {
            return lastPage.page + 1;
        } 
        return undefined;
    },
    enabled: !!searchText,
    initialPageParam: 1,
    staleTime: 24 * 60 * 60 * 1000, //24h
})


//     const [foudMovies, setFoundMovies] = useState<Movie[]>([]);
//     const [error, setError] = useState('');
//     const [isLoading, setLoading] = useState(false);

//     const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


//     useEffect(() => {

//         const controller = new AbortController();

//         setLoading(true);
//         setFoundMovies([]);

//         pages.forEach(page => {
        
//         apiClient.get<FetchMoviesResponse>('/3/search/movie', {signal: controller.signal, params: {page: page, query: searchText}})
//             .then(res => {
//                 setFoundMovies(prevMovies => {
//                     const newMovies = [...prevMovies, ...res.data.results];
//                     const unique = Array.from(new Map(newMovies.map(m => [m.id, m])).values());
//                     const sortedByVoteCount = unique.sort((a, b) => b.vote_count - a.vote_count);
//                     return sortedByVoteCount;
//             });
//                 setLoading(false);
//             })
//             .catch(err => {
//                 if (err instanceof CanceledError) return;
//                 setError(err.message);
//                 setLoading(false);
//             });
//         });    
        
//         return () => controller.abort();
//     }, [searchText]);

//     return { foudMovies, error, isLoading };

// }

export default useSearchMovies