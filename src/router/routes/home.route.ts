import { RouteConfig } from "vue-router";

import { Home } from "../../views/home/Home";

export const homeRoute: RouteConfig = {
  name: "home",
  path: "/",
  component: Home
};
