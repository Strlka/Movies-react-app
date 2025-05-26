import { SimpleGrid, Text, Box } from '@chakra-ui/react';
import useGenres from '../hooks/useGenres';
import useMovies, { Movie } from '../hooks/useMovies';
import MovieCard from './MovieCard';
import MoviePage from './MoviePage';
import { useEffect, useState } from 'react';
import MovieCardSkeleton from './MovieCardSkeleton';
import MovieCardContainer from './MovieCardContainer';
import {MovieQuery} from '../App';
import searchMovies from '../hooks/searchMovies';




interface Props {
  movieQuery: MovieQuery;
  searchText: string;
  isSearching: boolean;
}


const MovieGrid = ({movieQuery, searchText, isSearching }: Props) => {
    
  const {movies, error, isLoading} = useMovies(movieQuery);
  const {genres} = useGenres();
  const { foudMovies } = searchMovies(searchText);


  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  const [showMoviePage, setShowMoviePage] = useState(false);
  const [currentMovie, setCurrentMovie] = useState({});

  const backToMoviesCards = () => {
    setCurrentMovie({});
    setShowMoviePage(false);
  }

  if (error) return <Text>{error}</Text>;


  return (
    <>
      {!showMoviePage && <SimpleGrid columns={{sm: 1, md: 2, lg: 3, xl: 4}} padding='10px' gap={5}>
        {isLoading && skeletons.map((skeleton) => (
          <MovieCardContainer key={skeleton}>
            <MovieCardSkeleton />
          </MovieCardContainer>
          ))}
        {(movies.length === 0 || (foudMovies.length === 0 && isSearching) && !isLoading) && <Text gap={10}>Movies not foud</Text>}
        {(isSearching ? foudMovies : movies).map((movie) => (
          <MovieCardContainer key={movie.id}>
            <MovieCard movie={movie} genres={genres} onClick={() => {setShowMoviePage(true), setCurrentMovie(movie)}} />
          </MovieCardContainer>
          ))}
      </SimpleGrid>}
      {showMoviePage && <Box padding='10px' gap={10}> 
        <MoviePage movie={currentMovie as Movie} genres={genres} backToMoviesCards={backToMoviesCards}/>
      </Box>}
    </>
  )
}

export default MovieGrid
