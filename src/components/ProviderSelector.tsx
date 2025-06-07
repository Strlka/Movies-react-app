import { Button, Portal, Menu } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import { useColorModeValue } from './ui/color-mode';
import useAllProviders, { getProvidersWithId, Provider } from '../hooks/useAllProviders';

interface Props {
  onSelectProvider: (p: Provider) => void;
  selectedProvider: Provider | null;
}

const MenuTrigger = (props: any) => {
  return <Menu.Trigger {...props} />
}

const MenuItem = (props: any) => {
  return <Menu.Item {...props} />
}

const ProviderSelector = ({onSelectProvider, selectedProvider}: Props) => {

    const providersNameTopList = [
        'Amazon Video',
        'Amazon Prime Video',
        'Amazon Prime Video with Ads',
        'Apple TV',
        'Google Play Movies',
        'YouTube',
        'Fandango At Home',
        'Spectrum On Demand',
        'Plex',
        'Microsoft Store',
        'FlixFling',
        'Netflix',
        'Disney Plus',
        'fuboTV',
        'MGM+ Amazon Channel',
        'Paramount Plus',
        'Paramount+ Amazon Channel',
        'Paramount+ Roku Premium Channel',
        'MGM Plus',
        'Philo',
        'Apple TV+',
        'Apple TV Plus Amazon Channel',
        'Max',
        'Max Amazon Channel',
    ];

    const hoverBgColor = useColorModeValue('teal.400', 'teal.200');
    const hoverColor = useColorModeValue('white', 'black');

    const { data, error } = useAllProviders();

    const providersTopList = getProvidersWithId(providersNameTopList, (data || []));

    if (error) return null;



  return (
    <Menu.Root>
      <MenuTrigger asChild>
        <Button variant='subtle' size="lg" borderRadius='5px' _hover={{color: 'teal.400' }} >
        {selectedProvider ? selectedProvider.provider_name : 'Providers'}
          <BsChevronDown / >
        </Button>
      </MenuTrigger>
      <Portal>
        <Menu.Positioner >
          <Menu.Content >
            {providersTopList.map((p) => (
              <MenuItem key={p!.provider_name} onClick={() => onSelectProvider(p!)} cursor='pointer' _hover={{ bg: hoverBgColor, color: hoverColor }}>
                {p?.provider_name}
              </MenuItem>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

export default ProviderSelector
