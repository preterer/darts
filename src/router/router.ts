import VueRouter from "vue-router";

import { game301Route } from "./routes/301.route";
import { game401Route } from "./routes/401.route";
import { game501Route } from "./routes/501.route";
import { blackRoute } from "./routes/black.route";
import { classicRoute } from "./routes/classic.route";
import { evenOutRoute } from "./routes/evenOut.route";
import { homeRoute } from "./routes/home.route";
import { masterOutRoute } from "./routes/masterOut.route";
import { megaOutRoute } from "./routes/megaOut.route";
import { oddOutRoute } from "./routes/oddOut.route";
import { superMegaOutRoute } from "./routes/superMegaOut.route";
import { whiteRoute } from "./routes/white.route";

export const routes = [
  homeRoute,
  masterOutRoute,
  megaOutRoute,
  superMegaOutRoute,
  oddOutRoute,
  evenOutRoute,
  blackRoute,
  whiteRoute,
  classicRoute,
  game301Route,
  game401Route,
  game501Route
];

export const router = new VueRouter({ routes });
