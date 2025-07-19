import { Box, Heading, HStack, Spinner, Stack, Text } from "@chakra-ui/react"
import { getPosterUrl } from "../services/image-url";
import ProvidersIconList from "../components/ProvidersIconList";
import VoteAverage from "../components/VoteAverage";
import { useParams } from "react-router-dom";
import useMovie from "../hooks/useMovie";
import MovieVideo from "../components/MovieVideo";
import MovieImages from "../components/MovieImages";
import ShareButtons from "../components/ShareButtons";
import AddFavoriteButton from "../components/FavoriteButton";
import Rating from "../components/Rating";



const MoviePage = () => {

    const { slug } = useParams();
   
    const {data: movie, isLoading, error} = useMovie(slug);

    // const navigate = useNavigate();

    if (isLoading) return <Box padding='10px'><Spinner size='xl' color='teal.400'/></Box>;
    if (error || !movie) return <Text>Error loading movie.</Text>;
 
 
    const genresList = movie.genres.map(genre => genre.name).join(', ');
    let date = new Date(movie.release_date);



  return (
    <Box
      minHeight='100vh'
      overflow='hidden'
      position="relative"
      alignItems="center"
      justifyContent="center"
      padding='10px' 
      gap={10}
      backgroundImage={`linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(${getPosterUrl(movie.backdrop_path)})`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundAttachment="fixed" 
      borderRadius={10}
    >
      <Stack 
        justifyContent='space-between'
        direction={{sm: 'column', md: 'column', lg: 'column', xl: 'row'}}
      >
        <Stack
          width={{sm: 'auto', md: '560px', lg: '560px', xl: '2/5'}}
          maxWidth={{sm: '560px' }}
          marginTop={14}
          marginLeft={{sm: '12px', md: '56px', lg: '56px', xl: '56px'}}
          gap={10}
        >
          <Stack
            background="linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7))"
            borderRadius={10}
            padding='10px'
            color='white'
          >
            <HStack justifyContent='space-between'>
              <Heading fontSize='4xl'>{movie.title}</Heading>
              <VoteAverage vote_average={movie.vote_average} />
            </HStack>
            <Text marginY={5} fontStyle='italic'>{movie.tagline}</Text>
            <Text marginY={5} fontWeight='bold'>{genresList}</Text>
            <HStack justify='flex-start' maxWidth='750px'>
              <Text fontWeight='bold' marginY={5}>{date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
              <Text fontWeight='bold' marginLeft={10}>{movie.original_language}</Text>
            </HStack>
            <Text maxWidth='750px' marginY={5}>{movie.overview}</Text>
            <Text fontWeight='bold'>Budget: {movie.budget ? `$${movie.budget.toLocaleString()}` : 'Unknown'}</Text>
          </Stack>
          <HStack justifyContent='space-between' padding='10px'>
            <AddFavoriteButton movieId={movie.id}/>
            <Rating movieId={movie.id}/>
            {slug && <ShareButtons slug={slug} title={movie.title}/>}
          </HStack>
      </Stack>
      <Stack 
        width={{sm: 'auto', md: '560px', lg: '560px', xl: '2/5'}}
        maxWidth={{sm: '560px' }}
        marginTop={{sm: '40px', md: '40px', lg: '40px', xl: '56px'}}
        marginLeft={{sm: '12px', md: '56px', lg: '56px', xl: '56px'}}
        marginRight={{sm: '0px', md: '0px', lg: '0px', xl: '40px'}}
        display="flex" 
        justifyContent='center'
      >
        <MovieVideo movieId={slug}/>
        <Box marginTop={10}>
          <ProvidersIconList movie_id={movie.id}/>
        </Box>
      </Stack>
      </Stack>
      <MovieImages movieId={slug}/>
    </Box>
  )
}

export default MoviePage
