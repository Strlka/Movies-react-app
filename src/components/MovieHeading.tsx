import { MovieQuery } from '../App';
import { Heading } from '@chakra-ui/react'


interface Props {
    movieQuery: MovieQuery;
    searchText: string;
    isSearching: boolean;
}

const MovieHeading = ({movieQuery, searchText, isSearching}: Props) => {

    const heading = isSearching ? `${searchText}...` : (`${movieQuery.genre?.name || ''} ${movieQuery.provider?.provider_name || ''} Movies`)

  return (
    <Heading as='h1' marginY={5} fontSize='4xl'>
        {heading}
    </Heading>
  )
}

export default MovieHeading
