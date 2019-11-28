import VueRouter from "vue-router";

import { homeRoute } from "./home.route";
import { masterOutRoute } from "./masterOut.route";

export const router = new VueRouter({ routes: [homeRoute, masterOutRoute] });
