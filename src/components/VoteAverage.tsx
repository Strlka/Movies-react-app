import { Badge } from '@chakra-ui/react';


interface Props {
    vote_average: number;
}

const VoteAverage = ({vote_average}: Props) => {

    const score = Math.round(vote_average*10)

    let color = score > 75 ? 'green.400' : score > 60 ? 'yellow.300' : 'gray.300';
  
    return (
    <Badge fontSize='lg'padding={2} borderRadius='full' aspectRatio={1} shadow='md' borderColor={color} borderWidth={3}>{score}%</Badge>
  )
}

export default VoteAverage
