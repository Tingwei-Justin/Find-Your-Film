//http://localhost:8080
export const APP_URLS = {
    BACKEND_DOMAIN: "https://movie-project-308205.wm.r.appspot.com/apis/",
    SEARCH_ROUTE: "search/",
    NOW_PLAYING_ROUTE: "movies/now_playing",
    POPULAR_MOVIE_ROUTE: "movies/popular",
    TOP_RATED_MOVIE_ROUTE: "movies/top_rated",
    TRENDING_MOVIE_ROUTE: "movies/trending",
    DETAIL_MOVIE_ROUTE: "movies/detail",
    VIDEO_MOVIE_ROUTE: "movies/video",
    CAST_MOVIE_ROUTE: "movies/credits",
    RECOMMEND_MOVIE_ROUTE: "movies/recommendations/",
    SIMILAR_MOVIE_ROUTE: "movies/similar/",
    REVIEW_MOVIE_ROUTE: "movies/reviews/",
    POPULAR_TV_ROUTE: "tvs/popular",
    TOP_RATED_TV_ROUTE: "tvs/top_rated",
    TRENDING_TV_ROUTE: "tvs/trending",
    DETAIL_TV_ROUTE: "tvs/detail",
    VIDEO_TV_ROUTE: "tvs/video",
    CAST_TV_ROUTE: "tvs/credits",
    RECOMMEND_TV_ROUTE: "tvs/recommendations/",
    SIMILAR_TV_ROUTE: "tvs/similar/",
    REVIEW_TV_ROUTE: "tvs/reviews/",
    CAST_DETAIL_ROUTE: "person/",
    IMAGE_DOMAIN: "https://image.tmdb.org/t/p/"

  };

export const Default =  {
  WATCHED: "continueWatch",
  WATCH_LIST: "watchList"
}

export interface MediaItem {
  backdrop_path: string;
  genre_ids: Int32List;
  id: number;
  title: string;
  name: string;
  poster_path: string;
  english_name: string;
  media_type: string;
}

export interface MediaType {
  type: number; // 0: movie, 1: tv
  id: number;
}

export interface Cast {
  name: string;
  id: number;
  profile_path: string;
  character: string;
}

export interface Category {
  name: string;
  api_url: string;
  cached: any;
}

export const Categories = {
  popular_movies: {
    name: "Popular Movies",
    api_url: APP_URLS.BACKEND_DOMAIN + APP_URLS.POPULAR_MOVIE_ROUTE,
    cached: null
  },
  top_rated_movies: {
    name: "Top Rated Movies",
    api_url: APP_URLS.BACKEND_DOMAIN + APP_URLS.TOP_RATED_MOVIE_ROUTE,
    cached: null
  },
  trending_movies: {
    name: "Trending Movies",
    api_url: APP_URLS.BACKEND_DOMAIN + APP_URLS.TRENDING_MOVIE_ROUTE,
    cached: null
  },
  popular_tvs: {
    name: "Popular TV Shows",
    api_url: APP_URLS.BACKEND_DOMAIN + APP_URLS.POPULAR_TV_ROUTE,
    cached: null
  },
  top_rated_tvs: {
    name: "Top Rated TV Shows",
    api_url: APP_URLS.BACKEND_DOMAIN + APP_URLS.TOP_RATED_TV_ROUTE,
    cached: null
  },
  trending_tvs: {
    name: "Trending TV Shows",
    api_url: APP_URLS.BACKEND_DOMAIN + APP_URLS.TRENDING_TV_ROUTE,
    cached: null
  }
}