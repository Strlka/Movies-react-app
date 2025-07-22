import { AspectRatio, Box, Skeleton, Spinner } from '@chakra-ui/react';
import useVideos from '../hooks/useVideos';

interface Props {
    movieId?: string;
}


const MovieVideo = ({movieId}: Props) => {

    const {data, isLoading, error} = useVideos(movieId);

    if (isLoading) return (
      <AspectRatio ratio={16/9} style={{borderRadius:'10px', overflow: 'hidden'}}>
        <Skeleton />
      </AspectRatio>
    );

    if (!data || data.length === 0 || error) return null;

    console.log(data);

  return (
    <AspectRatio ratio={16/9} style={{borderRadius:'10px', overflow: 'hidden'}}>
      <iframe 
          src={`https://www.youtube.com/embed/${data[0].key}`}
          allow='autoplay; encrypted-media; picture-in-picture'
      ></iframe>
    </AspectRatio>

  )
}

export default MovieVideo
