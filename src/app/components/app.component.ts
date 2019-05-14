import { Component, HostListener } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { SearchResult } from "../models/themoviedb";
import { getSelectedMovie } from "../movie.selectors";
import { SelectMovie } from "../movie.actions";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    selectedMovie$: Observable<SearchResult>;

    constructor(
        private store: Store<any>,
    ) {
        this.selectedMovie$ = this.store.select(getSelectedMovie);
    }

    deselect() {
        this.store.dispatch(new SelectMovie(null));
    }

    handleClose() {
        this.deselect();
    }

    @HostListener("keydown.escape")
    handleEscape($event: KeyboardEvent) {
        this.deselect();
    }
}
