
import { MovieActions, MovieActionTypes } from './movie.actions';
import { SearchResults } from './models/themoviedb';

export interface State {
    searchResults: SearchResults;
}

export const initialState: State = {
    searchResults: null,
};

export function reducer(state = initialState, action: MovieActions): State {
    switch (action.type) {

        case MovieActionTypes.SearchMoviesSuccess:
            return {
                ...state,
                searchResults: action.payload,
            };

        default:
            return state;
    }
}
