import { Module } from "vuex";

import { GameWithHistory } from "#/interfaces/gameWithHistory";
import { GameWithPlayers } from "#/interfaces/gameWithPlayers";
import { Player } from "#/interfaces/player";
import { GAME_KEY } from "../../utils/constants";
import { store } from "../store";

export const game: Module<GameWithHistory, any> = {
  namespaced: true,

  state(): GameWithHistory {
    const savedGame = localStorage.getItem(GAME_KEY);
    if (savedGame) {
      return JSON.parse(savedGame);
    }
    return defaultGame();
  },

  mutations: {
    setMultiplier(state, multiplier: number): void {
      state.multiplier = state.multiplier === multiplier ? 1 : multiplier;
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
      save(state);
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
        save(state);
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

function defaultGame(): GameWithHistory {
  return {
    multiplier: 1,
    turn: 0,
    throwsLeft: 3,
    history: []
  };
}

/**
 * Saves game to localstorage
 *
 * @param {GameWithHistory} game
 */
function save(game: GameWithHistory): void {
  localStorage.setItem(GAME_KEY, JSON.stringify(game));
}
