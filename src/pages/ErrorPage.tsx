import NavBar from '../components/NavBar';
import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'


const ErrorPage = () => {

    const error = useRouteError();
  return (
    <Stack padding='10px'>
        <NavBar />
        <Box padding='10px' gap={2}>
          <Heading>Oops</Heading>
          <Text>
            {isRouteErrorResponse(error) 
            ? 'This page does not exist' 
            : 'Something gone wrong'}
          </Text>
        </Box>
    </Stack>
  )
}

export default ErrorPage
