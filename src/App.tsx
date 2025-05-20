import { Grid, GridItem, HStack, useBreakpointValue } from "@chakra-ui/react"
import NavBar from "./components/NavBar";
import MovieGrid from "./components/MovieGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";
import ProviderSelector from "./components/ProviderSelector";
import { Provider } from "./hooks/useAllProviders";
import SortSelector, { Selector } from "./components/SortSelector";


export interface MovieQuery {
  genre: Genre | null;
  provider: Provider | null;
  selector: Selector | null;
}


function App() {

  const showAside = useBreakpointValue({ base: false, lg: true });

  const [movieQuery, setMovieQuery] = useState<MovieQuery>({} as MovieQuery);


  return (
    <Grid templateAreas={{
      base: `"nav" "main"`,
      lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: '1fr',
        lg: '200px 1fr',
      }}
    >
      <GridItem area='nav'>
        <NavBar />
      </GridItem>
      {showAside && <GridItem area='aside' paddingX='10px'>
        <GenreList onSelectGenre={(genre) => setMovieQuery({...movieQuery, genre})} selectedGenre={movieQuery.genre}  />
      </GridItem>}
      <GridItem area='main'>
        <HStack gap={5} paddingLeft={4} marginBottom={5}>
          <ProviderSelector onSelectProvider={(provider) => setMovieQuery({...movieQuery, provider})} selectedProvider={movieQuery.provider}/>
          <SortSelector onSortSelector={(selector) => setMovieQuery({...movieQuery, selector})} sortSelector={movieQuery.selector}/>
        </HStack>
        <MovieGrid movieQuery={movieQuery} />
      </GridItem>

    </Grid>
  )
}

export default App
