import { Button, Menu, Portal, Text } from '@chakra-ui/react'
import { VscAccount } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { useColorModeValue } from './ui/color-mode';
import apiClient, { apiReadAccessToken } from '../services/api-client';


const MenuTrigger = (props: any) => {
  return <Menu.Trigger {...props} />
}

const MenuItem = (props: any) => {
  return <Menu.Item {...props} />
}

const AccountButton = () => {

    const sessionID = localStorage.getItem('session_id');

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
    
  return (

    <Menu.Root>
    <MenuTrigger asChild>
      <Button 
        variant='plain' 
        size="lg" 
        borderRadius='5px' 
        _hover={{color: 'teal.400' }}
        _focus={{ boxShadow: 'none', outline: 'none' }}
        _focusVisible={{ boxShadow: undefined, outline: undefined }} >
        <VscAccount />
        Account
      </Button>
    </MenuTrigger>
    <Portal>
      <Menu.Positioner >
        <Menu.Content >
          <MenuItem key='account' onClick={() => navigate('/account')} cursor='pointer' _hover={{ bg: hoverBgColor, color: hoverColor }}>
              Account
          </MenuItem>
          <MenuItem key='logout' onClick={handleClick} cursor='pointer' _hover={{ bg: hoverBgColor, color: hoverColor }}>
              Logout
          </MenuItem>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>
  )
}

export default AccountButton
