import {Image, Box, Stack, HStack} from '@chakra-ui/react';
import logo from '../assets/blue_square_2_themoviedb.svg';
import ColorModeSwitch from './ColorModeSwitch';
import SearchInput from './SearchInput';
import LoginButton from './LoginButton';
import { useNavigate } from 'react-router-dom';
import AccountButton from './AccountButton';
import useMovieQueryStore from '../store';

const NavBar = () => {
  const navigate = useNavigate();

  const resetSearching = useMovieQueryStore(s => s.resetSearchText);

  const sessionID = localStorage.getItem('session_id'); 

  return (
    <Stack
      gap={2}
      padding="10px"
    >
      <HStack
        alignItems="center"
        justifyContent='space-between'
        gap={4}
      >
        <Image
          src={logo}
          boxSize="60px"
          onClick={() => {navigate('/'); resetSearching(); sessionStorage.removeItem('scrollPos:/')}}
          cursor="pointer"
        />
        <Box display={{ base: 'none', lg: 'block' }} flex='1'>
          <SearchInput />
        </Box>

        <HStack>
          {!sessionID && <LoginButton />}
          {sessionID && <AccountButton />}
          <ColorModeSwitch />
        </HStack>
      </HStack>
      <Box display={{ base: 'block', lg: 'none' }} width="100%">
        <SearchInput />
      </Box>
    </Stack>
  );
};

export default NavBar;
