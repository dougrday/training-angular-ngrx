import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./components/app.component";
import { MovieDetailsComponent } from "./components/movie-details/movie-details.component";
import { MovieListComponent } from "./components/movie-list/movie-list.component";
import { MovieService } from "./services/movie.service";
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import * as fromMovie from './movie.reducer';
import { MovieEffects } from './movie.effects';

@NgModule({
    declarations: [
        AppComponent,
        MovieDetailsComponent,
        MovieListComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([AppEffects]),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        StoreModule.forFeature('movie', fromMovie.reducer),
        EffectsModule.forFeature([MovieEffects]),
    ],
    providers: [
        MovieService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
