import { HStack, Image } from '@chakra-ui/react'
import logo from '../assets/blue_square_2_themoviedb.svg';
import ColorModeSwitch from './ColorModeSwitch';
import SearchInput from './SearchInput';
import { Link, useNavigate } from 'react-router-dom';



const NavBar = () => {
  const navigate = useNavigate();
  return (
    <HStack padding='10px' gap={4}>
      <Image src={logo} boxSize='60px' onClick={() => navigate('/')} cursor='pointer' />
      <SearchInput />
      <ColorModeSwitch />
    </HStack>
  )
}

export default NavBar
