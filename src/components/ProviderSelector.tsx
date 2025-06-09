import { Button, Portal, Menu } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import { useColorModeValue } from './ui/color-mode';
import useAllProviders, { getProvidersWithId } from '../hooks/useAllProviders';
import useMovieQueryStore from '../store';


const MenuTrigger = (props: any) => {
  return <Menu.Trigger {...props} />
}

const MenuItem = (props: any) => {
  return <Menu.Item {...props} />
}

export const providersNameTopList = [
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

const ProviderSelector = () => {

    const selectedProviderId = useMovieQueryStore(s => s.movieQuery.providerId);
    const setProviderId = useMovieQueryStore(s => s.setProviderId);

    const hoverBgColor = useColorModeValue('teal.400', 'teal.200');
    const hoverColor = useColorModeValue('white', 'black');

    const { data, error } = useAllProviders();

    const providersTopList = getProvidersWithId(providersNameTopList, (data || []));

    const provider = providersTopList.find(provider => provider?.provider_id === selectedProviderId);

    if (error) return null;



  return (
    <Menu.Root>
      <MenuTrigger asChild>
        <Button variant='subtle' size="lg" borderRadius='5px' _hover={{color: 'teal.400' }} >
        {provider ? provider.provider_name : 'Providers'}
          <BsChevronDown / >
        </Button>
      </MenuTrigger>
      <Portal>
        <Menu.Positioner >
          <Menu.Content >
            {providersTopList.map((p) => (
              <MenuItem key={p!.provider_name} onClick={() => setProviderId(p!.provider_id)} cursor='pointer' _hover={{ bg: hoverBgColor, color: hoverColor }}>
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
