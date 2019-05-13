import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { SearchMovies } from "src/app/movie.actions";
import { SearchResult, SearchResults } from "../../models/themoviedb";

@Component({
    selector: "app-movie-list",
    templateUrl: "./movie-list.component.html",
    styleUrls: ["./movie-list.component.css"]
})
export class MovieListComponent implements OnInit {
    searchResults$: Observable<SearchResults>;
    selectedMovie: SearchResult;

    constructor(
        private store$: Store<any>,
    ) {
        this.searchResults$ = this.store$.pipe(select(state => state.movie.searchResults));
    }

    handleClick(movie: SearchResult) {
        this.selectedMovie = movie;
    }

    handleClose() {
        this.selectedMovie = null;
    }

    ngOnInit() {
        // When the component is initialized, begin searching for movies
        this.store$.dispatch(new SearchMovies());
    }
}
