import { Button, Heading, Stack, useBreakpointValue } from '@chakra-ui/react';



interface Props {
    username: string
    showRatedmovies: boolean
    setShowRatedMovies: () => void;
    reSetShowRatedMovies: () => void;
}


const AccountMenu = ({username, showRatedmovies, setShowRatedMovies, reSetShowRatedMovies}: Props) => {

    const showOntop = useBreakpointValue({ base: false, lg: true });
    const showAside = useBreakpointValue({ base: true, lg: false });



  return (
    <>
      {showOntop && <Heading marginY={5}>{username}'s lists</Heading>}
      <Stack direction={{base: 'row', lg: 'column' }}>
        {showAside && <Heading as="h1" 
            marginY={5} 
            fontSize='2xl'
            >
                {username}'s
            </Heading>}
        <Button 
            whiteSpace='normal' 
            textAlign='left' 
            justifyContent='flex-start'
            onClick={() => reSetShowRatedMovies()} 
            fontWeight={showRatedmovies ? 'normal' : 'bold'} 
            variant='plain' 
            color={{_dark: 'teal.400', _light: 'black'}} 
            fontSize={{base: '2xl', lg: 'md' }} 
            height='auto' 
            padding='0'
            paddingY='5px'
            marginY={{base: '20px', lg: '0' }}
            _hover={{ 
                background: 'none',
                transform: 'scale(1.03)',
                transition: 'transform .20s ease-in',
                fontWeight: 'bold' 
            }}
            >
                favorite movies
        </Button>
        <Button 
            whiteSpace='normal' 
            textAlign='left'
            justifyContent='flex-start' 
            onClick={() => setShowRatedMovies()} 
            fontWeight={showRatedmovies ? 'bold' : 'normal'} 
            variant='plain' 
            color={{_dark: 'teal.400', _light: 'black'}} 
            fontSize={{base: '2xl', lg: 'md' }}
            height='auto' 
            padding='0'
            paddingY='5px'
            marginY={{base: '20px', lg: '0' }} 
            _hover={{ 
                background: 'none',
                transform: 'scale(1.03)',
                transition: 'transform .20s ease-in',
                fontWeight: 'bold' 
            }}
            >
                rated movies
        </Button>
      </Stack>
    </>
  )
}

export default AccountMenu
