import { useSearchParams } from 'react-router-dom';
import apiClient from '../services/api-client';
import { Button, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { VscAccount } from "react-icons/vsc";


interface FetchRequestToken {
    success: boolean;
    expires_at: string;
    request_token: string;
} 

interface FetchUserSession {
    success: boolean;
    session_id: string;
}



const LoginButton = () => {

    const handleClick = async () => {
        const requestToken = await apiClient
        .get<FetchRequestToken>('/3/authentication/token/new')
        .then(res => res.data.request_token)

        const authURL = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=https://movies-react-app-murex.vercel.app/`;
        window.location.href = authURL;
    }

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
      const newRequestToken = searchParams.get('request_token');
      const isApproved = searchParams.get('approved');
      const isAuthenticated = localStorage.getItem('session_id');

      const createSession = async () => {
        searchParams.delete('request_token');
        searchParams.delete('approved');
        const userSessionParams = await apiClient
          .post<FetchUserSession>(`/3/authentication/session/new?request_token=${newRequestToken}`)
          .then(res => res.data)
  
          if (userSessionParams.success) {
              localStorage.setItem('session_id', userSessionParams.session_id);
              setSearchParams(searchParams);
          }
      }

      if (newRequestToken && isApproved && !isAuthenticated) {
        createSession();
      }

    }, [searchParams]);


  return (
    <Button
      whiteSpace='normal' 
      textAlign='left' 
      variant='plain'
      onClick={handleClick}
      height='36px'
      _hover={{ color: 'teal.400'}}
    >
        <VscAccount />
        <Text paddingLeft={2}>Login with TMDB</Text>
    </Button>
  )
}

export default LoginButton
