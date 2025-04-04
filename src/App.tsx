import { Grid, GridItem, Show, useBreakpointValue } from "@chakra-ui/react"



function App() {

  const showAside = useBreakpointValue({ base: false, lg: true });


  return (
    <Grid templateAreas={{
      base: `"nav" "main"`,
      lg: `"nav nav" "aside main"`,
    }}>
      <GridItem area='nav' bg='coral'>Nav</GridItem>
      {showAside && <GridItem area='aside' bg='gold'>Aside</GridItem>}
      <GridItem area='main' bg='dodgerblue'>Main</GridItem>

    </Grid>
  )
}

export default App
