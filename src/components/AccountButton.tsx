import { Button, Icon, Menu, Portal, Image } from '@chakra-ui/react'
import { VscAccount } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { useColorModeValue } from './ui/color-mode';
import { apiReadAccessToken } from '../services/api-client';
import { getAvatarUrl } from '../services/image-url';
import useAccount from '../hooks/useAccount';


const MenuTrigger = (props: any) => {
  return <Menu.Trigger {...props} />
}

const MenuItem = (props: any) => {
  return <Menu.Item {...props} />
}

const AccountButton = () => {

    const sessionID = localStorage.getItem('session_id');

    const { data: account } = useAccount(sessionID || '');

    const navigate = useNavigate();

    const hoverBgColor = useColorModeValue('teal.400', 'teal.200');
    const hoverColor = useColorModeValue('white', 'black');

    const handleClick = async () => {

      await fetch('https://api.themoviedb.org/3/authentication/session', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${apiReadAccessToken}`,
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({"session_id": sessionID})
      })
      .then(res => console.log(res));

      localStorage.removeItem('session_id');
      
      navigate('/')
      
    }

    if (!account) return null;
    
  return (

    <Menu.Root>
    <MenuTrigger asChild>
      <Button 
        variant='plain' 
        size="md" 
        borderRadius='5px' 
        _hover={{color: 'teal.400' }}
        _focus={{ boxShadow: 'none', outline: 'none' }}
        _focusVisible={{ boxShadow: undefined, outline: undefined }} >
        {account.avatar.tmdb.avatar_path ? 
            <Image
              src={getAvatarUrl(account?.avatar.tmdb.avatar_path)}
              boxSize='20px'
              borderRadius="full"
              fit="cover"
              alt={account.username}
            /> : <Icon as={VscAccount} />}
        {account.username}
      </Button>
    </MenuTrigger>
    <Portal>
      <Menu.Positioner >
        <Menu.Content >
          <MenuItem 
            key='account' 
            onClick={() => navigate('/account')} 
            cursor='pointer' 
            _hover={{ bg: hoverBgColor, color: hoverColor }} 
            _active={{ bg: hoverBgColor, color: hoverColor }}
          >
              Account
          </MenuItem>
          <MenuItem 
            key='lists' 
            onClick={() => navigate('/movieslists')} 
            cursor='pointer' 
            _hover={{ bg: hoverBgColor, color: hoverColor }}
            _active={{ bg: hoverBgColor, color: hoverColor }}
          >
              Movies lists
          </MenuItem>
          <MenuItem 
            key='logout' 
            onClick={handleClick} 
            cursor='pointer' 
            _hover={{ bg: hoverBgColor, color: hoverColor }}
            _active={{ bg: hoverBgColor, color: hoverColor }}
          >
              Logout
          </MenuItem>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>
  )
}

export default AccountButton
