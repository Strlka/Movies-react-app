import useGenres from '../hooks/useGenres';
import { MovieQuery } from '../App';
import { CloseButton, Heading, HStack, Spinner, Text } from '@chakra-ui/react'
import useAllProviders, { getProvidersWithId } from '../hooks/useAllProviders';
import { providersNameTopList } from './ProviderSelector';


interface Props {
    movieQuery: MovieQuery;
    searchText: string;
    isSearching: boolean;
    foudMoviesTotalResults: number | '';
    resetSearching: () => void;
    resetGenre: () => void;
    resetProvider: () => void;
}

const MovieHeading = ({movieQuery, searchText, isSearching, foudMoviesTotalResults, resetSearching, resetGenre, resetProvider}: Props) => {

  const {data: genres} = useGenres();
  const genre = genres?.find(genre => genre.id === movieQuery.genreId); 

  const { data: providersList } = useAllProviders();
  const providersTopList = getProvidersWithId(providersNameTopList, (providersList || []));
  const provider = providersTopList.find(provider => provider?.provider_id === movieQuery.providerId);


  return (
    <Heading as="h1" marginY={5} fontSize={{base: '2xl', lg: '3xl'}}>
      {isSearching ? (
        <HStack gap={5} justifyContent='space-between' width='100%' paddingRight='10px'>
            <HStack>
              <Text as="span" word-break='break-all'>Search movies: {searchText}...</Text>
              <CloseButton size="xs" variant='plain' onClick={resetSearching}/>
            </HStack>
            <HStack gap={5}>
              <Text>{typeof foudMoviesTotalResults === 'number' ? `total results: ${foudMoviesTotalResults}`: 'total results: '}</Text>
              {foudMoviesTotalResults === '' && <Spinner />}
            </HStack>
        </HStack>
      ) : (
        <HStack gap={2} wrap="wrap">
          <Text as="span">Movies</Text>
          {genre && (
            <HStack gap={1}>
              <Text as="span">/ {genre.name}</Text>
              <CloseButton size="xs" variant='plain' onClick={resetGenre}/>
            </HStack>
          )}
          {provider && (
            <HStack gap={1}>
              <Text as="span">/ {provider.provider_name}</Text>
              <CloseButton size="xs" variant='plain' onClick={resetProvider}/>
            </HStack>
          )}
        </HStack>
      )}
    </Heading>

  )
}

export default MovieHeading
