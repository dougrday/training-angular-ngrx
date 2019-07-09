import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { fromEvent, Subject } from "rxjs";
import { debounceTime, map, takeUntil } from "rxjs/operators";
import { SearchMovies } from "src/app/store/movie.actions";

@Component({
    selector: "app-movie-search",
    templateUrl: "./movie-search.component.html",
    styleUrls: ["./movie-search.component.css"]
})
export class MovieSearchComponent implements AfterViewInit, OnDestroy {
    @ViewChild("search", { static: false }) searchElement: ElementRef;
    destroy$ = new Subject<void>();
    isSearching = false;

    constructor(private store$: Store<any>) { }

    beginSearch() {
        this.isSearching = true;
        this.searchElement.nativeElement.value = "";
        requestAnimationFrame(() => this.searchElement.nativeElement.focus());
    }

    endSearch() {
        this.isSearching = false;
    }

    search(query: string) {
        this.store$.dispatch(new SearchMovies(query));
    }

    ngAfterViewInit(): void {
        fromEvent(this.searchElement.nativeElement, "input")
            .pipe(
                takeUntil(this.destroy$),
                map((e: any) => e.target.value),
                debounceTime(300),
            )
            .subscribe((query: string) => this.search(query));
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    @HostListener("document:keydown.s", ["$event"])
    handleSearch($event: KeyboardEvent) {
        if (!this.isSearching) {
            $event.preventDefault();
            $event.stopPropagation();
            this.beginSearch();
        }
    }

    @HostListener("document:keydown.enter", ["$event"])
    handleEnter($event: KeyboardEvent) {
        $event.preventDefault();
        $event.stopPropagation();
        if (this.searchElement.nativeElement.value === "") {
            // Get back the original "latest releases" search results
            this.search(this.searchElement.nativeElement.value);
        }
        this.endSearch();
    }

    @HostListener("document:keydown.escape", ["$event"])
    handleEscape($event: KeyboardEvent) {
        $event.preventDefault();
        $event.stopPropagation();
        this.endSearch();
    }
}
