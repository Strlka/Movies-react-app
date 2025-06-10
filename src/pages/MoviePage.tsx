import { Box, Button, Heading, HStack, Image, Spinner, Text } from "@chakra-ui/react"
import { getPosterUrl } from "../services/image-url";
import ProvidersIconList from "../components/ProvidersIconList";
import VoteAverage from "../components/VoteAverage";
import { useNavigate, useParams } from "react-router-dom";
import useMovie from "../hooks/useMovie";



const MoviePage = () => {

    const { slug } = useParams();
   
    const {data: movie, isLoading, error} = useMovie(slug);

    const navigate = useNavigate();

    if (isLoading) return <Spinner />;
    if (error || !movie) return <Text>Error loading movie.</Text>;
 
 
    const genresList = movie.genres.map(genre => genre.name).join(', ');
    let date = new Date(movie.release_date);



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
        <Text marginY={5}>{genresList}</Text>
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
