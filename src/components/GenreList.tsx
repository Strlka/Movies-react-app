import { Button, List, Spinner } from '@chakra-ui/react';
import useGenres, { Genre } from '../hooks/useGenres'


interface Props {
    onSelectGenre: (genre: Genre) => void;
    selectedGenre: Genre | null;
}


const GenreList = ({onSelectGenre, selectedGenre}: Props) => {
    const {genres, isLoading, error} = useGenres();

    if (error) return null;

    if (isLoading) return <Spinner />;

  return (
    <List.Root listStyleType='none'>
      {genres.map(genre => <List.Item key={genre.id} paddingY='5px'>
        <Button onClick={() => onSelectGenre(genre)} fontWeight={selectedGenre?.id === genre.id ? 'bold' : 'normal'} variant='plain' colorPalette='teal' fontSize='md' height='auto' padding='0' _hover={{ textDecoration: 'underline', background: 'none' }}>{genre.name}</Button>
      </List.Item>)}
    </List.Root>
  )
}

export default GenreList
