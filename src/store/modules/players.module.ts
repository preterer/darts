import { Module } from "vuex";

import { Player } from "#/interfaces/player";
import { PLAYERS_KEY } from "../../utils/constants";

export const players: Module<{ list: Player[] }, any> = {
  namespaced: true,

  state() {
    return { list: getPlayers() };
  },

  mutations: {
    add(state, player: Player): void {
      player.id = Date.now();
      state.list.push(player);
    },

    remove(state, id: number): void {
      const index = state.list.findIndex(player => player.id === id);
      state.list.splice(index, 1);
    },

    update(state, player: Player): void {
      const index = state.list.findIndex(p => p.id === player.id);
      state.list.splice(index, 1, player);
    },

    save(state): void {
      localStorage.setItem(PLAYERS_KEY, JSON.stringify(state.list));
    }
  },

  actions: {
    add(context, player: Player): void {
      context.commit("add", player);
      context.commit("save");
    },

    remove(context, id: number): void {
      context.commit("remove", id);
      context.commit("save");
    },

    update(context, player: Player): void {
      context.commit("update", player);
      context.commit("save");
    }
  }
};

/**
 * Gets current players list
 *
 * @returns {Player[]}
 */
function getPlayers(): Player[] {
  const storePlayers = getStoredPlayers();
  if (storePlayers && Array.isArray(storePlayers) && storePlayers.length) {
    return storePlayers;
  }
  return getDefaultPlayers();
}

/**
 * Gets players from store
 *
 * @returns {(Player[] | void)}
 */
function getStoredPlayers(): Player[] | void {
  const storedPlayers = localStorage.getItem("players");
  if (storedPlayers) {
    return JSON.parse(storedPlayers);
  }
}

/**
 * Gets a new players list
 *
 * @returns {Player[]}
 */
function getDefaultPlayers(): Player[] {
  return [
    { id: 1, name: "Player 1", score: 0, state: {} },
    { id: 2, name: "Player 2", score: 0, state: {} }
  ];
}
