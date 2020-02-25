import { NPoints } from "../../services/nPoints.service";
import { gameRoute } from "../../utils/gameRoute";
import { missButton } from "../../utils/missButton";

export const game501Route = gameRoute(
  "501",
  "/501",
  "501",
  new NPoints(501),
  missButton(0)
);
