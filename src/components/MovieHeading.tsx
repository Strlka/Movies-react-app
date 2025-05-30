import { MovieQuery } from '../App';
import { CloseButton, Heading, HStack, Text } from '@chakra-ui/react'


interface Props {
    movieQuery: MovieQuery;
    searchText: string;
    isSearching: boolean;
    resetSearching: () => void;
    resetGenre: () => void;
    resetProvider: () => void;
}

const MovieHeading = ({movieQuery, searchText, isSearching, resetSearching, resetGenre, resetProvider}: Props) => {


  const genre = movieQuery.genre?.name; 

  const provider = movieQuery.provider?.provider_name;

  return (
    <Heading as="h1" marginY={5} fontSize="4xl">
      {isSearching ? (
        <HStack gap={1}>
          <Text as="span">Search movies: {searchText}...</Text>
          <CloseButton size="xs" variant='plain' onClick={resetSearching}/>
        </HStack>
      ) : (
        <HStack gap={2} wrap="wrap">
          <Text as="span">Movies</Text>
          {genre && (
            <HStack gap={1}>
              <Text as="span">/ {genre}</Text>
              <CloseButton size="xs" variant='plain' onClick={resetGenre}/>
            </HStack>
          )}
          {provider && (
            <HStack gap={1}>
              <Text as="span">/ {provider}</Text>
              <CloseButton size="xs" variant='plain' onClick={resetProvider}/>
            </HStack>
          )}
        </HStack>
      )}
    </Heading>

  )
}

export default MovieHeading
