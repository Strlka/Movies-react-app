import { Button, Grid, GridItem, useBreakpointValue } from "@chakra-ui/react"
import NavBar from "./components/NavBar";
import MovieGrid from "./components/MovieGrid";
import GenreList from "./components/GenreList";



function App() {

  const showAside = useBreakpointValue({ base: false, lg: true });


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
        <GenreList />
      </GridItem>}
      <GridItem area='main'>
        <MovieGrid />
      </GridItem>

    </Grid>
  )
}

export default App
