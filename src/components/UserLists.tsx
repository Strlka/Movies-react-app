import { Grid, GridItem, IconButton, Box, Icon } from '@chakra-ui/react';
import useAccount from '../hooks/useAccount'
import { useEffect, useRef, useState } from 'react';
import { FaAnglesUp } from 'react-icons/fa6';
import FavoriteMoviesGrid from './FavoriteMoviesGrid';
import { Navigate } from 'react-router-dom';
import AsideMoviesLists from './AsideMoviesLists';
import UserListsHeading from './UserListsHeading';


const UserLists = () => {

  const sessionID = localStorage.getItem('session_id');  

  if (!sessionID) return <Navigate to='/' />;

  const {data: account, isLoading, error} = useAccount(sessionID || '');


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

  useEffect(() => {
    const saved = sessionStorage.getItem('scrollPos:/');
    if (saved && mainRef.current) {
      mainRef.current.scrollTop = Number(saved);
    }
  }, []); 

  if (!account) return null;


  return (
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
          <GridItem area="aside" paddingX="10px" hideBelow="lg">
            <AsideMoviesLists showRatedmovies={showRatedmovies} />
          </GridItem>
          <GridItem area="main" overflowY="auto" ref={mainRef}>
            <Box paddingX="10px">
              <UserListsHeading
                showRatedmovies={showRatedmovies}
                setShowRatedMovies={() => setShowRatedMovies(true)} 
                reSetShowRatedMovies={() => setShowRatedMovies(false)}
              />
            </Box>
            <FavoriteMoviesGrid accountId={account.id} sessionID={sessionID} showRatedmovies={showRatedmovies} mainRef={mainRef}/>
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
            <Icon as={FaAnglesUp} />
          </IconButton>}
        </Grid>
      </>
  )
}

export default UserLists
