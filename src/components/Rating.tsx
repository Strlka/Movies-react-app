import useAllRatedMovies from '../hooks/useAllRatedMovies';
import apiClient, { apiReadAccessToken } from '../services/api-client';
import { Text, HStack, Icon, RatingGroup } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react'
import useAccount from '../hooks/useAccount';
import { RiStarOffFill } from "react-icons/ri";


interface Props {
    movieId: number;
}


interface FetchAddRatingResponse {
    status_code: number;
    status_message: string;
}  


const Rating = ({movieId}: Props) => {

    const [value, setValue] = useState(3);

    const queryClient = useQueryClient();
    const sessionID = localStorage.getItem('session_id'); 
    const { data: account } = useAccount(sessionID || '');

    const {rating, isLoading} = useAllRatedMovies(movieId, account?.id, sessionID || '');

    const handleValueChange = async(e: { value: number }) => {
        
        setValue(e.value);

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

    if (isLoading) return null;


  return (
    rating ? 
    <HStack gap={2}>
      <Icon as={RiStarOffFill} 
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
      value={value}
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
