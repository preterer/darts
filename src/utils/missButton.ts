import { Button } from "#/interfaces/button";

/**
 * Creates a miss button
 *
 * @export
 * @param {number} score
 * @param {boolean} [alwaysNegative=true]
 * @returns {Button}
 */
export function missButton(score: number, alwaysNegative = true): Button {
  return {
    alwaysNegative,
    class: "btn-100 btn-danger",
    text: "Miss",
    score
  };
}
