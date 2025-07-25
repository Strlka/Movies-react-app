import { Button, Icon, Menu, Portal } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import { useColorModeValue } from './ui/color-mode';
import useMovieQueryStore from '../store';



export interface Selector {
    id: number;
    name: string;
    param: string;
}

const MenuTrigger = (props: any) => {
  return <Menu.Trigger {...props} />
}

const MenuItem = (props: any) => {
  return <Menu.Item {...props} />
}



const SortSelector = () => {

  const selectors: Selector[] = [
    {
        id: 1,
        name: 'Vote average',
        param: 'vote_average.desc'
    },
    {
      id: 2,
      name: 'Popularity',
      param: 'popularity.desc'
    },
    {
        id: 3,
        name: 'Revenue',
        param: 'revenue.desc'
    },
    {
        id: 4,
        name: 'Release date',
        param: 'release_date.desc'
    },
    {
        id: 5,
        name: 'Title',
        param: 'title.asc'
    },
    {
        id: 6,
        name: 'Vote count',
        param: 'vote_count.desc'
    },
  ];

  const sortSelectorParam = useMovieQueryStore(s => s.movieQuery.selectorParam);
  const setSelectorParam = useMovieQueryStore(s => s.setSelectorParam);

  const selector = selectors.find(selector => selector.param === sortSelectorParam);

  const hoverBgColor = useColorModeValue('teal.400', 'teal.200');
  const hoverColor = useColorModeValue('white', 'black');



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
          {selector?.name || 'Sort by'}
          <Icon as={BsChevronDown} />
        </Button>
      </MenuTrigger>
      <Portal>
        <Menu.Positioner >
          <Menu.Content>
            {selectors.map((selector) => (
              <MenuItem 
                key={selector.id} 
                onClick={() => setSelectorParam(selector.param)} 
                cursor='pointer' 
                _hover={{ bg: hoverBgColor, color: hoverColor }}
                _active={{ bg: hoverBgColor, color: hoverColor }}
              >
                {selector.name}
              </MenuItem>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

export default SortSelector
