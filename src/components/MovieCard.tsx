import { Movie } from '@/hooks/useMovies';
import { Genre, getGenresName } from '../hooks/useGenres';
import { Card, CardBody, Heading, HStack, Image, Text } from '@chakra-ui/react';
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
    <Card.Root>
      <Image src={getImageUrl(movie.poster_path)} cursor='pointer' onClick={onClick}/>
      <CardBody>
        <HStack justify='space-between'>
          <Heading fontSize='2xl' onClick={onClick} cursor='pointer' _hover={{color: 'teal.400' }}>{movie.title}</Heading>
          <VoteAverage vote_average={movie.vote_average} />
        </HStack>
        <Text marginY={1}>{genresList.join(', ')}</Text>
        <HStack justify='space-between'>
          <Text marginY={1}>{date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</Text>
          <Text>{movie.original_language}</Text>
        </HStack>
      </CardBody>
    </Card.Root>
  )
}

export default MovieCard
