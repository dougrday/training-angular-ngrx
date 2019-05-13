
import { MovieActions, MovieActionTypes } from './movie.actions';

export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: MovieActions): State {
    switch (action.type) {

        case MovieActionTypes.LoadMovies:
            return state;

        case MovieActionTypes.LoadMoviesSuccess:
            return state;

        case MovieActionTypes.LoadMoviesFailure:
            return state;

        default:
            return state;
    }
}
