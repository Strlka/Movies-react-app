import { useEffect, useState } from 'react'
import apiClient from '../services/api-client';
import { Text } from '@chakra-ui/react';

interface Movie {
    id: number,
    title: string,
    vote_average: number,
}

interface FetchGamesResponse {
    count: number;
    results: Movie[];
}

const GameGrid = () => {
    const [games, setGames] = useState<Movie[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        apiClient.get<FetchGamesResponse>('/3/movie/top_rated')
            .then(res => setGames(res.data.results))
            .catch(err => setError(err.message));
    }, [])


  return (
    <>
      {error && <Text>{error}</Text>}
      <ul>
        {games.map(game => <li key={game.id}>{game.title} — Рейтинг: {game.vote_average}</li>)}
      </ul>
    </>
  )
}

export default GameGrid
