import useAllRatedMovies from '../hooks/useAllRatedMovies';
import apiClient, { apiReadAccessToken } from '../services/api-client';
import { Text, HStack, Icon, RatingGroup, SkeletonCircle } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import useAccount from '../hooks/useAccount';
import { TbStarOff } from "react-icons/tb";


interface Props {
    movieId: number;
}


interface FetchAddRatingResponse {
    status_code: number;
    status_message: string;
}  


const Rating = ({movieId}: Props) => {

    const queryClient = useQueryClient();
    const sessionID = localStorage.getItem('session_id'); 
    const { data: account, isLoading: isAccountLoading } = useAccount(sessionID || '');

    const {rating, isLoading} = useAllRatedMovies(movieId, account?.id, sessionID || '');

    const handleValueChange = async(e: { value: number }) => {

        await apiClient
        .post<FetchAddRatingResponse>(`/3/movie/${movieId}/rating`,
            {'value': e.value*2}, 
            {params: {session_id: sessionID}})
        .then(res => res.data);

        queryClient.invalidateQueries({ queryKey: ['ratedMovies', account?.id, sessionID] });
        queryClient.invalidateQueries({ queryKey: ['allRatedMovies', account?.id, sessionID] });
    }

    const handleRemove = async () => {

      await fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating?session_id=${sessionID}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${apiReadAccessToken}`,
          'Content-Type': 'application/json'
        }, 
      })
      .then(res => console.log(res));

      queryClient.invalidateQueries({ queryKey: ['ratedMovies', account?.id, sessionID] });
      queryClient.invalidateQueries({ queryKey: ['allRatedMovies', account?.id, sessionID] });
      
  };

  if (isLoading || isAccountLoading) return <SkeletonCircle size="32px" />;

  if (!account) return null;


  return (
    rating ? 
    <HStack gap={2}>
      <Icon as={TbStarOff } 
        _hover={{ color: 'white'}}
        aria-label="Remove from favorites" 
        size='xl'
        color='yellow.300'
        cursor='pointer'
        onClick={handleRemove}>
      </Icon>
      <Text textStyle='xl' color='white'>{rating*10}%</Text>
    </HStack> :
    <RatingGroup.Root
      count={5}
      value={3}
      onValueChange={handleValueChange}
      size="lg"
      colorPalette='yellow'
      gap={20}
      cursor='pointer'
    >
      <RatingGroup.HiddenInput />
      <RatingGroup.Control />
    </RatingGroup.Root>
  )
}

export default Rating
