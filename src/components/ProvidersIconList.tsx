import { Image, Stack, Wrap } from "@chakra-ui/react";
import useProviders from "../hooks/useProviders";
import { getProviderImageUrl } from "../services/image-url";
import { Tooltip } from "./ui/tooltip";

interface Props {
  movie_id: number,
}

const ProvidersIconList = ({movie_id}: Props) => {

  const {data} = useProviders(movie_id);

  if (!data || data?.length === 0) return null;


  return ( 
    <Stack marginBottom='12px' fontWeight='bold' color='white' fontSize='2xl'>
      Where to watch
    <Wrap gap='2'>
      {data?.map((provider) => {
          return <Tooltip 
                    content={provider.provider_name} 
                    key={provider.provider_id}
                    trigger="hover focus"
                    openDelay={500}
                    closeDelay={100}
                  >
                    <Image 
                    src={getProviderImageUrl(provider.logo_path)} 
                    boxSize='32px'
                    borderRadius='5px'
                    fit='cover'
                    alt={provider.provider_name}
                    />
                  </Tooltip>
      })}
    </Wrap>
    </Stack>
  )
}

export default ProvidersIconList
