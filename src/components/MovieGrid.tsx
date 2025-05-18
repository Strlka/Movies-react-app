import { SimpleGrid, Text, Box } from '@chakra-ui/react';
import useGenres, { Genre } from '../hooks/useGenres';
import useMovies, { Movie } from '../hooks/useMovies';
import MovieCard from './MovieCard';
import MoviePage from './MoviePage';
import { useState } from 'react';
import MovieCardSkeleton from './MovieCardSkeleton';
import MovieCardContainer from './MovieCardContainer';
import { Provider } from '@/hooks/useAllProviders';
import {MovieQuery} from '../App';



interface Props {
  movieQuery: MovieQuery;
}


const MovieGrid = ({movieQuery}: Props) => {
    
  const {movies, error, isLoading} = useMovies(movieQuery.genre ? String(movieQuery.genre.id) : undefined, movieQuery.provider ? String(movieQuery.provider.provider_id) : undefined);
  const {genres} = useGenres();


  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  const [showMoviePage, setShowMoviePage] = useState(false);
  const [currentMovie, setCurrentMovie] = useState({});

  const backToMoviesCards = () => {
    setCurrentMovie({});
    setShowMoviePage(false);
  }

  const filtersApplied = movieQuery.genre !== null || movieQuery.provider !== null;


  return (
    <>
      {error && <Text>{error}</Text>}
      {!showMoviePage && <SimpleGrid columns={{sm: 1, md: 2, lg: 3, xl: 4}} padding='10px' gap={5}>
        {isLoading && skeletons.map((skeleton) => (
          <MovieCardContainer key={skeleton}>
            <MovieCardSkeleton />
          </MovieCardContainer>
          ))}
        {movies.length === 0 && !isLoading && filtersApplied && <Text gap={10}>Movies not foud</Text>}
        {movies.map((movie) => (
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
