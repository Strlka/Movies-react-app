import { Box, Spinner } from '@chakra-ui/react';
import useVideos from '../hooks/useVideos';

interface Props {
    movieId?: string;
}


const MovieVideo = ({movieId}: Props) => {

    const {data, isLoading, error} = useVideos(movieId);

    if (isLoading) return <Box padding='10px'><Spinner size='xl' color='teal.400'/></Box>;
    if (!data || error) return null;

  return (
    <iframe 
        src={`https://www.youtube.com/embed/${data[0].key}`}
        width='560'
        height='315'
        allow='autoplay; encrypted-media; picture-in-picture'
        style={{ borderRadius: '12px',  }}
    ></iframe>
  )
}

export default MovieVideo
