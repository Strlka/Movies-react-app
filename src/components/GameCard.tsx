import { Movie } from '@/hooks/useGames';
import { Card, CardBody, Heading, Image } from '@chakra-ui/react';


interface Props {
  movie: Movie;
}

const GameCard = ({movie}: Props) => {
  return (
    <Card.Root borderRadius={10} overflow='hidden'>
      <Image src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}/>
      <CardBody>
        <Heading fontSize='2xl'>{movie.title}</Heading>
      </CardBody>
    </Card.Root>
  )
}

export default GameCard
