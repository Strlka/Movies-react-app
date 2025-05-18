import { Button, Portal, Menu } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import { useColorModeValue } from './ui/color-mode';
import useAllProviders, { getProvidersWithId } from '../hooks/useAllProviders';

interface Props {
  onSelectProvider: (p: number) => void;
  selectedProvider: number | null;
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

    const { providersList, error } = useAllProviders();

    const providersTopList = getProvidersWithId(providersNameTopList, providersList);

    if (error) return null;

    let label;
    selectedProvider ? label = providersList.find(p => p.provider_id === selectedProvider)?.provider_name : label = 'Providers';


  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant='plain' size="lg" borderRadius='5px' cursor='pointer' _hover={{color: 'teal.400' }} >
        {label}
          <BsChevronDown / >
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner >
          <Menu.Content >
            {providersTopList.map((p) => (
              <Menu.Item key={p!.provider_name} onClick={() => onSelectProvider(p!.provider_id)} _hover={{ bg: hoverBgColor, color: hoverColor }}>
                {p?.provider_name}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

export default ProviderSelector
