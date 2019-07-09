import { Component, HostListener } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable, of, timer } from "rxjs";
import { mapTo, switchMap } from "rxjs/operators";
import { SearchResult } from "../models/themoviedb";
import { SelectMovie } from "../store/movie.actions";
import { getSelectedMovie } from "../store/movie.selectors";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    selectedMovie$: Observable<SearchResult>;
    selectedMovieDetails$: Observable<SearchResult>;

    constructor(
        private store$: Store<any>,
    ) {
        this.selectedMovie$ = this.store$.pipe(select(getSelectedMovie));

        // Setup an observable for displaying the movie details that
        // waits for 1 second before being deselected (to account for
        // the animation delay)
        this.selectedMovieDetails$ = this.store$.pipe(
            select(getSelectedMovie),
            switchMap(movie => {
                if (!movie) {
                    // When deselected, wait 1 second before emitting the value
                    return timer(1000).pipe(mapTo(movie));
                }
                return of(movie);
            })
        );
    }

    deselect() {
        this.store$.dispatch(new SelectMovie(null));
    }

    handleClose() {
        this.deselect();
    }

    @HostListener("keydown.escape")
    handleEscape($event: KeyboardEvent) {
        this.deselect();
    }
}
