import { OddMasterOutService } from "../../services/oddMasterOut.service";
import { gameRoute } from "../../utils/gameRoute";
import { missButton } from "../../utils/missButton";

export const oddOutRoute = gameRoute(
  "oddOut",
  "/odd",
  "Odd Out",
  new OddMasterOutService(),
  missButton(25, true)
);
