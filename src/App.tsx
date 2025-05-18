import { Grid, GridItem, useBreakpointValue } from "@chakra-ui/react"
import NavBar from "./components/NavBar";
import MovieGrid from "./components/MovieGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";
import ProviderSelector from "./components/ProviderSelector";



function App() {

  const showAside = useBreakpointValue({ base: false, lg: true });

  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [selectedProvider, setSelectedProvider] =useState<number | null>(null);



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
        <GenreList onSelectGenre={(genre) => setSelectedGenre(genre)} selectedGenre={selectedGenre}  />
      </GridItem>}
      <GridItem area='main'>
        <ProviderSelector onSelectProvider={(p) => setSelectedProvider(p)} selectedProvider={selectedProvider}/>
        <MovieGrid selectedGenre={selectedGenre} selectedProvider={selectedProvider}/>
      </GridItem>

    </Grid>
  )
}

export default App
