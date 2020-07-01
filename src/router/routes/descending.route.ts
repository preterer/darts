import { RouteConfig } from "vue-router";

import { SequencedService } from "../../services/sequenced.service";
import { gameRoute } from "../../utils/gameRoute";
import { missButton } from "../../utils/missButton";

export const descendingRoute: RouteConfig = gameRoute(
  "descending",
  "/descending",
  "Descending",
  new SequencedService(),
  missButton(25)
);
