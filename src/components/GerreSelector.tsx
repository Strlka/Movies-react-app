import { Button, Portal, Menu, Icon } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import { useColorModeValue } from './ui/color-mode';
import useMovieQueryStore from '../store';
import useGenres from '../hooks/useGenres';


const MenuTrigger = (props: any) => {
  return <Menu.Trigger {...props} />
}

const MenuItem = (props: any) => {
  return <Menu.Item {...props} />
}


const GenreSelector = () => {

    const {data, isLoading, error} = useGenres();
    const selectedGenreId = useMovieQueryStore(s => s.movieQuery.genreId);
    const setGernreId = useMovieQueryStore(s => s.setGernreId);

    const genre = data?.find(genre => genre.id === selectedGenreId);


    const hoverBgColor = useColorModeValue('teal.400', 'teal.200');
    const hoverColor = useColorModeValue('white', 'black');


    if (error) return null;



  return (
    <Menu.Root>
      <MenuTrigger asChild>
        <Button 
          variant='subtle' 
          size={{base: 'sm', lg: 'lg'}} 
          borderRadius='5px' 
          _hover={{color: 'teal.400' }} 
          _focus={{ boxShadow: 'none', outline: 'none' }}
          _focusVisible={{ boxShadow: undefined, outline: undefined }}
          >
          {genre ? genre.name : 'Genres'}
          <Icon as={BsChevronDown} / >
        </Button>
      </MenuTrigger>
      <Portal>
        <Menu.Positioner >
          <Menu.Content >
            {data.map((genre) => (
              <MenuItem 
                key={genre.name} 
                onClick={() => setGernreId(genre.id)} 
                cursor='pointer' 
                _hover={{ bg: hoverBgColor, color: hoverColor }}
                _active={{ bg: hoverBgColor, color: hoverColor }}
              >
                {genre.name}
              </MenuItem>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

export default GenreSelector