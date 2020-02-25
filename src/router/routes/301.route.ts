import { NPoints } from "../../services/nPoints.service";
import { gameRoute } from "../../utils/gameRoute";
import { missButton } from "../../utils/missButton";

export const game301Route = gameRoute(
  "301",
  "/301",
  "301",
  new NPoints(301),
  missButton(0)
);
