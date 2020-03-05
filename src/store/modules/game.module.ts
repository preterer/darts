import { Module } from "vuex";

import { Button } from "#/interfaces/button";
import { GameWithHistory } from "#/interfaces/gameWithHistory";
import { GameWithPlayers } from "#/interfaces/gameWithPlayers";
import { Player } from "#/interfaces/player";
import { GAME_KEY } from "../../utils/constants";
import { store } from "../store";

const THROWS_PER_TURN = 3;

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

    endThrow(state): void {
      if (state.throwsLeft === 1) {
        store.commit("game/nextTurn");
      } else {
        state.throwsLeft--;
      }
      state.multiplier = 1;
      save(state);
    },

    nextTurn(state): void {
      state.throwsLeft = THROWS_PER_TURN;
      state.turn = (state.turn + 1) % store.state.players.list.length;
    },

    throw(state, button: Button): void {
      store.commit("game/saveHistory");
      store.state.gameMode.service.score(button);
      store.commit("game/endThrow");
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

    undoTurn(state): void {
      while (state.throwsLeft !== 3) {
        store.commit("game/undo");
      }
    },

    reset(state): void {
      state.history = [];
      state.multiplier = 1;
      state.throwsLeft = THROWS_PER_TURN;
      state.turn = Math.min(state.turn, store.state.players.list.length - 1);
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
    throwsLeft: THROWS_PER_TURN,
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
