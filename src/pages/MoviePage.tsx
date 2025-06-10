import { Box, Button, Heading, HStack, Image, Text } from "@chakra-ui/react"
import useGenres, { getGenresName } from "../hooks/useGenres";
import { getPosterUrl } from "../services/image-url";
import ProvidersIconList from "../components/ProvidersIconList";
import VoteAverage from "../components/VoteAverage";
import { useNavigate } from "react-router-dom";
import useMovieQueryStore from "../store";



const MoviePage = () => {

    const movie = useMovieQueryStore(s => s.currentMovie);

    const {data: genres} = useGenres();
    const genresList = getGenresName(movie.genre_ids, genres);
    let date = new Date(movie.release_date);

    const navigate = useNavigate();

  return (
    <Box
    overflow='hidden'
    position="relative"
    alignItems="center"
    justifyContent="center"
    padding='10px' 
    gap={10}
  >
      <Box>
        <Heading fontSize='4xl'>{movie.title}</Heading>
        <Image src={getPosterUrl(movie.backdrop_path)} marginY={10} />
        <VoteAverage vote_average={movie.vote_average} />
        <Text marginY={5}>{genresList.join(', ') }</Text>
        <HStack justify='space-between' maxWidth='750px'>
          <Text marginY={5}>{date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</Text>
          <Text>{movie.original_language}</Text>
        </HStack>
        <Text maxWidth='750px' marginY={5}>{movie.overview}</Text>
        <ProvidersIconList movie_id={movie.id}/>
        <Button onClick={() => navigate('/')} marginTop={5}>Back to movies list</Button>
      </Box>
    </Box>
  )
}

export default MoviePage
