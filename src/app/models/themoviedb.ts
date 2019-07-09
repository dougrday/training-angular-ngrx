export interface MovieDbRequest {
    api_key?: string;
    include_adult?: string;
}

export interface MovieDates {
    maximum: string;
    minimum: string;
}

export interface HttpParams {
    [key: string]: string | string[];
};

export interface NowPlayingSearchOptions extends HttpParams, MovieDbRequest {
    language?: string;
    page?: string;
    region?: string;
}

export interface SearchOptions extends HttpParams, MovieDbRequest {
    language?: string;
    query: string;
    page?: string;
}

export interface SearchResult {
    poster_path?: string | null;
    adult?: boolean;
    overview?: string;
    release_date?: string;
    genre_ids?: number[];
    id?: number;
    original_title?: string;
    original_language?: string;
    title?: string;
    backdrop_path?: string | null;
    popularity?: number;
    vote_count?: number;
    video?: boolean;
    vote_average?: number;
}

export interface SearchResults {
    page: number;
    results: SearchResult[];
    dates: MovieDates;
    total_pages: number;
    total_results: number;
}
