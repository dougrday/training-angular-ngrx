import { Action } from "@ngrx/store";
import { SearchResult, SearchResults } from "../models/themoviedb";

export enum MovieActionTypes {
    SearchMovies = "@demo/movies/search",
    SearchMoviesFailure = "@demo/movies/search/failure",
    SearchMoviesSuccess = "@demo/movies/search/success",
    Select = "@demo/movies/select",
}

export class SearchMovies implements Action {
    readonly type = MovieActionTypes.SearchMovies;
    constructor(public payload: string) {}
}

export class SearchMoviesFailure implements Action {
    readonly type = MovieActionTypes.SearchMoviesFailure;
    constructor(public payload: any) {}
}

export class SearchMoviesSuccess implements Action {
    readonly type = MovieActionTypes.SearchMoviesSuccess;
    constructor(public payload: SearchResults) {}
}

export class SelectMovie implements Action {
    readonly type = MovieActionTypes.Select;
    constructor(public payload: SearchResult) {}
}

export type MovieActions =
    SearchMovies
    | SearchMoviesFailure
    | SearchMoviesSuccess
    | SelectMovie;
