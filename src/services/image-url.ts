
export const getImageUrl = (path: string) => {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    const imageUrl = baseUrl + path;
    return imageUrl
}

export const getPosterUrl = (path: string) => {
    const baseUrl = 'https://image.tmdb.org/t/p/original';
    const posterUrl = baseUrl + path;
    return posterUrl
}

export const getProviderImageUrl = (path: string) => {
    const baseUrl = 'https://media.themoviedb.org/t/p/original';
    const imageUrl = baseUrl + path;
    return imageUrl
}

