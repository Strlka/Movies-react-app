import { HStack, Image, Stack } from "@chakra-ui/react";
import useProviders from "../hooks/useProviders";
import { getProviderImageUrl } from "../services/image-url";
import { Tooltip } from "./ui/tooltip";

interface Props {
  movie_id: number,
}

const ProvidersIconList = ({movie_id}: Props) => {

const {data} = useProviders(movie_id);



  return ( 
    data?.length !== 0 &&
    <Stack marginBottom='12px' fontWeight='bold' color='white' fontSize='2xl'>
      Where to watch: 
    <HStack>
      {data?.map((provider) => {
          return <Tooltip content={provider.provider_name} key={provider.provider_id}>
                  <Image 
                  src={getProviderImageUrl(provider.logo_path)} 
                  boxSize='50px'
                  borderRadius='5px'
                  fit='cover'
                  alt={provider.provider_name}
                  />
                </Tooltip>
      })}
    </HStack>
    </Stack>
  )
}

export default ProvidersIconList
