import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { AppComponent } from "./components/app.component";
import { MovieDetailsComponent } from "./components/movie-details/movie-details.component";
import { MovieListComponent } from "./components/movie-list/movie-list.component";
import { MovieSearchComponent } from "./components/movie-search/movie-search.component";
import { metaReducers, reducers } from "./reducers";
import { MovieService } from "./services/movie.service";
import { AppEffects } from "./store/app.effects";
import { MovieEffects } from "./store/movie.effects";
import { movieReducer } from "./store/movie.reducer";

@NgModule({
    declarations: [
        AppComponent,
        MovieDetailsComponent,
        MovieListComponent,
        MovieSearchComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([AppEffects]),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        StoreModule.forFeature("movie", movieReducer),
        EffectsModule.forFeature([MovieEffects]),
    ],
    providers: [
        MovieService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
