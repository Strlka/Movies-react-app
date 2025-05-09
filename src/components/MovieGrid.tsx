import { SimpleGrid, Text, Box } from '@chakra-ui/react';
import useGenres from '../hooks/useGenres';
import useMovies, { Movie } from '../hooks/useMovies';
import MovieCard from './MovieCard';
import MoviePage from './MoviePage';
import { useState } from 'react';
import MovieCardSkeleton from './MovieCardSkeleton';
import MovieCardContainer from './MovieCardContainer';


const MovieGrid = () => {
    
  const {movies, error, isLoading} = useMovies();
  const {genres} = useGenres();

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  const [showMoviePage, setShowMoviePage] = useState(false);
  const [currentMovie, setCurrentMovie] = useState({});

  const backToMoviesCards = () => {
    setCurrentMovie({});
    setShowMoviePage(false);
  }

// if (genres.length === 0) {
//     return <Text>Loading genres...</Text>;
// }

  return (
    <>
      {error && <Text>{error}</Text>}
      {!showMoviePage && <SimpleGrid columns={{sm: 1, md: 2, lg: 3, xl: 4}} padding='10px' gap={10}>
        {isLoading && skeletons.map((skeleton) => (
          <MovieCardContainer>
            <MovieCardSkeleton key={skeleton}/>
          </MovieCardContainer>
          ))}
        {movies.map((movie) => (
          <MovieCardContainer>
            <MovieCard key={movie.id} movie={movie} genres={genres} onClick={() => {setShowMoviePage(true), setCurrentMovie(movie)}} />
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
