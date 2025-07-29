import { Movie } from '../hooks/useMovies';
import { Genre, getGenresName } from '../hooks/useGenres';
import { AspectRatio, Badge, Box, Card, CardBody, Heading, HStack, Image, Stack, Text } from '@chakra-ui/react';
import VoteAverage from './VoteAverage';
import { getImageUrl } from '../services/image-url';
import { useColorModeValue } from './ui/color-mode';



interface Props {
  movie: Movie;
  genres: Genre[];
  onClick: () => void;
}

const MovieCard = ({movie, genres, onClick}: Props) => {

const genresList = getGenresName(movie.genre_ids, genres);

const bgColor = useColorModeValue('rgba(255,255,255,0.8)', 'rgba(0,0,0,0.8)');
const fontColor = useColorModeValue('black', 'white'); 

const date = new Date(movie.release_date);

  return (
    <Card.Root height="100%" display="flex" flexDirection="column">
      <Box position='relative' marginBottom={6}>
        <AspectRatio ratio={2 / 3}>
          <Image src={getImageUrl(movie.poster_path)} cursor='pointer' onClick={onClick} objectFit="cover"/>
        </AspectRatio>
        <Box position='absolute' left='50%' transform="translate(-50%, -35%)" zIndex="1">
          <VoteAverage vote_average={movie.vote_average} />
        </Box>
      </Box>
      <CardBody flex="1" display="flex" flexDirection="column">
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        bg={bgColor}
        color={fontColor}
        px={2}
        py={3}
        zIndex={2}
        borderTopRadius="md"
      >
        <Heading 
          whiteSpace='normal' 
          fontSize={{base: '3xl', sm: '2xl', lg: 'xl'}}
          textAlign='center' 
          marginBottom={1} 
          paddingTop={2} 
          onClick={onClick} 
          cursor='pointer' 
        >
          {movie.title.length <= 42 ? movie.title : (movie.title.slice(0, 30) + '...') }
        </Heading>
      </Box>
        <Stack flex="1" display='flex' flexDirection='column' justify='flex-end'>
          <HStack justify='space-between' align="center">
            <Text paddingTop='3' marginBottom={2} fontSize='sm'>{date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
            <Badge colorPalette='teal' size="md">{movie.original_language}</Badge>
          </HStack>
          <Text whiteSpace='normal' textAlign='left' fontSize='sm'>
            {genresList.length <= 4 ? genresList.join(', ') : (genresList.slice(0, 4).join(', ') + '...')}
          </Text>
        </Stack>
      </CardBody>
    </Card.Root>
  )
}

export default MovieCard
