import { createSelector } from "@ngrx/store";
import { SearchResult } from "../models/themoviedb";

const getMovieState = (state: any) => state.movie;

/**
 * Gets a list of movies from the search results.
 * @param state The application state.
 * @description A memoized selector that returns movie search results.
 */
export const getSearchResultList = createSelector(
    getMovieState,
    movie => {
        const searchResults = movie.searchResults;
        if (searchResults) {
            return searchResults.results;
        }
        // If no search results yet, return an empty list
        return [];
    }
);

/**
 * Gets the 5-star rating for a search result (rounded to 1 decimal place)
 * @param searchResult themoviedb.org search result.
 */
export const get5StarRating = (searchResult: SearchResult) => {
    if (searchResult && searchResult.vote_average) {
        return parseFloat((searchResult.vote_average / 2).toFixed(1));
    }
    return 0;
}

/**
 * Gets the currently-selected movie.
 */
export const getSelectedMovie = createSelector(
    getMovieState,
    movie => movie.selectedMovie
);
