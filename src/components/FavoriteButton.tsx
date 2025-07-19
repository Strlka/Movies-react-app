import apiClient from '../services/api-client';
import useAccount from '../hooks/useAccount';
import { Icon } from '@chakra-ui/react'
import { IoHeart } from "react-icons/io5";
import { IoHeartDislike } from "react-icons/io5";
import { useQueryClient } from '@tanstack/react-query'
import useAllFavoriteMovies from '../hooks/useAllFavoriteMovies';

interface Props {
    movieId: number;
}

interface FetchAddFavoriteResponse {
    status_code: number;
    status_message: string;
}  

const FavoriteButton = ({movieId}: Props) => {

    const queryClient = useQueryClient();
    const sessionID = localStorage.getItem('session_id');  

    const {data: account, isLoading, error} = useAccount(sessionID || '');

    const {isFavorite, isLoading: isLoadingFavoriteMovies} = useAllFavoriteMovies(movieId, account?.id, sessionID || '');

    if (isLoadingFavoriteMovies) return null;


    const handleClick = async() => {
        await apiClient
        .post<FetchAddFavoriteResponse>(`/3/account/${account?.id}/favorite`,
            {
                media_type: "movie",
                media_id: movieId,
                favorite: true,
              }, 
            {params: {session_id: sessionID}})
        .then(res => res.data);

        queryClient.invalidateQueries({ queryKey: ['favoriteMovies', account?.id, sessionID] });
        queryClient.invalidateQueries({ queryKey: ['allFavoriteMovies', account?.id, sessionID] });
    }

    const handleRemove = async() => {
      await apiClient
      .post<FetchAddFavoriteResponse>(`/3/account/${account?.id}/favorite`,
          {
              media_type: "movie",
              media_id: movieId,
              favorite: false,
            }, 
          {params: {session_id: sessionID}})
      .then(res => res.data);

      queryClient.invalidateQueries({ queryKey: ['favoriteMovies', account?.id, sessionID] });
      queryClient.invalidateQueries({ queryKey: ['allFavoriteMovies', account?.id, sessionID] });
  }

  return (

    !isFavorite  ? 
      <Icon as={IoHeart}
        _hover={{ color: 'red.600'}}
        aria-label="Add to Favorites" 
        size='xl'
        color='white'
        cursor='pointer'
        onClick={handleClick}>
      </Icon> :
      <Icon as={IoHeartDislike} 
        _hover={{ color: 'white'}}
        aria-label="Remove from favorites" 
        size='xl'
        color='red.600'
        cursor='pointer'
        onClick={handleRemove}>
      </Icon>

  )
}

export default FavoriteButton
