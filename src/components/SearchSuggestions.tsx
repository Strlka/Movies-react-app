import { useMemo } from "react";
import useSearchMovies, { Movie } from "../hooks/useSearchMovies";
import { Box, Button, CloseButton, HStack, List } from "@chakra-ui/react";
import useMovieQueryStore from "../store";
import { useColorModeValue } from "./ui/color-mode";

interface Props {
    searchText?: string;
    onHideSuggestions: () => void;
}

const SearchSuggestions = ({searchText, onHideSuggestions}: Props) => {

    const { data: foundResults, isLoading: isSearchLoading } = useSearchMovies(searchText);

    const foundMovies: Movie[] = useMemo(() => {
    if (typeof foundResults === 'undefined') {
        return [];
    }
    return foundResults.pages.flatMap(page => page.results).sort((a, b) => b.vote_count - a.vote_count);
    }, [foundResults]);

    const setSearchText = useMovieQueryStore(s => s.setSearchText);

    const bgColor = useColorModeValue('rgba(255,255,255,0.9)', 'rgba(0,0,0,0.8)');
    


  return (
    <Box
        position='absolute'
        height='30vh'
        width='100%'
        overflowY="auto"
        zIndex='3'
        padding='10px'
        backgroundColor={bgColor}
        borderBottomRadius='md'
    >
        <HStack justifyContent='space-between'>
            <List.Root listStyleType='none'>
                {(foundMovies.length !== 0) ? foundMovies.map(movie => <List.Item key={movie.id} paddingY='5px'>
                    <Button 
                        whiteSpace='normal' 
                        textAlign='left' 
                        onClick={() => {
                            setSearchText(movie.title);
                            onHideSuggestions();
                        }} 
                        variant='plain' 
                        fontSize='md' height='auto' 
                        padding='0' 
                        _hover={{ fontWeight: 'bold' }}
                    > 
                        {movie.title}
                    </Button>
            </List.Item>) : <List.Item>Movies not foud</List.Item>}
        </List.Root>
        <CloseButton size="xs" variant='plain' alignSelf='flex-start' onClick={() => onHideSuggestions()}/>
      </HStack>
    </Box>
  )
}

export default SearchSuggestions
