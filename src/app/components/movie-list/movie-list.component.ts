import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { SearchResult, SearchResults } from "../../models/themoviedb";
import { getSearchResultList, getSelectedMovie } from "src/app/movie.selectors";
import { SelectMovie, SearchMovies } from "src/app/movie.actions";

@Component({
    selector: "app-movie-list",
    templateUrl: "./movie-list.component.html",
    styleUrls: ["./movie-list.component.css"]
})
export class MovieListComponent implements OnInit {
    searchResults$: Observable<SearchResult[]>;
    selectedMovie$: Observable<SearchResult>;

    constructor(
        private store$: Store<any>,
    ) {
        this.searchResults$ = this.store$.pipe(select(getSearchResultList));
        this.selectedMovie$ = this.store$.pipe(select(getSelectedMovie));
    }

    handleClick(movie: SearchResult) {
        this.store$.dispatch(new SelectMovie(movie));
    }

    ngOnInit() {
        // NOTE: instead of calling the API directly here, we now dispatch
        // an action to perform the search.
        this.store$.dispatch(new SearchMovies());
    }
}
