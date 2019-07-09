import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, filter } from "rxjs/operators";
import { SearchResults } from "../models/themoviedb";
import { MovieService } from "../services/movie.service";
import { MovieActions, MovieActionTypes, SearchMoviesFailure, SearchMoviesSuccess } from "./movie.actions";

@Injectable()
export class MovieEffects {
    @Effect()
    loadAllMovies = this.actions$.pipe(
        ofType(MovieActionTypes.SearchMovies),
        // No search text was provided
        filter(action => !action.payload),
        switchMap(() => this.movieService
            .getNowPlaying({ page: "1" })
            .pipe(
                map((searchResults: SearchResults) => new SearchMoviesSuccess(searchResults)),
                catchError(error => of(new SearchMoviesFailure({ error })))
            )
        )
    );

    @Effect()
    searchMovies = this.actions$.pipe(
        ofType(MovieActionTypes.SearchMovies),
        // Search text was provided
        filter(action => !!action.payload && action.payload.length >= 2),
        switchMap(action => this.movieService
            .search({ query: action.payload, page: "1" })
            .pipe(
                map((searchResults: SearchResults) => new SearchMoviesSuccess(searchResults)),
                catchError(error => of(new SearchMoviesFailure({ error })))
            )
        )
    );

    constructor(
        private actions$: Actions<MovieActions>,
        private movieService: MovieService) {
    }
}
