import useImages from '../hooks/useImages'
import { getPosterUrl } from '../services/image-url';
import { SimpleGrid, Image, Text, Skeleton, Box } from '@chakra-ui/react';


interface Props {
    movieId?: string;
}

const MovieImages = ({movieId}: Props) => {

    const {data, isLoading, error} = useImages(movieId);


    const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    if (!isLoading && (!data || data.length === 0 || error)) return null;


  return (
    <>
        <Text 
            fontSize='2xl'
            fontWeight='bold'
            color='white'
            marginTop={10}
            marginLeft={{sm: '12px', md: '56px', lg: '56px', xl: '56px'}}
        >Posters</Text>
        <SimpleGrid 
            columns={{sm: 2, md: 3, lg: 4, xl: 5}} 
            marginTop='12px' 
            marginLeft={{sm: '12px', md: '56px', lg: '56px', xl: '56px'}}
            gap={5}
        >
        {data?.map((poster) => (poster.aspect_ratio === 0.667) && <Image key={poster.file_path} src={getPosterUrl(poster.file_path)} rounded="lg" />).splice(0, 10)}
        {isLoading && skeletons.map((skeleton) => <Skeleton key={skeleton} height='400px' />)}
        </SimpleGrid>
    </>
  )
}

export default MovieImages
