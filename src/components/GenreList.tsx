import { Button, Heading, List } from '@chakra-ui/react';
import useGenres, { Genre } from '../hooks/useGenres'
import GenreListSkeleton from './GenreListSkeleton';


interface Props {
    onSelectGenre: (genre: Genre) => void;
    selectedGenre: Genre | null;
}


const GenreList = ({onSelectGenre, selectedGenre}: Props) => {
    const {data, isLoading, error} = useGenres();

    if (error) return null;

    if (isLoading) return <GenreListSkeleton />;

  return (
    <>
      <Heading marginY={5}>Genres</Heading>
      <List.Root listStyleType='none'>
        {data?.map(genre => <List.Item key={genre.id} paddingY='5px'>
          <Button whiteSpace='normal' textAlign='left' onClick={() => onSelectGenre(genre)} fontWeight={selectedGenre?.id === genre.id ? 'bold' : 'normal'} variant='plain' colorPalette='teal' fontSize='md' height='auto' padding='0' _hover={{ textDecoration: 'underline', background: 'none' }}>{genre.name}</Button>
        </List.Item>)}
      </List.Root>
    </>
  )
}

export default GenreList
