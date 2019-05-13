import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { MovieService } from "src/app/services/movie.service";
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
        private movieService: MovieService,
    ) {}

    handleClick(movie: SearchResult) {
        this.selectedMovie = movie;
    }

    handleClose() {
        this.selectedMovie = null;
    }

    ngOnInit() {
        this.searchResults$ = this.movieService.getNowPlaying({ page: '1' });
    }
}
