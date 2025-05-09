import { Card, Skeleton, SkeletonText } from '@chakra-ui/react'


const MovieCardSkeleton = () => {
  return (
    <Card.Root>
        <Skeleton height='400px'/>
        <Card.Body>
            <SkeletonText />
        </Card.Body>
    </Card.Root>
  )
}

export default MovieCardSkeleton
