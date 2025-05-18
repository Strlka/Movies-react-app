import { HStack, Image } from "@chakra-ui/react";
import useProviders from "../hooks/useProviders";
import { getProviderImageUrl } from "../services/image-url";
import { Tooltip } from "./ui/tooltip";

interface Props {
  movie_id: number,
}

const ProvidersIconList = ({movie_id}: Props) => {

const {providers} = useProviders(movie_id);


  return (
    <HStack>
      {providers?.map((provider) => {
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
  )
}

export default ProvidersIconList
