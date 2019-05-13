import { NowPlayingSearchOptions, SearchResult, SearchResults } from "../models/themoviedb";
import { Action } from "@ngrx/store";

interface ActionWithPayload<TPayload> extends Action {
    payload: TPayload;
}

export enum MovieActionTypes {
    Search = '@demo/movie/search/begin',
    SearchFailure = '@demo/movie/search/failure',
    SearchSuccess = '@demo/movie/search/success',
    Select = '@demo/movie/select',
}

export class SearchAction implements ActionWithPayload<NowPlayingSearchOptions> {
    readonly type = MovieActionTypes.Search;
    constructor(public payload: NowPlayingSearchOptions) { };
}

export class SearchFailureAction implements ActionWithPayload<any> {
    readonly type = MovieActionTypes.SearchFailure;
    constructor(public payload: any) { };
}

export class SearchSuccessAction implements ActionWithPayload<SearchResults> {
    readonly type = MovieActionTypes.SearchSuccess;
    constructor(public payload: SearchResults) { };
}

export class SelectAction implements ActionWithPayload<SearchResult> {
    readonly type = MovieActionTypes.Select;
    constructor(public payload: SearchResult) { };
}

export type MovieActions =
    SearchAction
    | SearchFailureAction
    | SearchSuccessAction
    | SelectAction;
