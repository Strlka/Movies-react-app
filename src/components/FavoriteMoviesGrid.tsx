import { SimpleGrid, Text, Spinner } from '@chakra-ui/react';
import useGenres from '../hooks/useGenres';
import { Movie } from '../hooks/useMovies';
import MovieCard from './MovieCard';
import { useMemo, useState } from 'react';
import MovieCardSkeleton from './MovieCardSkeleton';
import MovieCardContainer from './MovieCardContainer';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import useFavoriteMovies from '../hooks/useFavoriteMovies';
import useRatedMovies from '../hooks/useRatedMovies';

interface Props {
    accountId: number
    sessionID: string | null
    showRatedmovies: boolean
}


const FavoriteMoviesGrid = ({accountId, sessionID, showRatedmovies}: Props) => {

  const navigate = useNavigate();
    
  const {data: favoriteMovies, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useFavoriteMovies(accountId, sessionID!, true);

  const {
    data: ratedMovies, 
    error: ratedError, 
    isLoading: ratedIsLoading, 
    fetchNextPage: ratedFetchNextPage, 
    hasNextPage: ratedHasNextPage, 
    isFetchingNextPage: ratedIsFetchingNextPage 
  } = useRatedMovies(accountId, sessionID!, true);

  const movies: Movie[] = useMemo(() => {
    if (typeof favoriteMovies === 'undefined') {
      return [];
    }
    return favoriteMovies.pages.flatMap(page => page.results);
  }, [favoriteMovies]);

  const moviesWithRating: Movie[] = useMemo(() => {
    if (typeof ratedMovies === 'undefined') {
      return [];
    }
    return ratedMovies.pages.flatMap(page => page.results);
  }, [ratedMovies]);
 
  
  const {data: genres} = useGenres();
  

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  if (error) return <Text>{error.message}</Text>;
  if (ratedError) return <Text>{ratedError.message}</Text>;

  return (
    <>
      <InfiniteScroll
        dataLength={showRatedmovies ? moviesWithRating.length : movies.length}
        hasMore={showRatedmovies ? !!ratedHasNextPage : !!hasNextPage}
        next={() => showRatedmovies ? ratedFetchNextPage() : fetchNextPage()}
        loader={<Spinner size="lg" color="teal.400" marginLeft='45%'/>}
      >
      <SimpleGrid columns={{sm: 2, md: 3, lg: 4, xl: 5}} padding='10px' gap={5}>
        {(!isLoading && movies.length === 0) || (showRatedmovies && !ratedIsLoading && moviesWithRating.length === 0) && <Text>Movies not foud</Text>}
        {(showRatedmovies ? moviesWithRating : movies).map((movie) => (
          <MovieCardContainer key={`movie_${movie.id}`}>
            <MovieCard movie={movie} genres={genres || []} onClick={() => navigate(`/movies/${movie.id}`)} />
          </MovieCardContainer>
          ))}
        {(isLoading || isFetchingNextPage) || (ratedIsLoading || ratedIsFetchingNextPage) && skeletons.map((skeleton) => (
          <MovieCardContainer key={skeleton}>
            <MovieCardSkeleton />
          </MovieCardContainer>
          ))} 
      </SimpleGrid>
      </InfiniteScroll>
    </>
  )
}

export default FavoriteMoviesGrid