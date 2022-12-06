import { axiosDetailMovie, axiosMovie } from "./axiosClient";
import instance from "~/config/axios.config";

export const categoryParam = {
  genre: "genre",
  country: "country",
  year: "year",
  type: "type",
};

const scatsApi = {
  getMoviesList: (page, params) => {
    const url = "movie/search?key=%20&page=" + page;
    return axiosMovie.get(url, params);
  },
  getMyRoom: (userID) => {
    const url = "room/my-room";
    return instance.post(url, { idUser: userID });
  },
  createRoom: (data) => {
    const url = "room";
    return instance.post(url, data);
  },
  getComment: (id) => {
    const url = "comment/" + id;
    return instance.get(url);
  },
  getRoomLive: () => {
    const url = "room/live";
    return instance.get(url);
  },
  getBanner: () => {
    const url = "movie/banner";
    return axiosMovie.get(url);
  },
  search: (key, params) => {
    const url = "movie/search?key=" + key;
    return axiosMovie.get(url, params);
  },
  filter: (year, country, type, params) => {
    const url =
      "movie/filter?year=" +
      year +
      "&country=" +
      country +
      "&type=" +
      type +
      "&limit=20";
    return axiosMovie.get(url, params);
  },
  getMovieLive: (key) => {
    const url = "movie/search-live?key=" + key;
    return axiosMovie.get(url);
  },
  category: (category, params) => {
    const url = "/" + categoryParam[category];
    return axiosMovie.get(url, params);
  },
  detail: (id, params) => {
    const url = "movie/" + id;
    return axiosMovie.get(url, params);
  },
  getVideo: (slug, params) => {
    const url = "phim/" + slug;
    return axiosDetailMovie.get(url, params);
  },
  similar: (page, params) => {
    const Page = page + 1;
    const url = "movie/search?key=%20&limit=6&page=" + Page;
    return axiosMovie.get(url, params);
  },
};

export default scatsApi;
