import { Box, Flex, Text } from "@chakra-ui/react"
import MovieCard from "./MovieCard"
import useGenres from "../hooks/useGenres";
import { useNavigate } from "react-router-dom";
import MovieCardContainer from "./MovieCardContainer";
import MovieCardSkeleton from "./MovieCardSkeleton";
import useRecommendationsdMovies from "../hooks/useRecommendationsMovies";

interface Props {
    favoriteMoviesIds: number[];
    isLoading: boolean;
}

const Recommendations = ({favoriteMoviesIds, isLoading}: Props) => {

    const navigate = useNavigate();

    const {data: genres} = useGenres();

    const {movies, error, isLoading: isRecommendationsLoading} = useRecommendationsdMovies(favoriteMoviesIds);


    const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    console.log(favoriteMoviesIds);


    if (error) return <Text>{error.message}</Text>;
    
  return (
    <>
        <Text 
            fontSize='2xl'
            fontWeight='bold'
            color='white'
            marginTop={10}
            marginBottom={2}
        >
            Recommendations 
        </Text>
        {(favoriteMoviesIds.length !== 0 || isLoading) ?
        <Flex
            gap={5}
            overflowX="auto"
            css={{
            '&::-webkit-scrollbar': { height: '8px' },
            '&::-webkit-scrollbar-thumb': { background: '#e2e8f0', borderRadius: '8px' }
            }}
        >
            {movies.map(movie => (
                <Box minWidth='250px' key={`movie_${movie.id}`}>
                    <MovieCardContainer>
                        <MovieCard movie={movie} genres={genres || []} onClick={() => navigate(`/movies/${movie.id}`)} />
                    </MovieCardContainer>
                </Box>
            ))}
            {(isRecommendationsLoading || movies.length === 0) && skeletons.map((skeleton) => (
                <Box minWidth='250px' key={skeleton}>
                    <MovieCardContainer>
                        <MovieCardSkeleton />
                    </MovieCardContainer>
                </Box>
            ))}
        </Flex>
        : <Text>Select the movies you like and we'll make recommendations for you</Text>}
    </>
  )
}

export default Recommendations
