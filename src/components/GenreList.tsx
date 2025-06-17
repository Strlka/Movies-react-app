import { Button, Heading, List } from '@chakra-ui/react';
import useGenres from '../hooks/useGenres'
import GenreListSkeleton from './GenreListSkeleton';
import useMovieQueryStore from '../store';


const GenreList = () => {
    const {data, isLoading, error} = useGenres();
    const selectedGenreId = useMovieQueryStore(s => s.movieQuery.genreId);
    const setGernreId = useMovieQueryStore(s => s.setGernreId);

    if (error) return null;

    if (isLoading) return <GenreListSkeleton />;

  return (
    <>
      <Heading marginY={5}>Genres</Heading>
      <List.Root listStyleType='none'>
        {data?.map(genre => <List.Item key={genre.id} paddingY='5px'>
          <Button 
            whiteSpace='normal' 
            textAlign='left' 
            onClick={() => setGernreId(genre.id)} 
            fontWeight={selectedGenreId === genre.id ? 'bold' : 'normal'} 
            variant='plain' 
            color={{_dark: 'teal.400', _light: 'black'}} 
            fontSize='md' height='auto' 
            padding='0' 
            _hover={{ 
              background: 'none',
              transform: 'scale(1.03)',
              transition: 'transform .20s ease-in',
              fontWeight: 'bold' 
            }}
            >
              {genre.name}
            </Button>
        </List.Item>)}
      </List.Root>
    </>
  )
}

export default GenreList
