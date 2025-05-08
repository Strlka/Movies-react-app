import { Box, Button, Card, CardBody, Heading, Image, Text } from "@chakra-ui/react"
import { Movie } from "../hooks/useMovies"
import { Genre, getGenresName } from "../hooks/useGenres";


interface MoviePage {
    movie: Movie;
    genres: Genre[];
    backToMoviesCards: () => void;
}

const MoviePage = ({movie, genres, backToMoviesCards}: MoviePage) => {

    const genresList = getGenresName(movie.genre_ids, genres);

  return (
    <Box
    borderRadius={10}
    overflow='hidden'
    position="relative"
    alignItems="center"
    justifyContent="center"
  >
      <Box>
        <Heading fontSize='4xl'>{movie.title}</Heading>
        <Image src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path})`} marginY={10} />
        <Text>{movie.vote_average}</Text>
        <Text>{genresList.join(', ')}</Text>
        <Text>{movie.overview}</Text>
        <Button onClick={backToMoviesCards} marginTop={5}>Back to movies list</Button>
      </Box>
    </Box>
  )
}

export default MoviePage
