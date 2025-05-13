import { Box, Button, Heading, Image, Text } from "@chakra-ui/react"
import { Movie } from "../hooks/useMovies"
import { Genre, getGenresName } from "../hooks/useGenres";
import { getPosterUrl } from "../services/image-url";
import ProvidersIconList from "./ProvidersIconList";
import VoteAverage from "./VoteAverage";


interface MoviePage {
    movie: Movie;
    genres: Genre[];
    backToMoviesCards: () => void;
}

const MoviePage = ({movie, genres, backToMoviesCards}: MoviePage) => {

    const genresList = getGenresName(movie.genre_ids, genres);
    let date = new Date(movie.release_date);

  return (
    <Box
    overflow='hidden'
    position="relative"
    alignItems="center"
    justifyContent="center"
  >
      <Box>
        <Heading fontSize='4xl'>{movie.title}</Heading>
        <Image src={getPosterUrl(movie.backdrop_path)} marginY={10} />
        <VoteAverage vote_average={movie.vote_average} />
        <Text marginY={5}>{genresList.join(', ') }</Text>
        <Text marginY={5}>{date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</Text>
        <Text maxWidth='750px' marginY={5}>{movie.overview}</Text>
        <ProvidersIconList movie_id={movie.id}/>
        <Button onClick={backToMoviesCards} marginTop={5}>Back to movies list</Button>
      </Box>
    </Box>
  )
}

export default MoviePage
