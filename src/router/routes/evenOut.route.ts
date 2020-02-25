import { OddMasterOutService } from "../../services/oddMasterOut.service";
import { gameRoute } from "../../utils/gameRoute";
import { missButton } from "../../utils/missButton";

export const evenOutRoute = gameRoute(
  "evenOut",
  "/even",
  "Even Out",
  new OddMasterOutService(false),
  missButton(25, true)
);
