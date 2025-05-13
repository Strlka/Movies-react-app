import { HStack, Image, Text } from "@chakra-ui/react";
import useProviders from "../hooks/useProviders";
import { getProviderImageUrl } from "../services/image-url";

interface Props {
  movie_id: number,
}

const ProvidersIconList = ({movie_id}: Props) => {

const {providers} = useProviders(movie_id);

console.log(movie_id);

console.log(providers);

  return (
    <HStack>
      {providers?.map((provider) => {
          return <Image 
            src={getProviderImageUrl(provider.logo_path)} 
            key={provider.provider_id}
            boxSize='50px'
            borderRadius='5px'
            fit='cover'
            alt={provider.provider_name}
             />
      })}
    </HStack>
  )
}

export default ProvidersIconList
