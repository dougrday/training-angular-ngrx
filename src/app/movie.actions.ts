import { Action } from '@ngrx/store';
import { NowPlayingSearchOptions, SearchResults } from './models/themoviedb';

export enum MovieActionTypes {
    SearchMovies = '@demo/movies/search',
    SearchMoviesFailure = '@demo/movies/search/failure',
    SearchMoviesSuccess = '@demo/movies/search/success',
}

export class SearchMovies implements Action {
    readonly type = MovieActionTypes.SearchMovies;
}

export class SearchMoviesFailure implements Action {
    readonly type = MovieActionTypes.SearchMoviesFailure;
    constructor(public payload: any) {}
}

export class SearchMoviesSuccess implements Action {
    readonly type = MovieActionTypes.SearchMoviesSuccess;
    constructor(public payload: SearchResults) {}
}

export type MovieActions =
    SearchMovies
    | SearchMoviesFailure
    | SearchMoviesSuccess;
