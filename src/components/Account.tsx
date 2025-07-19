import { Grid, GridItem, IconButton, useBreakpointValue, Heading, Box } from '@chakra-ui/react';
import useAccount from '../hooks/useAccount'
import { useEffect, useRef, useState } from 'react';
import { FaAnglesUp } from 'react-icons/fa6';
import FavoriteMoviesGrid from './FavoriteMoviesGrid';
import AccountMenu from './AccountMenu';


const Account = () => {

  const sessionID = localStorage.getItem('session_id');  

  const {data: account, isLoading, error} = useAccount(sessionID || '');

  const showAside = useBreakpointValue({ base: false, lg: true });
  const showOntop = useBreakpointValue({ base: true, lg: false });
  const showHeading = useBreakpointValue({ base: false, lg: true });

  const [showRatedmovies, setShowRatedMovies] = useState(false);


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
    account && 
    <>
        <Grid height="100vh"
          templateAreas={{
            base: `"main"`,
            lg: `"aside main"`,
          }}
          templateColumns={{
            base: "1fr",
            lg: "200px 1fr",
          }}
          templateRows={{
            base: "auto auto 1fr",
            lg: "auto 1fr",
          }}
        >
          {showAside && (
            <GridItem area="aside" paddingX="10px">
              <AccountMenu 
                username={account.username}
                showRatedmovies={showRatedmovies}
                setShowRatedMovies={() => setShowRatedMovies(true)} 
                reSetShowRatedMovies={() => setShowRatedMovies(false)}
              />
            </GridItem>
          )}
          <GridItem area="main" overflowY="auto" ref={mainRef}>
            {showOntop && <Box paddingX="10px">
                            <AccountMenu 
                              username={account.username}
                              showRatedmovies={showRatedmovies}
                              setShowRatedMovies={() => setShowRatedMovies(true)} 
                              reSetShowRatedMovies={() => setShowRatedMovies(false)}
                            />
                          </Box>}
            {showHeading && <Heading as="h1" 
              marginY={5} 
              fontSize={{base: '2xl', lg: '3xl'}}
              paddingLeft={3}
            >
              {account.username} {showRatedmovies ? 'rated' : 'favorite'} movies
            </Heading>}
            <FavoriteMoviesGrid accountId={account.id} sessionID={sessionID} showRatedmovies={showRatedmovies}/>
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
  )
}

export default Account
