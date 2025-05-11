import { Badge, List, ListItem, Spinner } from '@chakra-ui/react';
import useGenres from '../hooks/useGenres'


const GenreList = () => {
    const {genres, isLoading, error} = useGenres();

    if (error) return null;

    if (isLoading) return <Spinner />;

  return (
    <List.Root listStyleType='none'>
      {genres.map(genre => <List.Item key={genre.id} paddingY='5px'>
        <Badge colorPalette='teal' fontSize='lg'>{genre.name}</Badge>
      </List.Item>)}
    </List.Root>
  )
}

export default GenreList
