import VueRouter from "vue-router";

import { classicRoute } from "./classic.route";
import { homeRoute } from "./home.route";
import { masterOutRoute } from "./masterOut.route";
import { superMegaOutRoute } from "./superMegaOut.route";

export const routes = [
  homeRoute,
  classicRoute,
  masterOutRoute,
  superMegaOutRoute
];

export const router = new VueRouter({ routes });
