import { Badge, List, ListItem } from '@chakra-ui/react';
import useGenres from '../hooks/useGenres'


const GenreList = () => {
    const {genres} = useGenres();
  return (
    <List.Root listStyleType='none'>
      {genres.map(genre => <List.Item key={genre.id} paddingY='5px'>
        <Badge colorPalette='teal' fontSize='lg'>{genre.name}</Badge>
      </List.Item>)}
    </List.Root>
  )
}

export default GenreList
