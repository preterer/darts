import { NPoints } from "../../services/nPoints.service";
import { gameRoute } from "../../utils/gameRoute";
import { missButton } from "../../utils/missButton";

export const game401Route = gameRoute(
  "401",
  "/401",
  "401",
  new NPoints(401),
  missButton(0)
);
