import { Box, Spinner } from '@chakra-ui/react';
import useVideos from '../hooks/useVideos';

interface Props {
    movieId?: string;
}


const MovieVideo = ({movieId}: Props) => {

    const {data, isLoading, error} = useVideos(movieId);

    if (isLoading) return <Box padding='10px'><Spinner size='xl' color='teal.400'/></Box>;
    if (!data || data.length === 0 || error) return null;

    console.log(data);

  return (
    <iframe 
        src={`https://www.youtube.com/embed/${data[0].key}`}
        width='560'
        height='315'
        allow='autoplay; encrypted-media; picture-in-picture'
        style={{ borderRadius: '10px',  }}
    ></iframe>
  )
}

export default MovieVideo
