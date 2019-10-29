import Vue from "vue";
import Component from "vue-class-component";

import { Player } from "../../interfaces/player";
import template from "./Players.html";

@Component({ name: "Players", template })
export class Players extends Vue {
  public players!: Player[];

  public data() {
    return { players: this.getPlayers() };
  }

  private getPlayers(): Player[] {
    const storePlayers = this.getPlayersFromStore();
    if (storePlayers && Array.isArray(storePlayers) && storePlayers.length) {
      return storePlayers;
    }
    return this.getNewPlayersList();
  }

  private getPlayersFromStore(): Player[] | void {
    const storedPlayers = localStorage.getItem("players");
    if (storedPlayers) {
      return JSON.parse(storedPlayers);
    }
  }

  private getNewPlayersList(): Player[] {
    return [
      { name: "Player 1", score: 0, state: {} },
      { name: "Player 2", score: 0, state: {} }
    ];
  }

  public addPlayer(): void {
    this.players.push({
      name: `Player ${this.players.length + 1}`,
      score: 0,
      state: {}
    });
  }

  public removePlayer(index: number): void {
    if (this.players.length > 1) {
      this.players.splice(index, 1);
    }
  }

  public savePlayers(): void {
    localStorage.setItem("players", JSON.stringify(this.players));
  }
}
