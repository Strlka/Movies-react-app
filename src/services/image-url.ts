import noImage from '../assets/Vertical_placeholder.svg.png';
import noAvatar from '../assets/default-avatar-3.svg';

export const getImageUrl = (path: string) => {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    const imageUrl = path ? (baseUrl + path) : noImage;
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

export const getAvatarUrl = (path: string) => {
    const baseUrl = 'https://media.themoviedb.org/t/p/original';
    const imageUrl = path ? (baseUrl + path) : noAvatar;
    return imageUrl
}

