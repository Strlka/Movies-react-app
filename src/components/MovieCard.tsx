import { Movie } from '@/hooks/useMovies';
import { Genre, getGenresName } from '../hooks/useGenres';
import { AspectRatio, Badge, Box, Card, CardBody, Heading, HStack, Image, Stack, Text } from '@chakra-ui/react';
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
      <AspectRatio ratio={3 / 5}>
        <Image src={getImageUrl(movie.poster_path)} cursor='pointer' onClick={onClick} objectFit="cover"/>
        </AspectRatio>
         <Box position='absolute' left='50%' transform="translate(-50%, -35%)" zIndex="1">
            <VoteAverage vote_average={movie.vote_average} />
         </Box>
      </Box>
      <CardBody flex="1" display="flex" flexDirection="column">
        <Heading whiteSpace='normal' fontSize='xl' marginBottom={1} paddingTop='2' onClick={onClick} cursor='pointer' _hover={{color: 'teal.400' }}>{movie.title}</Heading>
        <Stack flex="1" display='flex' flexDirection='column' justify='flex-end'>
          <HStack justify='space-between' align="center">
            <Text paddingTop='3' marginBottom={2} fontSize='sm'>{date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
            <Badge colorPalette='teal' size="md">{movie.original_language}</Badge>
          </HStack>
          <Text whiteSpace='normal' textAlign='left' fontSize='sm'>{genresList.join(', ')}</Text>
        </Stack>
      </CardBody>
    </Card.Root>
  )
}

export default MovieCard
