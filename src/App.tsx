import { Box, Grid, GridItem, HStack, IconButton, useBreakpointValue } from "@chakra-ui/react"
import NavBar from "./components/NavBar";
import MovieGrid from "./components/MovieGrid";
import GenreList from "./components/GenreList";
import { useEffect, useRef, useState } from "react";
import ProviderSelector from "./components/ProviderSelector";
import SortSelector from "./components/SortSelector";
import MovieHeading from "./components/MovieHeading";
import { FaAnglesUp } from "react-icons/fa6";




function App() {

  const showAside = useBreakpointValue({ base: false, lg: true });


  const [foudMoviesTotalResults,  setFoudMoviesTotalResults] = useState<number | ''>('');
  const [isShowScrollToTop, setShowScrollToTop] = useState(false);

  const mainRef = useRef<HTMLDivElement>(null);
  const scrollToTop = () => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  useEffect(() => {
    const element = mainRef.current;
    if (!element) return;
    
    const handleScroll = () => {
      const showAt = window.innerHeight * 2;
      setShowScrollToTop(element.scrollTop > showAt);

    };

    element.addEventListener("scroll", handleScroll);
    return () => element.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <>
      <Grid height="100vh"
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "200px 1fr",
        }}
        templateRows={{
          base: "auto 1fr",
          lg: "auto 1fr",
        }}
      >
        <GridItem area="nav">
          <NavBar />
        </GridItem>
        {showAside && (
          <GridItem area="aside" paddingX="10px">
            <GenreList />
          </GridItem>
        )}
        <GridItem area="main" overflowY="auto" ref={mainRef}>
          <Box paddingLeft={3}>
            <MovieHeading foudMoviesTotalResults={foudMoviesTotalResults} />
            <HStack gap={5} marginBottom={5}>
              <ProviderSelector />
              <SortSelector />
            </HStack>
          </Box>
          <MovieGrid onTotalResultsChange={(totalResults: number | '') => setFoudMoviesTotalResults(totalResults)} />
        </GridItem>
        {isShowScrollToTop && <IconButton 
          variant='subtle' 
          size="lg" 
          _hover={{color: 'teal.400' }}
          onClick={scrollToTop}
          position="fixed"
          bottom="30px"
          right="30px"
          zIndex={2}
          borderRadius="full"
          transition="opacity 0.3s"
          opacity={isShowScrollToTop ? 1 : 0}
          aria-label="Scroll to top"
          >
          <FaAnglesUp />
        </IconButton>}
      </Grid>
    </>
  );
}

export default App
