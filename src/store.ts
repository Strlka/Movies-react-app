import { create } from "zustand";


interface MovieQuery {
    genreId?: number;
    providerId?: number;
    selectorParam?: string;
    searchText?: string;
  }

interface MovieQueryStore {
    movieQuery: MovieQuery;
    setSearchText: (searchText: string) => void;
    setGernreId: (genreId: number) => void;
    setProviderId: (providerId: number) => void;
    setSelectorParam: (selectorParam: string) => void;
    resetSearchText: () => void;
    resetProviderId: () => void;
    resetGenreId: () => void;
    resetSelectorParam: () => void;
}

const useMovieQueryStore = create<MovieQueryStore>((set) => ({
    movieQuery: {},
    setSearchText: (searchText) => set(() => ({movieQuery: { searchText }})),
    setGernreId: (genreId) =>set((store) => ({movieQuery: {...store.movieQuery, searchText: undefined, genreId}})),
    setProviderId: (providerId) => set((store) => ({movieQuery: {...store.movieQuery, searchText: undefined, providerId}})),
    setSelectorParam: (selectorParam) => set((store) => ({movieQuery: {...store.movieQuery, searchText: undefined, selectorParam}})),
    resetSearchText: () => set(() => ({movieQuery: {}})),
    resetProviderId: () => set((store) => ({movieQuery: {...store.movieQuery, providerId: undefined }})),
    resetGenreId: () => set((store) => ({movieQuery: {...store.movieQuery, genreId: undefined }})),
    resetSelectorParam: () => set((store) => ({movieQuery: {...store.movieQuery, selectorParam: undefined }})),
}));

export default useMovieQueryStore;