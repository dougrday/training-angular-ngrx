import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { MovieActions, SelectAction } from "../actions/movie.actions";
import { SearchResult } from "../models/themoviedb";
import { AppState } from "../reducers";
import { getSelectedMovie } from "../selectors/movie.selectors";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    selectedMovie$: Observable<SearchResult>;

    constructor(
        private store: Store<AppState>,
    ) {
        this.selectedMovie$ = this.store.select(getSelectedMovie);
    }

    handleClose() {
        this.store.dispatch(new SelectAction(null));
    }
}
