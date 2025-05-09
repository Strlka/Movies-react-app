
export const getImageUrl = (path: string) => {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    const imageUrl = baseUrl + path;
    return imageUrl
}

export const getPosterUrl = (path: string) => {
    const baseUrl = 'https://image.tmdb.org/t/p/w780';
    const posterUrl = baseUrl + path;
    return posterUrl
}