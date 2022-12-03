import Home from "~/pages/Home";
import Watch from "~/pages/Watch";
import Favorite from "~/pages/Favorite";
import Sign from "~/pages/Sign";
import Together from "~/pages/Together";
import History from "~/pages/History";
import Movie from "~/pages/Movie";
import Detail from "~/pages/Detail";
import Room from "~/pages/Room";

import routesConfig from "~/config/routes";
import { FooterRemove } from "~/components/Layout";

const publicRoutes = [
  { path: routesConfig.home, components: Home },
  { path: routesConfig.together, components: Together },
  { path: routesConfig.watch, components: Watch },
  { path: routesConfig.history, components: History },
  { path: routesConfig.favorite, components: Favorite },
  { path: routesConfig.movie, components: Movie },
  { path: routesConfig.detail, components: Detail },
  { path: routesConfig.profile, components: Sign },
  { path: routesConfig.room, components: Room, layout: FooterRemove },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
