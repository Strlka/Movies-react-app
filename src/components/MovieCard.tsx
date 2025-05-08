import { Movie } from '@/hooks/useMovies';
import { Genre, getGenresName } from '../hooks/useGenres';
import { Card, CardBody, Heading, HStack, Image, Text } from '@chakra-ui/react';
import VoteAverage from './VoteAverage';



interface Props {
  movie: Movie;
  genres: Genre[];
  onClick: () => void;
}

const MovieCard = ({movie, genres, onClick}: Props) => {

const genresList = getGenresName(movie.genre_ids, genres);

  return (
    <Card.Root borderRadius={10} overflow='hidden'>
      <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} cursor='pointer' onClick={onClick}/>
      <CardBody>
        <HStack justify='space-between'>
          <Heading fontSize='2xl' onClick={onClick} cursor='pointer' _hover={{color: 'teal.400' }}>{movie.title}</Heading>
          <VoteAverage vote_average={movie.vote_average} />
        </HStack>
        <Text marginY={1}>{genresList.join(', ')}</Text>
      </CardBody>
    </Card.Root>
  )
}

export default MovieCard
