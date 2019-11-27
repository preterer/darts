import { Module } from "vuex";

import { GameWithHistory } from "#/interfaces/gameWithHistory";
import { GameWithPlayers } from "#/interfaces/gameWithPlayers";
import { Player } from "#/interfaces/player";
import { GAME_KEY } from "../../utils/constants";
import { store } from "../store";

export const game: Module<GameWithHistory, any> = {
  namespaced: true,

  state: {
    multiplier: 1,
    turn: 0,
    throwsLeft: 3,
    history: []
  },

  mutations: {
    setMultiplier(state, multiplier: number): void {
      state.multiplier = multiplier;
    },

    saveHistory(state): void {
      const currentState: GameWithPlayers = {
        turn: state.turn,
        multiplier: state.multiplier,
        throwsLeft: state.throwsLeft,
        players: store.state.players.list
      };
      state.history.push(JSON.parse(JSON.stringify(currentState)));
    },

    throw(state): void {
      if (state.throwsLeft === 1) {
        state.throwsLeft = 3;
        state.turn = (state.turn + 1) % store.state.players.list.length;
      } else {
        state.throwsLeft--;
      }
      state.multiplier = 1;
      localStorage.setItem(GAME_KEY, JSON.stringify(state));
    },

    undo(state): void {
      const historicalState = state.history.pop();
      if (historicalState) {
        state.turn = historicalState.turn;
        state.throwsLeft = historicalState.throwsLeft;
        state.multiplier = historicalState.multiplier;
        historicalState.players.forEach(player =>
          store.commit("players/update", player)
        );
        localStorage.setItem(GAME_KEY, JSON.stringify(state));
      }
    },

    reset(state): void {
      state.history = [];
      state.multiplier = 1;
      state.throwsLeft = 3;
      store.state.players.list.forEach((player: Player) =>
        store.commit("players/update", { ...player, score: 0, state: {} })
      );
      localStorage.removeItem(GAME_KEY);
    }
  }
};
