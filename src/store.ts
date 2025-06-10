import { create } from "zustand";
import { Movie } from "./hooks/useMovies";

interface MovieQuery {
    genreId?: number;
    providerId?: number;
    selectorParam?: string;
    searchText?: string;
  }

interface MovieQueryStore {
    movieQuery: MovieQuery;
    currentMovie: Movie;
    setSearchText: (searchText: string) => void;
    setGernreId: (genreId: number) => void;
    setProviderId: (providerId: number) => void;
    setSelectorParam: (selectorParam: string) => void;
    setCurrentMovie: (currentMovie: Movie) => void;
    resetSearchText: () => void;
    resetProviderId: () => void;
    resetGenreId: () => void;
    resetSelectorParam: () => void;
    resetCurrentMovie: () => void;
}

const useMovieQueryStore = create<MovieQueryStore>((set) => ({
    movieQuery: {},
    currentMovie: {} as Movie,
    setSearchText: (searchText) => set(() => ({movieQuery: { searchText }})),
    setGernreId: (genreId) =>set((store) => ({movieQuery: {...store.movieQuery, genreId}})),
    setProviderId: (providerId) => set((store) => ({movieQuery: {...store.movieQuery, providerId}})),
    setSelectorParam: (selectorParam) => set((store) => ({movieQuery: {...store.movieQuery, selectorParam}})),
    setCurrentMovie: (currentMovie) => set(() => ({currentMovie})),
    resetSearchText: () => set(() => ({movieQuery: {}})),
    resetProviderId: () => set((store) => ({movieQuery: {...store.movieQuery, providerId: undefined }})),
    resetGenreId: () => set((store) => ({movieQuery: {...store.movieQuery, genreId: undefined }})),
    resetSelectorParam: () => set((store) => ({movieQuery: {...store.movieQuery, selectorParam: undefined }})),
    resetCurrentMovie: () => set(() => ({currentMovie: {} as Movie})),
}));

export default useMovieQueryStore;