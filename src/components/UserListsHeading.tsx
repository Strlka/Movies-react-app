import { Button, HStack } from '@chakra-ui/react';



interface Props {
    showRatedmovies: boolean
    setShowRatedMovies: () => void;
    reSetShowRatedMovies: () => void;
}


const UserListsHeading = ({showRatedmovies, setShowRatedMovies, reSetShowRatedMovies}: Props) => {


  return (
    <>
      <HStack marginY={5} gap={2}>
        <Button 
            whiteSpace='normal' 
            textAlign='center'
            onClick={() => reSetShowRatedMovies()} 
            fontWeight={showRatedmovies ? 'normal' : 'bold'}
            color={showRatedmovies ? undefined : 'teal.400'} 
            variant='subtle' 
            size="2xl" 
            borderRadius='5px'
            _hover={{color: 'teal.400' }}
            _focus={{ boxShadow: 'none', outline: 'none' }}
            _focusVisible={{ boxShadow: undefined, outline: undefined }} 
            height='auto' 
            paddingX='20px'
            paddingY='2px'
            >
                Favorite movies
        </Button>
        <Button 
            whiteSpace='normal' 
            textAlign='center'
            onClick={() => setShowRatedMovies()} 
            fontWeight={showRatedmovies ? 'bold' : 'normal'}
            color={showRatedmovies ? 'teal.400' : undefined} 
            variant='subtle' 
            size="2xl" 
            borderRadius='5px'
            _hover={{color: 'teal.400' }}
            _focus={{ boxShadow: 'none', outline: 'none' }}
            _focusVisible={{ boxShadow: undefined, outline: undefined }} 
            height='auto' 
            paddingX='20px'
            paddingY='2px'
            >
                Rated movies
        </Button>
      </HStack>
    </>
  )
}

export default UserListsHeading
