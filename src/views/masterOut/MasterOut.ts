import Vue from "vue";
import Component from "vue-class-component";

import template from "./MasterOut.html";
import { Button } from "../../interfaces/button";
import { Player } from "../../interfaces/player";
import { Modifier } from "../../interfaces/modifier";

@Component({ name: "MasterOut", template })
export class MasterOut extends Vue {
  public scorable = [15, 16, 17, 18, 19, 20, 25];

  public turn = 0;

  public throwsLeft = 3;

  public multiplier = 1;

  public double = false;

  public tripple = false;

  private clicksToOpen = 3;

  public players: Player[] = new Array(
    parseInt(localStorage.getItem("players") as string) || 2
  )
    .fill(0)
    .map((_, index) => ({ name: `Player ${index + 1}`, score: 0, state: {} }));

  public modifiers: Modifier[] = [
    { modifier: 2, text: "Double!", class: "btn-info btn-50" },
    { modifier: 3, text: "Tripple!", class: "btn-warning btn-50" }
  ];

  public data() {
    const buttons: Button[] = new Array(20).fill(0).map((_, index) => ({
      text: index + 1,
      score: index + 1,
      class: "btn-20"
    }));
    buttons.push({ text: "Bulls eye!", score: 25, class: "btn-100" });
    buttons.push({
      text: "Miss!",
      score: 25,
      class: "btn-100 btn-danger",
      alwaysNegative: true
    });

    return { buttons };
  }

  public triggerMultiplier(modifier: number) {
    if (this.multiplier === modifier) {
      this.multiplier = 1;
    } else {
      this.multiplier = modifier;
    }
  }

  public score(button: Button): void {
    const player = this.players[this.turn];
    if (this.scorable.includes(button.score) && !button.alwaysNegative) {
      this.scoreScorable(player, button);
    } else {
      this.appendPlayerScore(player, button);
    }
    this.endThrow();
  }

  private scoreScorable(player: Player, button: Button): void {
    const isClosed = this.players
      .map(player => player.state)
      .every(state => state[button.score] === this.clicksToOpen);
    if (isClosed) {
      return this.appendPlayerScore(player, button);
    }
    this.scoreNotClosed(player, button);
  }

  private scoreNotClosed(currentPlayer: Player, button: Button) {
    const currentPlayerState = currentPlayer.state;

    if (currentPlayerState[button.score] !== this.clicksToOpen) {
      this.updatePlayerState(currentPlayerState, button);
    }

    if (
      currentPlayerState[button.score] === this.clicksToOpen &&
      this.multiplier
    ) {
      this.addOtherPlayersScore(button);
    }
  }

  private updatePlayerState(currentPlayerState: any, button: Button) {
    currentPlayerState[button.score] = currentPlayerState[button.score] || 0;
    const scoreAfterUpdate = currentPlayerState[button.score] + this.multiplier;
    if (scoreAfterUpdate > this.clicksToOpen) {
      currentPlayerState[button.score] = this.clicksToOpen;
    } else {
      currentPlayerState[button.score] = scoreAfterUpdate;
    }
    this.multiplier = scoreAfterUpdate - this.clicksToOpen;
  }

  private addOtherPlayersScore(button: Button) {
    this.players
      .filter(player => player.state[button.score] !== this.clicksToOpen)
      .forEach(player => this.appendPlayerScore(player, button));
  }

  private appendPlayerScore(player: Player, button: Button): void {
    player.score += button.score * this.multiplier;
  }

  private endThrow() {
    this.multiplier = 1;
    this.throwsLeft--;
    if (this.throwsLeft === 0) {
      this.throwsLeft = 3;
      this.turn = (this.turn + 1) % this.players.length;
    }
  }
}
