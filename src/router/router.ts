import VueRouter from "vue-router";

import { game301Route } from "./routes/301.route";
import { game401Route } from "./routes/401.route";
import { game501Route } from "./routes/501.route";
import { classicRoute } from "./routes/classic.route";
import { homeRoute } from "./routes/home.route";
import { masterOutRoute } from "./routes/masterOut.route";
import { megaOutRoute } from "./routes/megaOut.route";
import { superMegaOutRoute } from "./routes/superMegaOut.route";

export const routes = [
  homeRoute,
  classicRoute,
  masterOutRoute,
  megaOutRoute,
  superMegaOutRoute,
  game301Route,
  game401Route,
  game501Route
];

export const router = new VueRouter({ routes });
