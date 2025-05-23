import { Box, Grid, GridItem, HStack, useBreakpointValue } from "@chakra-ui/react"
import NavBar from "./components/NavBar";
import MovieGrid from "./components/MovieGrid";
import GenreList from "./components/GenreList";
import { useEffect, useState } from "react";
import { Genre } from "./hooks/useGenres";
import ProviderSelector from "./components/ProviderSelector";
import { Provider } from "./hooks/useAllProviders";
import SortSelector, { Selector } from "./components/SortSelector";
import MovieHeading from "./components/MovieHeading";


export interface MovieQuery {
  genre: Genre | null;
  provider: Provider | null;
  selector: Selector | null;
}


function App() {

  const showAside = useBreakpointValue({ base: false, lg: true });

  const [movieQuery, setMovieQuery] = useState<MovieQuery>({} as MovieQuery);
  const [searchText, setSearchText] = useState('');
  const [isSearching, setSearching] = useState(false);



  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <GridItem area="nav">
        <NavBar onSearch={(searchText) => {
            setSearchText(searchText);
            setSearching(true)
          }} 
      />
      </GridItem>
      {showAside && (
        <GridItem area="aside" paddingX="10px">
          <GenreList
            onSelectGenre={(genre) => {
              setMovieQuery({ ...movieQuery, genre });
              setSearching(false);
            }}
            selectedGenre={movieQuery.genre}
          />
        </GridItem>
      )}
      <GridItem area="main">
        <Box paddingLeft={3}>
          <MovieHeading movieQuery={movieQuery} searchText={searchText} isSearching={isSearching}/>
          <HStack gap={5} marginBottom={5}>
            <ProviderSelector
              onSelectProvider={(provider) => {
                setMovieQuery({ ...movieQuery, provider });
                setSearching(false);
              }}
              selectedProvider={movieQuery.provider}
            />
            <SortSelector
              onSortSelector={(selector) => {
                setMovieQuery({ ...movieQuery, selector });
                setSearching(false);
              }}
              sortSelector={movieQuery.selector}
            />
          </HStack>
        </Box>
        <MovieGrid
          movieQuery={movieQuery}
          searchText={searchText}
          isSearching={isSearching}
        />
      </GridItem>
    </Grid>
  );
}

export default App
