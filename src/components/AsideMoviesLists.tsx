import { useNavigate } from 'react-router-dom';
import useAccount from '../hooks/useAccount';
import useAllFavoriteMovies from '../hooks/useAllFavoriteMovies';
import useAllRatedMovies from '../hooks/useAllRatedMovies';
import { Button, Heading, List } from '@chakra-ui/react';
import GenreListSkeleton from './GenreListSkeleton';




interface Props {
    showRatedmovies: boolean
}


const AsideMoviesLists = ({showRatedmovies}: Props) => {

    const navigate = useNavigate();


    const sessionID = localStorage.getItem('session_id'); 


    const { data: account } = useAccount(sessionID || '');

    if (!account) return null;

    const {movies: ratedMovies, isLoading: isRatedLoading} = useAllRatedMovies(undefined, account?.id, sessionID || '');
    const {movies, isLoading} = useAllFavoriteMovies(undefined, account?.id, sessionID || '');

    if (isLoading || isRatedLoading) return <GenreListSkeleton />;



  return (
    <>
      <Heading marginY={5}>{showRatedmovies ? 'Rated' : 'Favorite'} movies</Heading>
        <List.Root listStyleType='none'>
            {(showRatedmovies ? ratedMovies : movies).map(movie => <List.Item key={movie.id} paddingY='5px'>
            <Button 
                whiteSpace='normal' 
                textAlign='left' 
                onClick={() => navigate(`/movies/${movie.id}`)} 
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
                {movie.title}
                </Button>
            </List.Item>)}
        </List.Root>
    </>
  )
}

export default AsideMoviesLists