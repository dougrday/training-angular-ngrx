import { MovieActionTypes, MovieActions } from "../actions/movie.actions";
import { SearchResults, SearchResult } from "../models/themoviedb";

/**
 * Define the `movie` area of state.
 */
export interface MovieState {
    /**
     * The currently selected movie.
     */
    selectedMovie?: SearchResult;

    /**
     * A list of search results from themoviedb.org API.
     */
    searchResults?: SearchResults;
};

/**
 * The default state.
 */
const defaultState: MovieState = {
    selectedMovie: null,
    searchResults: null,
};

/**
 * The reducer, responsible for updating the state of this area of the application
 * when specific actions are observed in the store.
 */
export function movieReducer(state = defaultState, action: MovieActions) {
    switch (action.type) {
        // When the search results are successfully retrieved from the API,
        // store those results in the Redux store.
        case MovieActionTypes.SearchSuccess: {
            // Create an immutable copy of state.  This is one of the main rules
            // of a reducer -- it MUST return immutable state.
            // This makes the reducer a `pure` function -- we don't modify
            // state directly, but clone it first, and then modify the clone.
            return {
                ...state,
                searchResults: action.payload,
            };
        }

        case MovieActionTypes.Select: {
            return {
                ...state,
                selectedMovie: action.payload,
            };
        }

        // No changes to state need to be made, return the current state.
        default: return state;
    }
}
