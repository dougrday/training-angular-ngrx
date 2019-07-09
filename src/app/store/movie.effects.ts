import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SearchResults } from '../models/themoviedb';
import { MovieActions, MovieActionTypes, SearchMoviesFailure, SearchMoviesSuccess } from './movie.actions';
import { MovieService } from '../services/movie.service';

@Injectable()
export class MovieEffects {
    @Effect()
    searchMovies = this.actions$.pipe(
        ofType(MovieActionTypes.SearchMovies),
        switchMap(() => this.movieService
            .getNowPlaying({ page: "1" })
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
