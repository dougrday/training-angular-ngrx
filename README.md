# Training - Redux Architecture

This is a multipart training workshop, aimed at teaching you the basic principles of Redux.

We'll be using the following technologies in this workshop:

* Angular
* Angular CLI
* Angular Schematics
* @ngrx/store
* @ngrx/effects
* @ngrx/store-devtools

## Presentation

The presentation is provided along with the workshop.  Simply open the `/presentation` folder and run the `run.cmd` file.  The presentation should automatically open at http://localhost:8000.

Note that you must have *Python* installed to run the `run.cmd` command.

---------------

## Part 1 - 20 minutes

- Clone this project, starting at the `part1` branch:
`git clone --branch part1 https://github.com/landmarkhw/training-redux-arch.git`

### How to run

Navigate to the `training-redux-arch` folder via command line.
Run `npm install` to install all the dependencies.
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### No Redux, Yet

At this point, the application doesn't have NgRx installed yet.  It's just a simple Angular application.

### Workshop Tasks

Let's get acquainted with the application.

#### Task 1: Look at `movie-list.component.html`:

Notice a few things:

- This file is pretty simple (although it's got a few Angular tricks).
- We're displaying both the movie details and the movie list in the same component.
- The `app-movie-details` component depends on data from the movie-list component.  This means the movie-list component is responsible to track which movie has been selected.

#### Task 2: Look at `movie-list.component.ts`:

This file is a pretty standard Angular component:

- Calls the `MovieService` to retrieve search results.
    * NOTE: we don't call themoviedb.org API directly here.  We properly <i>separate the concerns</i> by creating a `MovieService` class that's responsible for interacting with the API.
- Holds the search results in the `searchResults$` observable variable (more on RxJS Observables in a later training).
- Holds the selected movie in the `selectedMovie` variable.
- Sets/clears the `selectedMovie` when a movie is clicked, or when the back button is clicked (respectively).

#### Task 3: Look at `movie.service.ts`:

- Calls `themoviedb.org`'s API
- Uses an `api_key` specifically meant for this workshop.

#### Task 4: Look at `movie-details-component.html`:

Notice that there's business logic here: `{{movie.vote_average / 2 }}`
We want to display the movie rating as a 5-star rating, whereas the data is based on a 1-10 rating.  This business logic is currently happening directly in the view (hint: not good).

### The Remaining Problems (that NgRx will help solve)

#### Application state isn't shared
- MovieList needs the selected item to display an outline
- MovieDetails needs the selected item to display its details
- Without MovieList, there's no place to trigger a search, or store movie search results.  What if we wanted to use MovieDetails alone?
#### Business logic is intermixed in display logic
- Service calls happen in components
#### [Inappropriate Intimacy](https://blog.codinghorror.com/code-smells/)
> Classes should know as little as possible about each other.
- MovieList knows about MovieDetails, and in fact is responsible for delivering all its content to it
- MovieList knows that it will be animated, and is responsible for animating itself and the MovieDetails.

---------------

## Part 2 - 1 hour

### Task 1: Let's add NgRx!
From a command line, navigate to the project folder and run these commands from [the official docs](https://ngrx.io/docs):
`npm install @ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools --save`
`npm install @ngrx/schematics --save-dev`
`ng add @ngrx/store`
`ng add @ngrx/effects`
`ng add @ngrx/store-devtools`

Notice that:
- `@ngrx/store` has been installed and added to `app.module.ts` for us
- A default `State` interface and global `reducer` was created (`src\app\reducers\index.ts`)
- The Store and Effects have been registered with the app module.
- `@ngrx/store-devtools` has been installed.  This allows you to use [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) to watch what's happening in Redux (actions & state).

### Task 2: Generate a feature using @ngrx/schematic
Now, run this command to create a new `Movie` feature in `NgRx`:
`ng generate @ngrx/schematics:feature Movie --module=app.module.ts --api`

Notice that:
- An actions file was created `movie.actions.ts`
- A reducer was created `movie.reducer.ts` and `movie.reducer.spec.ts`
- An effect was created `movie.effects.ts` and `movie.effects.spec.ts`

### Task 3: Provide actions inside `movie.actions.ts` for searching the API

There should be 3 separate actions. We will dispatch:
- `SearchMovies` - when the user initiates a search for movies. It doesn't need a payload (it always "finds all movies")
- `SearchMoviesFailure` - when an error happens while communicating with the API. It can be of type `any`.
- `SearchMoviesSuccess` - when the API returns a successful result. Its payload should be of type `SearchResults`.

### Task 4: Update the reducer in `movie.reducer.ts` to save search results to state

Add a switch case for `SearchMoviesSuccess` that reduces the action into state:
```
case MovieActionTypes.SearchMoviesSuccess:
    return {
        ...state,
        searchResults: action.payload,
    };
```

### Task 5: Update the effect in `movie.effects.ts` to use the MovieService to initiate a search.

- Inject the `MovieService` into the constructor - e.g. `private movieService: MovieService`
- Create an effect that will call the `MovieService` and dispatch a success/failure action based on the results:
```
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
```

### Task 6: Create a selector to retrieve a list of movies from the search results.

- Create a file named `movie.selectors.ts` next to the other NgRx files.
- Create a selector named `getSearchResultItems` that retrieves a list of movies from the search results, or an empty array otherwise:
```
export const getSearchResultItems = createSelector(
    state => state.movie,
    movie => movie.searchResults && movie.searchResults.results || [],
);
```

### Task 7: Update `movie-list.component.ts` to get its data from the store.

In the constructor, first inject the store:

`private store$: Store<any>`

Then, in the constructor initialize `searchResults$` like this:

`this.searchResults$ = this.store$.pipe(select(getSearchResultItems));`

In `ngOnInit()`, dispatch a `SearchMovies` action like this:

`this.store$.dispatch(new SearchMovies());`

## Part 3 - 1 hour

### Task 1: Create a search bar
