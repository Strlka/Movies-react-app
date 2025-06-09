import { SimpleGrid, Text, Box, Spinner } from '@chakra-ui/react';
import useGenres from '../hooks/useGenres';
import useMovies, { Movie } from '../hooks/useMovies';
import MovieCard from './MovieCard';
import MoviePage from './MoviePage';
import { useEffect, useMemo, useState } from 'react';
import MovieCardSkeleton from './MovieCardSkeleton';
import MovieCardContainer from './MovieCardContainer';
import useSearchMovies from '../hooks/useSearchMovies';
import InfiniteScroll from 'react-infinite-scroll-component';
import useMovieQueryStore from '../store';


interface Props {
  onTotalResultsChange: ((totalResults: number | '') => void);
}


const MovieGrid = ({ onTotalResultsChange }: Props) => {

  const searchText = useMovieQueryStore(s => s.movieQuery.searchText);
  const isSearching = !!searchText; 
    
  const {data: moviesResults, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useMovies();

  const movies: Movie[] = useMemo(() => {
    if (typeof moviesResults === 'undefined') {
      return [];
    }
    return moviesResults.pages.flatMap(page => page.results);
  }, [moviesResults]);
  
  
  const {data: genres} = useGenres();
  
  const { 
          data: foundResults, 
          fetchNextPage: fetchSearchingNextPage, 
          isLoading: isSearchLoading, 
          hasNextPage: hasSearchingNextPage,
          isFetchingNextPage: isFetchingSearchingNextPage 
        } = useSearchMovies(searchText || '');
  
  const foundMovies: Movie[] = useMemo(() => {
    if (typeof foundResults === 'undefined') {
      return [];
    }
    return foundResults.pages.flatMap(page => page.results).sort((a, b) => b.vote_count - a.vote_count);
  }, [foundResults]);


  useEffect(() => {
    onTotalResultsChange(foundResults?.pages[0].total_results ?? '');
  }, [foundResults]);


  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [showMoviePage, setShowMoviePage] = useState(false);
  const [currentMovie, setCurrentMovie] = useState({});

  const backToMoviesCards = () => {
    setCurrentMovie({});
    setShowMoviePage(false);
  }

  if (error) return <Text>{error.message}</Text>;

  return (
    <>
      {!showMoviePage && 
      <InfiniteScroll
        dataLength={isSearching ? foundMovies.length : movies.length}
        hasMore={isSearching ? !!hasSearchingNextPage : !!hasNextPage}
        next={() => isSearching ? fetchSearchingNextPage() : fetchNextPage()}
        loader={<Spinner size="lg" color="teal.400" marginLeft='45%'/>}
      >
      <SimpleGrid columns={{sm: 2, md: 3, lg: 4, xl: 5}} padding='10px' gap={5}>
        {!isLoading && ((movies.length === 0 && !isLoading) || (foundMovies?.length === 0 && isSearching && !isSearchLoading)) && <Text gap={10}>Movies not foud</Text>}
        {(isSearching ? foundMovies : movies).map((movie) => (
          <MovieCardContainer key={movie.id}>
            <MovieCard movie={movie} genres={genres || []} onClick={() => {setShowMoviePage(true), setCurrentMovie(movie)}} />
          </MovieCardContainer>
          ))}
        {(isLoading || isSearchLoading || isFetchingNextPage || isFetchingSearchingNextPage) && skeletons.map((skeleton) => (
          <MovieCardContainer key={skeleton}>
            <MovieCardSkeleton />
          </MovieCardContainer>
          ))} 
      </SimpleGrid>
      </InfiniteScroll>}
      {showMoviePage && <Box padding='10px' gap={10}> 
        <MoviePage movie={currentMovie as Movie} genres={genres || []} backToMoviesCards={backToMoviesCards}/>
      </Box>}
    </>
  )
}

export default MovieGrid
