import useGenres from '../hooks/useGenres';
import { CloseButton, Heading, HStack, Spinner, Text } from '@chakra-ui/react'
import useAllProviders, { getProvidersWithId } from '../hooks/useAllProviders';
import { providersNameTopList } from './ProviderSelector';
import useMovieQueryStore from '../store';


interface Props {
    foudMoviesTotalResults: number | '';
}

const MovieHeading = ({foudMoviesTotalResults}: Props) => {

  const {data: genres} = useGenres();
  const selectedGenreId = useMovieQueryStore(s => s.movieQuery.genreId);
  const genre = genres?.find(genre => genre.id === selectedGenreId); 
  const resetGenre = useMovieQueryStore(s => s.resetGenreId);


  const { data: providersList } = useAllProviders();
  const providersTopList = getProvidersWithId(providersNameTopList, (providersList || []));
  const selectedProviderId = useMovieQueryStore(s => s.movieQuery.providerId);
  const provider = providersTopList.find(provider => provider?.provider_id === selectedProviderId);
  const resetProvider = useMovieQueryStore(s => s.resetProviderId);

  const searchText = useMovieQueryStore(s => s.movieQuery.searchText);
  const resetSearching = useMovieQueryStore(s => s.resetSearchText);

  const isSearching = !!searchText; 


  return (
    <Heading as="h1" marginY={5} fontSize='2xl'>
      {isSearching ? (
        <HStack gap={5} justifyContent='space-between' width='100%' paddingRight='10px'>
            <HStack>
              <Text as="span" word-break='break-all'>Search movies: {searchText}...</Text>
              <CloseButton size="xs" variant='plain' onClick={() => resetSearching()}/>
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
