import { SimpleGrid, Text, Box } from '@chakra-ui/react';
import useGenres from '../hooks/useGenres';
import useMovies, { Movie } from '../hooks/useMovies';
import MovieCard from './MovieCard';
import MoviePage from './MoviePage';
import { useState } from 'react';


const MovieGrid = () => {
    
  const {movies, error} = useMovies();
  const {genres} = useGenres();

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
        {movies.map(movie => <MovieCard key={movie.id} movie={movie} genres={genres} onClick={() => {setShowMoviePage(true), setCurrentMovie(movie)}} />)}
      </SimpleGrid>}
      {showMoviePage && <Box padding='10px' gap={10}> 
        <MoviePage movie={currentMovie as Movie} genres={genres} backToMoviesCards={backToMoviesCards}/>
      </Box>}
    </>
  )
}

export default MovieGrid
