import { Badge, Button, List, ListItem, Spinner } from '@chakra-ui/react';
import useGenres, { Genre } from '../hooks/useGenres'


interface Props {
    onSelectGenre: (genre: Genre) => void;
}


const GenreList = ({onSelectGenre}: Props) => {
    const {genres, isLoading, error} = useGenres();

    if (error) return null;

    if (isLoading) return <Spinner />;

  return (
    <List.Root listStyleType='none'>
      {genres.map(genre => <List.Item key={genre.id} paddingY='5px'>
        <Button onClick={() => onSelectGenre(genre)} variant='plain' colorPalette='teal' fontSize='md' height='auto' padding='0' _hover={{ textDecoration: 'underline', background: 'none' }}>{genre.name}</Button>
      </List.Item>)}
    </List.Root>
  )
}

export default GenreList
