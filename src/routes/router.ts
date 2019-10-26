import VueRouter from "vue-router";

import { homeRoute } from "./home.route";
import { masterOutRoute } from "./materOut.route";

export const router = new VueRouter({ routes: [homeRoute, masterOutRoute] });
