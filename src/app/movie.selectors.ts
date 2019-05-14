import { createSelector } from "@ngrx/store";

export const getMovieState = state => state.movie;

export const getSearchResultList = createSelector(
    getMovieState,
    movie => movie.searchResults && movie.searchResults.results || [],
);
