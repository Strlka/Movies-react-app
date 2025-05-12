import { SimpleGrid, Text, Box } from '@chakra-ui/react';
import useGenres, { Genre } from '../hooks/useGenres';
import useMovies, { Movie } from '../hooks/useMovies';
import MovieCard from './MovieCard';
import MoviePage from './MoviePage';
import { useEffect, useMemo, useState } from 'react';
import MovieCardSkeleton from './MovieCardSkeleton';
import MovieCardContainer from './MovieCardContainer';

interface Props {
  selectedGenre: Genre | null;
}


const MovieGrid = ({selectedGenre}: Props) => {
    
  const {movies, error, isLoading} = useMovies();
  const {genres} = useGenres();

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  const [showMoviePage, setShowMoviePage] = useState(false);
  const [currentMovie, setCurrentMovie] = useState({});

  const backToMoviesCards = () => {
    setCurrentMovie({});
    setShowMoviePage(false);
  }

  const [moviesByGenre, setMoviesByGenre] = useState<Movie[] | null>(null);
  const [moviesNotFound, setMoviesNotFound] = useState(false);


  useEffect(() => {
    if (selectedGenre) {
      const filteredMovies = movies.filter((movie) => movie.genre_ids.includes(selectedGenre.id))
      setMoviesByGenre(filteredMovies);
      if (filteredMovies.length === 0) setMoviesNotFound(true);
        else setMoviesNotFound(false);
    } else {
      setMoviesByGenre(null);
      setMoviesNotFound(false);
    }
  }, [selectedGenre, movies])


  return (
    <>
      {error && <Text>{error}</Text>}
      {!showMoviePage && <SimpleGrid columns={{sm: 1, md: 2, lg: 3, xl: 4}} padding='10px' gap={5}>
        {isLoading && skeletons.map((skeleton) => (
          <MovieCardContainer key={skeleton}>
            <MovieCardSkeleton />
          </MovieCardContainer>
          ))}
        {moviesNotFound && !isLoading && <Text>There are no movies by this genre</Text>}  
        {(moviesByGenre ?? movies).map((movie) => (
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
