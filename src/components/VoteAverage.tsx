import { AbsoluteCenter, ProgressCircle } from '@chakra-ui/react';


interface Props {
    vote_average: number;
}

const VoteAverage = ({vote_average}: Props) => {

    const score = Math.round(vote_average*10)

    const color = score > 70 ? 'green.400' : score > 55 ? 'yellow.300' : 'red.500';
  
    return (
      <ProgressCircle.Root size='xl' value={score}>
        <ProgressCircle.Circle {...{ "--thickness": "4px" }}>
          <ProgressCircle.Track />
          <ProgressCircle.Range {...{strokeLinecap: "round", stroke: color }} />
        </ProgressCircle.Circle>
        <AbsoluteCenter>
          <ProgressCircle.ValueText />
        </AbsoluteCenter>
      </ProgressCircle.Root>
  )
}

export default VoteAverage
