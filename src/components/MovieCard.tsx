import { Movie } from '@/hooks/useMovies';
import { Genre, getGenresName } from '../hooks/useGenres';
import { Badge, Box, Card, CardBody, Heading, HStack, Image, Text } from '@chakra-ui/react';
import VoteAverage from './VoteAverage';
import { getImageUrl } from '../services/image-url';



interface Props {
  movie: Movie;
  genres: Genre[];
  onClick: () => void;
}

const MovieCard = ({movie, genres, onClick}: Props) => {

const genresList = getGenresName(movie.genre_ids, genres);

const date = new Date(movie.release_date);

  return (
    <Card.Root height="100%" display="flex" flexDirection="column">
      <Box position='relative' marginBottom={6}>
        <Image src={getImageUrl(movie.poster_path)} cursor='pointer' onClick={onClick}/>
         <Box position='absolute' left='50%' transform="translate(-50%, -35%)" zIndex="1">
            <VoteAverage vote_average={movie.vote_average} />
         </Box>
      </Box>
      <CardBody flex="1" display="flex" flexDirection="column">
        <Heading fontSize='2xl' marginBottom={2} paddingTop='2' onClick={onClick} cursor='pointer' _hover={{color: 'teal.400' }}>{movie.title}</Heading>
        <HStack justify='space-between' align="center">
          <Text paddingTop='3' marginBottom={2} colorPalette='teal'>{date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
          <Badge colorPalette='teal' size="lg">{movie.original_language}</Badge>
        </HStack>
        <Text whiteSpace='normal' textAlign='left' paddingTop='3'>{genresList.join(', ')}</Text>
      </CardBody>
    </Card.Root>
  )
}

export default MovieCard
