import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
    children: ReactNode
};

const MovieCardContainer = ({children}: Props) => {
  return (
    <Box 
      borderRadius={10} 
      overflow='hidden' 
      height='100%' 
      _hover={{
        transform: 'scale(1.03)',
        transition: 'transform .20s ease-in'
      }}
      >
      {children}
    </Box>
  )
}

export default MovieCardContainer
