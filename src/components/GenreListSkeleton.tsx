import { SkeletonText, Heading } from '@chakra-ui/react'


const GenreListSkeleton = () => {

  return (
    <>
        <Heading marginY={5}>Genres</Heading>
        <SkeletonText 
            noOfLines={20} 
            gap={5}
            height={5}
            width='3/4'
        />
    </>

  )
}

export default GenreListSkeleton
