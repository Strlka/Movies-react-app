import { Box, Heading, HStack, Spinner, Stack, Text } from '@chakra-ui/react';
import useAccount from '../hooks/useAccount';
import Avatar from '../components/Avatar';
import useAllRatedMovies from '../hooks/useAllRatedMovies';
import useAllFavoriteMovies from '../hooks/useAllFavoriteMovies';
import { Navigate } from 'react-router-dom';
import Recommendations from '../components/Recommendations';



const AccountPage = () => {

    const sessionID = localStorage.getItem('session_id'); 

    if (!sessionID) return <Navigate to='/' />;

    const { data: account } = useAccount(sessionID || '');

    const {movies: ratedMovies, isLoading: isRatedLoading} = useAllRatedMovies(undefined, account?.id, sessionID || '');
    const {movies, isLoading} = useAllFavoriteMovies(undefined, account?.id, sessionID || '');

    const favoriteMoviesIds = movies.map(movie => movie.id).slice(0, 10);

    if (!account) return null;

    
  return (
    <Stack padding='10px'>
        <HStack 
            justifyContent='flex-start'
            marginY={5}
            gap={10}
        >
            <Avatar sessionID={sessionID}/>
            <Box>
                <Heading as="h1" marginBottom={5} fontSize={{base: 'lg', md: 'xl', lg: '2xl'}}>{account.username}</Heading>
                <Text>Name: {account.username}</Text>
                <Text>Favorite movies: {isLoading ? <Spinner size='xs'/> : movies.length}</Text>
                <Text>Rated movies: {isRatedLoading ? <Spinner size='xs'/> : ratedMovies.length}</Text>
            </Box>
        </HStack>
        <Recommendations favoriteMoviesIds={favoriteMoviesIds} isLoading={isLoading}/>
    </Stack>
  )
}

export default AccountPage
