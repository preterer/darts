import VueRouter from "vue-router";

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
  superMegaOutRoute
];

export const router = new VueRouter({ routes });
